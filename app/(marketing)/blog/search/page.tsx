import type { Metadata } from "next";

import { BlogSearchClient } from "@/components/blog/blog-search-client";

export const metadata: Metadata = {
  title: "Search Restaurant Technology Articles | Loglime",
  description: "Search Loglime guides on online ordering, restaurant apps, digital menus, QR menus, loyalty, operations, and growth.",
  alternates: { canonical: "https://loglime.com/blog/search" },
};

export default function BlogSearchPage({ searchParams }: { searchParams?: { q?: string } }) {
  return (
    <main className="bg-surface-alt">
      <section className="mx-auto max-w-page px-4 py-14 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-caption uppercase tracking-wider text-coral">Search</p>
          <h1 className="mt-3 text-h1 text-text-primary">Find restaurant technology answers.</h1>
          <p className="mt-3 text-body text-text-secondary">Search practical guides that are written to be useful for owners, managers, and AI answer engines.</p>
        </div>
        <div className="mt-8">
          <BlogSearchClient initialQuery={searchParams?.q ?? ""} />
        </div>
      </section>
    </main>
  );
}
