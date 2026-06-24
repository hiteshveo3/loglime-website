import type { Metadata } from "next";

export type DetailPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  sections: Array<{
    h2: string;
    body: string;
    h3?: string[];
  }>;
  related: Array<{ label: string; href: string }>;
};

export const productPages: DetailPage[] = [
  {
    slug: "online-ordering",
    title: "Commission-Free Online Ordering — Loglime",
    description: "Accept commission-free orders for pickup and delivery through your own branded platform. Keep 100% of food revenue. Go live in 14 days.",
    h1: "Commission-Free Online Ordering for Restaurants",
    sections: [
      { h2: "Stop paying commission on every order you earn.", body: "Direct ordering lets customers buy from your restaurant without sending margin to third-party delivery platforms." },
      { h2: "How Loglime online ordering works.", body: "Your menu goes live, customers order directly, and revenue lands in your account.", h3: ["Step 1: Your menu is live", "Step 2: Customers order directly", "Step 3: Revenue lands in your account"] },
      { h2: "Every feature you need to take direct orders.", body: "Branded checkout, pickup and delivery slots, scheduled orders, kitchen notifications, and Stripe-powered payments are included." },
      { h2: "What makes Loglime different from delivery platforms?", body: "Loglime charges a flat fee. You own the customer relationship, the order data, and the branded experience." },
      { h2: "Start accepting commission-free orders today.", body: "Book a demo and we will map the right direct ordering setup for your restaurant." },
    ],
    related: [
      { label: "See pricing", href: "/pricing" },
      { label: "Book a demo", href: "/demo" },
      { label: "Cloud kitchen solution", href: "/solutions/cloud-kitchen" },
    ],
  },
  {
    slug: "digital-menu",
    title: "Digital Menu for Restaurants — Loglime",
    description: "Update your restaurant menu in seconds from any device. Beautiful digital menus with photos, allergen labels and real-time sold-out flags.",
    h1: "Digital Menu for Restaurants — Always Up to Date",
    sections: [
      { h2: "The problem with printed menus.", body: "Printed menus are slow to update and expensive to reprint whenever prices, availability, or seasonal items change." },
      { h2: "Update your menu in seconds, from anywhere.", body: "Edit items, pricing, availability, dietary labels, and images from the Loglime dashboard." },
      { h2: "Digital menu features built for restaurant operators.", body: "Categories, modifiers, time-based menus, allergen labels, sold-out flags, and embedded website menus are included." },
      { h2: "Where your digital menu appears.", body: "Your menu can appear on your website, inside your branded app, and through QR codes at tables.", h3: ["On your website", "Inside your branded app", "Via QR code at every table"] },
      { h2: "Launch your digital menu in 14 days.", body: "Our onboarding team uploads and formats your first menu so your team can manage updates later." },
    ],
    related: [
      { label: "See pricing", href: "/pricing" },
      { label: "Book a demo", href: "/demo" },
      { label: "Cafe solution", href: "/solutions/cafes" },
    ],
  },
  {
    slug: "table-booking",
    title: "Restaurant Table Booking System — Loglime",
    description: "Let guests book tables 24/7 online. Automated confirmations, SMS reminders and no-show tracking — all without a reservations coordinator.",
    h1: "Online Table Booking System for Restaurants",
    sections: [
      { h2: "Every no-show costs you money. Here's how to reduce them.", body: "Automated confirmations and reminders reduce missed reservations and manual phone coordination." },
      { h2: "24/7 online reservations — without the phone calls.", body: "Guests can book from your website, app, or Google Business profile at any time." },
      { h2: "Table booking features.", body: "Capacity management, waitlist support, guest notes, preferences, automated messages, and no-show tracking." },
      { h2: "How automated reminders reduce no-shows.", body: "Guests receive reminders before their reservation so your team spends less time chasing confirmations." },
      { h2: "Integrate with your existing website in days.", body: "Loglime booking links can be added to your website or app without rebuilding your site." },
    ],
    related: [
      { label: "See pricing", href: "/pricing" },
      { label: "Book a demo", href: "/demo" },
      { label: "Dine-in solution", href: "/solutions/dine-in" },
    ],
  },
  {
    slug: "loyalty",
    title: "Restaurant Loyalty Program — Loglime",
    description: "Build a loyalty program your customers actually use. Points, stamps and rewards tied to your restaurant ordering system and branded app.",
    h1: "Restaurant Loyalty Program That Brings Customers Back",
    sections: [
      { h2: "The economics of customer retention.", body: "Repeat customers are more profitable than one-time marketplace orders. Loyalty helps guests return directly." },
      { h2: "A loyalty program that lives inside your brand.", body: "Rewards appear inside your restaurant app and ordering experience, not a third-party platform." },
      { h2: "Choose your loyalty model.", body: "Use points, stamps, rewards, birthday offers, and surprise campaigns.", h3: ["Points-based loyalty", "Stamp card loyalty"] },
      { h2: "Loyalty program features.", body: "Custom rewards, redemption rules, push notifications, customer analytics, and direct campaign tools." },
      { h2: "How restaurants use Loglime loyalty to grow repeat revenue.", body: "Restaurants use loyalty to move guests from marketplaces to direct ordering channels." },
    ],
    related: [
      { label: "See pricing", href: "/pricing" },
      { label: "Book a demo", href: "/demo" },
      { label: "QSR solution", href: "/solutions/qsr" },
    ],
  },
  {
    slug: "qr-menu",
    title: "QR Code Menu for Restaurants — Loglime",
    description: "Scannable QR menus branded to your restaurant. No app download required. Always up to date. Place on tables, bags and marketing materials.",
    h1: "QR Code Menu for Restaurants — No App Download Required",
    sections: [
      { h2: "A QR menu that's always accurate.", body: "When your digital menu updates, every QR code opens the latest version automatically." },
      { h2: "Where to place your QR codes.", body: "Use QR codes on tables, windows, counters, packaging, receipts, and social profiles.", h3: ["Table QR codes", "Counter and window QR codes", "Takeaway packaging", "Social media and Google Business"] },
      { h2: "QR menu features.", body: "Branded codes, no app download, table tracking, PDF fallback, and links into online ordering." },
      { h2: "Branded QR codes that represent your restaurant.", body: "Guests see your restaurant name, colors, and menu experience from the first scan." },
    ],
    related: [
      { label: "See pricing", href: "/pricing" },
      { label: "Book a demo", href: "/demo" },
      { label: "Dine-in solution", href: "/solutions/dine-in" },
    ],
  },
  {
    slug: "restaurant-app",
    title: "Branded Restaurant App — iOS & Android | Loglime",
    description: "Launch your own restaurant app on iOS and Android under your brand. Online ordering, loyalty, menus and push notifications. Live in 14 days.",
    h1: "Your Own Branded Restaurant App on iOS & Android",
    sections: [
      { h2: "Your customers download your app. Not someone else's.", body: "Your app is published under your restaurant name with your logo, colors, menu, ordering, loyalty, and booking." },
      { h2: "What's inside your restaurant app.", body: "A branded app can include ordering, loyalty, menu, booking, and push notifications.", h3: ["Commission-free ordering", "Customer loyalty", "Digital menu", "Table booking", "Push notifications"] },
      { h2: "How we publish your app to the App Store and Google Play.", body: "Our team handles brand setup, configuration, submission, review, and launch.", h3: ["Step 1: Brand setup", "Step 2: App configuration", "Step 3: Submission and review", "Step 4: Live on both stores"] },
      { h2: "What you need to get started.", body: "Your menu, logo, brand colors, payment setup, and Apple Developer account. We guide you through every step." },
      { h2: "Your restaurant app. Live in 14 days.", body: "Book a demo to see the exact app flow for your restaurant." },
    ],
    related: [
      { label: "See pricing", href: "/pricing" },
      { label: "Book a demo", href: "/demo" },
      { label: "Franchise solution", href: "/solutions/franchise" },
    ],
  },
];

