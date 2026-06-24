import { EntityListClient } from "@/components/crm/entity-list-client";

export default function ProjectsPage() {
  return (
    <EntityListClient
      title="Projects"
      subtitle="Plan, deliver, review, and complete restaurant app projects."
      table="projects"
      primaryAction="Create Project"
      columns={[
        { key: "name", label: "Name" },
        { key: "status", label: "Status" },
        { key: "progress", label: "Progress" },
        { key: "start_date", label: "Start" },
        { key: "end_date", label: "End" },
      ]}
      fields={[
        { name: "name", label: "Project Name", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "status", label: "Status", type: "select", options: [{ label: "Planning", value: "planning" }, { label: "In Progress", value: "in_progress" }, { label: "Review", value: "review" }, { label: "Client Approval", value: "client_approval" }, { label: "Delivered", value: "delivered" }, { label: "Completed", value: "completed" }] },
        { name: "progress", label: "Progress", type: "number" },
        { name: "start_date", label: "Start Date", type: "date" },
        { name: "end_date", label: "End Date", type: "date" },
      ]}
      defaults={{ status: "planning", progress: 0 }}
    />
  );
}
