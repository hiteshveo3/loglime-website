"use client";

import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { useState } from "react";

import { Badge, Button, Card, EmptyState, Stat } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type Customer = Database["public"]["Tables"]["customers"]["Row"];
type Order = Database["public"]["Tables"]["orders"]["Row"];
type Project = Database["public"]["Tables"]["projects"]["Row"];
type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
type Ticket = Database["public"]["Tables"]["tickets"]["Row"];

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "orders", label: "Orders" },
  { key: "projects", label: "Projects" },
  { key: "invoices", label: "Invoices" },
  { key: "support", label: "Support" },
  { key: "notes", label: "Notes" },
  { key: "activity", label: "Activity" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0 border-b border-border last:border-0">
      <span className="text-caption uppercase tracking-wider text-text-muted">{label}</span>
      <span className="text-small font-semibold text-text-primary">{value || "—"}</span>
    </div>
  );
}

function formatStatus(status: string | null) {
  return (status ?? "—").split("_").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}

function getOrderStatusTone(status: string | null): "success" | "error" | "warning" | "info" | "neutral" {
  if (status === "delivered") return "success";
  if (status === "cancelled") return "error";
  if (status === "in_progress") return "info";
  if (status === "confirmed") return "warning";
  return "neutral";
}

function getPaymentTone(status: string | null): "success" | "error" | "warning" | "neutral" {
  if (status === "paid") return "success";
  if (status === "overdue") return "error";
  if (status === "partial") return "warning";
  return "neutral";
}

function getProjectTone(status: string | null): "success" | "info" | "warning" | "neutral" {
  if (status === "completed" || status === "delivered") return "success";
  if (status === "in_progress") return "info";
  if (status === "review" || status === "client_approval") return "warning";
  return "neutral";
}

