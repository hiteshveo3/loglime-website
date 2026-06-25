"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type MenuKey = "products" | "solutions" | "resources" | "company";

const products = [
  { icon: "hgi-shopping-cart-01", name: "Online Ordering", desc: "Commission-free orders for pickup and delivery", href: "/products/online-ordering" },
  { icon: "hgi-menu-restaurant", name: "Digital Menu", desc: "Always updated, always beautiful on any screen", href: "/products/digital-menu" },
  { icon: "hgi-calendar-check-in-01", name: "Table Booking", desc: "24/7 reservations with automated reminders", href: "/products/table-booking" },
  { icon: "hgi-gift", name: "Loyalty Program", desc: "Points, stamps, rewards in your branded app", href: "/products/loyalty" },
  { icon: "hgi-qr-code", name: "QR Menu", desc: "No app needed. Scan. See. Order.", href: "/products/qr-menu" },
  { icon: "hgi-smart-phone-01", name: "Restaurant App", desc: "Your name on the App Store and Google Play", href: "/products/restaurant-app" },
];

const solutions = [
  { icon: "hgi-coffee-01", name: "Cafes & Coffee Shops", desc: "Direct ordering and loyalty for morning regulars", href: "/solutions/cafes" },
  { icon: "hgi-bread-01", name: "Bakeries & Patisseries", desc: "Pre-orders, sold-out flags, daily demand planning", href: "/solutions/bakeries" },
  { icon: "hgi-hamburger-01", name: "Quick-Service Restaurants", desc: "Fast checkout, high volume, commission-free delivery", href: "/solutions/qsr" },
  { icon: "hgi-restaurant-01", name: "Dine-In Restaurants", desc: "Table booking, QR menus, guest loyalty recognition", href: "/solutions/dine-in" },
  { icon: "hgi-cloud", name: "Cloud & Ghost Kitchens", desc: "Build direct channels away from platform dependency", href: "/solutions/cloud-kitchen" },
  { icon: "hgi-building-03", name: "Franchise & Multi-Location", desc: "Central control across every location", href: "/solutions/franchise" },
];

const resources = [
  { label: "Blog", href: "/blog", icon: "hgi-blogger" },
  { label: "Case Studies", href: "/blog/case-studies", icon: "hgi-analytics-up" },
  { label: "Guides", href: "/blog/online-ordering", icon: "hgi-book-open-01" },
  { label: "Help Center", href: "/faq", icon: "hgi-customer-support" },
];

const company = [
  { label: "About", href: "/about", icon: "hgi-building-06" },
  { label: "Contact", href: "/contact", icon: "hgi-mail-01" },
  { label: "Legal Center", href: "/legal", icon: "hgi-license" },
];

function MenuRow({ item }: { item: { icon: string; name: string; desc: string; href: string } }) {
  return (
    <a className="group flex items-start gap-3 rounded-xl p-3 transition duration-150 hover:bg-coral-light" href={item.href}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-alt text-slate-600 transition duration-150 group-hover:bg-coral group-hover:text-white">
        <i className={cn("hgi-stroke text-xl", item.icon)} />
      </span>
      <span>
        <span className="block text-[15px] font-semibold text-text-primary transition group-hover:text-coral">{item.name}</span>
        <span className="mt-0.5 block text-[13px] font-medium leading-relaxed text-text-muted group-hover:text-text-secondary">{item.desc}</span>
      </span>
    </a>
  );
}

function ProductsMegaMenu() {
  return (
    <div className="fixed left-1/2 top-[116px] z-50 grid w-[min(860px,calc(100vw-2rem))] -translate-x-1/2 grid-cols-[1fr_280px] gap-6 rounded-2xl border border-border bg-white p-6 shadow-modal">
      <div>
        <p className="mb-2 px-3 text-caption uppercase tracking-wider text-text-muted">Products</p>
        <div className="grid gap-1">
          {products.map((item) => (
            <MenuRow key={item.href} item={item} />
          ))}
        </div>
      </div>
      <div className="border-l border-border pl-6">
        <p className="mb-3 text-caption uppercase tracking-wider text-text-muted">Most Popular</p>
        <div className="rounded-2xl border border-coral/30 bg-gradient-to-br from-coral-soft via-coral-light to-white p-5 shadow-floating">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-coral text-white">
            <i className="hgi-stroke hgi-shopping-cart-01 text-lg" />
          </div>
          <p className="text-[15px] font-bold text-text-primary">Online Ordering</p>
          <p className="mt-2 text-[13px] font-medium leading-relaxed text-text-secondary">Keep 100% of every order. No commissions, ever.</p>
          <a className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-coral hover:text-coral-hover" href="/demo">
            Start free trial
            <i className="hgi-stroke hgi-arrow-right-01 text-sm" />
          </a>
        </div>
        <a className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-text-muted hover:text-coral" href="/products">
          See all products
          <i className="hgi-stroke hgi-arrow-right-01 text-xs" />
        </a>
      </div>
    </div>
  );
}

