"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";
import { SaasIcon, type SaasIconName } from "@/components/ui/SaasIcon";

type MegaItem = {
  title: string;
  copy: string;
  href: string;
  icon: SaasIconName;
  highlight?: boolean;
};

type MegaGroup = {
  title: string;
  items: MegaItem[];
};

const companyGroups: MegaGroup[] = [
  {
    title: "Company",
    items: [
      {
        title: "About Loglime",
        copy: "Restaurant app packages for brands that want more direct customers.",
        href: "/contact",
        icon: "building03"
      },
      {
        title: "Launch service",
        copy: "We help restaurants move from menu assets to a live app.",
        href: "/demo",
        icon: "task-done01"
      },
      {
        title: "Contact sales",
        copy: "Talk through fit, rollout and pricing for restaurant clients.",
        href: "/contact",
        icon: "mail02"
      }
    ]
  },
  {
    title: "Explore",
    items: [
      {
        title: "Pricing",
        copy: "Simple packages for digital menus, ordering and loyalty apps.",
        href: "/pricing",
        icon: "wallet-cards"
      },
      {
        title: "Security",
        copy: "How restaurant, customer and order data is handled.",
        href: "/security",
        icon: "shield01"
      },
      {
        title: "Demo",
        copy: "Preview the app experience before launch.",
        href: "/demo",
        icon: "dashboard-browsing"
      }
    ]
  }
];

const platformGroups: MegaGroup[] = [
  {
    title: "Restaurant apps",
    items: [
      {
        title: "Online ordering app",
        copy: "Let customers order pickup, delivery or dine-in from your brand.",
        href: "/products/restaurant#floor",
        icon: "dashboard-browsing"
      },
      {
        title: "Digital menu app",
        copy: "QR menu, categories, prices, item photos and availability.",
        href: "/products/restaurant#orders",
        icon: "task-done01"
      },
      {
        title: "Booking app",
        copy: "Table booking and reservation requests for restaurant guests.",
        href: "/products/restaurant#kitchen",
        icon: "notification03"
      }
    ]
  },
  {
    title: "Growth tools",
    items: [
      {
        title: "Loyalty app",
        copy: "Offers, repeat customer rewards and promo updates.",
        href: "/products/restaurant#menu",
        icon: "calendar-check"
      },
      {
        title: "App analytics",
        copy: "See orders, popular items, customer actions and growth.",
        href: "/products/restaurant#analytics",
        icon: "analytics-up"
      },
      {
        title: "Customer updates",
        copy: "Collect customer details and send offer-ready updates.",
        href: "/products/restaurant#roles",
        icon: "user-group"
      }
    ]
  }
];

const resourceGroups: MegaGroup[] = [
  {
    title: "Learn",
    items: [
      {
        title: "Insights blog",
        copy: "Design, launch and growth notes for app-led restaurant sales.",
        href: "/blog",
        icon: "dashboard-browsing",
        highlight: true
      },
      {
        title: "Product updates",
        copy: "New app modules, templates and restaurant launch features.",
        href: "/products/restaurant#updates",
        icon: "notification03",
        highlight: false
      },
      {
        title: "Launch guide",
        copy: "How a restaurant app goes from menu to live customer flow.",
        href: "/demo",
        icon: "task-done01"
      },
      {
        title: "Security",
        copy: "How restaurant app, customer and order data are protected.",
        href: "/security",
        icon: "shield01"
      }
    ]
  },
  {
    title: "Company",
    items: [
      {
        title: "Contact",
        copy: "Talk through fit, rollout and support.",
        href: "/contact",
        icon: "mail02"
      },
      {
        title: "Pricing",
        copy: "Simple app packages for restaurants.",
        href: "/pricing",
        icon: "wallet-cards"
      },
      {
        title: "Book a demo",
        copy: "See a restaurant app package end to end.",
        href: "/demo",
        icon: "calendar-check"
      }
    ]
  }
];

const mobileLinks = [
  ["Company", "/contact"],
  ["Platform", "/products/restaurant"],
  ["Resources", "/demo"],
  ["Blog", "/blog"],
  ["Pricing", "/pricing"],
  ["Get started", "/signup"]
];

function MegaMenu({
  label,
  groups,
  sideTitle,
  sideCopy,
  sideHref,
  sideCta,
  align = "left"
}: {
  label: string;
  groups: MegaGroup[];
  sideTitle: string;
  sideCopy: string;
  sideHref: string;
  sideCta: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "nav-item mega-align-right" : "nav-item"}>
      <button aria-haspopup="true" className="nav-trigger" type="button">
        {label}
        <ChevronDown size={14} />
      </button>
      <div className="mega-panel" role="menu">
        <div className="mega-grid">
          {groups.map((group) => (
            <div className="mega-group" key={group.title}>
              <p className="mega-title">{group.title}</p>
              {group.items.map((item) => (
                <Link className={item.highlight ? "mega-item mega-highlight" : "mega-item"} href={item.href} key={item.title}>
                  <span className="mega-icon">
                    <SaasIcon name={item.icon} size={21} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.copy}</small>
                  </span>
                </Link>
              ))}
            </div>
          ))}
          <div className="mega-side">
            <span className="mega-icon mega-icon-dark">
              <SaasIcon name="dashboard-browsing" size={22} />
            </span>
            <strong>{sideTitle}</strong>
            <p>{sideCopy}</p>
            <Link href={sideHref}>
              {sideCta}
              <ArrowRight size={14} />
            </Link>
          </div>
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
          <MegaMenu
            groups={companyGroups}
            label="Company"
            sideCopy="Loglime stays focused on customer-facing restaurant apps, not a heavy POS replacement."
            sideCta="Talk to us"
            sideHref="/contact"
            sideTitle="Restaurant app studio"
          />
          <MegaMenu
            groups={platformGroups}
            label="Platform"
            sideCopy="Sell digital menu, ordering, booking and loyalty apps with a clean launch process."
            sideCta="Explore restaurant apps"
            sideHref="/products/restaurant"
            sideTitle="Customer app modules"
          />
          <MegaMenu
            align="right"
            groups={resourceGroups}
            label="Resources"
            sideCopy="A calm implementation path from restaurant menu and brand assets to a live customer-facing app."
            sideCta="Book a demo"
            sideHref="/demo"
            sideTitle="Restaurant app launch"
          />
          <Link className="nav-link" href="/pricing">
            Pricing
          </Link>
        </nav>
        <div className="site-actions">
          <ButtonLink href="/signup" size="sm">
            Get started
          </ButtonLink>
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
