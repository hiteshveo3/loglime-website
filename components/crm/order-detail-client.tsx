"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { useState } from "react";

import { Badge, Button, Card, Drawer, EmptyState, Select, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type Order = Database["public"]["Tables"]["orders"]["Row"];

function formatStatus(status: string | null) {
  return (status ?? "—").split("_").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}

function getOrderTone(status: string | null): "success" | "error" | "warning" | "info" | "neutral" {
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

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border py-3 first:pt-0 last:border-0 last:pb-0">
      <span className="text-caption uppercase tracking-wider text-text-muted">{label}</span>
      <span className="text-small font-semibold text-text-primary">{value ?? "—"}</span>
    </div>
  );
}

export function OrderDetailClient({ orderId }: { orderId: string }) {
  const [statusDrawerOpen, setStatusDrawerOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("orders").select("*").eq("id", orderId).single();
      if (error) throw error;
      return data as Order;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const supabase = createClient();
      const { error } = await supabase.from("orders").update({ status, updated_at: new Date().toISOString() }).eq("id", orderId);
      if (error) throw error;
    },
    onSuccess: async () => {
      setStatusDrawerOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      showToast({ title: "Order status updated", tone: "success" });
    },
    onError: () => showToast({ title: "Could not update order", tone: "error" }),
  });

  if (isLoading) {
    return <div className="space-y-5"><div className="h-8 w-48 animate-pulse rounded-xl bg-slate-100" /><div className="h-64 animate-pulse rounded-2xl bg-slate-100" /></div>;
  }

  if (isError || !order) {
    return <EmptyState title="Order not found" description="This order may have been deleted." icon={<i className="hgi-stroke hgi-shopping-cart-01 text-xl" />} action={<Button onClick={() => window.history.back()}>Go Back</Button>} />;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <a href="/crm/orders" className="flex items-center gap-1.5 text-small font-semibold text-text-secondary hover:text-coral">
          <i className="hgi-stroke hgi-arrow-left-01" />
          All Orders
        </a>
        <i className="hgi-stroke hgi-arrow-right-01 text-text-muted" />
        <span className="text-small font-semibold text-text-primary">Order #{order.id.slice(0, 8)}</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h2 text-text-primary">Order #{order.id.slice(0, 8)}</h1>
          <p className="mt-1 text-small text-text-secondary">{order.created_at ? `Created ${format(new Date(order.created_at), "dd MMM yyyy")}` : ""}</p>
          <div className="mt-2 flex gap-2">
            <Badge tone={getOrderTone(order.status)}>{formatStatus(order.status)}</Badge>
            <Badge tone={getPaymentTone(order.payment_status)}>{formatStatus(order.payment_status)}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => { setNewStatus(order.status ?? "pending"); setStatusDrawerOpen(true); }}>
            <i className="hgi-stroke hgi-refresh-01" />
            Update Status
          </Button>
          <Button>
            <i className="hgi-stroke hgi-briefcase-01" />
            Create Project
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <Card>
            <h2 className="text-h4 text-text-primary">Pricing Breakdown</h2>
            <div className="mt-5 space-y-3">
              <div className="flex justify-between border-b border-border pb-3 text-small">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-semibold text-text-primary">{order.currency ?? "USD"} {(order.subtotal ?? 0).toLocaleString()}</span>
              </div>
              {order.discount ? (
                <div className="flex justify-between border-b border-border pb-3 text-small">
                  <span className="text-text-secondary">Discount</span>
                  <span className="font-semibold text-status-success">− {order.currency ?? "USD"} {order.discount.toLocaleString()}</span>
                </div>
              ) : null}
              {order.tax ? (
                <div className="flex justify-between border-b border-border pb-3 text-small">
                  <span className="text-text-secondary">Tax</span>
                  <span className="font-semibold text-text-primary">{order.currency ?? "USD"} {order.tax.toLocaleString()}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-body">
                <span className="font-bold text-text-primary">Total</span>
                <span className="font-bold text-coral">{order.currency ?? "USD"} {(order.total ?? 0).toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {order.notes ? (
            <Card>
              <h2 className="text-h4 text-text-primary">Notes</h2>
              <p className="mt-3 text-small text-text-secondary">{order.notes}</p>
            </Card>
          ) : null}
        </div>

        <div className="space-y-4">
          <Card>
            <h2 className="text-h4 text-text-primary">Order Details</h2>
            <div className="mt-4">
              <InfoRow label="Status" value={<Badge tone={getOrderTone(order.status)}>{formatStatus(order.status)}</Badge>} />
              <InfoRow label="Payment" value={<Badge tone={getPaymentTone(order.payment_status)}>{formatStatus(order.payment_status)}</Badge>} />
              <InfoRow label="Currency" value={order.currency} />
              <InfoRow label="Delivery Date" value={order.delivery_date ? format(new Date(order.delivery_date), "dd MMM yyyy") : null} />
              <InfoRow label="Last Updated" value={order.updated_at ? formatDistanceToNow(new Date(order.updated_at), { addSuffix: true }) : null} />
              {order.stripe_payment_intent_id ? <InfoRow label="Stripe ID" value={order.stripe_payment_intent_id} /> : null}
            </div>
          </Card>
          <Card>
            <h2 className="text-h4 text-text-primary">Quick Actions</h2>
            <div className="mt-4 space-y-2">
              <button className="flex w-full items-center gap-3 rounded-xl border border-border p-3 transition hover:border-coral hover:bg-coral-light" onClick={() => { setNewStatus(order.status ?? "pending"); setStatusDrawerOpen(true); }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-alt text-text-secondary"><i className="hgi-stroke hgi-refresh-01" /></span>
                <p className="text-small font-semibold text-text-primary">Update Status</p>
              </button>
              <button className="flex w-full items-center gap-3 rounded-xl border border-border p-3 transition hover:border-coral hover:bg-coral-light">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-alt text-text-secondary"><i className="hgi-stroke hgi-invoice-01" /></span>
                <p className="text-small font-semibold text-text-primary">Create Invoice</p>
              </button>
              <button className="flex w-full items-center gap-3 rounded-xl border-2 border-coral bg-coral-light p-3 transition hover:bg-coral-soft">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-coral text-white"><i className="hgi-stroke hgi-briefcase-01" /></span>
                <p className="text-small font-semibold text-coral">Create Project</p>
              </button>
            </div>
          </Card>
        </div>
      </div>

      <Drawer open={statusDrawerOpen} title="Update Order Status" onClose={() => setStatusDrawerOpen(false)}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); updateStatusMutation.mutate(newStatus); }}>
          <Select
            label="Order Status"
            value={newStatus}
            options={[
              { label: "Pending", value: "pending" },
              { label: "Confirmed", value: "confirmed" },
              { label: "In Progress", value: "in_progress" },
              { label: "Delivered", value: "delivered" },
              { label: "Cancelled", value: "cancelled" },
            ]}
            onChange={(e) => setNewStatus(e.target.value)}
          />
          <Button className="w-full" type="submit" isLoading={updateStatusMutation.isPending}>Save</Button>
        </form>
      </Drawer>
    </div>
  );
}
