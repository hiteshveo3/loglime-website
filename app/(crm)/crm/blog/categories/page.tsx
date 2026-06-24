import { EntityListClient } from "@/components/crm/entity-list-client";

export default function BlogCategoriesPage() {
  return (
    <EntityListClient
      title="Blog Categories"
      subtitle="Manage content pillars, badge colors, icons, and category descriptions."
      table="blog_categories"
      primaryAction="Add Category"
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "description", label: "Description" },
        { key: "post_count", label: "Posts" },
      ]}
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "color", label: "Badge Color" },
        { name: "icon", label: "Hugeicon Class" },
      ]}
    />
  );
}
