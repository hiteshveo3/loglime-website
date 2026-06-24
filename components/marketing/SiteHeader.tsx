"use client";

import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

type MegaItem = {
  title: string;
  href: string;
  icon: string;
};

type MegaGroup = {
  items: MegaItem[];
  narrow?: boolean;
};

const productGroups: MegaGroup[] = [
  {
    items: [
      { title: "Restaurant Apps", href: "/products/restaurant", icon: "📲" },
      { title: "Online Ordering", href: "/products/restaurant#orders", icon: "🛍️" },
      { title: "Digital Menu", href: "/products/restaurant#menu", icon: "📺" },
      { title: "Table Booking", href: "/products/restaurant#bookings", icon: "🪑" },
      { title: "Loyalty", href: "/products/restaurant#loyalty", icon: "🎁" },
      { title: "QR Menu", href: "/products/restaurant#qr", icon: "🔳" }
    ]
  }
];

const solutionGroups: MegaGroup[] = [
  {
    items: [
      { title: "Cafes", href: "/solutions/restaurants", icon: "☕" },
      { title: "Bakeries", href: "/solutions/restaurants", icon: "🥐" },
      { title: "QSR", href: "/solutions/restaurants", icon: "🍔" },
      { title: "Dine-in", href: "/solutions/restaurants", icon: "🍽️" },
      { title: "Cloud Kitchen", href: "/solutions/restaurants", icon: "☁️" },
      { title: "Franchise", href: "/solutions/restaurants", icon: "🏢" }
    ]
  }
];

const resourceGroups: MegaGroup[] = [
  {
    narrow: true,
    items: [
      { title: "Blog", href: "/blog", icon: "" },
      { title: "Case Studies", href: "/blog", icon: "" },
      { title: "Guides", href: "/blog/how-to-scale-your-property-portfolio", icon: "" },
      { title: "Help Center", href: "/contact", icon: "" },
      { title: "FAQ", href: "/pricing#faq", icon: "" }
    ]
  }
];

const companyGroups: MegaGroup[] = [
  {
    narrow: true,
    items: [
      { title: "About", href: "/contact", icon: "" },
      { title: "Contact", href: "/contact", icon: "" },
      { title: "Partners", href: "/demo", icon: "" }
    ]
  }
];

const mobileLinks = [
  ["Company", "/contact"],
  ["Platform", "/products/restaurant"],
  ["Products", "/products/restaurant"],
  ["Solutions", "/solutions/restaurants"],
  ["Resources", "/demo"],
  ["Blog", "/blog"],
  ["Pricing", "/pricing"],
  ["Get started", "/signup"]
];

function MegaMenu({
  label,
  groups
}: {
  label: string;
  groups: MegaGroup[];
}) {
  const isNarrow = groups.some((group) => group.narrow);

  return (
    <div className={isNarrow ? "nav-item nav-item-narrow" : "nav-item"}>
      <button aria-haspopup="true" className="nav-trigger" type="button">
        {label}
        <ChevronDown size={14} />
      </button>
      <div className={isNarrow ? "mega-panel mega-panel-narrow" : "mega-panel"} role="menu">
        <div className={isNarrow ? "mega-list" : "mega-grid"}>
          {groups.map((group) => (
            <div className="mega-group" key={group.items.map((item) => item.title).join("-")}>
              {group.items.map((item) => (
                <Link className={isNarrow ? "mega-item mega-item-simple" : "mega-item"} href={item.href} key={item.title}>
                  {item.icon ? <span className="mega-emoji">{item.icon}</span> : null}
                  <strong>{item.title}</strong>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <div className="site-header-shell">
      <header className="site-header">
        <Logo />
        <nav className="site-nav" aria-label="Main navigation">
          <Link className="nav-link" href="/products/restaurant">
            Platform
          </Link>
          <MegaMenu groups={productGroups} label="Products" />
          <MegaMenu groups={solutionGroups} label="Solutions" />
          <Link className="nav-link" href="/pricing">
            Pricing
          </Link>
          <MegaMenu groups={resourceGroups} label="Resources" />
          <MegaMenu groups={companyGroups} label="Company" />
        </nav>
        <div className="site-actions">
          <Link className="site-login" href="/login">
            Login
          </Link>
          <Link className="site-demo" href="/demo">
            Book Demo
          </Link>
          <Link className="site-trial" href="/signup">
            Start Free Trial
          </Link>
        </div>
        <details className="mobile-nav">
          <summary aria-label="Open menu">
            <Menu size={18} />
          </summary>
          <div className="mobile-panel">
            {mobileLinks.map(([label, href]) => (
              <Link href={href} key={label}>
                {label}
              </Link>
            ))}
            <Link href="/login">Log in</Link>
            <Link href="/signup">Start free</Link>
          </div>
        </details>
      </header>
    </div>
  );
}