export const solutionPages: DetailPage[] = [
  {
    slug: "cafes",
    title: "Cafe & Coffee Shop App — Loglime",
    description: "Give your cafe a branded app with commission-free ordering and a digital stamp card loyalty. Built for coffee shops. Launch in 14 days.",
    h1: "Restaurant App for Cafes and Coffee Shops",
    sections: [
      { h2: "The cafe loyalty problem — and how Loglime solves it.", body: "Cafes rely on repeat visits. Loglime helps customers order ahead, collect stamps, and return directly." },
      { h2: "How Loglime works for cafes.", body: "Pre-orders, pickup slots, QR menus, and loyalty campaigns work together in one branded experience." },
      { h2: "Products built for coffee shop operators.", body: "Use ordering, digital stamp cards, pickup pre-orders, and QR menus.", h3: ["Commission-free ordering", "Digital stamp card loyalty", "Pre-order for pickup", "Digital and QR menus"] },
      { h2: "See Loglime in action for your cafe.", body: "Book a demo and we will walk through a coffee shop launch flow." },
    ],
    related: [
      { label: "Online Ordering", href: "/products/online-ordering" },
      { label: "Loyalty", href: "/products/loyalty" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    slug: "bakeries",
    title: "Bakery Online Ordering System — Loglime",
    description: "Accept pre-orders, reduce morning waste and build a direct customer channel. Commission-free ordering built for bakeries and patisseries.",
    h1: "Online Ordering for Bakeries and Patisseries",
    sections: [
      { h2: "The daily challenge of running a bakery in 2025.", body: "Demand spikes early, popular items sell out fast, and last-minute phone orders slow the team down." },
      { h2: "How Loglime helps bakeries take control.", body: "Pre-orders, sold-out controls, loyalty, and direct pickup ordering help bakeries plan production." },
      { h2: "Bakery-specific features.", body: "Advance pre-ordering, inventory-aware sold-out states, and loyalty tools for repeat customers.", h3: ["Advance pre-ordering for pickup", "Sold-out management", "Loyalty and repeat customers"] },
      { h2: "Ready to launch direct ordering for your bakery?", body: "Book a demo and we will map your ordering and pickup flow." },
    ],
    related: [
      { label: "Online Ordering", href: "/products/online-ordering" },
      { label: "Digital Menu", href: "/products/digital-menu" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    slug: "qsr",
    title: "Quick Service Restaurant App — Loglime",
    description: "Commission-free ordering for quick-service restaurants. Fast digital checkout, kitchen updates and customer loyalty — built for high volume.",
    h1: "Commission-Free Ordering for Quick-Service Restaurants",
    sections: [
      { h2: "The commission problem at scale.", body: "High-volume restaurants lose too much margin when every order pays a delivery platform percentage." },
      { h2: "Built for speed and volume.", body: "Fast checkout, kitchen updates, and direct loyalty keep customers moving." },
      { h2: "QSR-specific features.", body: "High-volume ordering, KDS-ready workflows, fast checkout, and customer loyalty.", h3: ["High-volume ordering", "Kitchen display integration", "Fast checkout flow", "Customer loyalty"] },
      { h2: "Launch your direct ordering channel today.", body: "Book a demo to see how QSR ordering works in Loglime." },
    ],
    related: [
      { label: "Online Ordering", href: "/products/online-ordering" },
      { label: "Loyalty", href: "/products/loyalty" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    slug: "dine-in",
    title: "Table Booking & Digital Menu | Loglime",
    description: "Online table reservations, QR table menus and a guest loyalty program for dine-in restaurants. No reservation commissions. Live in 14 days.",
    h1: "Table Booking and Digital Menus for Dine-In Restaurants",
    sections: [
      { h2: "What modern hospitality looks like.", body: "Guests expect digital menus, easy reservations, and personalized loyalty without losing the restaurant's character." },
      { h2: "How Loglime transforms the dine-in experience.", body: "Bookings, QR menus, loyalty, and no-show reduction all connect inside one platform." },
      { h2: "Dine-in specific features.", body: "Online reservations, QR menus, guest loyalty, VIP recognition, and no-show reduction.", h3: ["Online table reservations", "QR menus at every table", "Guest loyalty and VIP recognition", "No-show reduction"] },
      { h2: "Book a demo to see it in your restaurant.", body: "We will walk through your table and menu setup." },
    ],
    related: [
      { label: "Table Booking", href: "/products/table-booking" },
      { label: "QR Menu", href: "/products/qr-menu" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    slug: "cloud-kitchen",
    title: "Cloud Kitchen Ordering System — Loglime",
    description: "Build a direct ordering channel for your cloud or ghost kitchen. Commission-free delivery and pickup orders. Your brand, your customer data.",
    h1: "Direct Online Ordering for Cloud Kitchens and Ghost Kitchens",
    sections: [
      { h2: "The cloud kitchen dependency problem.", body: "Cloud kitchens often depend on marketplaces that own demand, customers, and margins." },
      { h2: "Build a direct revenue channel for your cloud kitchen.", body: "Loglime gives your kitchen a branded ordering page and customer database." },
      { h2: "Cloud kitchen features.", body: "Branded ordering, multi-brand support, commission-free delivery, and customer data ownership.", h3: ["Branded ordering page", "Multi-brand management", "Commission-free delivery", "Customer data ownership"] },
      { h2: "Start building your direct ordering channel.", body: "Book a demo to plan your cloud kitchen ordering setup." },
    ],
    related: [
      { label: "Online Ordering", href: "/products/online-ordering" },
      { label: "Restaurant App", href: "/products/restaurant-app" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    slug: "franchise",
    title: "Multi-Location Restaurant App — Loglime",
    description: "Centralized menu management, location-based ordering and brand-consistent apps across all franchise and multi-location restaurant groups.",
    h1: "Multi-Location Restaurant App for Franchise Groups",
    sections: [
      { h2: "The challenge of digital consistency across locations.", body: "Franchise groups need central control without removing local flexibility." },
      { h2: "Central control. Local flexibility.", body: "Manage menus, ordering, loyalty, and reporting across locations from one dashboard." },
      { h2: "Franchise-specific features.", body: "Central menu management, location-based ordering, unified loyalty, and consolidated analytics.", h3: ["Central menu management", "Location-based ordering", "Unified loyalty across locations", "Consolidated analytics"] },
      { h2: "Scaling your franchise with Loglime.", body: "Book a demo to map multi-location rollout." },
    ],
    related: [
      { label: "Restaurant App", href: "/products/restaurant-app" },
      { label: "Loyalty", href: "/products/loyalty" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
];

export function getPageMetadata(page: DetailPage, routePrefix: "products" | "solutions"): Metadata {
  const route = `https://loglime.com/${routePrefix}/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: route },
    openGraph: {
      title: page.title,
      description: page.description,
      url: route,
      siteName: "Loglime",
      type: "website",
      locale: "en_US",
      images: [{ url: routePrefix === "products" ? "/og/products.png" : "/og/solutions.png", width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@loglime",
      creator: "@loglime",
      title: page.title,
      description: page.description,
      images: [routePrefix === "products" ? "/og/products.png" : "/og/solutions.png"],
    },
  };
}
