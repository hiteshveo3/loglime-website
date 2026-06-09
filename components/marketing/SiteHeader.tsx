"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

type HeaderVariant = "classic" | "split" | "banner";

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

const solutionGroups: MegaGroup[] = [
  {
    title: "By restaurant type",
    items: [
      {
        title: "Full-service restaurants",
        copy: "Ordering, menu and booking apps for table-service brands.",
        href: "/solutions/restaurants",
        icon: "building03"
      },
      {
        title: "Quick service",
        copy: "Fast ordering apps for takeaway, delivery and counter service.",
        href: "/solutions/restaurants#quick-service",
        icon: "delivery-truck01"
      },
      {
        title: "Cafes and bakeries",
        copy: "Menu, loyalty and pre-order apps for repeat customers.",
        href: "/solutions/restaurants#cafes",
        icon: "wallet-cards"
      }
    ]
  },
  {
    title: "By team",
    items: [
      {
        title: "Owners",
        copy: "Launch branded apps without hiring a full product team.",
        href: "/solutions/restaurants#owners",
        icon: "analytics-up"
      },
      {
        title: "Managers",
        copy: "Update menus, offers and customer-facing app content.",
        href: "/solutions/restaurants#managers",
        icon: "shield01"
      },
      {
        title: "Servers",
        copy: "Receive online orders and booking requests in a clean flow.",
        href: "/solutions/restaurants#servers",
        icon: "payment-success01"
      }
    ]
  }
];

const resourceGroups: MegaGroup[] = [
  {
    title: "Learn",
    items: [
      {
        title: "Product updates",
        copy: "New app modules, templates and restaurant launch features.",
        href: "/products/restaurant#updates",
        icon: "notification03",
        highlight: true
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
  ["Products", "/products/restaurant"],
  ["Solutions", "/solutions/restaurants"],
  ["Pricing", "/pricing"],
  ["Resources", "/demo"],
  ["Customers", "/#customers-story"],
  ["Book a demo", "/demo"],
  ["Contact", "/contact"],
  ["Open demo app", "/app/dashboard"]
];

function normalizeVariant(value: string | null): HeaderVariant {
  if (value === "split" || value === "banner") {
    return value;
  }

  return "classic";
}

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
  const [variant, setVariant] = useState<HeaderVariant>("classic");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setVariant(normalizeVariant(new URLSearchParams(window.location.search).get("header")));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`site-header-shell header-${variant}`}>
      {variant === "banner" ? (
        <Link className="announcement-bar" href="/demo">
          Restaurant app packages are ready for demos
          <span>
            Book a walkthrough <ArrowRight size={13} />
          </span>
        </Link>
      ) : null}
      <header className="site-header">
        <Logo />
        <nav className="site-nav" aria-label="Main navigation">
          <MegaMenu
            groups={platformGroups}
            label="Products"
            sideCopy="Preview a restaurant app package with ordering, digital menu, bookings and customer updates."
            sideCta="View sample app"
            sideHref="/app/dashboard"
            sideTitle="Sample restaurant app"
          />
          <MegaMenu
            groups={solutionGroups}
            label="Solutions"
            sideCopy="Sell apps to cafes, QSRs, bakeries and full-service restaurants without overcomplicating the pitch."
            sideCta="Explore restaurant apps"
            sideHref="/solutions/restaurants"
            sideTitle="Built for restaurant sales"
          />
          <Link className="nav-link" href="/pricing">
            Pricing
          </Link>
          <MegaMenu
            align="right"
            groups={resourceGroups}
            label="Resources"
            sideCopy="A calm implementation path from restaurant menu and brand assets to a live customer-facing app."
            sideCta="Book a demo"
            sideHref="/demo"
            sideTitle="Restaurant app launch"
          />
          <Link className="nav-link" href="/#customers-story">
            Customers
          </Link>
        </nav>
        <div className="site-actions">
          <Link className="btn btn-ghost btn-sm" href="/login">
            Log in
          </Link>
          <ButtonLink href="/demo" variant="outline" size="sm">
            Book a demo
          </ButtonLink>
          <ButtonLink href="/signup" size="sm">
            Start free
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