function SolutionsMegaMenu() {
  return (
    <div className="fixed left-1/2 top-[116px] z-50 grid w-[min(860px,calc(100vw-2rem))] -translate-x-1/2 grid-cols-[1fr_280px] gap-6 rounded-2xl border border-border bg-white p-6 shadow-modal">
      <div>
        <p className="mb-2 px-3 text-caption uppercase tracking-wider text-text-muted">Built For</p>
        <div className="grid gap-1">
          {solutions.map((item) => (
            <MenuRow key={item.href} item={item} />
          ))}
        </div>
      </div>
      <div className="border-l border-border pl-6">
        <p className="mb-3 text-caption uppercase tracking-wider text-text-muted">By The Numbers</p>
        <div className="rounded-2xl bg-surface-alt p-5">
          {[
            ["120+", "restaurants launched"],
            ["$0", "commissions charged"],
            ["38%", "avg. repeat order lift"],
          ].map(([value, label]) => (
            <div key={label} className="border-b border-border py-4 first:pt-0 last:border-0 last:pb-0">
              <p className="text-h2 text-text-primary">{value}</p>
              <p className="text-small text-text-secondary">{label}</p>
            </div>
          ))}
          <a className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-coral hover:text-coral-hover" href="/demo">
            Book a demo
            <i className="hgi-stroke hgi-arrow-right-01 text-sm" />
          </a>
        </div>
        <a className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-text-muted hover:text-coral" href="/solutions">
          See all solutions
          <i className="hgi-stroke hgi-arrow-right-01 text-xs" />
        </a>
      </div>
    </div>
  );
}

function SmallDropdown({ items, width = "w-[220px]" }: { items: Array<{ label: string; href: string; icon: string }>; width?: string }) {
  return (
    <div className={cn("absolute left-0 top-full z-50 mt-2 rounded-2xl border border-border bg-white p-2 shadow-modal", width)}>
      {items.map((item) => (
        <a key={item.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-small font-semibold text-text-secondary hover:bg-coral-light hover:text-coral" href={item.href}>
          <i className={cn("hgi-stroke text-lg", item.icon)} />
          {item.label}
        </a>
      ))}
    </div>
  );
}

function DesktopMenuButton({ label, menuKey, openKey, onOpen, children }: { label: string; menuKey: MenuKey; openKey: MenuKey | null; onOpen: (key: MenuKey | null) => void; children: ReactNode }) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const open = openKey === menuKey;

  function scheduleClose() {
    closeTimer.current = setTimeout(() => onOpen(null), 200);
  }

  function cancelClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    onOpen(menuKey);
  }

  return (
    <div
      className="relative"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      onMouseMove={cancelClose}
    >
      <button className="inline-flex h-11 items-center gap-1 rounded-full px-3 text-small font-semibold text-text-secondary transition hover:bg-slate-100 hover:text-coral" aria-haspopup="menu" aria-expanded={open} onFocus={() => onOpen(menuKey)}>
        {label}
        <i className={cn("hgi-stroke hgi-arrow-down-01 text-xs transition", open && "rotate-180")} />
      </button>
      {open ? <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>{children}</div> : null}
    </div>
  );
}

function MobileSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-surface-alt">
      <button className="flex w-full items-center justify-between px-4 py-4 text-left text-h4 text-text-primary" onClick={() => setOpen((value) => !value)}>
        {title}
        <i className={cn("hgi-stroke hgi-arrow-down-01 text-text-muted transition", open && "rotate-180")} />
      </button>
      {open ? <div className="grid gap-1 px-3 pb-3">{children}</div> : null}
    </div>
  );
}

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey, setOpenKey] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenKey(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const mobileGroups = useMemo(
    () => [
      { title: "Products", items: products },
      { title: "Solutions", items: solutions },
    ],
    [],
  );

  return (
    <header className={cn("sticky top-0 z-40 bg-white transition duration-200", scrolled ? "border-b border-border shadow-card" : "border-b border-transparent")}>
      <div className="bg-coral px-4 py-2 text-center text-small font-semibold text-white">
        <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-white" />
        Promotional launch package: Ordering App + Admin Panel for $149
      </div>
      <div className={cn("mx-auto flex max-w-page items-center justify-between px-4 transition-all duration-200 lg:px-8", scrolled ? "h-[72px]" : "h-20")}>
        <a href="/" aria-label="Loglime home">
          <Logo />
        </a>
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          <a className="inline-flex h-11 items-center rounded-full px-3 text-small font-semibold text-text-secondary transition hover:bg-slate-100 hover:text-coral" href="/platform">Platform</a>
          <DesktopMenuButton label="Products" menuKey="products" openKey={openKey} onOpen={setOpenKey}>
            <ProductsMegaMenu />
          </DesktopMenuButton>
          <DesktopMenuButton label="Solutions" menuKey="solutions" openKey={openKey} onOpen={setOpenKey}>
            <SolutionsMegaMenu />
          </DesktopMenuButton>
          <a className="inline-flex h-11 items-center rounded-full px-3 text-small font-semibold text-text-secondary transition hover:bg-slate-100 hover:text-coral" href="/pricing">Pricing</a>
          <DesktopMenuButton label="Resources" menuKey="resources" openKey={openKey} onOpen={setOpenKey}>
            <SmallDropdown items={resources} />
          </DesktopMenuButton>
          <DesktopMenuButton label="Company" menuKey="company" openKey={openKey} onOpen={setOpenKey}>
            <SmallDropdown items={company} width="w-[190px]" />
          </DesktopMenuButton>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-text-secondary transition hover:bg-coral-light hover:text-coral" href="/search" aria-label="Search Loglime">
            <i className="hgi-stroke hgi-search-01 text-lg" />
          </a>
          <Button asChildHack="a" href="https://app.loglime.com/login" variant="ghost">
            Login
          </Button>
          <Button asChildHack="a" href="/demo" variant="secondary">
            Book Demo
          </Button>
          <Button asChildHack="a" href="/demo">
            Start Free Trial
          </Button>
        </div>
        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <i className="hgi-stroke hgi-menu-01 text-xl" />
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm lg:hidden">
          <div className="flex h-full flex-col bg-white">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <Logo />
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-text-secondary" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <i className="hgi-stroke hgi-cancel-01 text-xl" />
              </button>
            </div>
            <nav className="flex-1 space-y-3 overflow-y-auto p-4" aria-label="Mobile navigation">
              <a className="block rounded-2xl bg-surface-alt px-4 py-4 text-h4 text-text-primary" href="/platform" onClick={() => setMobileOpen(false)}>Platform</a>
              {mobileGroups.map((group) => (
                <MobileSection key={group.title} title={group.title}>
                  {group.items.map((item) => (
                    <a key={item.href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-small font-semibold text-text-secondary hover:bg-white hover:text-coral" href={item.href} onClick={() => setMobileOpen(false)}>
                      <i className={cn("hgi-stroke text-lg", item.icon)} />
                      <span>
                        <span className="block text-text-primary">{item.name}</span>
                        <span className="block font-medium text-text-muted">{item.desc}</span>
                      </span>
                    </a>
                  ))}
                </MobileSection>
              ))}
              <a className="block rounded-2xl bg-surface-alt px-4 py-4 text-h4 text-text-primary" href="/pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
              <MobileSection title="Resources">
                {resources.map((item) => (
                  <a key={item.href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-small font-semibold text-text-secondary hover:bg-white hover:text-coral" href={item.href} onClick={() => setMobileOpen(false)}>
                    <i className={cn("hgi-stroke text-lg", item.icon)} />
                    {item.label}
                  </a>
                ))}
              </MobileSection>
              <MobileSection title="Company">
                {company.map((item) => (
                  <a key={item.href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-small font-semibold text-text-secondary hover:bg-white hover:text-coral" href={item.href} onClick={() => setMobileOpen(false)}>
                    <i className={cn("hgi-stroke text-lg", item.icon)} />
                    {item.label}
                  </a>
                ))}
              </MobileSection>
            </nav>
            <div className="grid gap-3 border-t border-border p-4 pb-24">
              <Button asChildHack="a" href="/demo">Start Free Trial</Button>
              <Button asChildHack="a" href="https://app.loglime.com/login" variant="secondary">Login</Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
