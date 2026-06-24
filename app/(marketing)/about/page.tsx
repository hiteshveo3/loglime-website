import type { Metadata } from "next";

import { Badge, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Loglime — Built for Restaurants",
  description: "Learn about Loglime's mission to help restaurants grow with commission-free technology, direct customer relationships and branded apps.",
  alternates: { canonical: "https://loglime.com/about" },
};

export default function AboutPage() {
  return (
    <main className="bg-surface-alt">
      <section className="mx-auto max-w-page px-4 py-14 lg:px-8">
        <div className="max-w-3xl">
          <Badge tone="info">About</Badge>
          <h1 className="mt-4 text-h1 text-text-primary">Loglime builds restaurant app systems that are easier to sell and faster to launch.</h1>
          <p className="mt-3 text-body text-text-secondary">The platform combines public restaurant app offers with a CRM, project workflow, customer portal, support, billing, and Zest AI assistance.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {["Restaurant-first", "Mobile-first", "CRM-connected"].map((item) => (
            <Card key={item}>
              <h2 className="text-h3 text-text-primary">{item}</h2>
              <p className="mt-3 text-body text-text-secondary">Designed so every public lead, order, project, and customer support request can flow through one operating system.</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
