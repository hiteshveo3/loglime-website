import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";

import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { Badge, Button, Card, Stat } from "@/components/ui";

export const metadata: Metadata = {
  title: "Loglime — Commission-Free Restaurant Apps & Online Ordering",
  description: "Launch a branded restaurant app with one-time pricing from $149. Free setup, no monthly Loglime SaaS fees, and full ownership of your app and data.",
  openGraph: {
    title: "Loglime — More Orders. Less Chaos.",
    description: "The modern restaurant technology platform. Commission-free ordering, branded apps, digital menus, and loyalty — all in one place.",
  },
  alternates: {
    canonical: "https://loglime.com",
  },
};

const stats = [
  { label: "restaurants launched", value: "120+" },
  { label: "commissions charged", value: "$0" },
  { label: "avg. launch time", value: "7-14 days" },
];

const featureMarqueeItems = [
  { icon: "hgi-percent-circle", title: "Commission-Free", desc: "Keep 100% of every order" },
  { icon: "hgi-paint-brush-01", title: "Fully Branded App", desc: "Your name, your colors, your logo" },
  { icon: "hgi-rocket-01", title: "Live in 7–14 Days", desc: "We handle the full setup" },
  { icon: "hgi-chart-bar-line", title: "Own Your Data", desc: "Every customer, every order — yours" },
  { icon: "hgi-notification-01", title: "Push Notifications", desc: "Reach customers directly, for free" },
  { icon: "hgi-gift", title: "Loyalty & Rewards", desc: "Drive repeat orders effortlessly" },
];

const products = [
  {
    tag: "Most Popular",
    title: "Online Ordering",
    body: "Let customers order directly from your restaurant — for pickup, delivery, or both — through your own branded platform. No commissions, no redirects, no third-party branding.",
    points: ["Commission-free on every order", "Branded checkout experience", "Real-time order notifications to kitchen", "Stripe-powered secure payments"],
    image: "/images/loglime/online-ordering-system-loglime.webp",
  },
  {
    title: "Digital Menu",
    body: "Replace printed menus with a beautiful, always-updated digital experience. Change prices, add seasonal items, or mark something as sold out instantly.",
    points: ["Real-time menu updates", "High-quality food photography", "Item modifiers", "Allergen and dietary labels"],
    image: "/images/loglime/digital-menu-loglime.webp",
  },
  {
    title: "Restaurant App",
    body: "Launch your very own restaurant app on iOS and Android — published under your restaurant's name on the App Store and Google Play.",
    points: ["Published under your restaurant name", "Push notifications", "In-app ordering and loyalty", "No coding required"],
    image: "/images/loglime/table-booking-apps-loglime.webp",
  },
];

const testimonials = [
  ["We were losing nearly $4,000 a month in commissions to delivery apps. Loglime paid for itself in the first week.", "Carlos M., Owner, The Ember Grill"],
  ["Our digital menu used to take days to update. Now I change it from my phone in 30 seconds.", "Sarah K., Manager, Rosewood Cafe"],
  ["We launched our loyalty program last quarter. Repeat visits went up 41% in 60 days.", "Ahmed R., Owner, Mezze House"],
];

const segments = [
  { label: "Cafes & Coffee Shops", href: "/solutions/cafes", img: "/images/Coffee Ordering SYstem.webp" },
  { label: "Bakeries & Patisseries", href: "/solutions/bakeries", img: "/images/Bakery.webp" },
  { label: "Quick-Service Restaurants", href: "/solutions/qsr", img: "/images/Restaurant Ordering System.webp" },
  { label: "Dine-In Restaurants", href: "/solutions/dine-in", img: "/images/Inside Restaurant.webp" },
  { label: "Cloud & Ghost Kitchens", href: "/solutions/cloud-kitchen", img: "/images/Restaurant Kitchen Management.webp" },
  { label: "Franchise & Multi-Location", href: "/solutions/franchise", img: "/images/Restaurant Ouside.webp" },
];

const steps = [
  ["01", "Tell us about your restaurant", "Book a quick 30-minute walkthrough. We learn about your menu, your goals, and the products you need. No technical knowledge required."],
  ["02", "We build and configure everything", "Our team sets up your app, uploads your menu, configures your brand colors, and publishes to app stores. Most launches complete within 7-14 business days."],
  ["03", "You go live. Your customers order.", "Share your app link, QR code, or website ordering button with your customers. Orders start flowing in directly — no commission, no middleman."],
];

