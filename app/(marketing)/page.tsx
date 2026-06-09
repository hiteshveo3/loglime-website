import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { DashboardMock } from "@/components/marketing/DashboardMock";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SaasIcon, type SaasIconName } from "@/components/ui/SaasIcon";
import { createMetadata, organizationJsonLd, restaurantSoftwareJsonLd, routeMeta, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/"));

const trustLogos = ["brioche & co", "northwind cafe", "paloma grill", "verda kitchen", "kindred bites", "harbor qsr"];

const suiteProducts: {
  title: string;
  copy: string;
  icon: SaasIconName;
  tone: "coral" | "teal" | "purple" | "amber" | "blue";
}[] = [
  {
    title: "Ordering app",
    copy: "Online orders & pickup",
    icon: "dashboard-browsing",
    tone: "coral"
  },
  {
    title: "Menu app",
    copy: "Digital menu & QR",
    icon: "calendar-check",
    tone: "teal"
  },
  {
    title: "Booking app",
    copy: "Tables & reservations",
    icon: "user-group",
    tone: "purple"
  },
  {
    title: "Loyalty app",
    copy: "Offers & repeat guests",
    icon: "task-done01",
    tone: "amber"
  },
  {
    title: "Growth dashboard",
    copy: "Sales & app insights",
    icon: "analytics-up",
    tone: "blue"
  }
];

const steps = [
  {
    eyebrow: "STEP 01",
    title: "Pick your app package",
    copy: "Choose ordering, menu, bookings, loyalty or a full restaurant app bundle."
  },
  {
    eyebrow: "STEP 02",
    title: "Add brand and menu",
    copy: "We set up your logo, food menu, prices, photos, timings and customer flow."
  },
  {
    eyebrow: "STEP 03",
    title: "Launch and sell",
    copy: "Your restaurant gets a live app for orders, bookings and repeat customers."
  }
];

const pricing = [
  {
    name: "Starter",
    price: "$29",
    suffix: "/mo",
    copy: "For one restaurant app",
    bullets: ["Digital menu app", "Basic setup support"],
    cta: "Start package",
    href: "/signup",
    popular: false,
    dark: false
  },
  {
    name: "Team",
    price: "$79",
    suffix: "/mo",
    copy: "For restaurants taking orders",
    bullets: ["Ordering + booking apps", "Priority support"],
    cta: "Get Growth",
    href: "/signup",
    popular: true,
    dark: false
  },
  {
    name: "Enterprise",
    price: "Talk",
    suffix: "",
    copy: "Custom branded rollout",
    bullets: ["Full app bundle", "Dedicated launch help"],
    cta: "Contact sales",
    href: "/contact",
    popular: false,
    dark: true
  }
] as const;

const faqs = [
  {
    q: "Can I start with just one product?",
    a: "Yes. A restaurant can start with one focused app package instead of buying a large system on day one. For many restaurants, the best first step is a digital menu app because it is easy for guests to scan, browse and share. For others, the online ordering app is the priority because it creates a direct sales channel for pickup, delivery or dine-in preorders. Loglime is designed so a restaurant can launch the first app, learn what customers actually use, then add table booking, loyalty offers, customer updates or analytics later. This keeps the rollout simple and easier to sell to restaurant owners who do not want a complicated technology project. The app can still feel fully branded with the restaurant logo, colors, food categories, item photos, prices, timings and customer flow. Starting small also makes onboarding faster because the restaurant only prepares the content for the app it wants first."
  },
  {
    q: "Does Loglime replace my POS?",
    a: "No. Loglime is not positioned as a POS replacement or an internal back-office system. The product is focused on selling customer-facing restaurant apps that help restaurants get more orders, bookings and repeat guests online. A restaurant can keep its current POS, cashier workflow and payment habits while using Loglime for the digital experience customers see: digital menu, online ordering, booking requests, loyalty offers and customer updates. This makes the pitch much clearer because the restaurant does not have to rebuild its whole operation before it sees value. In a later phase, POS or payment integrations can be added when a specific restaurant needs them, but the first value is the branded app layer. That layer can collect order intent, show menus, promote offers and guide customers to take action. For many restaurants, this is easier to adopt than a full back-office system because it directly supports sales and customer convenience."
  },
  {
    q: "Do you build branded apps?",
    a: "Yes. A core part of the Loglime offer is that each restaurant app can feel like it belongs to that restaurant, not like a generic template. The app can use the restaurant logo, brand colors, menu structure, food photos, item descriptions, opening hours, pickup rules, booking preferences and promotional offers. This matters because restaurants sell taste, trust and local identity. A branded app gives customers a more direct relationship with the restaurant than a third-party marketplace page. The setup can begin with practical assets: logo file, menu categories, item names, prices, images, contact details and basic service rules. From there, the app can be configured for the package the restaurant buys, such as a QR menu, online ordering flow, booking request flow or loyalty offer flow. The goal is not to make the restaurant manage technical details. The goal is to give it a polished customer-facing app that is easy to share and easy for guests to use."
  },
  {
    q: "How fast can a restaurant launch?",
    a: "Launch speed depends mostly on how ready the restaurant content is. A simple digital menu app can move quickly when the restaurant already has its logo, menu categories, item names, prices, opening hours and food photos prepared. An ordering app or booking app may need a little more setup because the customer journey must be clear: pickup times, delivery areas, table request rules, confirmation messages and any special instructions. Loglime is built around packages so the launch does not need to start as a custom software project. First, the restaurant chooses the app package. Next, the brand and menu content are added. Then the customer flow is reviewed on desktop and mobile. After that, the app can be shared through QR codes, links, social profiles and the restaurant website. For a sales conversation, the strongest promise is not instant magic; it is a clean, guided launch process that avoids months of development and gives restaurants a practical customer-facing app."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a
    }
  }))
};

