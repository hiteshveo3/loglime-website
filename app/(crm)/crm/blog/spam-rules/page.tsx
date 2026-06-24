import { EntityListClient } from "@/components/crm/entity-list-client";

export default function BlogSpamRulesPage() {
  return (
    <EntityListClient
      title="Spam Rules"
      subtitle="Keyword, domain, IP, and pattern blocklists for blog comment moderation."
      table="spam_rules"
      primaryAction="Add Rule"
      columns={[
        { key: "rule_type", label: "Type" },
        { key: "rule_value", label: "Value" },
        { key: "action", label: "Action" },
        { key: "is_active", label: "Active" },
        { key: "created_at", label: "Created" },
      ]}
      fields={[
        {
          name: "rule_type",
          label: "Rule Type",
          type: "select",
          options: [
            { label: "Keyword", value: "keyword" },
            { label: "Domain", value: "domain" },
            { label: "IP", value: "ip" },
            { label: "Pattern", value: "pattern" },
          ],
        },
        { name: "rule_value", label: "Rule Value", required: true },
        {
          name: "action",
          label: "Action",
          type: "select",
          options: [
            { label: "Mark spam", value: "mark_spam" },
            { label: "Block", value: "block" },
            { label: "Flag", value: "flag" },
          ],
        },
      ]}
      defaults={{ is_active: true, action: "mark_spam" }}
    />
  );
}
