"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

import { Badge, Button, Card, Stat } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type Project = { id: string; name: string; status: string | null; progress: number | null };
type Invoice = { id: string; invoice_number: string | null; total: number | null; currency: string | null; status: string | null; due_date: string | null };
type Ticket = { id: string; title: string; status: string | null; created_at: string | null };
type Announcement = { id: string; title: string; content: string | null; published_at: string | null };

function getPaymentTone(status: string | null): "success" | "error" | "warning" | "neutral" {
  if (status === "paid") return "success";
  if (status === "overdue") return "error";
  if (status === "sent") return "warning";
  return "neutral";
}

function getProjectTone(status: string | null): "success" | "info" | "warning" | "neutral" {
  if (status === "completed" || status === "delivered") return "success";
  if (status === "in_progress") return "info";
  if (status === "review" || status === "client_approval") return "warning";
  return "neutral";
}

function formatStatus(s: string | null) {
  return (s ?? "—").split("_").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}

async function fetchPortalData(customerId: string) {
  const supabase = createClient();
  const [{ data: projects }, { data: invoices }, { data: tickets }, { data: announcements }] = await Promise.all([
    supabase.from("projects").select("id, name, status, progress").eq("customer_id", customerId).not("status", "in", '("completed")').limit(3),
    supabase.from("invoices").select("id, invoice_number, total, currency, status, due_date").eq("customer_id", customerId).in("status", ["sent", "overdue"]).limit(3),
    supabase.from("tickets").select("id, title, status, created_at").eq("customer_id", customerId).in("status", ["open", "in_progress"]).limit(3),
    supabase.from("announcements").select("id, title, content, published_at").eq("status", "published").order("published_at", { ascending: false }).limit(3),
  ]);
  return {
    projects: (projects ?? []) as unknown as Project[],
    unpaidInvoices: (invoices ?? []) as unknown as Invoice[],
    openTickets: (tickets ?? []) as unknown as Ticket[],
    announcements: (announcements ?? []) as unknown as Announcement[],
  };
}

