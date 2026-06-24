import { EntityListClient } from "@/components/crm/entity-list-client";

export default function CustomersPage() {
  return (
    <EntityListClient
      title="Customers"
      subtitle="Manage restaurant accounts after lead conversion."
      table="customers"
      primaryAction="Add Customer"
      columns={[
        { key: "business_name", label: "Business" },
        { key: "contact_name", label: "Contact" },
        { key: "email", label: "Email" },
        { key: "status", label: "Status" },
        { key: "created_at", label: "Created" },
      ]}
      fields={[
        { name: "business_name", label: "Business Name", required: true },
        { name: "contact_name", label: "Contact Name" },
        { name: "email", label: "Email" },
        { name: "phone", label: "Phone" },
        { name: "country", label: "Country" },
        { name: "status", label: "Status", type: "select", options: [{ label: "Active", value: "active" }, { label: "Paused", value: "paused" }, { label: "Churned", value: "churned" }] },
      ]}
      defaults={{ status: "active" }}
    />
  );
}
