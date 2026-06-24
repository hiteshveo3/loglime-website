import type { Metadata } from "next";

import { Badge, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Restaurant Solutions by Type — Loglime",
  description: "Loglime builds direct ordering tech for cafes, bakeries, QSRs, dine-in restaurants, cloud kitchens and franchise groups. Zero commission.",
  alternates: { canonical: "https://loglime.com/solutions" },
  openGraph: {
    title: "Restaurant Solutions by Type — Loglime",
    description: "Loglime builds direct ordering tech for cafes, bakeries, QSRs, dine-in restaurants, cloud kitchens and franchise groups. Zero commission.",
    url: "https://loglime.com/solutions",
    images: [{ url: "/og/solutions.png", width: 1200, height: 630, alt: "Loglime restaurant solutions" }],
  },
};

const solutions = ["Cafes", "Bakeries", "QSR", "Dine-in", "Cloud Kitchen", "Franchise"];

export default function SolutionsPage() {
  return (
    <main className="bg-surface-alt">
      <section className="mx-auto max-w-page px-4 py-14 lg:px-8">
        <div className="max-w-3xl">
          <Badge tone="info">Solutions</Badge>
          <h1 className="mt-4 text-h1 text-text-primary">One app direction, different restaurant sales stories.</h1>
          <p className="mt-3 text-body text-text-secondary">Loglime packages the right product mix for each restaurant model without changing the core platform.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution) => (
            <Card key={solution}>
              <div className="mb-5 h-32 rounded-2xl bg-gradient-to-br from-slate-950 to-coral" />
              <h2 className="text-h3 text-text-primary">{solution}</h2>
              <p className="mt-3 text-body text-text-secondary">Reduce ordering friction, launch faster customer actions, and keep the restaurant story simple for staff and guests.</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
