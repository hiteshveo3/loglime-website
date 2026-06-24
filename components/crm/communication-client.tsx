"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";

import { Badge, Button, Card, EmptyState, Input, Textarea, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type Thread = {
  id: string;
  customer_id: string | null;
  subject: string | null;
  status: string | null;
  last_message_at: string | null;
  created_at: string | null;
};

type Message = {
  id: string;
  thread_id: string | null;
  sender_id: string | null;
  content: string | null;
  read_by: string[] | null;
  created_at: string | null;
};

type TypingPayload = { text: string; userId: string; name: string };

export function CommunicationClient() {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [messageText, setMessageText] = useState("");
  const [search, setSearch] = useState("");
  const [typingPreview, setTypingPreview] = useState<TypingPayload | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  // Fetch threads
  const { data: threads = [], isLoading: threadsLoading } = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("threads").select("*").order("last_message_at", { ascending: false }).limit(50);
      return (data ?? []) as Thread[];
    },
  });

  // Fetch messages for selected thread
  const { data: messages = [] } = useQuery({
    queryKey: ["thread-messages", selectedThread?.id],
    queryFn: async () => {
      if (!selectedThread) return [];
      const supabase = createClient();
      const { data } = await supabase.from("messages").select("*").eq("thread_id", selectedThread.id).order("created_at", { ascending: true });
      return (data ?? []) as Message[];
    },
    enabled: !!selectedThread,
  });

  // Realtime: new messages
  useEffect(() => {
    if (!selectedThread) return;
    const supabase = createClient();
    const channel = supabase
      .channel(`messages-${selectedThread.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `thread_id=eq.${selectedThread.id}` }, () => {
        void queryClient.invalidateQueries({ queryKey: ["thread-messages", selectedThread.id] });
        void queryClient.invalidateQueries({ queryKey: ["threads"] });
      })
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [selectedThread, queryClient]);

  // Realtime: typing preview (Broadcast — no DB write)
  useEffect(() => {
    if (!selectedThread) return;
    const supabase = createClient();
    const channel = supabase.channel(`typing-${selectedThread.id}`);
    channel.on("broadcast", { event: "typing" }, ({ payload }: { payload: TypingPayload }) => {
      setTypingPreview(payload);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setTypingPreview(null), 3000);
    }).subscribe();
    return () => {
      void supabase.removeChannel(channel);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [selectedThread]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingPreview]);

  const sendMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!selectedThread) return;
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("messages").insert({
        thread_id: selectedThread.id,
        sender_id: user?.id ?? null,
        content,
      });
      if (error) throw error;
      await supabase.from("threads").update({ last_message_at: new Date().toISOString() }).eq("id", selectedThread.id);
    },
    onSuccess: async () => {
      setMessageText("");
      await queryClient.invalidateQueries({ queryKey: ["thread-messages", selectedThread?.id] });
    },
    onError: () => showToast({ title: "Could not send message", tone: "error" }),
  });

  const createThreadMutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("threads").insert({ subject: "New Thread", status: "active" }).select().single();
      if (error) throw error;
      return data as Thread;
    },
    onSuccess: async (newThread) => {
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
      setSelectedThread(newThread);
      showToast({ title: "Thread created", tone: "success" });
    },
  });

  const filteredThreads = threads.filter((t) =>
    !search || (t.subject ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-120px)] gap-0 overflow-hidden rounded-2xl border border-border bg-white shadow-card">
      {/* Left panel — Thread list */}
      <div className="flex w-80 shrink-0 flex-col border-r border-border">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-h4 text-text-primary">Inbox</h1>
            <Button variant="secondary" onClick={() => createThreadMutation.mutate()}>
              <i className="hgi-stroke hgi-add-01" />
              New
            </Button>
          </div>
          <div className="mt-3">
            <Input
              leftIcon={<i className="hgi-stroke hgi-search-01 text-lg" />}
              placeholder="Search threads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {threadsLoading ? (
            <div className="space-y-2 p-3">
              {[1, 2, 3, 4].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />)}
            </div>
          ) : filteredThreads.length === 0 ? (
            <div className="p-6 text-center">
              <i className="hgi-stroke hgi-message-01 text-2xl text-text-muted" />
              <p className="mt-2 text-small text-text-muted">No threads yet</p>
            </div>
          ) : (
            filteredThreads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setSelectedThread(thread)}
                className={`w-full border-b border-border p-4 text-left transition last:border-0 hover:bg-surface-alt ${selectedThread?.id === thread.id ? "bg-coral-light" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral-light text-small font-bold text-coral">
                      {(thread.subject ?? "T")[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-small font-semibold text-text-primary">{thread.subject ?? "Untitled Thread"}</p>
                      <p className="text-caption text-text-muted">
                        {thread.last_message_at ? formatDistanceToNow(new Date(thread.last_message_at), { addSuffix: true }) : "No messages"}
                      </p>
                    </div>
                  </div>
                  <Badge tone={thread.status === "active" ? "success" : "neutral"}>{thread.status ?? "active"}</Badge>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right panel — Active thread */}
      {selectedThread ? (
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Thread header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-h4 text-text-primary">{selectedThread.subject ?? "Thread"}</h2>
              <p className="text-caption text-text-muted">
                {selectedThread.last_message_at ? `Last message ${formatDistanceToNow(new Date(selectedThread.last_message_at), { addSuffix: true })}` : "No messages yet"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">
                <i className="hgi-stroke hgi-link-01" />
                Link Record
              </Button>
              <Button variant="secondary">
                <i className="hgi-stroke hgi-archive-01" />
                Archive
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <i className="hgi-stroke hgi-message-01 text-3xl text-text-muted" />
                  <p className="mt-3 text-small text-text-muted">No messages in this thread yet.</p>
                  <p className="text-caption text-text-muted">Send the first message below.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => {
                  const isAgent = true; // TODO: compare with current user id
                  return (
                    <div key={msg.id} className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${isAgent ? "bg-coral text-white" : "border border-border bg-surface-alt"}`}>
                        <p className={`text-small ${isAgent ? "text-white" : "text-text-secondary"}`}>{msg.content}</p>
                        <p className={`mt-1 text-caption ${isAgent ? "text-white/70" : "text-text-muted"}`}>
                          {msg.created_at ? formatDistanceToNow(new Date(msg.created_at), { addSuffix: true }) : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Live typing preview */}
                {typingPreview && (
                  <div className="flex justify-start">
                    <div className="max-w-[70%] rounded-2xl border border-border bg-surface-alt px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted [animation-delay:0ms]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted [animation-delay:300ms]" />
                        </span>
                        <span className="text-caption text-text-muted">{typingPreview.name} is typing…</span>
                      </div>
                      {typingPreview.text ? (
                        <p className="mt-1 text-small italic text-text-muted">{typingPreview.text}</p>
                      ) : null}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-border p-4">
            <form
              className="flex gap-3"
              onSubmit={(e) => { e.preventDefault(); if (messageText.trim()) sendMutation.mutate(messageText.trim()); }}
            >
              <Textarea
                className="flex-1 resize-none"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (messageText.trim()) sendMutation.mutate(messageText.trim());
                  }
                }}
              />
              <div className="flex flex-col justify-end gap-2">
                <Button type="submit" isLoading={sendMutation.isPending} disabled={!messageText.trim()}>
                  <i className="hgi-stroke hgi-sent-01" />
                  Send
                </Button>
              </div>
            </form>
            <p className="mt-2 text-caption text-text-muted">Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <i className="hgi-stroke hgi-message-01 text-4xl text-text-muted" />
            <p className="mt-4 text-body font-semibold text-text-secondary">Select a thread</p>
            <p className="mt-1 text-small text-text-muted">Choose a conversation from the left to start messaging.</p>
            <Button className="mt-5" onClick={() => createThreadMutation.mutate()}>
              <i className="hgi-stroke hgi-add-01" />
              New Thread
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
