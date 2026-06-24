"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { Badge, Card, EmptyState, PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type Order = {
  id: string; order_number: string | null; status: string | null;
  total: number | null; currency: string | null; created_at: string | null;
};

function getOrderTone(s: string | null): "success" | "info" | "warning" | "error" | "neutral" {
  if (s === "delivered" || s === "completed") return "success";
  if (s === "in_production" || s === "in_progress") return "info";
  if (s === "pending" || s === "confirmed") return "warning";
  if (s === "cancelled") return "error";
  return "neutral";
}

function formatStatus(s: string | null) {
  return (s ?? "—").split("_").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}

export function PortalOrdersClient({ customerId }: { customerId: string }) {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["portal-orders", customerId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("orders").select("*").eq("customer_id", customerId).order("created_at", { ascending: false });
      return (data ?? []) as unknown as Order[];
    },
  });

  return (
    <div className="space-y-5">
      <PageHeader title="My Orders" subtitle="Track the status of your app orders." />

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-100" />)}</div>
      ) : orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="Your orders will appear here once you've placed them."
          icon={<i className="hgi-stroke hgi-shopping-cart-01 text-xl" />}
        />
      ) : (
        <Card>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-small font-bold text-text-primary">{order.order_number ?? `ORD-${order.id.slice(0,6).toUpperCase()}`}</p>
                  <p className="mt-0.5 text-caption text-text-muted">
                    Placed {order.created_at ? format(new Date(order.created_at), "dd MMM yyyy") : "—"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-body font-bold text-text-primary">{order.currency ?? "USD"} {(order.total ?? 0).toLocaleString()}</span>
                  <Badge tone={getOrderTone(order.status)}>{formatStatus(order.status)}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
