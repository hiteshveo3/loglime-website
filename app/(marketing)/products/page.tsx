import type { Metadata } from "next";

import { Badge, Button, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Restaurant App Products — Loglime",
  description: "Online ordering, digital menus, QR menus, table booking, loyalty programs and branded restaurant apps — all commission-free from Loglime.",
  alternates: { canonical: "https://loglime.com/products" },
  openGraph: {
    title: "Restaurant App Products — Loglime",
    description: "Online ordering, digital menus, QR menus, table booking, loyalty programs and branded restaurant apps — all commission-free from Loglime.",
    url: "https://loglime.com/products",
    images: [{ url: "/og/products.png", width: 1200, height: 630, alt: "Loglime restaurant app products" }],
  },
};

const products = [
  {
    id: "orders",
    title: "Online Ordering",
    copy: "Direct ordering app plus admin panel, available at a promotional launch price of $149.",
    bullets: ["Menu browsing", "Checkout-ready flow", "Order status updates", "Restaurant admin panel"],
  },
  {
    id: "menu",
    title: "Digital Menu",
    copy: "QR-ready menus with fast updates, clean categories, and mobile-first presentation.",
    bullets: ["QR launch channel", "Category management", "Offer-ready sections"],
  },
  {
    id: "bookings",
    title: "Table Booking",
    copy: "Booking tools for dine-in teams that need predictable reservations and fewer manual confirmations.",
    bullets: ["Reservation requests", "Guest details", "Follow-up reminders"],
  },
  {
    id: "loyalty",
    title: "Loyalty and Offers",
    copy: "Repeat-guest campaigns with simple rewards, email updates, and direct customer actions.",
    bullets: ["Offer campaigns", "Guest retention", "Simple reporting"],
  },
  {
    id: "qr",
    title: "QR Launch Channels",
    copy: "Restaurant-ready entry points across tables, social profiles, Google Business, and websites.",
    bullets: ["QR codes", "Website buttons", "WhatsApp handoff"],
  },
  {
    id: "app",
    title: "Restaurant App",
    copy: "Launch your own restaurant app on iOS and Android, published under your restaurant's name and branding.",
    bullets: ["iOS and Android", "Push notifications", "In-app ordering", "No coding required"],
  },
];

export default function ProductsPage() {
  return (
    <main className="bg-surface-alt">
      <section className="mx-auto max-w-page px-4 py-14 lg:px-8">
        <div className="max-w-3xl">
          <Badge tone="info">Products</Badge>
          <h1 className="mt-4 text-h1 text-text-primary">Modern app packages built for restaurant sales.</h1>
          <p className="mt-3 text-body text-text-secondary">Use one platform direction across ordering, menus, bookings, loyalty, and QR launch channels.</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {products.map((product) => (
            <a key={product.id} className="rounded-full bg-white px-4 py-2 text-small font-semibold text-text-secondary shadow-card hover:text-coral" href={`#${product.id}`}>
              {product.title}
            </a>
          ))}
        </div>
        <div className="mt-10 space-y-6">
          {products.map((product, index) => (
            <Card key={product.id} id={product.id} className="grid scroll-mt-32 gap-6 lg:grid-cols-2 lg:items-center">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="aspect-[4/3] rounded-2xl bg-slate-950 p-5 text-white">
                  <div className="h-full rounded-xl bg-white/10 p-4">
                    <div className="h-4 w-1/2 rounded-full bg-coral" />
                    <div className="mt-8 grid gap-3">
                      <div className="h-16 rounded-2xl bg-white/15" />
                      <div className="h-16 rounded-2xl bg-white/15" />
                      <div className="h-16 rounded-2xl bg-coral/70" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-h2 text-text-primary">{product.title}</h2>
                <p className="mt-3 text-body text-text-secondary">{product.copy}</p>
                <ul className="mt-5 space-y-3">
                  {product.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-body text-text-primary">
                      <span className="mt-2 h-2 w-2 rounded-full bg-coral" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Button asChildHack="a" href="/demo" className="mt-6">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
