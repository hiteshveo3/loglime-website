import type { Metadata } from "next";

import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy — Loglime",
  description: "Learn about the cookies Loglime uses on its website and platform. We use only necessary and functional cookies — no advertising trackers.",
  alternates: { canonical: "https://loglime.com/cookies" },
};

export default function CookiePolicyPage() {
  return <LegalPage documentNumber={3} title="Cookie Policy" />;
}
