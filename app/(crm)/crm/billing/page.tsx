import { EntityListClient } from "@/components/crm/entity-list-client";

export default function BillingPage() {
  return (
    <EntityListClient
      title="Billing"
      subtitle="Invoices, subscriptions, payment status, PDF downloads, and Stripe payment links."
      table="invoices"
      primaryAction="Create Invoice"
      columns={[
        { key: "invoice_number", label: "Invoice" },
        { key: "status", label: "Status" },
        { key: "total", label: "Total" },
        { key: "currency", label: "Currency" },
        { key: "due_date", label: "Due" },
      ]}
      fields={[
        { name: "invoice_number", label: "Invoice Number", required: true },
        { name: "status", label: "Status", type: "select", options: [{ label: "Draft", value: "draft" }, { label: "Sent", value: "sent" }, { label: "Paid", value: "paid" }, { label: "Overdue", value: "overdue" }, { label: "Cancelled", value: "cancelled" }] },
        { name: "subtotal", label: "Subtotal", type: "number" },
        { name: "total", label: "Total", type: "number" },
        { name: "currency", label: "Currency" },
        { name: "due_date", label: "Due Date", type: "date" },
        { name: "stripe_payment_link", label: "Stripe Payment Link" },
      ]}
      defaults={{ status: "draft", currency: "USD" }}
    />
  );
}
