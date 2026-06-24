"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { useState } from "react";

import { Badge, Button, Card, Drawer, EmptyState, Input, Select, Textarea, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

type Activity = {
  id: string;
  type: string | null;
  content: string | null;
  metadata: Record<string, unknown> | null;
  created_by: string | null;
  created_at: string | null;
};

const statusOptions = [
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Qualified", value: "qualified" },
  { label: "Proposal Sent", value: "proposal_sent" },
  { label: "Negotiation", value: "negotiation" },
  { label: "Payment Pending", value: "payment_pending" },
  { label: "Won", value: "won" },
  { label: "Lost", value: "lost" },
];

function getStatusTone(status: string | null): "success" | "error" | "warning" | "info" | "neutral" {
  if (status === "won") return "success";
  if (status === "lost") return "error";
  if (status === "payment_pending" || status === "negotiation") return "warning";
  if (status === "qualified" || status === "proposal_sent") return "info";
  return "neutral";
}

function formatStatus(status: string | null) {
  return (status ?? "new")
    .split("_")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

function activityIcon(type: string | null) {
  switch (type) {
    case "status_change": return "hgi-refresh-01";
    case "note": return "hgi-note-01";
    case "email": return "hgi-mail-01";
    case "call": return "hgi-phone-01";
    case "file_upload": return "hgi-file-upload-01";
    default: return "hgi-time-01";
  }
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-caption uppercase tracking-wider text-text-muted">{label}</span>
      <span className="text-small font-semibold text-text-primary">{value || "—"}</span>
    </div>
  );
}

export function LeadDetailClient({ leadId }: { leadId: string }) {
  const [tab, setTab] = useState<"overview" | "activity" | "notes" | "files">("overview");
  const [noteDrawerOpen, setNoteDrawerOpen] = useState(false);
  const [statusDrawerOpen, setStatusDrawerOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: lead, isLoading, isError } = useQuery({
    queryKey: ["lead", leadId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("leads").select("*").eq("id", leadId).single();
      if (error) throw error;
      return data as Lead;
    },
  });

  const { data: activities = [] } = useQuery({
    queryKey: ["lead-activities", leadId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("lead_activities")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Activity[];
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      const supabase = createClient();
      const { error } = await supabase.from("lead_activities").insert({
        lead_id: leadId,
        type: "note",
        content,
      });
      if (error) throw error;
    },
    onSuccess: async () => {
      setNoteText("");
      setNoteDrawerOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["lead-activities", leadId] });
      showToast({ title: "Note added", tone: "success" });
    },
    onError: () => showToast({ title: "Could not add note", tone: "error" }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const supabase = createClient();
      const { error: updateError } = await supabase.from("leads").update({ status, updated_at: new Date().toISOString() }).eq("id", leadId);
      if (updateError) throw updateError;
      await supabase.from("lead_activities").insert({
        lead_id: leadId,
        type: "status_change",
        content: `Status changed to ${formatStatus(status)}`,
      });
    },
    onSuccess: async () => {
      setStatusDrawerOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["lead", leadId] });
      await queryClient.invalidateQueries({ queryKey: ["lead-activities", leadId] });
      showToast({ title: "Status updated", tone: "success" });
    },
    onError: () => showToast({ title: "Could not update status", tone: "error" }),
  });

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="h-8 w-48 animate-pulse rounded-xl bg-slate-100" />
        <div className="grid gap-5 lg:grid-cols-[1fr_400px]">
          <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
        </div>
      </div>
    );
  }

  if (isError || !lead) {
    return (
      <EmptyState
        title="Lead not found"
        description="This lead may have been deleted or you may not have access."
        icon={<i className="hgi-stroke hgi-user-search-01 text-xl" />}
        action={<Button onClick={() => window.history.back()}>Go Back</Button>}
      />
    );
  }

  const tabs = [
    { key: "overview" as const, label: "Overview" },
    { key: "activity" as const, label: "Activity" },
    { key: "notes" as const, label: "Notes" },
    { key: "files" as const, label: "Files" },
  ];

  return (
    <div className="space-y-5">
      {/* Back + breadcrumb */}
      <div className="flex items-center gap-3">
        <a href="/crm/leads" className="flex items-center gap-1.5 text-small font-semibold text-text-secondary hover:text-coral">
          <i className="hgi-stroke hgi-arrow-left-01" />
          All Leads
        </a>
        <i className="hgi-stroke hgi-arrow-right-01 text-text-muted" />
        <span className="text-small font-semibold text-text-primary">{lead.full_name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-coral-light text-xl font-bold text-coral">
            {lead.full_name?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div>
            <h1 className="text-h2 text-text-primary">{lead.full_name}</h1>
            <p className="mt-1 text-small text-text-secondary">{lead.restaurant_name ?? lead.company ?? "—"} {lead.country ? `· ${lead.country}` : ""}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge tone={getStatusTone(lead.status)}>{formatStatus(lead.status)}</Badge>
              {lead.source ? <Badge tone="neutral">{formatStatus(lead.source)}</Badge> : null}
              {lead.interested_products?.map((p) => <Badge key={p} tone="info">{p}</Badge>)}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => { setNewStatus(lead.status ?? "new"); setStatusDrawerOpen(true); }}>
            <i className="hgi-stroke hgi-refresh-01" />
            Change Status
          </Button>
          <Button variant="secondary" onClick={() => setNoteDrawerOpen(true)}>
            <i className="hgi-stroke hgi-note-01" />
            Add Note
          </Button>
          <Button>
            <i className="hgi-stroke hgi-user-check-01" />
            Convert to Customer
          </Button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        {/* Left panel — Tabs */}
        <div className="space-y-4">
          <div className="flex gap-1 rounded-2xl bg-surface-alt p-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={tab === t.key ? "flex-1 rounded-xl bg-white px-4 py-2 text-small font-semibold text-text-primary shadow-card" : "flex-1 rounded-xl px-4 py-2 text-small font-semibold text-text-secondary hover:text-text-primary"}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <Card>
              <h2 className="text-h4 text-text-primary">Lead Overview</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InfoRow label="Full Name" value={lead.full_name} />
                <InfoRow label="Email" value={lead.email ? <a href={`mailto:${lead.email}`} className="text-coral hover:underline">{lead.email}</a> : null} />
                <InfoRow label="Phone" value={lead.phone ? <a href={`tel:${lead.phone}`} className="text-coral hover:underline">{lead.phone}</a> : null} />
                <InfoRow label="Country" value={lead.country} />
                <InfoRow label="Company" value={lead.company} />
                <InfoRow label="Restaurant" value={lead.restaurant_name} />
                <InfoRow label="Website" value={lead.website ? <a href={lead.website} target="_blank" rel="noreferrer" className="text-coral hover:underline">{lead.website}</a> : null} />
                <InfoRow label="Budget" value={lead.budget ? `${lead.budget_currency ?? "USD"} ${lead.budget.toLocaleString()}` : null} />
                <InfoRow label="Expected Launch" value={lead.expected_launch ? format(new Date(lead.expected_launch), "dd MMM yyyy") : null} />
                <InfoRow label="Created" value={lead.created_at ? format(new Date(lead.created_at), "dd MMM yyyy") : null} />
              </div>
              {lead.notes ? (
                <div className="mt-5 rounded-xl border border-border bg-surface-alt p-4">
                  <span className="text-caption uppercase tracking-wider text-text-muted">Internal Notes</span>
                  <p className="mt-2 text-small text-text-secondary">{lead.notes}</p>
                </div>
              ) : null}
            </Card>
          )}

          {tab === "activity" && (
            <Card>
              <h2 className="text-h4 text-text-primary">Activity Timeline</h2>
              {activities.length === 0 ? (
                <EmptyState
                  title="No activity yet"
                  description="Status changes, notes, emails, and calls will appear here."
                  icon={<i className="hgi-stroke hgi-time-01 text-xl" />}
                />
              ) : (
                <ol className="mt-5 space-y-0">
                  {activities.map((activity, index) => (
                    <li key={activity.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral-light text-coral">
                          <i className={`hgi-stroke ${activityIcon(activity.type)} text-sm`} />
                        </div>
                        {index < activities.length - 1 ? <div className="mt-1 w-px flex-1 bg-border-strong" /> : null}
                      </div>
                      <div className="pb-5">
                        <p className="text-small font-semibold text-text-primary">{activity.content}</p>
                        <p className="mt-0.5 text-caption text-text-muted">
                          {activity.created_at ? formatDistanceToNow(new Date(activity.created_at), { addSuffix: true }) : ""}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </Card>
          )}

          {tab === "notes" && (
            <Card>
              <div className="flex items-center justify-between">
                <h2 className="text-h4 text-text-primary">Notes</h2>
                <Button variant="secondary" onClick={() => setNoteDrawerOpen(true)}>
                  <i className="hgi-stroke hgi-add-01" />
                  Add Note
                </Button>
              </div>
              {activities.filter((a) => a.type === "note").length === 0 ? (
                <EmptyState
                  title="No notes yet"
                  description="Add internal notes for your team about this lead."
                  icon={<i className="hgi-stroke hgi-note-01 text-xl" />}
                  action={<Button onClick={() => setNoteDrawerOpen(true)}>Add First Note</Button>}
                />
              ) : (
                <ul className="mt-5 space-y-3">
                  {activities.filter((a) => a.type === "note").map((note) => (
                    <li key={note.id} className="rounded-xl border border-border bg-surface-alt p-4">
                      <p className="text-small text-text-secondary">{note.content}</p>
                      <p className="mt-2 text-caption text-text-muted">
                        {note.created_at ? formatDistanceToNow(new Date(note.created_at), { addSuffix: true }) : ""}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )}

          {tab === "files" && (
            <Card>
              <div className="flex items-center justify-between">
                <h2 className="text-h4 text-text-primary">Files</h2>
                <Button variant="secondary">
                  <i className="hgi-stroke hgi-upload-01" />
                  Upload File
                </Button>
              </div>
              <EmptyState
                title="No files yet"
                description="Upload proposals, contracts, or any documents related to this lead."
                icon={<i className="hgi-stroke hgi-folder-01 text-xl" />}
              />
            </Card>
          )}
        </div>

        {/* Right panel — Info + Quick Actions */}
        <div className="space-y-4">
          <Card>
            <h2 className="text-h4 text-text-primary">Quick Actions</h2>
            <div className="mt-4 space-y-2">
              <button
                className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left transition hover:border-coral hover:bg-coral-light"
                onClick={() => { setNewStatus(lead.status ?? "new"); setStatusDrawerOpen(true); }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-alt text-text-secondary">
                  <i className="hgi-stroke hgi-refresh-01" />
                </span>
                <div>
                  <p className="text-small font-semibold text-text-primary">Change Status</p>
                  <p className="text-caption text-text-muted">Currently: {formatStatus(lead.status)}</p>
                </div>
              </button>
              <button
                className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left transition hover:border-coral hover:bg-coral-light"
                onClick={() => setNoteDrawerOpen(true)}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-alt text-text-secondary">
                  <i className="hgi-stroke hgi-note-01" />
                </span>
                <div>
                  <p className="text-small font-semibold text-text-primary">Add Note</p>
                  <p className="text-caption text-text-muted">Internal team note</p>
                </div>
              </button>
              <button className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left transition hover:border-coral hover:bg-coral-light">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-alt text-text-secondary">
                  <i className="hgi-stroke hgi-task-01" />
                </span>
                <div>
                  <p className="text-small font-semibold text-text-primary">Create Task</p>
                  <p className="text-caption text-text-muted">Link a task to this lead</p>
                </div>
              </button>
              {lead.email ? (
                <a
                  href={`mailto:${lead.email}`}
                  className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left transition hover:border-coral hover:bg-coral-light"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-alt text-text-secondary">
                    <i className="hgi-stroke hgi-mail-01" />
                  </span>
                  <div>
                    <p className="text-small font-semibold text-text-primary">Send Email</p>
                    <p className="text-caption text-text-muted">{lead.email}</p>
                  </div>
                </a>
              ) : null}
              <button className="flex w-full items-center gap-3 rounded-xl border-2 border-coral bg-coral-light p-3 text-left transition hover:bg-coral-soft">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-coral text-white">
                  <i className="hgi-stroke hgi-user-check-01" />
                </span>
                <div>
                  <p className="text-small font-semibold text-coral">Convert to Customer</p>
                  <p className="text-caption text-coral/70">Create a customer record</p>
                </div>
              </button>
            </div>
          </Card>

          <Card>
            <h2 className="text-h4 text-text-primary">Lead Info</h2>
            <div className="mt-4 space-y-3">
              <InfoRow label="Status" value={<Badge tone={getStatusTone(lead.status)}>{formatStatus(lead.status)}</Badge>} />
              <InfoRow label="Source" value={formatStatus(lead.source)} />
              <InfoRow label="Products" value={lead.interested_products?.join(", ")} />
              <InfoRow label="Budget" value={lead.budget ? `${lead.budget_currency ?? "USD"} ${lead.budget.toLocaleString()}` : null} />
              <InfoRow label="Expected Launch" value={lead.expected_launch ? format(new Date(lead.expected_launch), "dd MMM yyyy") : null} />
              <InfoRow label="Last Updated" value={lead.updated_at ? formatDistanceToNow(new Date(lead.updated_at), { addSuffix: true }) : null} />
            </div>
          </Card>
        </div>
      </div>

      {/* Add Note Drawer */}
      <Drawer open={noteDrawerOpen} title="Add Note" onClose={() => setNoteDrawerOpen(false)}>
        <form
          className="space-y-4"
          onSubmit={(e) => { e.preventDefault(); addNoteMutation.mutate(noteText); }}
        >
          <Textarea
            label="Note"
            placeholder="Add an internal note about this lead..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            required
          />
          <Button className="w-full" type="submit" isLoading={addNoteMutation.isPending}>
            Save Note
          </Button>
        </form>
      </Drawer>

      {/* Change Status Drawer */}
      <Drawer open={statusDrawerOpen} title="Change Status" onClose={() => setStatusDrawerOpen(false)}>
        <form
          className="space-y-4"
          onSubmit={(e) => { e.preventDefault(); updateStatusMutation.mutate(newStatus); }}
        >
          <Select
            label="New Status"
            value={newStatus}
            options={statusOptions}
            onChange={(e) => setNewStatus(e.target.value)}
          />
          <Button className="w-full" type="submit" isLoading={updateStatusMutation.isPending}>
            Update Status
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
