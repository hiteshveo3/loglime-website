"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";

import { Badge, Button, Card, Drawer, EmptyState, Select, Textarea, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type Ticket = Database["public"]["Tables"]["tickets"]["Row"];

type TicketMessage = {
  id: string;
  ticket_id: string | null;
  sender_id: string | null;
  content: string | null;
  is_internal_note: boolean | null;
  attachments: unknown;
  created_at: string | null;
};

function formatStatus(status: string | null) {
  return (status ?? "—").split("_").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}

function getStatusTone(status: string | null): "success" | "error" | "warning" | "info" | "neutral" {
  if (status === "resolved" || status === "closed") return "success";
  if (status === "open") return "info";
  if (status === "in_progress") return "warning";
  return "neutral";
}

function getPriorityTone(priority: string | null): "error" | "warning" | "info" | "neutral" {
  if (priority === "urgent") return "error";
  if (priority === "high") return "warning";
  if (priority === "medium") return "info";
  return "neutral";
}

export function SupportTicketClient({ ticketId }: { ticketId: string }) {
  const [replyText, setReplyText] = useState("");
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [statusDrawerOpen, setStatusDrawerOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: ticket, isLoading, isError } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("tickets").select("*").eq("id", ticketId).single();
      if (error) throw error;
      return data as Ticket;
    },
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["ticket-messages", ticketId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("ticket_messages").select("*").eq("ticket_id", ticketId).order("created_at", { ascending: true });
      return (data ?? []) as TicketMessage[];
    },
  });

  // Realtime subscription for new messages
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`ticket-messages-${ticketId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "ticket_messages", filter: `ticket_id=eq.${ticketId}` }, () => {
        void queryClient.invalidateQueries({ queryKey: ["ticket-messages", ticketId] });
      })
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [ticketId, queryClient]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const replyMutation = useMutation({
    mutationFn: async ({ content, internal }: { content: string; internal: boolean }) => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("ticket_messages").insert({
        ticket_id: ticketId,
        sender_id: user?.id ?? null,
        content,
        is_internal_note: internal,
      });
      if (error) throw error;
      // Update ticket's updated_at
      await supabase.from("tickets").update({ updated_at: new Date().toISOString() }).eq("id", ticketId);
    },
    onSuccess: async () => {
      setReplyText("");
      await queryClient.invalidateQueries({ queryKey: ["ticket-messages", ticketId] });
      showToast({ title: isInternalNote ? "Note added" : "Reply sent", tone: "success" });
    },
    onError: () => showToast({ title: "Could not send reply", tone: "error" }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const supabase = createClient();
      const { error } = await supabase.from("tickets").update({ status, updated_at: new Date().toISOString() }).eq("id", ticketId);
      if (error) throw error;
    },
    onSuccess: async () => {
      setStatusDrawerOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      showToast({ title: "Status updated", tone: "success" });
    },
    onError: () => showToast({ title: "Could not update ticket", tone: "error" }),
  });

  if (isLoading) {
    return <div className="space-y-5"><div className="h-8 w-48 animate-pulse rounded-xl bg-slate-100" /><div className="h-96 animate-pulse rounded-2xl bg-slate-100" /></div>;
  }

  if (isError || !ticket) {
    return <EmptyState title="Ticket not found" description="This ticket may have been deleted." icon={<i className="hgi-stroke hgi-customer-support text-xl" />} action={<Button onClick={() => window.history.back()}>Go Back</Button>} />;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <a href="/crm/support" className="flex items-center gap-1.5 text-small font-semibold text-text-secondary hover:text-coral">
          <i className="hgi-stroke hgi-arrow-left-01" />
          All Tickets
        </a>
        <i className="hgi-stroke hgi-arrow-right-01 text-text-muted" />
        <span className="text-small font-semibold text-text-primary">{ticket.title}</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        {/* Left — conversation */}
        <div className="flex flex-col gap-4">
          <Card>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-h3 text-text-primary">{ticket.title}</h1>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge tone={getStatusTone(ticket.status)}>{formatStatus(ticket.status)}</Badge>
                  <Badge tone={getPriorityTone(ticket.priority)}>{formatStatus(ticket.priority)}</Badge>
                  {ticket.category ? <Badge tone="neutral">{formatStatus(ticket.category)}</Badge> : null}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => { setNewStatus(ticket.status ?? "open"); setStatusDrawerOpen(true); }}>
                  <i className="hgi-stroke hgi-refresh-01" />
                  Status
                </Button>
                <Button variant={ticket.status === "resolved" ? "secondary" : "primary"}>
                  <i className={`hgi-stroke ${ticket.status === "resolved" ? "hgi-rotate-01" : "hgi-checkmark-circle-01"}`} />
                  {ticket.status === "resolved" ? "Reopen" : "Resolve"}
                </Button>
              </div>
            </div>
          </Card>

          {/* Messages thread */}
          <Card>
            <div className="flex min-h-[300px] max-h-[500px] flex-col gap-3 overflow-y-auto pr-1">
              {messages.length === 0 ? (
                <EmptyState title="No messages yet" description="Reply to start the conversation." icon={<i className="hgi-stroke hgi-message-01 text-xl" />} />
              ) : (
                messages.map((msg) => {
                  const isAgent = !msg.is_internal_note;
                  return (
                    <div key={msg.id} className={`flex flex-col gap-1 ${isAgent ? "items-end" : "items-start"}`}>
                      {msg.is_internal_note ? (
                        <div className="max-w-[80%] rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                          <div className="flex items-center gap-2">
                            <i className="hgi-stroke hgi-lock-01 text-amber-500 text-xs" />
                            <span className="text-caption font-bold uppercase tracking-wider text-amber-600">Internal Note</span>
                          </div>
                          <p className="mt-1 text-small text-text-secondary">{msg.content}</p>
                        </div>
                      ) : (
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isAgent ? "bg-coral text-white" : "bg-surface-alt text-text-primary border border-border"}`}>
                          <p className={`text-small ${isAgent ? "text-white" : "text-text-secondary"}`}>{msg.content}</p>
                        </div>
                      )}
                      <span className="text-caption text-text-muted">
                        {msg.created_at ? formatDistanceToNow(new Date(msg.created_at), { addSuffix: true }) : ""}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Composer */}
            <div className="mt-4 border-t border-border pt-4">
              <div className="mb-3 flex gap-2">
                <button
                  className={`rounded-full px-4 py-1.5 text-small font-semibold transition ${!isInternalNote ? "bg-coral text-white" : "bg-surface-alt text-text-secondary hover:text-text-primary"}`}
                  onClick={() => setIsInternalNote(false)}
                  type="button"
                >
                  Reply
                </button>
                <button
                  className={`rounded-full px-4 py-1.5 text-small font-semibold transition ${isInternalNote ? "bg-amber-100 text-amber-700" : "bg-surface-alt text-text-secondary hover:text-text-primary"}`}
                  onClick={() => setIsInternalNote(true)}
                  type="button"
                >
                  <i className="hgi-stroke hgi-lock-01 mr-1" />
                  Internal Note
                </button>
              </div>
              <form
                className="flex gap-3"
                onSubmit={(e) => { e.preventDefault(); replyMutation.mutate({ content: replyText, internal: isInternalNote }); }}
              >
                <Textarea
                  className="flex-1"
                  placeholder={isInternalNote ? "Add an internal note (not visible to customer)..." : "Type your reply..."}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <Button type="submit" isLoading={replyMutation.isPending}>
                  <i className="hgi-stroke hgi-sent-01" />
                  Send
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Right — ticket info */}
        <div className="space-y-4">
          <Card>
            <h2 className="text-h4 text-text-primary">Ticket Details</h2>
            <div className="mt-4 space-y-3">
              {[
                { label: "Status", value: <Badge tone={getStatusTone(ticket.status)}>{formatStatus(ticket.status)}</Badge> },
                { label: "Priority", value: <Badge tone={getPriorityTone(ticket.priority)}>{formatStatus(ticket.priority)}</Badge> },
                { label: "Category", value: formatStatus(ticket.category) },
                { label: "Created", value: ticket.created_at ? format(new Date(ticket.created_at), "dd MMM yyyy") : null },
                { label: "Last Updated", value: ticket.updated_at ? formatDistanceToNow(new Date(ticket.updated_at), { addSuffix: true }) : null },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5 border-b border-border pb-3 last:border-0 last:pb-0">
                  <span className="text-caption uppercase tracking-wider text-text-muted">{label}</span>
                  <span className="text-small font-semibold text-text-primary">{value ?? "—"}</span>
                </div>
              ))}
            </div>
          </Card>

          {ticket.resolution_notes ? (
            <Card>
              <h2 className="text-h4 text-text-primary">Resolution Notes</h2>
              <p className="mt-3 text-small text-text-secondary">{ticket.resolution_notes}</p>
            </Card>
          ) : null}

          <Card>
            <h2 className="text-h4 text-text-primary">Quick Actions</h2>
            <div className="mt-4 space-y-2">
              <button className="flex w-full items-center gap-3 rounded-xl border border-border p-3 transition hover:border-coral hover:bg-coral-light" onClick={() => { setNewStatus(ticket.status ?? "open"); setStatusDrawerOpen(true); }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-alt text-text-secondary"><i className="hgi-stroke hgi-refresh-01" /></span>
                <p className="text-small font-semibold text-text-primary">Change Status</p>
              </button>
              <button className="flex w-full items-center gap-3 rounded-xl border border-border p-3 transition hover:border-coral hover:bg-coral-light">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-alt text-text-secondary"><i className="hgi-stroke hgi-user-check-01" /></span>
                <p className="text-small font-semibold text-text-primary">Assign Agent</p>
              </button>
            </div>
          </Card>
        </div>
      </div>

      <Drawer open={statusDrawerOpen} title="Update Ticket Status" onClose={() => setStatusDrawerOpen(false)}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); updateStatusMutation.mutate(newStatus); }}>
          <Select
            label="Status"
            value={newStatus}
            options={[
              { label: "Open", value: "open" },
              { label: "In Progress", value: "in_progress" },
              { label: "Waiting for Customer", value: "waiting_customer" },
              { label: "Resolved", value: "resolved" },
              { label: "Closed", value: "closed" },
            ]}
            onChange={(e) => setNewStatus(e.target.value)}
          />
          <Button className="w-full" type="submit" isLoading={updateStatusMutation.isPending}>Save</Button>
        </form>
      </Drawer>
    </div>
  );
}
