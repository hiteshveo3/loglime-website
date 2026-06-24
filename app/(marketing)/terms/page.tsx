import type { Metadata } from "next";

import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service — Loglime",
  description: "Read Loglime's Terms of Service including subscription terms, acceptable use, payment terms, liability limits and your rights as a user.",
  alternates: { canonical: "https://loglime.com/terms" },
};

export default function TermsPage() {
  return <LegalPage documentNumber={2} title="Terms of Service" />;
}
