import { PortalTicketDetailClient } from "@/components/portal/support-client";

export default async function PortalTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PortalTicketDetailClient ticketId={id} />;
}
