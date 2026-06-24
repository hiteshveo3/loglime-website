import { ModulePage } from "@/components/crm/module-page";

export default function BlogAnalyticsPage() {
  return (
    <ModulePage
      title="Blog Analytics"
      subtitle="Track article performance, search coverage, newsletter conversion, and comment quality."
      primaryAction="Export"
      stats={[
        { label: "Published", value: "6" },
        { label: "Pillar posts", value: "1" },
        { label: "Content pillars", value: "6" },
        { label: "RSS", value: "Live" },
      ]}
      sections={["Top articles", "Search queries", "Newsletter signups", "Comment quality"]}
    />
  );
}
