import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CircleCheck,
  Globe2,
  Mail,
  QrCode,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  Users,
  Utensils,
  Zap
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { SaasIcon, type SaasIconName } from "@/components/ui/SaasIcon";
import { createMetadata, organizationJsonLd, restaurantSoftwareJsonLd, routeMeta, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/"));

const trustLogos = ["brioche & co", "northwind cafe", "paloma grill", "verda kitchen", "kindred bites", "harbor qsr"];

const stats = [
  {
    value: "120+",
    label: "restaurant apps launched",
    icon: Globe2
  },
  {
    value: "38%",
    label: "average repeat guest lift",
    icon: Users
  },
  {
    value: "4.8x",
    label: "more direct customer actions",
    icon: ShieldCheck
  }
];

const reasons = [
  "Customer-facing app packages restaurants can understand quickly",
  "Digital menu, ordering, booking and loyalty modules under one brand",
  "Launch assets for QR codes, website CTAs and social profile links",
  "A sales-friendly offer that does not force a POS replacement"
];

const products: {
  title: string;
  copy: string;
  icon: SaasIconName;
  label: string;
  tone: string;
}[] = [
  {
    title: "Online ordering app",
    copy: "Give restaurants their own direct pickup, delivery and dine-in ordering flow with branded menus, item options and order totals.",
    icon: "dashboard-browsing",
    label: "Orders",
    tone: "blue"
  },
  {
    title: "Digital menu app",
    copy: "Create QR-ready menus with categories, prices, photos, descriptions and availability that stay easy for guests to browse.",
    icon: "calendar-check",
    label: "Menus",
    tone: "green"
  },
  {
    title: "Table booking app",
    copy: "Offer a clean booking request flow for restaurants that want more reservations without a heavy reservation system.",
    icon: "user-group",
    label: "Bookings",
    tone: "cyan"
  },
  {
    title: "Loyalty and offers app",
    copy: "Help restaurants bring guests back with offers, repeat-visit rewards, promo links and customer update campaigns.",
    icon: "task-done01",
    label: "Loyalty",
    tone: "lime"
  }
];

const integrationsTop = ["QR codes", "Website buttons", "Instagram", "Google Business", "WhatsApp", "Stripe-ready", "Analytics", "Email updates"];
const integrationsBottom = ["Menu imports", "Order exports", "Customer lists", "Promo links", "Booking forms", "SMS-ready", "Webhook-ready", "CSV reports"];

const industries = [
  {
    title: "Cafes and bakeries",
    copy: "Launch a digital menu and pickup ordering app that makes daily specials, preorders and repeat visits easier to sell.",
    icon: Utensils
  },
  {
    title: "Quick-service brands",
    copy: "Package direct ordering, QR menus and promo offers for restaurants that need faster customer actions from mobile guests.",
    icon: Zap
  },
  {
    title: "Dine-in restaurants",
    copy: "Add booking requests, table-ready QR menus and loyalty flows without asking the restaurant to rebuild operations.",
    icon: Store
  }
];

const testimonials = [
  {
    quote:
      "Loglime made the app pitch simple for restaurant owners. We lead with direct orders and QR menus, then expand into booking and loyalty when the client is ready.",
    name: "Maya Reed",
    role: "Restaurant growth consultant"
  },
  {
    quote:
      "The strongest part is how fast the offer is to explain. It feels like a restaurant app launch package, not a complicated system implementation.",
    name: "Jordan Malik",
    role: "Digital studio owner"
  },
  {
    quote:
      "We needed branded apps that restaurants could actually use. The flow from menu assets to live customer actions is clear and easy to demo.",
    name: "Nora Patel",
    role: "Hospitality app partner"
  }
];

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
    <main className="home-template">
      <JsonLd data={[organizationJsonLd, websiteJsonLd, restaurantSoftwareJsonLd, faqJsonLd]} />

      <section className="home-hero">
        <div className="home-hero-gradient" aria-hidden="true" />
        <div className="home-hero-image" aria-hidden="true" />

        <div className="home-hero-content">
          <span className="home-badge">Smart restaurant app software</span>
          <h1>Sell restaurant apps that bring more orders, bookings and repeat guests.</h1>
          <p>
            Loglime helps you launch branded customer apps for restaurants: digital menus, online ordering, table
            bookings, loyalty offers and direct customer updates.
          </p>
          <div className="home-hero-actions">
            <Link className="home-btn home-btn-dark" href="/demo">
              Request a demo
            </Link>
            <Link className="home-btn home-btn-glass" href="/signup">
              Start 14-Day Free Trial
            </Link>
          </div>

          <div className="home-trust">
            <p>Powering direct restaurant growth globally</p>
            <div className="home-logo-mask">
              <div className="home-logo-track">
                {[...trustLogos, ...trustLogos].map((logo, index) => (
                  <span key={`${logo}-${index}`}>{logo}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-stats-section">
        <div className="container home-stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article className="home-stat-card" key={stat.label}>
                <span>
                  <Icon size={30} />
                </span>
                <div>
                  <strong>{stat.value}</strong>
                  <p>{stat.label}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="home-split-section" id="customers-story">
        <div className="container home-split-grid">
          <div className="home-split-copy">
            <span className="home-badge">Reasons to select us</span>
            <h2>Restaurant apps that are easier to sell and faster to launch.</h2>
            <p>
              Loglime keeps the offer focused on the digital experience guests see. Restaurants get practical app
              packages that support revenue, repeat visits and customer convenience without a complicated operational
              rebuild.
            </p>
            <ul className="home-check-list">
              {reasons.map((reason) => (
                <li key={reason}>
                  <span>
                    <Check size={14} />
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="home-visual-card" aria-label="Restaurant app launch preview">
            <div className="home-restaurant-visual" />
            <div className="home-floating-card home-floating-top">
              <small>MENU APP</small>
              <strong>Live</strong>
              <p>QR and website ready</p>
            </div>
            <div className="home-floating-card home-floating-left">
              <small>DIRECT ACTIONS</small>
              <strong>4.8x</strong>
              <p>More guest activity</p>
            </div>
            <div className="home-floating-card home-floating-right">
              <small>ORDERS TODAY</small>
              <strong>128</strong>
              <p>Pickup and dine-in</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-feature-section">
        <div className="container">
          <div className="home-section-head">
            <span className="home-badge">Customer-facing app suite</span>
            <h2>Modern app packages built for restaurant sales.</h2>
            <p>Pick the product a restaurant understands first, then expand into a full customer app bundle later.</p>
          </div>

          <div className="home-feature-grid">
            {products.map((product) => (
              <article className={`home-feature-card home-feature-${product.tone}`} key={product.title}>
                <div className="home-feature-visual">
                  <span className="home-feature-icon">
                    <SaasIcon name={product.icon} size={28} />
                  </span>
                  <div className="home-feature-lines" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <strong>{product.label}</strong>
                </div>
                <div className="home-feature-copy">
                  <h3>{product.title}</h3>
                  <p>{product.copy}</p>
                  <Link href="/products/restaurant">
                    Learn more
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}

            <article className="home-feature-card home-feature-cta">
              <div>
                <span className="home-badge">Launch bundle</span>
                <h3>Need a full restaurant app offer?</h3>
                <p>
                  Combine menu, ordering, booking, loyalty and customer updates into one branded restaurant app package.
                </p>
              </div>
              <Link className="home-btn home-btn-dark" href="/demo">
                Book a walkthrough
                <ArrowRight size={16} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="home-integrations-section">
        <div className="container">
          <div className="home-section-head">
            <span className="home-badge">Launch channels</span>
            <h2>Promote each restaurant app everywhere guests already look.</h2>
            <p>
              Use simple app links and restaurant-ready launch assets across QR codes, websites, social profiles and
              customer update channels.
            </p>
          </div>
        </div>
        <div className="home-integration-marquees">
          <div className="home-integration-track">
            {[...integrationsTop, ...integrationsTop].map((item, index) => (
              <span key={`${item}-${index}`}>
                <QrCode size={22} />
                {item}
              </span>
            ))}
          </div>
          <div className="home-integration-track home-integration-track-reverse">
            {[...integrationsBottom, ...integrationsBottom].map((item, index) => (
              <span key={`${item}-${index}`}>
                <Mail size={22} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="home-industries-section">
        <div className="container">
          <div className="home-section-head">
            <span className="home-badge">Restaurant segments</span>
            <h2>One app direction, different restaurant sales stories.</h2>
            <p>
              Keep the Loglime brand broad, while the v1 offer stays tightly focused on apps restaurants can sell and
              launch quickly.
            </p>
          </div>

          <div className="home-industry-grid">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <article className="home-industry-card" key={industry.title}>
                  <span>
                    <Icon size={28} />
                  </span>
                  <h3>{industry.title}</h3>
                  <p>{industry.copy}</p>
                  <Link href="/solutions/restaurants">
                    Explore fit
                    <ArrowRight size={15} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-testimonials-section">
        <div className="container">
          <div className="home-section-head">
            <span className="home-badge">Customer notes</span>
            <h2>Built for teams selling apps to restaurants.</h2>
          </div>
        </div>
        <div className="home-testimonial-mask">
          <div className="home-testimonial-track">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <article className="home-testimonial-card" key={`${testimonial.name}-${index}`}>
                <div className="home-stars" aria-label="Five star rating">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star fill="currentColor" key={star} size={16} />
                  ))}
                </div>
                <p>{testimonial.quote}</p>
                <div>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.role}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-faq-section" id="faq">
        <div className="container">
          <div className="home-section-head">
            <span className="home-badge">Faq&apos;s</span>
            <h2>Commonly asked questions.</h2>
            <p>Detailed answers for restaurant owners comparing customer-facing app packages.</p>
          </div>

          <div className="home-faq-list">
            {faqs.map((faq, index) => (
              <details className="home-faq-item" key={faq.q} open={index === 0}>
                <summary>
                  <span>{faq.q}</span>
                  <span className="home-faq-toggle" aria-hidden="true" />
                </summary>
                <div>
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="home-newsletter-section">
        <div className="container">
          <div className="home-newsletter-card">
            <span className="home-badge">
              <Sparkles size={14} />
              Launch
            </span>
            <h2>Start selling smarter restaurant apps today.</h2>
            <p>
              Book a walkthrough and see how Loglime packages ordering, menu, booking and loyalty apps for restaurants.
            </p>
            <form className="home-newsletter-form">
              <input aria-label="Email address" placeholder="Enter your email" type="email" />
              <Link className="home-btn home-btn-dark" href="/signup">
                Get started
                <ArrowRight size={16} />
              </Link>
            </form>
            <div className="home-proof-row">
              <span>
                <CircleCheck size={18} /> No credit card required
              </span>
              <span>
                <CalendarCheck size={18} /> 14-Day free trial
              </span>
              <span>
                <TrendingUp size={18} /> Built for restaurant sales
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
