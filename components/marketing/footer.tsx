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
            <a href="https://www.linkedin.com/company/loglime/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://web.facebook.com/theloglime" target="_blank" rel="noopener noreferrer" title="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/loglime/" target="_blank" rel="noopener noreferrer" title="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
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
