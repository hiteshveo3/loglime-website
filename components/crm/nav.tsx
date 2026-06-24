"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CRM_NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/app";

const fallbackUser = {
  name: "Sameer Basra",
  role: "owner" as UserRole,
};

function getVisibleItems(role: UserRole) {
  return CRM_NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(role));
}

function NavLink({ href, icon, label, active, compact }: { href: string; icon: string; label: string; active: boolean; compact?: boolean }) {
  return (
    <Link
      className={cn(
        "flex h-11 items-center gap-3 rounded-full px-4 text-small font-semibold transition",
        active ? "bg-coral-light text-coral" : "text-text-secondary hover:bg-slate-100 hover:text-text-primary",
        compact && "justify-center px-0",
      )}
      href={href}
      scroll={false}
      title={compact ? label : undefined}
    >
      <i className={cn("hgi-stroke text-lg", icon)} />
      {!compact ? <span>{label}</span> : null}
    </Link>
  );
}

export function CrmSidebar({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const items = useMemo(() => getVisibleItems(fallbackUser.role), []);

  return (
    <aside className={cn("hidden h-screen border-r border-border bg-white lg:sticky lg:top-0 lg:flex lg:flex-col", compact ? "w-[72px]" : "w-[260px]")}>
      <div className={cn("flex h-20 items-center border-b border-border px-5", compact && "justify-center px-0")}>
        <a className="flex items-center gap-3" href="/crm/dashboard">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-coral text-lg font-bold text-white shadow-floating">L</span>
          {!compact ? <span className="text-h3 text-text-primary">Loglime</span> : null}
        </a>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => (
          <NavLink key={item.href} href={item.href} icon={item.icon} label={item.label} active={pathname.startsWith(item.href)} compact={compact} />
        ))}
      </nav>
      <div className="border-t border-border p-4">
        <div className={cn("flex items-center gap-3", compact && "justify-center")}>
          <Avatar name={fallbackUser.name} />
          {!compact ? (
            <div className="min-w-0">
              <p className="truncate text-small font-semibold text-text-primary">{fallbackUser.name}</p>
              <p className="text-caption uppercase tracking-wide text-text-muted">{fallbackUser.role}</p>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

export function CrmMobileNav() {
  const pathname = usePathname();
  const allItems = useMemo(() => getVisibleItems(fallbackUser.role), []);
  const items = allItems.slice(0, 4);
  const moreItems = allItems.slice(4);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-white px-2 py-2 lg:hidden">
        {items.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <a key={item.href} className={cn("flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-caption font-semibold transition", active ? "text-coral" : "text-text-muted hover:text-text-primary")} href={item.href}>
              <i className={cn("hgi-stroke text-xl", item.icon)} />
              <span className="max-w-full truncate">{item.label}</span>
            </a>
          );
        })}
        <button onClick={() => setMoreOpen(true)} className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-caption font-semibold text-text-muted hover:text-text-primary transition">
          <i className="hgi-stroke hgi-menu-dots-vertical text-xl" />
          <span>More</span>
        </button>
      </nav>

      {/* More menu overlay */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          <div className="fixed inset-0 bg-slate-900/40" onClick={() => setMoreOpen(false)} />
          <div className="relative w-full rounded-t-3xl bg-white p-6 shadow-modal">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-h3 text-text-primary">More Options</h2>
              <button onClick={() => setMoreOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-text-secondary">
                <i className="hgi-stroke hgi-cancel-01" />
              </button>
            </div>
            <nav className="grid grid-cols-2 gap-3">
              {moreItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <a key={item.href} onClick={() => setMoreOpen(false)} className={cn("flex flex-col items-center gap-2 rounded-2xl px-4 py-4 transition", active ? "bg-coral-light text-coral" : "bg-surface-alt text-text-secondary hover:text-text-primary")} href={item.href}>
                    <i className={cn("hgi-stroke text-2xl", item.icon)} />
                    <span className="text-small font-semibold text-center">{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export function CrmTopbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const items = useMemo(() => getVisibleItems(fallbackUser.role), []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-white px-4 py-3 backdrop-blur-sm lg:px-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 lg:hidden" onClick={() => setOpen(true)} aria-label="Open CRM menu">
            <i className="hgi-stroke hgi-menu-01 text-xl" />
          </button>
          <div className="min-w-0">
            <p className="text-caption uppercase tracking-wide text-text-muted">CRM</p>
            <h1 className="truncate text-h3 text-text-primary">Loglime Operations</h1>
          </div>
          <form
            className="max-w-xl flex-1 hidden lg:block"
            onSubmit={(event) => {
              event.preventDefault();
              const query = search.trim();
              router.push(query ? `/crm/leads?search=${encodeURIComponent(query)}` : "/crm/leads");
            }}
          >
            <label className="relative block">
              <span className="sr-only">Search CRM</span>
              <i className="hgi-stroke hgi-search-01 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input className="h-11 w-full rounded-full border border-border-strong bg-surface-alt pl-11 pr-4 text-small font-semibold text-text-primary outline-none transition placeholder:text-text-muted focus:border-coral focus:bg-white focus:ring-4 focus:ring-coral/10" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search leads, customers, orders, or projects..." />
            </label>
          </form>
          {!mobileSearch ? (
            <button className="flex lg:hidden h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-text-secondary" aria-label="Search" onClick={() => setMobileSearch(true)}>
              <i className="hgi-stroke hgi-search-01 text-xl" />
            </button>
          ) : (
            <form className="flex flex-1 lg:hidden" onSubmit={(e) => { e.preventDefault(); const q = search.trim(); setMobileSearch(false); router.push(q ? `/crm/leads?search=${encodeURIComponent(q)}` : "/crm/leads"); }}>
              <input className="flex-1 rounded-full border border-border-strong bg-surface-alt pl-4 pr-4 text-small font-semibold text-text-primary outline-none transition placeholder:text-text-muted focus:border-coral focus:bg-white focus:ring-4 focus:ring-coral/10" value={search} onChange={(e) => setSearch(e.target.value)} onBlur={() => setMobileSearch(false)} placeholder="Search..." autoFocus />
            </form>
          )}
          <div className="flex items-center gap-2">
            <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-text-secondary" aria-label="Notifications">
              <i className="hgi-stroke hgi-notification-01 text-xl" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral" />
            </button>
            <Avatar name={fallbackUser.name} />
          </div>
        </div>
      </header>
      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden">
          <div className="h-full w-[86vw] max-w-sm bg-white p-4 shadow-modal">
            <div className="mb-5 flex items-center justify-between">
              <a className="flex items-center gap-3" href="/crm/dashboard">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-coral text-lg font-bold text-white shadow-floating">L</span>
                <span className="text-h3 text-text-primary">Loglime</span>
              </a>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label="Close CRM menu">
                <i className="hgi-stroke hgi-cancel-01" />
              </Button>
            </div>
            <nav className="space-y-1">
              {items.map((item) => (
                <a
                  key={item.href}
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-full px-4 text-small font-semibold",
                    pathname.startsWith(item.href) ? "bg-coral-light text-coral" : "text-text-secondary",
                  )}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  <i className={cn("hgi-stroke text-lg", item.icon)} />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
