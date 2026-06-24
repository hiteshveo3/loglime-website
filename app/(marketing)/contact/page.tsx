import type { Metadata } from "next";

import { LeadForm } from "@/components/marketing/lead-form";
import { Badge, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact Loglime — Talk to Our Team",
  description: "Get in touch with the Loglime team. We typically reply within one business day. Use our contact form or email hello@loglime.com directly.",
  alternates: { canonical: "https://loglime.com/contact" },
};

export default function ContactPage() {
  return (
    <main className="bg-surface-alt">
      <section className="mx-auto grid max-w-page gap-8 px-4 py-14 lg:grid-cols-[0.8fr_1fr] lg:px-8">
        <div>
          <Badge tone="info">Contact</Badge>
          <h1 className="mt-4 text-h1 text-text-primary">Talk to Loglime.</h1>
          <p className="mt-3 text-body text-text-secondary">Send a message about restaurant apps, support, pricing, or a custom implementation.</p>
          <div className="mt-6 space-y-2 text-body text-text-secondary">
            <p>Email: hello@loglime.com</p>
            <p>Location: Remote-first restaurant software team</p>
          </div>
        </div>
        <Card>
          <LeadForm source="contact" />
        </Card>
      </section>
    </main>
  );
}
