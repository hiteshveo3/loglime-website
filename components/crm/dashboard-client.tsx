"use client";

import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { SetupAlert } from "@/components/crm/setup-alert";
import { Badge, Card, PageHeader, Stat } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

const PIPELINE_STATUSES = [
  { key: "new", label: "New", color: "bg-slate-300" },
  { key: "contacted", label: "Contacted", color: "bg-blue-300" },
  { key: "qualified", label: "Qualified", color: "bg-status-info" },
  { key: "proposal_sent", label: "Proposal", color: "bg-amber-400" },
  { key: "negotiation", label: "Negotiating", color: "bg-orange-400" },
  { key: "payment_pending", label: "Payment", color: "bg-purple-400" },
  { key: "won", label: "Won", color: "bg-status-success" },
  { key: "lost", label: "Lost", color: "bg-status-error" },
];

async function fetchDashboardData() {
  const supabase = createClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [
    { data: allLeads },
    { data: customers },
    { data: openTickets },
    { data: activeProjects },
    { data: paidInvoices },
    { data: unpaidInvoices },
    { data: recentLeads },
    { data: recentCustomers },
    { data: recentActivities },
    { data: aiConversations },
  ] = await Promise.all([
    supabase.from("leads").select("id, status, created_at"),
    supabase.from("customers").select("id, business_name, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("tickets").select("id", { count: "exact", head: false }).in("status", ["open", "in_progress"]),
    supabase.from("projects").select("id", { count: "exact", head: false }).not("status", "in", '("completed","delivered")'),
    supabase.from("invoices").select("total, currency, created_at").eq("status", "paid"),
    supabase.from("invoices").select("id", { count: "exact", head: false }).in("status", ["draft", "sent", "overdue"]),
    supabase.from("leads").select("id, full_name, restaurant_name, status, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("customers").select("id, business_name, country, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("lead_activities").select("id, type, content, created_at").order("created_at", { ascending: false }).limit(10),
    supabase.from("ai_conversations").select("id, visitor_email, mode, updated_at, messages").order("updated_at", { ascending: false }).limit(8),
  ]);

  const leads = allLeads ?? [];
  const newToday = leads.filter((l) => l.created_at && new Date(l.created_at) >= todayStart).length;

  // Revenue this month
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const revenueThisMonth = (paidInvoices ?? [])
    .filter((i) => i.created_at && new Date(i.created_at) >= monthStart)
    .reduce((sum, i) => sum + (i.total ?? 0), 0);

  // Revenue chart — last 6 months
  const revenueByMonth: Record<string, number> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    revenueByMonth[format(d, "MMM")] = 0;
  }
  (paidInvoices ?? []).forEach((inv) => {
    if (!inv.created_at) return;
    const month = format(new Date(inv.created_at), "MMM");
    if (month in revenueByMonth) revenueByMonth[month] += inv.total ?? 0;
  });
  const revenueChart = Object.entries(revenueByMonth).map(([month, revenue]) => ({ month, revenue }));

  // Pipeline counts
  const pipelineCounts = PIPELINE_STATUSES.map(({ key, label, color }) => ({
    key, label, color,
    count: leads.filter((l) => (l.status ?? "new") === key).length,
  }));

  const stats = [
    { label: "New Leads Today", value: String(newToday) },
    { label: "Active Customers", value: String((customers ?? []).length) },
    { label: "Revenue This Month", value: `$${revenueThisMonth.toLocaleString()}` },
    { label: "Open Tickets", value: String((openTickets ?? []).length) },
    { label: "Active Projects", value: String((activeProjects ?? []).length) },
    { label: "Pending Payments", value: String((unpaidInvoices ?? []).length) },
  ];

  return {
    stats,
    pipelineCounts,
    revenueChart,
    recentLeads: recentLeads ?? [],
    recentCustomers: recentCustomers ?? [],
    recentActivities: recentActivities ?? [],
    aiConversations: aiConversations ?? [],
  };
}

function activityIcon(type: string | null) {
  switch (type) {
    case "status_change": return { icon: "hgi-refresh-01", bg: "bg-blue-50", text: "text-blue-500" };
    case "note": return { icon: "hgi-note-01", bg: "bg-amber-50", text: "text-amber-500" };
    case "email": return { icon: "hgi-mail-01", bg: "bg-green-50", text: "text-green-500" };
    case "call": return { icon: "hgi-phone-01", bg: "bg-purple-50", text: "text-purple-500" };
    default: return { icon: "hgi-time-01", bg: "bg-coral-light", text: "text-coral" };
  }
}

function getStatusTone(status: string | null): "success" | "error" | "warning" | "info" | "neutral" {
  if (status === "won") return "success";
  if (status === "lost") return "error";
  if (status === "payment_pending" || status === "negotiation") return "warning";
  if (status === "qualified" || status === "proposal_sent") return "info";
  return "neutral";
}

function formatStatus(s: string | null) {
  return (s ?? "new").split("_").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}

export function DashboardClient() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["crm-dashboard"],
    queryFn: fetchDashboardData,
    retry: false,
  });

  const stats = data?.stats ?? [
    { label: "New Leads Today", value: "—" },
    { label: "Active Customers", value: "—" },
    { label: "Revenue This Month", value: "—" },
    { label: "Open Tickets", value: "—" },
    { label: "Active Projects", value: "—" },
    { label: "Pending Payments", value: "—" },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Dashboard" subtitle="What is happening in the business today." />
      {isError ? <SetupAlert message="Run supabase/schema.sql and sign in with a CRM user to load dashboard data." /> : null}

      {/* Stats row */}
      <div className="flex gap-4 overflow-x-auto pb-1 md:grid md:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <div key={stat.label} className="min-w-48 md:min-w-0">
            <Stat label={stat.label} value={isLoading ? "..." : stat.value} />
          </div>
        ))}
      </div>

      {/* Row 1 — Pipeline + Revenue */}
      <div className="grid gap-5 xl:grid-cols-2">
        {/* Lead Pipeline */}
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h3 text-text-primary">Lead Pipeline</h2>
            <a href="/crm/leads" className="text-small font-semibold text-coral hover:underline">View all</a>
          </div>
          {isLoading ? (
            <div className="mt-5 space-y-2">
              {[1, 2, 3, 4].map((i) => <div key={i} className="h-9 animate-pulse rounded-xl bg-slate-100" />)}
            </div>
          ) : (
            <div className="mt-5 space-y-2">
              {(data?.pipelineCounts ?? []).map(({ key, label, color, count }) => {
                const total = data?.pipelineCounts.reduce((s, p) => s + p.count, 0) ?? 1;
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-small text-text-secondary">{label}</span>
                    <div className="flex-1 overflow-hidden rounded-full bg-surface-elevated h-2">
                      <div className={`h-2 rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-6 shrink-0 text-right text-small font-bold text-text-primary">{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Revenue Chart */}
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h3 text-text-primary">Revenue (6 months)</h2>
            <a href="/crm/billing" className="text-small font-semibold text-coral hover:underline">View invoices</a>
          </div>
          {isLoading ? (
            <div className="mt-5 h-44 animate-pulse rounded-xl bg-slate-100" />
          ) : (
            <div className="mt-5 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.revenueChart ?? []} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => v === 0 ? "0" : `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    cursor={{ fill: "#FFF0F0" }}
                    contentStyle={{ borderRadius: 12, border: "1px solid #F1F5F9", boxShadow: "0 4px 12px rgba(15,23,42,0.08)", fontFamily: "Quicksand", fontSize: 13 }}
                    formatter={(value) => [`$${(value as number).toLocaleString()}`, "Revenue"] as any}
                  />
                  <Bar dataKey="revenue" fill="#FF5A5F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      {/* Row 2 — Recent Leads + Recent Customers */}
      <div className="grid gap-5 xl:grid-cols-2">
        {/* Recent Leads */}
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h3 text-text-primary">Recent Leads</h2>
            <a href="/crm/leads" className="text-small font-semibold text-coral hover:underline">View all</a>
          </div>
          {isLoading ? (
            <div className="mt-5 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />)}</div>
          ) : (data?.recentLeads ?? []).length === 0 ? (
            <p className="mt-5 text-small text-text-muted">No leads yet. Add your first lead.</p>
          ) : (
            <ul className="mt-5 space-y-3">
              {(data?.recentLeads ?? []).map((lead) => (
                <li key={lead.id}>
                  <a href={`/crm/leads/${lead.id}`} className="flex items-center justify-between rounded-xl p-2 transition hover:bg-surface-alt">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-light text-small font-bold text-coral">
                        {lead.full_name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <p className="text-small font-semibold text-text-primary">{lead.full_name}</p>
                        <p className="text-caption text-text-muted">{lead.restaurant_name ?? "—"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone={getStatusTone(lead.status)}>{formatStatus(lead.status)}</Badge>
                      <span className="text-caption text-text-muted">{lead.created_at ? formatDistanceToNow(new Date(lead.created_at), { addSuffix: true }) : ""}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Recent Customers */}
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h3 text-text-primary">Recent Customers</h2>
            <a href="/crm/customers" className="text-small font-semibold text-coral hover:underline">View all</a>
          </div>
          {isLoading ? (
            <div className="mt-5 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />)}</div>
          ) : (data?.recentCustomers ?? []).length === 0 ? (
            <p className="mt-5 text-small text-text-muted">No customers yet.</p>
          ) : (
            <ul className="mt-5 space-y-3">
              {(data?.recentCustomers ?? []).map((customer) => (
                <li key={customer.id}>
                  <a href={`/crm/customers/${customer.id}`} className="flex items-center justify-between rounded-xl p-2 transition hover:bg-surface-alt">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-status-infoSoft text-small font-bold text-status-info">
                        {customer.business_name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <p className="text-small font-semibold text-text-primary">{customer.business_name}</p>
                        <p className="text-caption text-text-muted">{customer.country ?? "—"}</p>
                      </div>
                    </div>
                    <span className="text-caption text-text-muted">{customer.created_at ? formatDistanceToNow(new Date(customer.created_at), { addSuffix: true }) : ""}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Row 3 — Activity Feed */}
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-h3 text-text-primary">Recent Activity</h2>
        </div>
        {isLoading ? (
          <div className="mt-5 space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="h-12 animate-pulse rounded-xl bg-slate-100" />)}</div>
        ) : (data?.recentActivities ?? []).length === 0 ? (
          <p className="mt-5 text-small text-text-muted">No activity yet. Activity from leads will appear here.</p>
        ) : (
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {(data?.recentActivities ?? []).map((activity) => {
              const { icon, bg, text } = activityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start gap-3 rounded-xl border border-border p-3">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg} ${text}`}>
                    <i className={`hgi-stroke ${icon} text-sm`} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-small font-semibold text-text-primary">{activity.content}</p>
                    <p className="text-caption text-text-muted">{activity.created_at ? formatDistanceToNow(new Date(activity.created_at), { addSuffix: true }) : ""}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* AI Conversations */}
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-h3 text-text-primary">Zest AI Conversations</h2>
          <span className="text-small font-semibold text-coral">{(data?.aiConversations ?? []).length} recent</span>
        </div>
        {isLoading ? (
          <div className="mt-5 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />)}</div>
        ) : (data?.aiConversations ?? []).length === 0 ? (
          <p className="mt-5 text-small text-text-muted">No AI conversations yet. Visitors using Zest will appear here.</p>
        ) : (
          <ul className="mt-5 space-y-3">
            {(data?.aiConversations ?? []).map((conv: any) => (
              <li key={conv.id} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-light text-small">
                      <i className="hgi-stroke hgi-message-circle-01 text-coral" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-small font-semibold text-text-primary">{conv.visitor_email || "Anonymous Visitor"}</p>
                      <p className="text-caption text-text-muted">{conv.mode} mode · {(conv.messages as any[])?.length || 0} messages</p>
                    </div>
                  </div>
                  <span className="text-caption text-text-muted whitespace-nowrap ml-2">{conv.updated_at ? formatDistanceToNow(new Date(conv.updated_at), { addSuffix: true }) : ""}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
