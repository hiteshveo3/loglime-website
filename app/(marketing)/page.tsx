import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";

import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { Badge, Button, Card, Stat, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui";

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

const features = [
  {
    icon: "hgi-percent-circle",
    title: "Commission-Free, Always",
    body: "Keep 100% of every order placed through your platform. Loglime charges a one-time app build price — no per-order cut, no monthly SaaS fee, and no surprise platform charges.",
  },
  {
    icon: "hgi-paint-brush-01",
    title: "Fully Branded to Your Restaurant",
    body: "Your customers see your name, your logo, your colors. Not ours. Every app, every menu, every notification carries your restaurant's identity — building brand recognition with every order.",
  },
  {
    icon: "hgi-rocket-01",
    title: "Live in 7-14 Business Days",
    body: "From your first conversation with us to the moment your app goes live — typically under two weeks. We handle setup, app publishing, menu upload, and team onboarding.",
  },
  {
    icon: "hgi-chart-bar-line",
    title: "Own Your Customer Data",
    body: "Every order, every visit, every loyalty point — that data is yours. Build real relationships with your customers and understand your busiest hours, bestselling items, and biggest spenders.",
  },
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

const segments = ["Cafes & Coffee Shops", "Bakeries & Patisseries", "Quick-Service Restaurants", "Dine-In Restaurants", "Cloud & Ghost Kitchens", "Franchise & Multi-Location"];

const steps = [
  ["01", "Tell us about your restaurant", "Book a quick 30-minute walkthrough. We learn about your menu, your goals, and the products you need. No technical knowledge required."],
  ["02", "We build and configure everything", "Our team sets up your app, uploads your menu, configures your brand colors, and publishes to app stores. Most launches complete within 7-14 business days."],
  ["03", "You go live. Your customers order.", "Share your app link, QR code, or website ordering button with your customers. Orders start flowing in directly — no commission, no middleman."],
];

const faqs = [
  { question: "Do I need technical experience to use Loglime?", answer: "None at all. Our team handles the entire setup process. You provide your menu, branding, and preferences — we do everything else." },
  { question: "How long does it take to go live?", answer: "Most restaurants launch on Android within 7–10 business days. iOS typically takes 10–14 business days because of Apple's review process." },
  { question: "Are there really no commissions or monthly SaaS fees?", answer: "Yes. Loglime's launch packages are one-time purchases. Standard payment processing and required Google or Apple developer account charges are paid directly to those platforms." },
  { question: "Can I use Loglime alongside my existing POS?", answer: "Yes. Loglime can work alongside your current operations, with integration requirements confirmed during setup." },
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
  return (
    <main className="bg-surface-alt">
      <Script id="home-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <section className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-page items-center gap-8 px-4 py-16 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="space-y-6">
          <Badge tone="warning">Trusted by 120+ restaurants worldwide</Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-bold leading-none text-text-primary sm:text-6xl lg:text-display">
              More Orders.
              <span className="block text-coral">Less Chaos.</span>
            </h1>
            <p className="max-w-2xl text-body text-text-secondary">
              The modern restaurant technology platform built for owners who want to grow on their own terms. Launch a branded app, take commission-free orders, and keep 100% of your revenue — without depending on third-party delivery platforms.
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
        <Card className="overflow-hidden rounded-[2rem] p-0">
          <div className="aspect-video bg-white p-5">
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-premium">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-small">Loglime dashboard in action</span>
                <span className="rounded-full bg-coral px-3 py-1 text-small">02:15</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="h-24 rounded-2xl bg-white/10" />
                <div className="h-24 rounded-2xl bg-coral/80" />
                <div className="h-24 rounded-2xl bg-white/10" />
              </div>
              <button className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-coral shadow-floating" aria-label="Play demo">
                <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-white" aria-hidden />
              </button>
              <p className="text-center text-small text-white/70">See Loglime in action</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto grid max-w-page gap-4 px-4 pb-14 md:grid-cols-3 lg:px-8">
        {stats.map((stat) => (
          <Stat key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      <section className="bg-coral-light py-14">
        <div className="mx-auto max-w-page px-4 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-h1 text-text-primary">Your best customers are ordering through someone else&apos;s app.</h2>
            <p className="mt-4 text-body text-text-secondary">
              Third-party delivery apps charge 15-30% per order. That&apos;s not a delivery fee — that&apos;s your margin. And when customers order through those platforms, the data goes to the platform, not to you.
            </p>
            <p className="mt-4 text-body text-text-secondary">Loglime puts your restaurant back in control. Your own branded app. Your customer data. Your revenue — every penny of it.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-14 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-h2 sm:text-h1 text-text-primary">Everything your restaurant needs. Nothing you don&apos;t.</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-soft text-coral shrink-0">
                <i className={`hgi-stroke ${feature.icon} text-xl`} />
              </div>
              <h3 className="text-h4 sm:text-h3 text-text-primary break-words">{feature.title}</h3>
              <p className="mt-3 text-small sm:text-body text-text-secondary break-words">{feature.body}</p>
            </Card>
          ))}
        </div>
      </section>

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
                      <span className="mt-1 h-2 w-2 rounded-full bg-coral" />
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

      <section className="bg-white py-14">
        <div className="mx-auto max-w-page px-4 lg:px-8">
          <h2 className="text-h1 text-text-primary">Powerful features to grow your restaurant.</h2>
          <p className="mt-3 max-w-2xl text-body text-text-secondary">Every tool you need to increase revenue, reduce chaos, and own your customer relationships.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/loglime/loyalty-and-offers-loglime.webp" alt="Loyalty Program" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <h3 className="text-h4 text-text-primary">Loyalty & Rewards</h3>
                <p className="mt-2 text-small text-text-secondary">Build repeat customers with points, stamps, and custom rewards. Increase lifetime value.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/loglime/qr-launch-channels-loglime.webp" alt="QR Menu" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <h3 className="text-h4 text-text-primary">QR Menu & Scan-to-Order</h3>
                <p className="mt-2 text-small text-text-secondary">No app needed. Customers scan, browse, and order instantly. Perfect for dine-in.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border overflow-hidden">
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

      <section className="bg-coral-light py-14">
        <div className="mx-auto max-w-page px-4 lg:px-8">
          <h2 className="text-h1 text-text-primary">Restaurants that made the switch.</h2>
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

      <section className="bg-white py-14">
        <div className="mx-auto max-w-page px-4 lg:px-8">
          <h2 className="text-center text-h1 text-text-primary">One platform. Every kind of restaurant.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-body text-text-secondary">Whether you run a single cafe or a growing franchise, Loglime adapts to how your restaurant actually works.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {segments.map((segment) => (
              <a key={segment} className="rounded-2xl bg-surface-alt p-5 text-h3 text-text-primary shadow-card transition hover:text-coral" href="/solutions">
                {segment}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-14 lg:px-8">
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
      </section>

      <section className="bg-surface-elevated py-14">
        <div className="mx-auto max-w-page px-4 lg:px-8">
          <h2 className="text-h1 text-text-primary">Why restaurant owners choose Loglime.</h2>
          <Card className="mt-8">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Feature</TableHeaderCell>
                  <TableHeaderCell>Loglime</TableHeaderCell>
                  <TableHeaderCell>Third-Party Delivery Apps</TableHeaderCell>
                  <TableHeaderCell>Traditional POS</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  ["Commission per order", "$0", "15-30%", "0-3%"],
                  ["Your own branded app", "Yes", "No", "Sometimes"],
                  ["Customer data ownership", "100% yours", "Platform&apos;s", "Partial"],
                  ["Setup time", "7-14 days", "Instant, their terms", "2-8 weeks"],
                  ["Monthly cost", "Flat fee", "% of every sale", "$100-$600+"],
                ].map((row) => (
                  <TableRow key={row[0]}>
                    {row.map((cell) => (
                      <TableCell key={cell}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-14 lg:px-8">
        <h2 className="text-center text-h1 text-text-primary">Common questions.</h2>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-white px-5 shadow-card"><FaqAccordion items={faqs} defaultOpen={0} /></div>
        <Button asChildHack="a" href="/faq" className="mt-8" variant="secondary">
          See all FAQ
        </Button>
      </section>

      <section className="px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-page rounded-2xl bg-coral px-6 py-12 text-center text-white shadow-floating">
          <h2 className="mx-auto max-w-3xl text-h1">Start building your restaurant&apos;s direct ordering channel today.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-body text-white/85">Join restaurants who&apos;ve moved away from commission-heavy platforms and started growing on their own terms.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChildHack="a" href="/pricing" variant="secondary">
              View packages from $149
            </Button>
            <Button asChildHack="a" href="/demo" className="bg-white/15 text-white hover:bg-white/20">
              Book a demo first
            </Button>
          </div>
          <p className="mt-5 text-small text-white/75">One-time pricing · Free setup · Live support during launch</p>
        </div>
      </section>
    </main>
  );
}
