import { EntityListClient } from "@/components/crm/entity-list-client";

export default function CrmBlogPage() {
  return (
    <EntityListClient
      title="Blog CMS"
      subtitle="Manage SEO articles, drafts, pillar content, and publishing status."
      table="blog_posts"
      primaryAction="Add Post"
      columns={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "status", label: "Status" },
        { key: "word_count", label: "Words" },
        { key: "reading_time_minutes", label: "Read" },
        { key: "created_at", label: "Created" },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Markdown Content", type: "textarea", required: true },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
            { label: "Scheduled", value: "scheduled" },
            { label: "Archived", value: "archived" },
          ],
        },
      ]}
      defaults={{ status: "draft", is_featured: false, is_pillar: false }}
    />
  );
}
