import { EntityListClient } from "@/components/crm/entity-list-client";

export default function TasksPage() {
  return (
    <EntityListClient
      title="Tasks"
      subtitle="Global task management grouped by due date and priority."
      table="tasks"
      primaryAction="Create Task"
      columns={[
        { key: "title", label: "Title" },
        { key: "priority", label: "Priority" },
        { key: "status", label: "Status" },
        { key: "due_date", label: "Due" },
        { key: "created_at", label: "Created" },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "priority", label: "Priority", type: "select", options: [{ label: "Urgent", value: "urgent" }, { label: "High", value: "high" }, { label: "Medium", value: "medium" }, { label: "Low", value: "low" }] },
        { name: "status", label: "Status", type: "select", options: [{ label: "Todo", value: "todo" }, { label: "In Progress", value: "in_progress" }, { label: "In Review", value: "in_review" }, { label: "Done", value: "done" }] },
        { name: "due_date", label: "Due Date", type: "date" },
      ]}
      defaults={{ priority: "medium", status: "todo" }}
    />
  );
}
