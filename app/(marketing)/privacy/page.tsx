import type { Metadata } from "next";

import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Loglime",
  description: "Learn how Loglime collects, uses and protects your personal data. Our Privacy Policy covers GDPR, CCPA compliance and all data practices.",
  alternates: { canonical: "https://loglime.com/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage documentNumber={1} title="Privacy Policy" />;
}
