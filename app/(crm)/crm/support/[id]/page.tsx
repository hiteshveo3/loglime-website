import { SupportTicketClient } from "@/components/crm/support-ticket-client";

export default async function SupportTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SupportTicketClient ticketId={id} />;
}
