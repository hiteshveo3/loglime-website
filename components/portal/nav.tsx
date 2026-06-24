"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const PORTAL_NAV = [
  { href: "/portal/dashboard", icon: "hgi-home-01", label: "Dashboard" },
  { href: "/portal/projects", icon: "hgi-briefcase-01", label: "Projects" },
  { href: "/portal/orders", icon: "hgi-shopping-cart-01", label: "Orders" },
  { href: "/portal/invoices", icon: "hgi-invoice-01", label: "Invoices" },
  { href: "/portal/support", icon: "hgi-customer-support", label: "Support" },
  { href: "/portal/downloads", icon: "hgi-download-01", label: "Downloads" },
  { href: "/portal/announcements", icon: "hgi-megaphone-01", label: "Announcements" },
  { href: "/portal/settings", icon: "hgi-settings-01", label: "Settings" },
];

function NavLink({ href, icon, label, active }: { href: string; icon: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-11 items-center gap-3 rounded-full px-4 text-small font-semibold transition",
        active ? "bg-coral-light text-coral" : "text-text-secondary hover:bg-slate-100 hover:text-text-primary",
      )}
    >
      <i className={cn("hgi-stroke text-lg", icon)} />
      <span>{label}</span>
    </Link>
  );
}

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[220px] shrink-0 border-r border-border bg-white lg:sticky lg:top-0 lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-border px-5">
        <a href="/portal/dashboard" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-coral text-lg font-bold text-white shadow-floating">L</span>
          <span className="text-h4 text-text-primary">My Portal</span>
        </a>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {PORTAL_NAV.map((item) => (
          <NavLink key={item.href} href={item.href} icon={item.icon} label={item.label} active={pathname.startsWith(item.href)} />
        ))}
      </nav>
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-light text-small font-bold text-coral">R</div>
          <div className="min-w-0">
            <p className="truncate text-small font-semibold text-text-primary">Restaurant Owner</p>
            <p className="truncate text-caption text-text-muted">customer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function PortalMobileNav() {
  const pathname = usePathname();
  const mobileItems = PORTAL_NAV.slice(0, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white pb-safe lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("flex flex-col items-center gap-1 px-3 py-1 text-caption font-semibold transition", active ? "text-coral" : "text-text-muted")}
            >
              <i className={cn("hgi-stroke text-xl", item.icon)} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function PortalTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white px-4 lg:px-6">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3 lg:hidden">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-coral text-sm font-bold text-white">L</span>
          <span className="text-h4 text-text-primary">My Portal</span>
        </div>
        <div className="hidden lg:block" />
        <div className="flex items-center gap-3">
          <a href="/portal/support" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-alt text-text-secondary transition hover:bg-coral-light hover:text-coral">
            <i className="hgi-stroke hgi-customer-support text-lg" />
          </a>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-light text-small font-bold text-coral">R</div>
        </div>
      </div>
    </header>
  );
}
