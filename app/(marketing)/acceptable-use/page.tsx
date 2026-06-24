import type { Metadata } from "next";

import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Acceptable Use Policy — Loglime",
  description: "Loglime's Acceptable Use Policy outlines what you can and cannot do with our platform. Applies to all restaurant operators on our platform.",
  alternates: { canonical: "https://loglime.com/acceptable-use" },
};

export default function AcceptableUsePolicyPage() {
  return <LegalPage documentNumber={5} title="Acceptable Use Policy" />;
}
