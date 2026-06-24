import type { Metadata } from "next";
import Script from "next/script";

import { LeadForm } from "@/components/marketing/lead-form";
import { Badge, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Book a Demo — See Loglime in Action",
  description: "Book a free 30-minute walkthrough of Loglime. See commission-free ordering, digital menus and loyalty working live for your restaurant type.",
  alternates: { canonical: "https://loglime.com/demo" },
  openGraph: {
    title: "Book a Demo — See Loglime in Action",
    description: "Book a free 30-minute walkthrough of Loglime. See commission-free ordering, digital menus and loyalty working live for your restaurant type.",
    url: "https://loglime.com/demo",
    images: [{ url: "/og/demo.png", width: 1200, height: 630, alt: "Book a Loglime demo" }],
  },
};

const demoSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Loglime Restaurant App Platform",
  provider: { "@type": "Organization", name: "Loglime", url: "https://loglime.com" },
  serviceType: "Restaurant Technology Platform",
  description: "Commission-free restaurant apps with online ordering, digital menus, table booking and loyalty programs.",
  offers: { "@type": "Offer", name: "Free Demo", description: "Book a free 30-minute walkthrough of the Loglime platform.", price: "0", priceCurrency: "USD" },
};

export default function DemoPage() {
  return (
    <main className="bg-surface-alt">
      <Script id="demo-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(demoSchema) }} />
      <section className="mx-auto grid max-w-page gap-8 px-4 py-14 lg:grid-cols-[0.8fr_1fr] lg:px-8">
        <div>
          <Badge tone="info">Demo</Badge>
          <h1 className="mt-4 text-h1 text-text-primary">Book a Loglime walkthrough.</h1>
          <p className="mt-3 text-body text-text-secondary">Tell us about the restaurant, products you want to launch, and the timeline. The request will create a CRM lead once Supabase is connected.</p>
        </div>
        <Card>
          <LeadForm source="demo" />
        </Card>
      </section>
    </main>
  );
}
