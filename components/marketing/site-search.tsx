"use client";

import { useMemo, useState } from "react";

const entries = [
  { title: "Online Ordering", type: "Product", href: "/products/online-ordering", keywords: "pickup delivery commission free orders" },
  { title: "Digital Menu", type: "Product", href: "/products/digital-menu", keywords: "menu food categories mobile" },
  { title: "Table Booking", type: "Product", href: "/products/table-booking", keywords: "reservation tables guests" },
  { title: "Loyalty Program", type: "Product", href: "/products/loyalty", keywords: "points stamps rewards customers" },
  { title: "QR Menu", type: "Product", href: "/products/qr-menu", keywords: "scan order table" },
  { title: "Restaurant App", type: "Product", href: "/products/restaurant-app", keywords: "android ios branded app" },
  { title: "Pricing", type: "Page", href: "/pricing", keywords: "starter growth scale 149 249 399 one time" },
  { title: "Restaurant technology guides", type: "Blog", href: "/blog", keywords: "articles guides ordering menu restaurant growth" },
  { title: "Frequently asked questions", type: "Help", href: "/faq", keywords: "support setup ownership fees launch" },
  { title: "About Loglime", type: "Company", href: "/about", keywords: "company team mission Sameer Ahmad Basra" },
  { title: "Contact Loglime", type: "Company", href: "/contact", keywords: "email phone sales support message" },
  { title: "Legal Center", type: "Legal", href: "/legal", keywords: "privacy terms cookies refunds acceptable use" },
];

export function SiteSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return entries;
    return entries.filter((entry) => `${entry.title} ${entry.type} ${entry.keywords}`.toLowerCase().includes(needle));
  }, [query]);

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Search Loglime</span>
        <i className="hgi-stroke hgi-search-01 absolute left-5 top-1/2 -translate-y-1/2 text-xl text-text-muted" />
        <input autoFocus className="h-16 w-full rounded-2xl border border-border-strong bg-white pl-14 pr-5 text-body font-semibold text-text-primary shadow-card outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, pricing, guides, or help..." />
      </label>
      <div className="mt-6 grid gap-3">
        {results.map((entry) => (
          <a key={entry.href} className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-white p-5 shadow-card transition hover:border-coral/30 hover:bg-coral-light" href={entry.href}>
            <span><span className="block text-h4 text-text-primary">{entry.title}</span><span className="mt-1 block text-small text-text-muted">{entry.type}</span></span>
            <i className="hgi-stroke hgi-arrow-right-01 text-coral" />
          </a>
        ))}
        {!results.length ? <div className="rounded-2xl border border-dashed border-border-strong p-8 text-center text-body text-text-secondary">No result found. Try a product name, “pricing”, or “support”.</div> : null}
      </div>
    </div>
  );
}
