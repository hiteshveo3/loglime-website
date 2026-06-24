"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Card, Drawer, Input, Textarea } from "@/components/ui";

type Message = { id: string; role: "user" | "assistant"; content: string; timestamp: Date };
type Mode = "visitor" | "customer" | "team";

function renderMarkdownLinks(text: string) {
  const parts: (string | React.ReactNode)[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let linkIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a key={`link-${linkIndex}`} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-coral underline hover:font-semibold cursor-pointer">
        {match[1]}
      </a>
    );
    lastIndex = regex.lastIndex;
    linkIndex++;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

export function ZestAIWidget() {
  const [mode, setMode] = useState<Mode>("visitor");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [showCaptureForm, setShowCaptureForm] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API call to Gemini
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Thank you for your message! Our team will get back to you shortly. How else can I help?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleCaptureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (visitorName && visitorEmail) {
      const captureMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `Thanks ${visitorName}! I'm here to help. What can I assist you with today?`,
        timestamp: new Date(),
      };
      setMessages([captureMessage]);
      setShowCaptureForm(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-coral shadow-floating transition hover:scale-110"
      >
        <i className="hgi-stroke hgi-message-circle-01 text-2xl text-white" />
      </button>
    );
  }

  return (
    <>
    <Drawer open={open} title="Zest AI" subtitle="Chat with our AI assistant" onClose={() => setOpen(false)}>
      <div className="flex flex-col gap-4 h-96">
        {/* Mode Selector */}
        {mode === "visitor" && (
          <div className="flex gap-2 border-b border-border pb-3">
            <button
              onClick={() => setMode("visitor")}
              className="px-3 py-1 text-small font-semibold text-coral border-b-2 border-coral"
            >
              Visitor
            </button>
            <button
              onClick={() => setMode("customer")}
              className="px-3 py-1 text-small font-semibold text-text-muted hover:text-coral"
            >
              Customer
            </button>
            <button
              onClick={() => setMode("team")}
              className="px-3 py-1 text-small font-semibold text-text-muted hover:text-coral"
            >
              Team
            </button>
          </div>
        )}

        {/* Visitor Lead Capture Form */}
        {mode === "visitor" && showCaptureForm && (
          <form onSubmit={handleCaptureLead} className="space-y-3">
            <Input
              placeholder="Your name"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="your@email.com"
              value={visitorEmail}
              onChange={(e) => setVisitorEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Start Chat
            </Button>
          </form>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-coral text-white"
                    : "border border-border bg-surface-alt text-text-primary"
                }`}
              >
                <p className="text-small">{msg.role === "assistant" ? renderMarkdownLinks(msg.content) : msg.content}</p>
                <p className={`mt-1 text-caption ${msg.role === "user" ? "text-white/70" : "text-text-muted"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl border border-border bg-surface-alt px-4 py-3">
                <span className="inline-block h-2 w-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "0s" }} />
                <span className="inline-block h-2 w-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "0.1s" }} />
                <span className="inline-block h-2 w-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Contact Agent Button */}
        <Button variant="secondary" className="w-full justify-center gap-2" onClick={() => window.location.href = "/contact"}>
          <i className="hgi-stroke hgi-message-chat-circle" />
          Contact with an Agent
        </Button>

        {/* Input */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 resize-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!input.trim() || isLoading}
            className="self-end"
          >
            <i className="hgi-stroke hgi-sent-01" />
          </Button>
        </form>
      </div>
    </Drawer>
    </>
  );
}