const faqs = [
  { question: "Do I need technical experience to use Loglime?", answer: "None at all. Our team handles the entire setup process — app setup, menu upload, branding configuration, and publishing. You just provide your menu and preferences." },
  { question: "How long does it take to go live?", answer: "Most restaurants launch on Android within 7–10 business days. iOS typically takes 10–14 business days because of Apple's review process. We keep you updated every step of the way." },
  { question: "Are there really no commissions or monthly SaaS fees?", answer: "Yes. Loglime's launch packages are one-time purchases. You keep 100% of every order. Standard payment processing fees and required Google or Apple developer account charges are paid directly to those platforms — not to us." },
  { question: "Can I use Loglime alongside my existing POS?", answer: "Yes. Loglime works alongside your current operations. We confirm integration requirements during the initial setup call and configure accordingly." },
  { question: "Do customers need to download an app to order?", answer: "No. Customers can order through your website, a QR code menu, or your branded app — all options are included. They choose what's most convenient for them." },
  { question: "What happens to my customer data?", answer: "All customer data — orders, preferences, loyalty points, and contact details — belongs entirely to you. Loglime never sells or shares your data. You can export it at any time." },
  { question: "What if I want to update my menu or prices?", answer: "You can update your menu, prices, photos, and item availability in real time through the Loglime admin panel. Changes go live instantly — no need to contact us." },
];

const comparisonRows = [
  { feature: "Commission per order", loglime: "$0 — always", thirdParty: "15–30% per order", pos: "0–3%" },
  { feature: "Your own branded app", loglime: "✓ Yes", thirdParty: "✗ No", pos: "Sometimes" },
  { feature: "Customer data ownership", loglime: "100% yours", thirdParty: "Platform's data", pos: "Partial" },
  { feature: "Setup time", loglime: "7–14 days", thirdParty: "Instant, their terms", pos: "2–8 weeks" },
  { feature: "Monthly cost", loglime: "One-time fee", thirdParty: "% of every sale", pos: "$100–$600+" },
];

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://loglime.com/#organization",
      name: "Loglime",
      legalName: "Loglime LLC",
      url: "https://loglime.com",
      logo: { "@type": "ImageObject", url: "https://loglime.com/icon.svg" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "1207 Delaware Ave Ste 303",
        addressLocality: "Wilmington",
        addressRegion: "DE",
        postalCode: "19806",
        addressCountry: "US",
      },
      contactPoint: { "@type": "ContactPoint", email: "hello@loglime.com", contactType: "customer service" },
      sameAs: ["https://www.linkedin.com/company/loglime", "https://www.instagram.com/loglime"],
    },
    {
      "@type": "WebSite",
      "@id": "https://loglime.com/#website",
      url: "https://loglime.com",
      name: "Loglime",
      publisher: { "@id": "https://loglime.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Loglime",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      offers: { "@type": "AggregateOffer", lowPrice: "149", highPrice: "399", priceCurrency: "USD", offerCount: "3" },
      description: "Commission-free restaurant app platform with online ordering, digital menus, table booking and loyalty programs.",
      url: "https://loglime.com",
    },
  ],
};

