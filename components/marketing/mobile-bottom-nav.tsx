"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/", icon: "hgi-home-01" },
  { label: "Products", href: "/products", icon: "hgi-grid-view" },
  { label: "Pricing", href: "/pricing", icon: "hgi-dollar-circle" },
  { label: "Search", href: "/search", icon: "hgi-search-01" },
  { label: "Demo", href: "/demo", icon: "hgi-calendar-03" },
];

export function MarketingBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-white px-2 py-2 shadow-modal lg:hidden">
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <a key={item.href} className={cn("flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-caption font-semibold", active ? "text-coral" : "text-text-muted")} href={item.href}>
            <i className={cn("hgi-stroke text-xl", item.icon)} />
            <span className="max-w-full truncate">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
