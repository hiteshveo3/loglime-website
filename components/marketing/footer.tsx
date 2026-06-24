"use client";

import { useState } from "react";

import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

const columns = [
  {
    title: "Products",
    links: [
      { label: "Online Ordering", href: "/products/online-ordering" },
      { label: "Digital Menu", href: "/products/digital-menu" },
      { label: "Table Booking", href: "/products/table-booking" },
      { label: "Loyalty Program", href: "/products/loyalty" },
      { label: "QR Menu", href: "/products/qr-menu" },
      { label: "Restaurant App", href: "/products/restaurant-app" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Cafes & Coffee Shops", href: "/solutions/cafes" },
      { label: "Bakeries", href: "/solutions/bakeries" },
      { label: "Quick-Service", href: "/solutions/qsr" },
      { label: "Dine-In", href: "/solutions/dine-in" },
      { label: "Cloud Kitchens", href: "/solutions/cloud-kitchen" },
      { label: "Franchise", href: "/solutions/franchise" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Help Center", href: "/faq" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Demo", href: "/demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Legal Center", href: "/legal" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Refund Policy", href: "/refunds" },
      { label: "Acceptable Use", href: "/acceptable-use" },
    ],
  },
];

export function MarketingFooter() {
  const [openColumn, setOpenColumn] = useState<string | null>("Products");

  return (
    <footer className="border-t border-border bg-white pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-page gap-8 px-4 py-10 lg:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-body text-text-secondary">Apps for restaurants. Loglime LLC, 1207 Delaware Ave Ste 303, Wilmington, DE 19806, United States.</p>
          <div className="mt-5 flex gap-3">
            <a href="https://www.linkedin.com/company/loglime/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-text-secondary hover:bg-[#0A66C2] hover:text-white transition">in</a>
            <a href="https://web.facebook.com/theloglime" target="_blank" rel="noopener noreferrer" title="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-text-secondary hover:bg-[#1877F2] hover:text-white transition">f</a>
            <a href="https://www.instagram.com/loglime/" target="_blank" rel="noopener noreferrer" title="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-text-secondary hover:bg-gradient-to-r hover:from-[#405DE6] hover:via-[#E1306C] hover:to-[#FD1D1D] hover:text-white transition">📷</a>
            <a href="https://www.sortlist.com/agency/loglime" target="_blank" rel="noopener noreferrer" title="SortList" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-text-secondary hover:bg-coral hover:text-white transition text-xs">SL</a>
            <a href="https://www.goodfirms.co/company/loglime" target="_blank" rel="noopener noreferrer" title="GoodFirms" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-text-secondary hover:bg-[#FDB913] hover:text-white transition">⭐</a>
            <a href="https://crunchbase.com/organization/loglime" target="_blank" rel="noopener noreferrer" title="Crunchbase" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-text-secondary hover:bg-[#1E3932] hover:text-white transition text-xs">CB</a>
          </div>
        </div>
        <div className="hidden gap-6 sm:grid-cols-2 lg:grid lg:grid-cols-5">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-h4 text-text-primary">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a className="text-small text-text-secondary transition hover:text-coral" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="grid gap-3 lg:hidden">
          {columns.map((column) => {
            const open = openColumn === column.title;
            return (
              <div key={column.title} className="rounded-2xl border border-border bg-white">
                <button className="flex w-full items-center justify-between px-4 py-4 text-left text-h4 text-text-primary hover:text-coral transition" onClick={() => setOpenColumn(open ? null : column.title)}>
                  {column.title}
                  <i className={cn("hgi-stroke hgi-arrow-down-01 text-text-muted transition", open && "rotate-180")} />
                </button>
                {open ? (
                  <ul className="grid gap-2 px-4 pb-4">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <a className="block rounded-xl px-3 py-2 text-small text-text-secondary hover:bg-white hover:text-coral" href={link.href}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-small text-text-muted">(c) 2026 Loglime LLC. All rights reserved. Made for restaurants.</div>
    </footer>
  );
}
