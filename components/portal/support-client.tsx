"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";

import { Badge, Button, Card, Drawer, EmptyState, Input, PageHeader, Select, Textarea, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type Ticket = { id: string; title: string; category: string | null; priority: string | null; status: string | null; created_at: string | null };
type TicketMessage = { id: string; content: string | null; sender_id: string | null; is_internal_note: boolean | null; created_at: string | null };

function formatStatus(s: string | null) {
  return (s ?? "—").split("_").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}

function getStatusTone(s: string | null): "success" | "info" | "warning" | "neutral" {
  if (s === "resolved" || s === "closed") return "success";
  if (s === "open") return "info";
  if (s === "in_progress") return "warning";
  return "neutral";
}

export function PortalSupportClient({ customerId }: { customerId: string }) {
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["portal-tickets", customerId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("tickets").select("*").eq("customer_id", customerId).order("created_at", { ascending: false });
      return (data ?? []) as unknown as Ticket[];
    },
  });

  const createTicketMutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { data: ticket, error } = await supabase.from("tickets").insert({ customer_id: customerId, title, category, status: "open", priority: "medium" }).select().single();
      if (error) throw error;
      if (message.trim()) {
        const { data: { user } } = await supabase.auth.getUser();
        await supabase.from("ticket_messages").insert({ ticket_id: ticket.id, sender_id: user?.id ?? null, content: message });
      }
    },
    onSuccess: async () => {
      setNewTicketOpen(false); setTitle(""); setCategory("general"); setMessage("");
      await queryClient.invalidateQueries({ queryKey: ["portal-tickets", customerId] });
      showToast({ title: "Ticket submitted", description: "Our team will get back to you soon.", tone: "success" });
    },
    onError: () => showToast({ title: "Could not create ticket", tone: "error" }),
  });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Support"
        subtitle="Get help from the Loglime team."
        actions={
          <Button onClick={() => setNewTicketOpen(true)}>
            <i className="hgi-stroke hgi-add-01" />New Ticket
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-100" />)}</div>
      ) : tickets.length === 0 ? (
        <EmptyState
          title="No tickets yet"
          description="Have an issue or question? Create a support ticket and our team will help you."
          icon={<i className="hgi-stroke hgi-customer-support text-xl" />}
          action={<Button onClick={() => setNewTicketOpen(true)}>Create Your First Ticket</Button>}
        />
      ) : (
        <Card>
          <ul className="space-y-3">
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <a href={`/portal/support/${ticket.id}`} className="flex items-center justify-between rounded-xl border border-border p-4 transition hover:border-coral hover:bg-coral-light">
                  <div>
                    <p className="text-small font-semibold text-text-primary">{ticket.title}</p>
                    <p className="mt-1 text-caption text-text-muted">
                      {formatStatus(ticket.category)} · {ticket.created_at ? formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true }) : ""}
                    </p>
                  </div>
                  <Badge tone={getStatusTone(ticket.status)}>{formatStatus(ticket.status)}</Badge>
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Drawer open={newTicketOpen} title="Create Support Ticket" onClose={() => setNewTicketOpen(false)}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); createTicketMutation.mutate(); }}>
          <Input label="Subject" placeholder="What do you need help with?" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Select
            label="Category"
            value={category}
            options={[
              { label: "General", value: "general" },
              { label: "Technical Issue", value: "technical" },
              { label: "Billing", value: "billing" },
              { label: "Feature Request", value: "feature_request" },
              { label: "Bug Report", value: "bug_report" },
            ]}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Textarea label="Message" placeholder="Describe your issue in detail..." value={message} onChange={(e) => setMessage(e.target.value)} required />
          <Button className="w-full" type="submit" isLoading={createTicketMutation.isPending}>Submit Ticket</Button>
        </form>
      </Drawer>
    </div>
  );
}

export function PortalTicketDetailClient({ ticketId }: { ticketId: string }) {
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: ticket } = useQuery({
    queryKey: ["portal-ticket", ticketId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("tickets").select("*").eq("id", ticketId).single();
      return data as Ticket;
    },
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["portal-ticket-messages", ticketId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("ticket_messages").select("*").eq("ticket_id", ticketId).eq("is_internal_note", false).order("created_at", { ascending: true });
      return (data ?? []) as unknown as TicketMessage[];
    },
  });

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel(`portal-ticket-${ticketId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "ticket_messages", filter: `ticket_id=eq.${ticketId}` }, () => {
        void queryClient.invalidateQueries({ queryKey: ["portal-ticket-messages", ticketId] });
      }).subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [ticketId, queryClient]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const replyMutation = useMutation({
    mutationFn: async (content: string) => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("ticket_messages").insert({ ticket_id: ticketId, sender_id: user?.id ?? null, content });
      if (error) throw error;
    },
    onSuccess: async () => {
      setReplyText("");
      await queryClient.invalidateQueries({ queryKey: ["portal-ticket-messages", ticketId] });
    },
    onError: () => showToast({ title: "Could not send reply", tone: "error" }),
  });

  if (!ticket) return <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <a href="/portal/support" className="flex items-center gap-1.5 text-small font-semibold text-text-secondary hover:text-coral">
          <i className="hgi-stroke hgi-arrow-left-01" />Back
        </a>
        <i className="hgi-stroke hgi-arrow-right-01 text-text-muted" />
        <span className="text-small font-semibold text-text-primary">{ticket.title}</span>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <h1 className="text-h3 text-text-primary">{ticket.title}</h1>
          <Badge tone={getStatusTone(ticket.status)}>{formatStatus(ticket.status)}</Badge>
        </div>
        <p className="mt-1 text-small text-text-muted">{formatStatus(ticket.category)}</p>
      </Card>

      <Card>
        <div className="flex max-h-[400px] flex-col gap-4 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-small text-text-muted">No messages yet. Our team will reply soon.</p>
          ) : messages.map((msg) => {
            const isCustomer = true;
            return (
              <div key={msg.id} className={`flex ${isCustomer ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isCustomer ? "bg-coral text-white" : "border border-border bg-surface-alt"}`}>
                  <p className={`text-small ${isCustomer ? "text-white" : "text-text-secondary"}`}>{msg.content}</p>
                  <p className={`mt-1 text-caption ${isCustomer ? "text-white/70" : "text-text-muted"}`}>
                    {msg.created_at ? formatDistanceToNow(new Date(msg.created_at), { addSuffix: true }) : ""}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {ticket.status !== "resolved" && ticket.status !== "closed" && (
          <form className="mt-4 flex gap-3 border-t border-border pt-4" onSubmit={(e) => { e.preventDefault(); if (replyText.trim()) replyMutation.mutate(replyText.trim()); }}>
            <Textarea className="flex-1 resize-none" placeholder="Type your reply..." value={replyText} onChange={(e) => setReplyText(e.target.value)} />
            <Button type="submit" isLoading={replyMutation.isPending} disabled={!replyText.trim()}>
              <i className="hgi-stroke hgi-sent-01" />Send
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
