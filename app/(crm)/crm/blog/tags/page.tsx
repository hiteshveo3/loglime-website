import { EntityListClient } from "@/components/crm/entity-list-client";

export default function BlogTagsPage() {
  return (
    <EntityListClient
      title="Blog Tags"
      subtitle="Lowercase, hyphenated tags used by public tag archive pages."
      table="blog_tags"
      primaryAction="Add Tag"
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "post_count", label: "Posts" },
      ]}
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "slug", label: "Slug", required: true },
      ]}
    />
  );
}
