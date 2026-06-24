"use client";

import { useQuery } from "@tanstack/react-query";
import { subMonths, startOfMonth } from "date-fns";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { Card, PageHeader, Stat } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type Lead = { id: string; status: string | null; created_at: string | null };
type Invoice = { id: string; total: number | null; status: string | null; created_at: string | null };
type Ticket = { id: string; created_at: string | null; status: string | null };
type Project = { id: string; status: string | null; created_at: string | null };

export function AnalyticsClient() {
  const { data, isLoading } = useQuery({
    queryKey: ["crm-analytics"],
    queryFn: async () => {
      const supabase = createClient();
      const sixMonthsAgo = subMonths(new Date(), 6);

      const [{ data: leads }, { data: invoices }, { data: tickets }, { data: projects }] = await Promise.all([
        supabase.from("leads").select("*").gte("created_at", sixMonthsAgo.toISOString()),
        supabase.from("invoices").select("*").gte("created_at", sixMonthsAgo.toISOString()),
        supabase.from("tickets").select("*").gte("created_at", sixMonthsAgo.toISOString()),
        supabase.from("projects").select("*").gte("created_at", sixMonthsAgo.toISOString()),
      ]);

      const leadsByMonth: Record<string, number> = {};
      const revenuByMonth: Record<string, number> = {};
      const ticketsByMonth: Record<string, number> = {};

      for (let i = 5; i >= 0; i--) {
        const date = subMonths(new Date(), i);
        const month = date.toLocaleDateString("en-US", { month: "short" });
        leadsByMonth[month] = 0;
        revenuByMonth[month] = 0;
        ticketsByMonth[month] = 0;
      }

      (leads ?? []).forEach((lead: Lead) => {
        if (lead.created_at) {
          const month = new Date(lead.created_at).toLocaleDateString("en-US", { month: "short" });
          if (month in leadsByMonth) leadsByMonth[month]++;
        }
      });

      (invoices ?? []).forEach((inv: Invoice) => {
        if (inv.created_at && inv.status === "paid") {
          const month = new Date(inv.created_at).toLocaleDateString("en-US", { month: "short" });
          if (month in revenuByMonth) revenuByMonth[month] += inv.total ?? 0;
        }
      });

      (tickets ?? []).forEach((ticket: Ticket) => {
        if (ticket.created_at) {
          const month = new Date(ticket.created_at).toLocaleDateString("en-US", { month: "short" });
          if (month in ticketsByMonth) ticketsByMonth[month]++;
        }
      });

      const leadStatus = { new: 0, qualified: 0, contacted: 0, converted: 0, lost: 0 };
      (leads ?? []).forEach((l: Lead) => {
        if (l.status === "new") leadStatus.new++;
        else if (l.status === "qualified") leadStatus.qualified++;
        else if (l.status === "contacted") leadStatus.contacted++;
        else if (l.status === "converted") leadStatus.converted++;
        else if (l.status === "lost") leadStatus.lost++;
      });

      const projectStatus = { planning: 0, in_progress: 0, review: 0, completed: 0 };
      (projects ?? []).forEach((p: Project) => {
        if (p.status === "planning") projectStatus.planning++;
        else if (p.status === "in_progress") projectStatus.in_progress++;
        else if (p.status === "review") projectStatus.review++;
        else if (p.status === "completed") projectStatus.completed++;
      });

      return {
        leadsByMonth: Object.entries(leadsByMonth).map(([month, count]) => ({ month, count })),
        revenuByMonth: Object.entries(revenuByMonth).map(([month, revenue]) => ({ month, revenue })),
        ticketsByMonth: Object.entries(ticketsByMonth).map(([month, count]) => ({ month, count })),
        leadStatus,
        projectStatus,
        totalLeads: leads?.length ?? 0,
        totalInvoices: invoices?.length ?? 0,
        totalTickets: tickets?.length ?? 0,
        totalProjects: projects?.length ?? 0,
      };
    },
  });

  if (isLoading || !data) {
    return (
      <div className="space-y-5">
        <PageHeader title="Analytics" subtitle="Dashboard metrics and performance trends." />
        <div className="space-y-4">{[1,2,3,4].map(i => <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-100" />)}</div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Analytics" subtitle="Dashboard metrics and performance trends." />

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Total Leads" value={String(data.totalLeads)} />
        <Stat label="Total Invoices" value={String(data.totalInvoices)} />
        <Stat label="Support Tickets" value={String(data.totalTickets)} />
        <Stat label="Active Projects" value={String(data.totalProjects)} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Lead Pipeline */}
        <Card>
          <h2 className="text-h4 text-text-primary">Lead Pipeline</h2>
          <div className="mt-5 space-y-2">
            {Object.entries(data.leadStatus).map(([status, count]) => {
              const statuses = { new: "#FF5A5F", qualified: "#FF9800", contacted: "#2196F3", converted: "#4CAF50", lost: "#757575" };
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: statuses[status as keyof typeof statuses] }} />
                    <span className="text-small font-semibold text-text-secondary capitalize">{status}</span>
                  </div>
                  <span className="text-h5 font-bold text-text-primary">{count}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Project Status */}
        <Card>
          <h2 className="text-h4 text-text-primary">Project Status</h2>
          <div className="mt-5 space-y-2">
            {Object.entries(data.projectStatus).map(([status, count]) => {
              const statuses = { planning: "#FFC107", in_progress: "#2196F3", review: "#FF9800", completed: "#4CAF50" };
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: statuses[status as keyof typeof statuses] }} />
                    <span className="text-small font-semibold text-text-secondary capitalize">{status.replace("_", " ")}</span>
                  </div>
                  <span className="text-h5 font-bold text-text-primary">{count}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Leads Trend */}
        <Card>
          <h2 className="text-h4 text-text-primary">Leads Trend (6M)</h2>
          <div className="mt-4 -mx-6 -mb-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.leadsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="count" stroke="#FF5A5F" strokeWidth={2} dot={{ fill: "#FF5A5F", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <h2 className="text-h4 text-text-primary">Revenue Trend (6M)</h2>
          <div className="mt-4 -mx-6 -mb-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.revenuByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px" }} />
                <Bar dataKey="revenue" fill="#FF5A5F" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Support Tickets Trend */}
        <Card>
          <h2 className="text-h4 text-text-primary">Support Tickets (6M)</h2>
          <div className="mt-4 -mx-6 -mb-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.ticketsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px" }} />
                <Bar dataKey="count" fill="#2196F3" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
