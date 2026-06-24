import { EntityListClient } from "@/components/crm/entity-list-client";

export default function SupportPage() {
  return (
    <EntityListClient
      title="Support"
      subtitle="Ticket list, filters, unread indicators, priorities, and assigned agents."
      table="tickets"
      primaryAction="Create Ticket"
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "priority", label: "Priority" },
        { key: "status", label: "Status" },
        { key: "created_at", label: "Created" },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "category", label: "Category", type: "select", options: [{ label: "Technical", value: "technical" }, { label: "Billing", value: "billing" }, { label: "General", value: "general" }, { label: "Feature Request", value: "feature_request" }, { label: "Bug Report", value: "bug_report" }] },
        { name: "priority", label: "Priority", type: "select", options: [{ label: "Urgent", value: "urgent" }, { label: "High", value: "high" }, { label: "Medium", value: "medium" }, { label: "Low", value: "low" }] },
        { name: "status", label: "Status", type: "select", options: [{ label: "Open", value: "open" }, { label: "In Progress", value: "in_progress" }, { label: "Waiting Customer", value: "waiting_customer" }, { label: "Resolved", value: "resolved" }, { label: "Closed", value: "closed" }] },
        { name: "resolution_notes", label: "Resolution Notes", type: "textarea" },
      ]}
      defaults={{ priority: "medium", status: "open" }}
    />
  );
}