export function PortalDashboardClient({ customerId, restaurantName }: { customerId: string; restaurantName: string }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const { data, isLoading } = useQuery({
    queryKey: ["portal-dashboard", customerId],
    queryFn: () => fetchPortalData(customerId),
  });

  return (
    <div className="space-y-5">
      {/* Welcome banner */}
      <div className="rounded-2xl bg-coral px-6 py-5 shadow-floating">
        <p className="text-small font-semibold text-white/80">{greeting},</p>
        <h1 className="mt-0.5 text-h2 text-white">{restaurantName} 👋</h1>
        <p className="mt-1 text-small text-white/70">Here&apos;s what&apos;s happening with your app today.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="/portal/support" className="rounded-full bg-white/20 px-4 py-2 text-small font-semibold text-white transition hover:bg-white/30">
            <i className="hgi-stroke hgi-add-01 mr-1" />Create Ticket
          </a>
          <a href="/portal/projects" className="rounded-full bg-white/20 px-4 py-2 text-small font-semibold text-white transition hover:bg-white/30">
            <i className="hgi-stroke hgi-briefcase-01 mr-1" />View Projects
          </a>
          <a href="/portal/invoices" className="rounded-full bg-white/20 px-4 py-2 text-small font-semibold text-white transition hover:bg-white/30">
            <i className="hgi-stroke hgi-invoice-01 mr-1" />Download Invoice
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Active Projects" value={isLoading ? "..." : String(data?.projects.length ?? 0)} />
        <Stat label="Unpaid Invoices" value={isLoading ? "..." : String(data?.unpaidInvoices.length ?? 0)} />
        <Stat label="Open Tickets" value={isLoading ? "..." : String(data?.openTickets.length ?? 0)} />
        <Stat label="Announcements" value={isLoading ? "..." : String(data?.announcements.length ?? 0)} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Active Projects */}
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-text-primary">Active Projects</h2>
            <a href="/portal/projects" className="text-small font-semibold text-coral hover:underline">View all</a>
          </div>
          {isLoading ? (
            <div className="mt-4 space-y-3">{[1,2].map(i => <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />)}</div>
          ) : (data?.projects ?? []).length === 0 ? (
            <p className="mt-4 text-small text-text-muted">No active projects right now.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {data?.projects.map((p) => (
                <li key={p.id}>
                  <a href={`/portal/projects/${p.id}`} className="flex items-center justify-between rounded-xl border border-border p-3 transition hover:border-coral hover:bg-coral-light">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-alt text-text-secondary">
                        <i className="hgi-stroke hgi-briefcase-01" />
                      </div>
                      <div>
                        <p className="text-small font-semibold text-text-primary">{p.name}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="h-1.5 w-20 rounded-full bg-surface-elevated">
                            <div className="h-1.5 rounded-full bg-coral" style={{ width: `${p.progress ?? 0}%` }} />
                          </div>
                          <span className="text-caption text-text-muted">{p.progress ?? 0}%</span>
                        </div>
                      </div>
                    </div>
                    <Badge tone={getProjectTone(p.status)}>{formatStatus(p.status)}</Badge>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Unpaid Invoices alert */}
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-text-primary">Outstanding Invoices</h2>
            <a href="/portal/invoices" className="text-small font-semibold text-coral hover:underline">View all</a>
          </div>
          {isLoading ? (
            <div className="mt-4 space-y-3">{[1,2].map(i => <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />)}</div>
          ) : (data?.unpaidInvoices ?? []).length === 0 ? (
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-status-successSoft p-4">
              <i className="hgi-stroke hgi-checkmark-circle-01 text-xl text-status-success" />
              <p className="text-small font-semibold text-status-success">All payments up to date!</p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {data?.unpaidInvoices.map((inv) => (
                <li key={inv.id} className="flex items-center justify-between rounded-xl border border-status-warningSoft bg-status-warningSoft/40 p-3">
                  <div>
                    <p className="text-small font-semibold text-text-primary">{inv.invoice_number ?? `INV-${inv.id.slice(0,6)}`}</p>
                    <p className="text-caption text-text-muted">Due {inv.due_date ?? "—"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-small font-bold text-text-primary">{inv.currency ?? "USD"} {(inv.total ?? 0).toLocaleString()}</span>
                    <Badge tone={getPaymentTone(inv.status)}>{formatStatus(inv.status)}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Open Tickets */}
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-text-primary">Open Tickets</h2>
            <a href="/portal/support" className="text-small font-semibold text-coral hover:underline">View all</a>
          </div>
          {isLoading ? (
            <div className="mt-4 space-y-2">{[1,2].map(i => <div key={i} className="h-12 animate-pulse rounded-xl bg-slate-100" />)}</div>
          ) : (data?.openTickets ?? []).length === 0 ? (
            <p className="mt-4 text-small text-text-muted">No open tickets. Need help? <a href="/portal/support" className="font-semibold text-coral hover:underline">Create a ticket →</a></p>
          ) : (
            <ul className="mt-4 space-y-2">
              {data?.openTickets.map((t) => (
                <li key={t.id}>
                  <a href={`/portal/support/${t.id}`} className="flex items-center justify-between rounded-xl border border-border p-3 transition hover:border-coral hover:bg-coral-light">
                    <p className="text-small font-semibold text-text-primary">{t.title}</p>
                    <span className="text-caption text-text-muted">{t.created_at ? formatDistanceToNow(new Date(t.created_at), { addSuffix: true }) : ""}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Announcements */}
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-text-primary">Announcements</h2>
            <a href="/portal/announcements" className="text-small font-semibold text-coral hover:underline">View all</a>
          </div>
          {isLoading ? (
            <div className="mt-4 space-y-2">{[1,2].map(i => <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />)}</div>
          ) : (data?.announcements ?? []).length === 0 ? (
            <p className="mt-4 text-small text-text-muted">No announcements yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {data?.announcements.map((a) => (
                <li key={a.id} className="rounded-xl border border-border bg-surface-alt p-4">
                  <p className="text-small font-semibold text-text-primary">{a.title}</p>
                  {a.content ? <p className="mt-1 line-clamp-2 text-caption text-text-secondary">{a.content}</p> : null}
                  <p className="mt-2 text-caption text-text-muted">{a.published_at ? formatDistanceToNow(new Date(a.published_at), { addSuffix: true }) : ""}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