export default function HomePage() {
  const doubled = [...featureMarqueeItems, ...featureMarqueeItems];

  return (
    <main className="bg-surface-alt">
      <Script id="home-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />

      {/* Hero */}
      <section className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-page items-center gap-8 px-4 py-16 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="space-y-6">
          <Badge tone="warning">Trusted by 120+ restaurants worldwide</Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-bold leading-none text-text-primary sm:text-6xl lg:text-display">
              More Orders.
              <span className="block text-coral">Less Chaos.</span>
            </h1>
            <p className="max-w-2xl text-body text-text-secondary">
              The modern restaurant technology platform built for owners who want to grow on their own terms. Launch a branded app, take commission-free orders, and keep 100% of your revenue.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChildHack="a" href="/pricing" size="lg">
              View launch packages
            </Button>
            <Button asChildHack="a" href="/demo" size="lg" variant="secondary" className="border border-coral/20 bg-white">
              Watch a 2-minute walkthrough
            </Button>
          </div>
          <p className="text-small text-text-secondary">One-time pricing · Free setup included · You own your app and data</p>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] shadow-premium" style={{ aspectRatio: "16/9" }}>
          <img
            src="/images/Restaurant Online Ordering.webp"
            alt="Restaurant ordering app"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Center play button */}
          <a
            href="/demo"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 group"
            aria-label="Watch demo"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-premium transition duration-300 group-hover:scale-110 group-hover:bg-white">
              <svg viewBox="0 0 24 24" fill="#FF5A5F" className="h-8 w-8 translate-x-0.5"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="rounded-full bg-black/50 px-5 py-2 text-small font-semibold text-white backdrop-blur-sm">Watch 2-min demo</span>
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto grid max-w-page gap-4 px-4 pb-14 md:grid-cols-3 lg:px-8">
        {stats.map((stat) => (
          <Stat key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      {/* Problem — "Your best customers" */}
      <section className="bg-coral-light py-16">
        <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
          <h2 className="text-h1 text-text-primary">Your best customers are ordering through someone else&apos;s app.</h2>
          <p className="mt-5 text-body text-text-secondary">
            Third-party delivery apps charge 15–30% per order. That&apos;s not a delivery fee — that&apos;s your margin. And when customers order through those platforms, the data goes to the platform, not to you.
          </p>
          <p className="mt-5 text-h4 font-semibold text-coral">Loglime puts your restaurant back in control. Your app. Your data. Your revenue.</p>
        </div>
      </section>

      {/* Features — auto-scrolling marquee */}
      <section className="mx-auto max-w-page px-4 py-14 lg:px-8">
        <div className="text-center">
          <h2 className="text-h2 sm:text-h1 text-text-primary mx-auto max-w-3xl">Everything your restaurant needs. Nothing you don&apos;t.</h2>
          <p className="mt-3 mx-auto max-w-2xl text-body text-text-secondary">Six reasons thousands of restaurants choose Loglime over third-party platforms.</p>
        </div>
        <div className="mt-10 overflow-hidden">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes scroll-features { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .features-track { display: flex; width: max-content; animation: scroll-features 28s linear infinite; }
          ` }} />
          <div className="features-track">
            {doubled.map((item, i) => (
              <div key={i} className="mx-3 flex w-64 shrink-0 flex-col rounded-2xl border border-border bg-white p-5 shadow-card">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-coral-soft text-coral">
                  <i className={`hgi-stroke ${item.icon} text-xl`} />
                </div>
                <p className="text-h4 text-text-primary">{item.title}</p>
                <p className="mt-2 text-small text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern app packages */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-page px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-h1 text-text-primary">Modern app packages built for restaurant growth.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-body text-text-secondary">Choose Android, add iOS, or launch the complete AI-powered restaurant stack.</p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.title} className="flex flex-col overflow-hidden">
                {product.image && (
                  <div className="relative -mx-6 -mt-6 mb-6 w-[calc(100%+3rem)]" style={{ aspectRatio: "4/3" }}>
                    <Image src={product.image} alt={product.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>
                )}
                {product.tag ? <Badge tone="success" className="w-fit">{product.tag}</Badge> : null}
                <h3 className="mt-4 text-h3 text-text-primary">{product.title}</h3>
                <p className="mt-3 text-body text-text-secondary">{product.body}</p>
                <ul className="mt-5 space-y-3 flex-1">
                  {product.points.map((point) => (
                    <li key={point} className="flex gap-3 text-small text-text-primary">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-coral" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Button asChildHack="a" href="/pricing" className="mt-6 w-full gap-2 justify-center">
                  See package details <i className="hgi-stroke hgi-arrow-right-01" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Powerful features */}
      <section className="bg-slate-50 pt-10 pb-14">
        <div className="mx-auto max-w-page px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-h1 text-text-primary mx-auto max-w-3xl">Powerful features to grow your restaurant.</h2>
            <p className="mt-3 mx-auto max-w-2xl text-body text-text-secondary">Every tool you need to increase revenue, reduce chaos, and own your customer relationships.</p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white border border-border overflow-hidden shadow-sm">
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/loglime/loyalty-and-offers-loglime.webp" alt="Loyalty Program" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <h3 className="text-h4 text-text-primary">Loyalty & Rewards</h3>
                <p className="mt-2 text-small text-text-secondary">Build repeat customers with points, stamps, and custom rewards. Increase lifetime value.</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-border overflow-hidden shadow-sm">
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/loglime/qr-launch-channels-loglime.webp" alt="QR Menu" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <h3 className="text-h4 text-text-primary">QR Menu & Scan-to-Order</h3>
                <p className="mt-2 text-small text-text-secondary">No app needed. Customers scan, browse, and order instantly. Perfect for dine-in.</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-border overflow-hidden shadow-sm">
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/loglime/table-booking-apps-loglime.webp" alt="Table Booking" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <h3 className="text-h4 text-text-primary">Table Booking System</h3>
                <p className="mt-2 text-small text-text-secondary">Let customers reserve tables directly. Reduce no-shows, improve planning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-coral-light py-14">
        <div className="mx-auto max-w-page px-4 lg:px-8">
          <h2 className="text-center text-h1 text-text-primary">Restaurants that made the switch.</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map(([quote, person]) => (
              <Card key={person}>
                <p className="text-body text-text-primary">&quot;{quote}&quot;</p>
                <p className="mt-5 text-small font-semibold text-coral">— {person}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-page px-4 lg:px-8">
          <h2 className="text-center text-h1 text-text-primary">One platform. Every kind of restaurant.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-body text-text-secondary">Whether you run a single cafe or a growing franchise, Loglime adapts to how your restaurant actually works.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {segments.map((segment) => (
              <a key={segment.label} className="group overflow-hidden rounded-2xl bg-surface-alt border border-border transition hover:border-coral/30" href={segment.href}>
                <div className="relative h-48 w-full overflow-hidden">
                  <img src={segment.img} alt={segment.label} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <p className="p-5 text-h3 text-text-primary transition group-hover:text-coral">{segment.label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-page">
          <h2 className="mx-auto max-w-3xl text-center text-h1 text-text-primary">From conversation to customers ordering in three simple steps.</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {steps.map(([number, title, body]) => (
              <Card key={number}>
                <p className="text-h2 text-coral">{number}</p>
                <h3 className="mt-4 text-h3 text-text-primary">{title}</h3>
                <p className="mt-3 text-body text-text-secondary">{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-surface-elevated py-14">
        <div className="mx-auto max-w-page px-4 lg:px-8">
          <h2 className="text-center text-h1 text-text-primary">Why restaurant owners choose Loglime.</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-card">
            <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th className="border-b-2 border-slate-200 bg-surface-alt px-5 py-4 text-small font-semibold text-text-secondary">Feature</th>
                  <th className="border-b-2 border-coral bg-coral px-5 py-4 text-small font-bold text-white">✓ Loglime</th>
                  <th className="border-b-2 border-slate-200 bg-surface-alt px-5 py-4 text-small font-semibold text-text-secondary">Third-Party Delivery</th>
                  <th className="border-b-2 border-slate-200 bg-surface-alt px-5 py-4 text-small font-semibold text-text-secondary">Traditional POS</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="border-b border-slate-200 px-5 py-4 text-body font-semibold text-slate-700">{row.feature}</td>
                    <td className="border-b border-coral/30 px-5 py-4 text-body font-bold text-coral" style={{ backgroundColor: "#FFF0F0" }}>{row.loglime}</td>
                    <td className="border-b border-slate-200 px-5 py-4 text-body text-slate-500">{row.thirdParty}</td>
                    <td className="border-b border-slate-200 px-5 py-4 text-body text-slate-500">{row.pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-page px-4 lg:px-8">
          <div className="text-center">
            <a href="/faq" className="inline-flex items-center gap-1.5 text-small font-semibold text-coral hover:underline">
              See all FAQs <i className="hgi-stroke hgi-arrow-right-01 text-xs" />
            </a>
            <h2 className="mt-3 text-[3rem] font-bold leading-tight text-text-primary">Common questions.</h2>
            <p className="mt-3 text-body text-text-secondary">Everything you need to know before getting started.</p>
          </div>
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border bg-white shadow-card">
            <FaqAccordion items={faqs} defaultOpen={0} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-page rounded-3xl bg-coral px-6 py-16 text-center text-white shadow-floating">
          <p className="text-small font-semibold uppercase tracking-widest text-white/70 mb-4">Ready to get started?</p>
          <h2 className="mx-auto max-w-3xl text-h1">Stop paying commissions. Start keeping your revenue.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-body text-white/85">Join 120+ restaurants who&apos;ve launched their own branded app with Loglime. One-time price from $149.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChildHack="a" href="/pricing" variant="secondary">
              View packages from $149
            </Button>
            <Button asChildHack="a" href="/demo" className="bg-white/15 text-white hover:bg-white/25 border border-white/20">
              Book a demo first
            </Button>
          </div>
          <p className="mt-5 text-small text-white/70">One-time pricing · Free setup · Live support during launch</p>
        </div>
      </section>
    </main>
  );
}