export function CustomerDetailClient({ customerId }: { customerId: string }) {
  const [tab, setTab] = useState<TabKey>("overview");

  const { data: customer, isLoading, isError } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("customers").select("*").eq("id", customerId).single();
      if (error) throw error;
      return data as Customer;
    },
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["customer-orders", customerId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("orders").select("*").eq("customer_id", customerId).order("created_at", { ascending: false });
      return (data ?? []) as Order[];
    },
  });

  const { data: projects = [] } = useQuery({
    queryKey: ["customer-projects", customerId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("projects").select("*").eq("customer_id", customerId).order("created_at", { ascending: false });
      return (data ?? []) as Project[];
    },
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["customer-invoices", customerId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("invoices").select("*").eq("customer_id", customerId).order("created_at", { ascending: false });
      return (data ?? []) as Invoice[];
    },
  });

  const { data: tickets = [] } = useQuery({
    queryKey: ["customer-tickets", customerId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("tickets").select("*").eq("customer_id", customerId).order("created_at", { ascending: false });
      return (data ?? []) as Ticket[];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="h-8 w-56 animate-pulse rounded-xl bg-slate-100" />
        <div className="h-32 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  if (isError || !customer) {
    return (
      <EmptyState
        title="Customer not found"
        description="This customer may have been deleted or you may not have access."
        icon={<i className="hgi-stroke hgi-users-01 text-xl" />}
        action={<Button onClick={() => window.history.back()}>Go Back</Button>}
      />
    );
  }

  const totalRevenue = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + (i.total ?? 0), 0);
  const currency = invoices[0]?.currency ?? "USD";

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <a href="/crm/customers" className="flex items-center gap-1.5 text-small font-semibold text-text-secondary hover:text-coral">
          <i className="hgi-stroke hgi-arrow-left-01" />
          All Customers
        </a>
        <i className="hgi-stroke hgi-arrow-right-01 text-text-muted" />
        <span className="text-small font-semibold text-text-primary">{customer.business_name}</span>
      </div>

      {/* Profile header */}
      <Card>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-coral-light text-2xl font-bold text-coral">
              {customer.business_name?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div>
              <h1 className="text-h2 text-text-primary">{customer.business_name}</h1>
              {customer.contact_name ? <p className="mt-1 text-small text-text-secondary">{customer.contact_name}</p> : null}
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge tone={customer.status === "active" ? "success" : customer.status === "churned" ? "error" : "warning"}>
                  {formatStatus(customer.status)}
                </Badge>
                {customer.country ? <Badge tone="neutral">{customer.country}</Badge> : null}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary">
              <i className="hgi-stroke hgi-mail-01" />
              Email
            </Button>
            <Button variant="secondary">
              <i className="hgi-stroke hgi-message-01" />
              Message
            </Button>
            <Button>
              <i className="hgi-stroke hgi-add-01" />
              Create Order
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 md:grid-cols-4">
          <Stat label="Total Orders" value={String(orders.length)} />
          <Stat label="Active Projects" value={String(projects.filter((p) => p.status !== "completed").length)} />
          <Stat label="Open Tickets" value={String(tickets.filter((t) => t.status === "open" || t.status === "in_progress").length)} />
          <Stat label="Total Revenue" value={`${currency} ${totalRevenue.toLocaleString()}`} />
        </div>
      </Card>

      {/* Tab bar — scrollable on mobile */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-1 rounded-2xl bg-surface-alt p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={tab === t.key ? "rounded-xl bg-white px-4 py-2 text-small font-semibold text-text-primary shadow-card" : "rounded-xl px-4 py-2 text-small font-semibold text-text-secondary hover:text-text-primary"}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {tab === "overview" && (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h2 className="text-h4 text-text-primary">Business Info</h2>
            <div className="mt-4">
              <InfoRow label="Business Name" value={customer.business_name} />
              <InfoRow label="Contact Name" value={customer.contact_name} />
              <InfoRow label="Email" value={customer.email ? <a href={`mailto:${customer.email}`} className="text-coral hover:underline">{customer.email}</a> : null} />
              <InfoRow label="Phone" value={customer.phone ? <a href={`tel:${customer.phone}`} className="text-coral hover:underline">{customer.phone}</a> : null} />
              <InfoRow label="Country" value={customer.country} />
              <InfoRow label="Website" value={customer.website ? <a href={customer.website} target="_blank" rel="noreferrer" className="text-coral hover:underline">{customer.website}</a> : null} />
              <InfoRow label="Customer Since" value={customer.created_at ? format(new Date(customer.created_at), "dd MMM yyyy") : null} />
            </div>
          </Card>
          <Card>
            <h2 className="text-h4 text-text-primary">Recent Activity</h2>
            <div className="mt-4">
              {orders.length === 0 && projects.length === 0 ? (
                <EmptyState title="No activity yet" description="Orders and projects will appear here." icon={<i className="hgi-stroke hgi-time-01 text-xl" />} />
              ) : (
                <ul className="space-y-3">
                  {[...orders.slice(0, 3).map((o) => ({ type: "order", label: `Order created`, time: o.created_at, status: o.status })),
                    ...projects.slice(0, 3).map((p) => ({ type: "project", label: p.name, time: p.created_at, status: p.status }))
                  ].sort((a, b) => new Date(b.time ?? 0).getTime() - new Date(a.time ?? 0).getTime()).slice(0, 5).map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral-light text-coral">
                        <i className={`hgi-stroke ${item.type === "order" ? "hgi-shopping-cart-01" : "hgi-briefcase-01"} text-sm`} />
                      </div>
                      <div>
                        <p className="text-small font-semibold text-text-primary">{item.label}</p>
                        <p className="text-caption text-text-muted">{item.time ? formatDistanceToNow(new Date(item.time), { addSuffix: true }) : ""}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>
          {customer.notes ? (
            <Card className="lg:col-span-2">
              <h2 className="text-h4 text-text-primary">Internal Notes</h2>
              <p className="mt-3 text-small text-text-secondary">{customer.notes}</p>
            </Card>
          ) : null}
        </div>
      )}

      {tab === "orders" && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-text-primary">Orders</h2>
            <Button>
              <i className="hgi-stroke hgi-add-01" />
              Create Order
            </Button>
          </div>
          {orders.length === 0 ? (
            <EmptyState title="No orders yet" description="Create an order for this customer to get started." icon={<i className="hgi-stroke hgi-shopping-cart-01 text-xl" />} action={<Button>Create Order</Button>} />
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    {["Order ID", "Status", "Payment", "Total", "Delivery", "Created"].map((h) => (
                      <th key={h} className="pb-3 pr-4 text-caption uppercase tracking-wider text-text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-surface-alt">
                      <td className="py-3 pr-4"><a href={`/crm/orders/${order.id}`} className="text-small font-semibold text-coral hover:underline">{order.id.slice(0, 8)}…</a></td>
                      <td className="py-3 pr-4"><Badge tone={getOrderStatusTone(order.status)}>{formatStatus(order.status)}</Badge></td>
                      <td className="py-3 pr-4"><Badge tone={getPaymentTone(order.payment_status)}>{formatStatus(order.payment_status)}</Badge></td>
                      <td className="py-3 pr-4 text-small font-semibold text-text-primary">{order.total ? `${order.currency ?? "USD"} ${order.total.toLocaleString()}` : "—"}</td>
                      <td className="py-3 pr-4 text-small text-text-secondary">{order.delivery_date ? format(new Date(order.delivery_date), "dd MMM yyyy") : "—"}</td>
                      <td className="py-3 text-small text-text-muted">{order.created_at ? formatDistanceToNow(new Date(order.created_at), { addSuffix: true }) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {tab === "projects" && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-text-primary">Projects</h2>
            <Button><i className="hgi-stroke hgi-add-01" />New Project</Button>
          </div>
          {projects.length === 0 ? (
            <EmptyState title="No projects yet" description="Projects are created from orders or manually." icon={<i className="hgi-stroke hgi-briefcase-01 text-xl" />} />
          ) : (
            <ul className="mt-5 space-y-3">
              {projects.map((project) => (
                <li key={project.id}>
                  <a href={`/crm/projects/${project.id}`} className="flex items-center justify-between rounded-xl border border-border p-4 transition hover:border-coral hover:bg-coral-light">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-alt text-text-secondary">
                        <i className="hgi-stroke hgi-briefcase-01" />
                      </div>
                      <div>
                        <p className="text-small font-semibold text-text-primary">{project.name}</p>
                        <p className="text-caption text-text-muted">{project.start_date ? format(new Date(project.start_date), "dd MMM yyyy") : "No start date"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {project.progress !== null ? (
                        <div className="hidden items-center gap-2 sm:flex">
                          <div className="h-1.5 w-24 rounded-full bg-surface-elevated">
                            <div className="h-1.5 rounded-full bg-coral" style={{ width: `${project.progress}%` }} />
                          </div>
                          <span className="text-caption text-text-muted">{project.progress}%</span>
                        </div>
                      ) : null}
                      <Badge tone={getProjectTone(project.status)}>{formatStatus(project.status)}</Badge>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {tab === "invoices" && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-text-primary">Invoices</h2>
            <Button><i className="hgi-stroke hgi-add-01" />Create Invoice</Button>
          </div>
          {invoices.length === 0 ? (
            <EmptyState title="No invoices yet" description="Create an invoice to track payments for this customer." icon={<i className="hgi-stroke hgi-invoice-01 text-xl" />} action={<Button>Create Invoice</Button>} />
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    {["Invoice", "Status", "Total", "Due Date", "Created"].map((h) => (
                      <th key={h} className="pb-3 pr-4 text-caption uppercase tracking-wider text-text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-border last:border-0 hover:bg-surface-alt">
                      <td className="py-3 pr-4 text-small font-semibold text-text-primary">{invoice.invoice_number ?? invoice.id.slice(0, 8)}</td>
                      <td className="py-3 pr-4"><Badge tone={getPaymentTone(invoice.status)}>{formatStatus(invoice.status)}</Badge></td>
                      <td className="py-3 pr-4 text-small font-semibold text-text-primary">{invoice.total ? `${invoice.currency ?? "USD"} ${invoice.total.toLocaleString()}` : "—"}</td>
                      <td className="py-3 pr-4 text-small text-text-secondary">{invoice.due_date ? format(new Date(invoice.due_date), "dd MMM yyyy") : "—"}</td>
                      <td className="py-3 text-small text-text-muted">{invoice.created_at ? formatDistanceToNow(new Date(invoice.created_at), { addSuffix: true }) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {tab === "support" && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-text-primary">Support Tickets</h2>
            <Button><i className="hgi-stroke hgi-add-01" />New Ticket</Button>
          </div>
          {tickets.length === 0 ? (
            <EmptyState title="No tickets" description="Support tickets from this customer will appear here." icon={<i className="hgi-stroke hgi-customer-support text-xl" />} />
          ) : (
            <ul className="mt-5 space-y-3">
              {tickets.map((ticket) => (
                <li key={ticket.id}>
                  <a href={`/crm/support/${ticket.id}`} className="flex items-center justify-between rounded-xl border border-border p-4 transition hover:border-coral hover:bg-coral-light">
                    <div>
                      <p className="text-small font-semibold text-text-primary">{ticket.title}</p>
                      <p className="mt-1 text-caption text-text-muted">{formatStatus(ticket.category)} · {ticket.created_at ? formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true }) : ""}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone={ticket.priority === "urgent" ? "error" : ticket.priority === "high" ? "warning" : "neutral"}>{formatStatus(ticket.priority)}</Badge>
                      <Badge tone={ticket.status === "resolved" || ticket.status === "closed" ? "success" : ticket.status === "open" ? "info" : "neutral"}>{formatStatus(ticket.status)}</Badge>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {tab === "notes" && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-text-primary">Internal Notes</h2>
            <Button variant="secondary"><i className="hgi-stroke hgi-add-01" />Add Note</Button>
          </div>
          {customer.notes ? (
            <div className="mt-4 rounded-xl border border-border bg-surface-alt p-4">
              <p className="text-small text-text-secondary">{customer.notes}</p>
            </div>
          ) : (
            <EmptyState title="No notes" description="Internal team notes about this customer will appear here." icon={<i className="hgi-stroke hgi-note-01 text-xl" />} />
          )}
        </Card>
      )}

      {tab === "activity" && (
        <Card>
          <h2 className="text-h4 text-text-primary">Activity Timeline</h2>
          {orders.length === 0 && projects.length === 0 ? (
            <EmptyState title="No activity yet" description="Orders, projects, and communications will appear here." icon={<i className="hgi-stroke hgi-time-01 text-xl" />} />
          ) : (
            <ol className="mt-5 space-y-0">
              {[
                ...orders.map((o) => ({ icon: "hgi-shopping-cart-01", text: `Order created — ${o.currency ?? "USD"} ${o.total?.toLocaleString() ?? "0"}`, time: o.created_at })),
                ...projects.map((p) => ({ icon: "hgi-briefcase-01", text: `Project "${p.name}" created`, time: p.created_at })),
                ...tickets.map((t) => ({ icon: "hgi-customer-support", text: `Support ticket: ${t.title}`, time: t.created_at })),
              ].sort((a, b) => new Date(b.time ?? 0).getTime() - new Date(a.time ?? 0).getTime()).map((item, index, arr) => (
                <li key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral-light text-coral">
                      <i className={`hgi-stroke ${item.icon} text-sm`} />
                    </div>
                    {index < arr.length - 1 ? <div className="mt-1 w-px flex-1 bg-border-strong" /> : null}
                  </div>
                  <div className="pb-5">
                    <p className="text-small font-semibold text-text-primary">{item.text}</p>
                    <p className="mt-0.5 text-caption text-text-muted">{item.time ? formatDistanceToNow(new Date(item.time), { addSuffix: true }) : ""}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Card>
      )}
    </div>
  );
}
