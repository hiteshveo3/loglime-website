import { EntityListClient } from "@/components/crm/entity-list-client";

export default function OrdersPage() {
  return (
    <EntityListClient
      title="Orders"
      subtitle="Every purchase creates an order with payment and delivery status."
      table="orders"
      primaryAction="Create Order"
      columns={[
        { key: "status", label: "Status" },
        { key: "payment_status", label: "Payment" },
        { key: "total", label: "Total" },
        { key: "currency", label: "Currency" },
        { key: "delivery_date", label: "Delivery" },
      ]}
      fields={[
        { name: "status", label: "Status", type: "select", options: [{ label: "Pending", value: "pending" }, { label: "Confirmed", value: "confirmed" }, { label: "In Progress", value: "in_progress" }, { label: "Delivered", value: "delivered" }] },
        { name: "payment_status", label: "Payment Status", type: "select", options: [{ label: "Unpaid", value: "unpaid" }, { label: "Partial", value: "partial" }, { label: "Paid", value: "paid" }, { label: "Refunded", value: "refunded" }] },
        { name: "subtotal", label: "Subtotal", type: "number" },
        { name: "total", label: "Total", type: "number" },
        { name: "currency", label: "Currency" },
        { name: "delivery_date", label: "Delivery Date", type: "date" },
        { name: "notes", label: "Notes", type: "textarea" },
      ]}
      defaults={{ status: "pending", payment_status: "unpaid", currency: "USD" }}
    />
  );
}
