import { ModulePage } from "@/components/crm/module-page";

export default function CommunicationThreadPage() {
  return (
    <ModulePage
      title="Conversation Thread"
      subtitle="Customer message history, realtime replies, typing broadcast preview, and linked CRM records."
      primaryAction="Send Reply"
      sections={["Message History", "Typing Preview", "Composer", "Linked Order", "Linked Ticket", "Linked Project"]}
    />
  );
}
