import { PortalProjectDetailClient } from "@/components/portal/projects-client";

export default async function PortalProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PortalProjectDetailClient projectId={id} />;
}
