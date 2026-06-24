import { ModulePage } from "@/components/crm/module-page";

export default function KnowledgeBaseArticlePage() {
  return (
    <ModulePage
      title="Knowledge Base Article"
      subtitle="Rich text article editing with category and draft/published status."
      primaryAction="Publish"
      sections={["Title", "Category", "Content", "Status", "Revision Info"]}
    />
  );
}
