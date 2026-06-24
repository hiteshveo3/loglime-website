import { EntityListClient } from "@/components/crm/entity-list-client";

export default function BlogAuthorsPage() {
  return (
    <EntityListClient
      title="Blog Authors"
      subtitle="Author profiles for E-E-A-T, schema markup, and attribution."
      table="blog_authors"
      primaryAction="Add Author"
      columns={[
        { key: "name", label: "Name" },
        { key: "username", label: "Username" },
        { key: "role_title", label: "Role" },
        { key: "post_count", label: "Posts" },
      ]}
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "username", label: "Username", required: true },
        { name: "role_title", label: "Role Title" },
        { name: "avatar_url", label: "Avatar URL" },
        { name: "bio", label: "Bio", type: "textarea" },
      ]}
    />
  );
}
