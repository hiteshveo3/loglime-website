import { PortalDashboardClient } from "@/components/portal/dashboard-client";

export default function PortalDashboardPage() {
  // TODO: get customerId from session once auth is wired
  return <PortalDashboardClient customerId="demo" restaurantName="Your Restaurant" />;
}