export default function HomePage() {
  return (
    <main>
      <JsonLd data={[organizationJsonLd, websiteJsonLd, restaurantSoftwareJsonLd, faqJsonLd]} />
      <section className="hero hero-classic hero-wireframe">
        <div className="container">
          <div className="hero-card">
            <span className="hero-sticker">demo app ready</span>
            <div className="hero-center">
              <Badge>Apps for restaurants</Badge>
              <h1 className="display">
                Restaurant apps that help you <span>sell more.</span>
              </h1>
              <p className="sub">
                Loglime sells ready-to-launch web and mobile apps for restaurants: digital menu, online ordering, table
                booking, loyalty, offers and customer updates.
              </p>
              <div className="cta-row">
                <ButtonLink href="/signup" size="lg">
                  Get a restaurant app
                </ButtonLink>
                <ButtonLink href="/demo" variant="outline" size="lg">
                  Book a demo <ArrowRight size={16} />
                </ButtonLink>
              </div>
              <p className="micro">Free demo &middot; branded setup &middot; launch support</p>
            </div>
            <div className="hero-shot-wrap">
              <DashboardMock />
            </div>
          </div>
        </div>
      </section>

      <section className="trust-band" aria-label="Trusted by teams" id="customers">
        <div className="container trust-wrap">
          <p>Built for restaurants, cafes, bakeries, QSRs and cloud kitchens</p>
          <div className="trust-logos">
            {trustLogos.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Restaurant app packages</p>
            <h2 className="h2">Choose the apps your restaurant wants to sell through.</h2>
          </div>
          <div className="suite-grid">
            {suiteProducts.map((product) => (
              <article className={`suite-card suite-${product.tone}`} key={product.title}>
                <span className="mega-icon">
                  <SaasIcon name={product.icon} size={23} />
                </span>
                <h3 className="h3">{product.title}</h3>
                <p>{product.copy}</p>
                <span className="suite-line" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">How it works</p>
            <h2 className="h2">From menu to live app without the messy build.</h2>
          </div>
          <div className="grid-3">
            {steps.map((step) => (
              <article className="step-card" key={step.title}>
                <p className="eyebrow">{step.eyebrow}</p>
                <h3 className="h3">{step.title}</h3>
                <p className="body">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="customers-story">
        <div className="container testimonial-card testimonial-wireframe">
          <div>
            <blockquote>
              &ldquo;We wanted a simple app our customers could actually use. Loglime helped us launch ordering, menu updates and
              offers without hiring a full tech team.&rdquo;
            </blockquote>
            <div className="customer-row">
              <span>JM</span>
              <p>
                <strong>Jules M.</strong>
                <small>Owner, Brioche & Co. (3 locations)</small>
              </p>
            </div>
          </div>
          <div className="customer-photo">
            <span>Customer story</span>
            <strong>Brioche & Co.</strong>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Pricing</p>
            <h2 className="h2">Pay for the restaurant app package you launch.</h2>
          </div>
          <div className="grid-3">
            {pricing.map((plan) => (
              <article className={`price-card ${plan.popular ? "featured" : ""} ${plan.dark ? "dark-plan" : ""}`} key={plan.name}>
                <div className="price-head">
                  <h3 className="h3">{plan.name}</h3>
                  {plan.popular ? <Badge>popular</Badge> : null}
                </div>
                <div className="price">
                  {plan.price}
                  {plan.suffix ? <small>{plan.suffix}</small> : null}
                </div>
                <p className="body">{plan.copy}</p>
                <div className="price-bullets">
                  {plan.bullets.map((bullet) => (
                    <span key={bullet}>
                      <Check size={15} />
                      {bullet}
                    </span>
                  ))}
                </div>
                <ButtonLink href={plan.href} variant={plan.dark ? "dark" : plan.popular ? "primary" : "outline"}>
                  {plan.cta}
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-grid">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2 className="h2">Common questions.</h2>
            <p className="body">
              Can&apos;t find it? Email <a href="mailto:hi@loglime.com">hi@loglime.com</a>
            </p>
          </div>
          <div className="faq-list faq-accordion">
            {faqs.map((faq, index) => (
              <details className="faq-accordion-item" key={faq.q} open={index === 0}>
                <summary>
                  <span>{faq.q}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-closer">
        <div className="container dark-closer-inner dark-closer-center">
          <div>
            <h2>Ready to sell your restaurant app?</h2>
            <p>Pick an app package, share your menu and brand, and launch a customer-facing app for your restaurant.</p>
          </div>
          <div className="cta-row">
            <ButtonLink href="/signup" size="lg">
              Get a restaurant app
            </ButtonLink>
            <ButtonLink href="/demo" variant="outline" size="lg">
              Book a demo <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
