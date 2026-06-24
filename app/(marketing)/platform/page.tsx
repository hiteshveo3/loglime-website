import type { Metadata } from "next";

import { DocumentationPage } from "@/components/marketing/documentation-page";
import { getWebsiteSection } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Loglime Platform — Everything connected. Everything simple.",
  description: "One platform where your menu, orders, bookings, loyalty, and customer data all live together and all talk to each other.",
  alternates: {
    canonical: "https://loglime.com/platform",
  },
};

export default function PlatformPage() {
  const content = getWebsiteSection("# PART J", "# PART K");
  return (
    <DocumentationPage
      title="The Loglime Platform"
      description="One connected workspace for restaurant menus, direct orders, bookings, loyalty, customer data, and operational analytics."
      content={content}
      eyebrow="Platform documentation"
    />
  );
}
