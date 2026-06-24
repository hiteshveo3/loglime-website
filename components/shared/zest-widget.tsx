"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
  streaming?: boolean;
};

const quickReplies: Record<string, string[]> = {
  visitor: ["Pricing", "How it works", "Book a demo", "Commission fees"],
  customer: ["My project status", "Create a ticket", "View invoice", "Download assets"],
  team: ["/find lead", "/summarize customer", "/draft reply", "/outline blog"],
};

export default function ZestWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [leadSkipped, setLeadSkipped] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [anonymousMessages, setAnonymousMessages] = useState(0);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi, I'm Zest. I can answer questions about Loglime products, pricing, setup, and demos." },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const mode = useMemo(() => (pathname.startsWith("/crm") ? "team" : pathname.startsWith("/portal") ? "customer" : "visitor"), [pathname]);
  const hidden = pathname.startsWith("/login") || pathname.startsWith("/forgot-password") || pathname.startsWith("/reset-password") || pathname.startsWith("/accept-invite");

  useEffect(() => {
    const stored = localStorage.getItem("loglime-zest-state");
    if (!stored) return;
    try {
      const state = JSON.parse(stored) as { visitorEmail?: string; visitorName?: string; conversationId?: string; messages?: ChatMessage[]; leadSkipped?: boolean; anonymousMessages?: number };
      setVisitorEmail(state.visitorEmail ?? "");
      setVisitorName(state.visitorName ?? "");
      setConversationId(state.conversationId);
      setLeadSkipped(Boolean(state.leadSkipped));
      setAnonymousMessages(state.anonymousMessages ?? 0);
      if (state.messages?.length) setMessages(state.messages);
    } catch {
      localStorage.removeItem("loglime-zest-state");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("loglime-zest-state", JSON.stringify({ visitorEmail, visitorName, conversationId, messages: messages.slice(-20), leadSkipped, anonymousMessages }));
  }, [anonymousMessages, conversationId, leadSkipped, messages, visitorEmail, visitorName]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (!["/pricing", "/demo"].includes(pathname)) return;
    const timer = window.setTimeout(() => {
      if (!open) setUnread((value) => Math.max(value, 1));
    }, 45_000);
    return () => window.clearTimeout(timer);
  }, [open, pathname]);

  useEffect(() => {
    function handleOpenRequest(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-zest-open]")) openWidget();
    }
    document.addEventListener("click", handleOpenRequest);
    return () => document.removeEventListener("click", handleOpenRequest);
  });

  if (hidden) return null;

  const needsLead = mode === "visitor" && !visitorEmail && !leadSkipped;

  function openWidget() {
    setOpen(true);
    setMinimized(false);
    setUnread(0);
  }

  function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!visitorEmail) return;
    setMessages((current) => [...current, { role: "assistant", content: `Great to meet you${visitorName ? `, ${visitorName}` : ""}. What would you like to know?` }]);
  }

  async function sendMessage(value?: string) {
    const trimmed = (value ?? input).trim();
    if (!trimmed || loading) return;

    if (mode === "visitor" && !visitorEmail && leadSkipped && anonymousMessages >= 10) {
      setLeadSkipped(false);
      setMessages((current) => [...current, { role: "assistant", content: "I'd love to keep helping. Drop your email and I'll continue from here." }]);
      return;
    }

    setInput("");
    setLoading(true);
    setAnonymousMessages((count) => (visitorEmail ? count : count + 1));
    setMessages((current) => [...current, { role: "user", content: trimmed }, { role: "assistant", content: "", streaming: true }]);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
        body: JSON.stringify({ message: trimmed, mode, conversationId, visitorEmail: visitorEmail || undefined, visitorName: visitorName || undefined, stream: true }),
      });

      if (!response.body) throw new Error("No response stream.");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value: chunkValue } = await reader.read();
        if (done) break;
        buffer += decoder.decode(chunkValue, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";
        for (const event of events) {
          if (!event.startsWith("data: ")) continue;
          const payload = JSON.parse(event.slice(6)) as { text?: string; done?: boolean; conversationId?: string };
          if (payload.conversationId) setConversationId(payload.conversationId);
          if (payload.done) {
            setMessages((current) => current.map((message, index) => (index === current.length - 1 ? { ...message, streaming: false } : message)));
            continue;
          }
          if (payload.text) {
            setMessages((current) => current.map((message, index) => (index === current.length - 1 ? { ...message, content: `${message.content}${payload.text}` } : message)));
          }
        }
      }
    } catch {
      setMessages((current) => current.map((message, index) => (index === current.length - 1 ? { role: "assistant", content: "I can help with Loglime products, pricing, setup, and demos. Book a walkthrough and the team will map the right setup for you." } : message)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="fixed bottom-24 right-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-floating transition hover:scale-[1.08] lg:bottom-6"
        onClick={openWidget}
        aria-label="Open Zest chat"
      >
        <i className="hgi-stroke hgi-ai-chat-02 text-2xl" />
        {unread ? <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-status-error text-[10px] font-bold text-white">{unread}</span> : null}
      </button>

      {open && !minimized ? (
        <div className="fixed inset-0 z-[9998] bg-white">
          <section className="fixed inset-0 flex flex-col bg-white">
            <header className="flex h-16 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-white">
                  <i className="hgi-stroke hgi-flash text-lg" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-text-primary">Zest</h2>
                  <p className="text-[12px] font-medium text-text-muted"><span className="text-status-success">● Online</span> · AI Assistant</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex h-10 items-center justify-center gap-2 rounded-full bg-slate-100 px-4 text-small font-bold text-text-secondary hover:bg-coral-light hover:text-coral" onClick={() => setOpen(false)} aria-label="Back to website">
                  <i className="hgi-stroke hgi-arrow-left-01" />
                  Back
                </button>
              </div>
            </header>

            <div ref={scrollRef} className="mx-auto w-full max-w-5xl flex-1 space-y-3 overflow-y-auto p-4 sm:p-8">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={cn("flex", message.role === "user" ? "justify-end" : message.role === "system" ? "justify-center" : "justify-start")}>
                  {message.role === "system" ? (
                    <p className="text-caption uppercase tracking-wider text-text-muted">{message.content}</p>
                  ) : (
                    <p className={cn("max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-body leading-7 shadow-card sm:max-w-[70%]", message.role === "user" ? "rounded-br-md bg-coral text-white" : "rounded-bl-md bg-surface-alt text-text-primary", message.streaming && "streaming-text")}>
                      {message.content || " "}
                    </p>
                  )}
                </div>
              ))}
              {loading ? (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md bg-surface-alt px-4 py-3">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-coral" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-coral [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-coral [animation-delay:300ms]" />
                  </div>
                </div>
              ) : null}
            </div>

            {needsLead ? (
              <form className="border-t border-border p-4" onSubmit={submitLead}>
                <div className="mx-auto max-w-xl rounded-2xl border border-border bg-white p-4 shadow-card">
                  <p className="text-small font-semibold text-text-primary">Before we chat, what&apos;s your name and email?</p>
                  <div className="mt-3 grid gap-3">
                    <Input label="Name" value={visitorName} onChange={(event) => setVisitorName(event.target.value)} placeholder="Your name" />
                    <Input label="Email" type="email" value={visitorEmail} onChange={(event) => setVisitorEmail(event.target.value)} placeholder="you@restaurant.com" required />
                    <Button type="submit" className="w-full">Start chatting</Button>
                    <button type="button" className="text-small font-semibold text-text-muted hover:text-coral" onClick={() => setLeadSkipped(true)}>
                      Skip for now
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <>
                <div className="mx-auto flex w-full max-w-5xl gap-2 overflow-x-auto border-t border-border px-4 py-3">
                  {quickReplies[mode].map((chip) => (
                    <button key={chip} className="shrink-0 rounded-full border border-border-strong bg-white px-4 py-2 text-small font-semibold text-text-secondary hover:border-coral hover:bg-coral-light hover:text-coral" onClick={() => void sendMessage(chip)}>
                      {chip}
                    </button>
                  ))}
                </div>
                <form
                  className="mx-auto flex w-full max-w-5xl gap-2 border-t border-border p-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void sendMessage();
                  }}
                >
                  <input className="min-w-0 flex-1 rounded-full border border-border-strong px-5 text-body outline-none focus:border-coral focus:ring-4 focus:ring-coral/10" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about products, pricing, setup, legal terms, or support..." />
                  <Button type="submit" isLoading={loading} aria-label="Send message" className="h-11 w-11 p-0">
                    <i className="hgi-stroke hgi-sent" />
                  </Button>
                </form>
              </>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
