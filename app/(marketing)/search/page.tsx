import type { Metadata } from "next";

import { SiteSearch } from "@/components/marketing/site-search";

export const metadata: Metadata = {
  title: "Search Loglime",
  description: "Search Loglime products, pricing, restaurant technology guides, support, and legal information.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <main className="min-h-[70vh] bg-surface-alt">
      <section className="mx-auto max-w-3xl px-4 py-14 lg:py-20">
        <p className="text-center text-caption uppercase tracking-wider text-coral">Search</p>
        <h1 className="mt-3 text-center text-h1 text-text-primary">Find anything on Loglime.</h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-body text-text-secondary">Products, pricing, restaurant guides, support answers, and company information in one place.</p>
        <div className="mt-8"><SiteSearch /></div>
      </section>
    </main>
  );
}
