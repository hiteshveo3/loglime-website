"use client";

import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";

import { Badge, Button, Card, EmptyState, PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type Invoice = {
  id: string; invoice_number: string | null; total: number | null;
  currency: string | null; status: string | null;
  due_date: string | null; created_at: string | null;
  stripe_payment_link: string | null; line_items: unknown;
};

function getPaymentTone(s: string | null): "success" | "error" | "warning" | "neutral" {
  if (s === "paid") return "success";
  if (s === "overdue") return "error";
  if (s === "sent") return "warning";
  return "neutral";
}

function formatStatus(s: string | null) {
  return (s ?? "—").split("_").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}

export function PortalInvoicesClient({ customerId }: { customerId: string }) {
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["portal-invoices", customerId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("invoices").select("*").eq("customer_id", customerId).order("created_at", { ascending: false });
      return (data ?? []) as unknown as Invoice[];
    },
  });

  const totalPaid = invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + (i.total ?? 0), 0);
  const totalOwed = invoices.filter(i => i.status === "sent" || i.status === "overdue").reduce((sum, i) => sum + (i.total ?? 0), 0);
  const currency = invoices[0]?.currency ?? "USD";

  return (
    <div className="space-y-5">
      <PageHeader title="Invoices" subtitle="View and pay your Loglime invoices." />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <Card><p className="text-caption uppercase tracking-wider text-text-muted">Total Paid</p><p className="mt-2 text-h2 text-status-success">{currency} {totalPaid.toLocaleString()}</p></Card>
        <Card><p className="text-caption uppercase tracking-wider text-text-muted">Outstanding</p><p className="mt-2 text-h2 text-coral">{currency} {totalOwed.toLocaleString()}</p></Card>
        <Card className="col-span-2 md:col-span-1"><p className="text-caption uppercase tracking-wider text-text-muted">Total Invoices</p><p className="mt-2 text-h2 text-text-primary">{invoices.length}</p></Card>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-100" />)}</div>
      ) : invoices.length === 0 ? (
        <EmptyState title="No invoices yet" description="Your invoices will appear here once your order is confirmed." icon={<i className="hgi-stroke hgi-invoice-01 text-xl" />} />
      ) : (
        <Card>
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-small font-bold text-text-primary">{inv.invoice_number ?? `INV-${inv.id.slice(0,6).toUpperCase()}`}</p>
                  <p className="mt-0.5 text-caption text-text-muted">
                    {inv.created_at ? format(new Date(inv.created_at), "dd MMM yyyy") : "—"}
                    {inv.due_date ? ` · Due ${format(new Date(inv.due_date), "dd MMM yyyy")}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-body font-bold text-text-primary">{inv.currency ?? "USD"} {(inv.total ?? 0).toLocaleString()}</span>
                  <Badge tone={getPaymentTone(inv.status)}>{formatStatus(inv.status)}</Badge>
                  {inv.status !== "paid" && inv.stripe_payment_link ? (
                    <a href={inv.stripe_payment_link} target="_blank" rel="noreferrer" className="rounded-full bg-coral px-4 py-2 text-small font-semibold text-white transition hover:bg-coral-hover">
                      Pay Now
                    </a>
                  ) : null}
                  <Button variant="secondary">
                    <i className="hgi-stroke hgi-download-01" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
