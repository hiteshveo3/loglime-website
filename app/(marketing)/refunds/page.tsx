import type { Metadata } from "next";

import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Refund Policy — Loglime",
  description: "Loglime's refund policy covers free trials, monthly and annual subscriptions and setup fees. Read the full refund terms before purchasing.",
  alternates: { canonical: "https://loglime.com/refunds" },
};

export default function RefundPolicyPage() {
  return <LegalPage documentNumber={4} title="Refund Policy" />;
}
