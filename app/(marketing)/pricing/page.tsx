import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import {
  ArrowRight,
  Check,
  CircleCheck,
  Code2,
  CreditCard,
  Languages,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  Zap
} from "lucide-react";
import { PricingCalculator } from "@/components/marketing/PricingCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { createMetadata, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/pricing"));

const plans = [
  {
    name: "Starter",
    price: "$149",
    was: "$298",
    maintenance: "$49/yr optional from year two",
    bestFor: "Single-location independent restaurants launching their first commission-free direct ordering channel.",
    cta: "Claim Early Access - $149",
    upgrade: "Upgrade to Business anytime - pay $100 difference only",
    sections: [
      {
        title: "Your branded app",
        text:
          "Your restaurant gets a fully branded iOS app on the Apple App Store and a fully branded Android app on Google Play, both published under your restaurant name and logo. Customers see your brand, not a generic marketplace."
      },
      {
        title: "Direct ordering for pickup, delivery and dine-in",
        text:
          "Customers order directly through your app. Every order lands in your admin dashboard instantly. Loglime deducts zero commission, supports unlimited orders and adds no per-order fees."
      },
      {
        title: "Restaurant admin dashboard",
        text:
          "Manage live orders, menu edits, stock updates, staff access and revenue reporting from a clean web dashboard built for busy restaurant owners."
      },
      {
        title: "Smart menu with full customization",
        text:
          "Build categories, item photos, descriptions, prices, modifiers and availability toggles. Update prices, add specials or mark items sold out from any device."
      },
      {
        title: "Customer app experience",
        text:
          "Customers sign up with Google, Apple or phone OTP, browse your branded menu, customize orders, check out securely, track status and reorder faster next time."
      },
      {
        title: "All payment gateways supported",
        text:
          "Stripe, Apple Pay, Google Pay, cards, cash on delivery and other gateways can be configured. Revenue goes directly to your restaurant account."
      },
      {
        title: "Analytics, logo and launch kit",
        text:
          "See revenue, top-selling items and order volume. Starter also includes free logo design, QR codes, social graphics, app store links and launch materials."
      },
      {
        title: "Full technical setup",
        text:
          "Loglime handles the build, dashboard setup, ordering flow, app store submission guidance, minor updates, email support and chat support."
      }
    ],
    features: [
      "Branded iOS app on App Store",
      "Branded Android app on Google Play",
      "Digital menu and QR ordering",
      "Unlimited orders with 0% Loglime commission",
      "Admin dashboard and app analytics",
      "Free logo design and launch kit"
    ]
  },
  {
    name: "Business",
    price: "$249",
    was: "$498",
    maintenance: "$49/yr optional from year two",
    bestFor:
      "Growing independent restaurants that want table bookings, loyalty, WhatsApp marketing and delivery management inside one branded app.",
    cta: "Claim Early Access - $249",
    upgrade: "Upgrade to Pro anytime - pay $150 difference only",
    featured: true,
    sections: [
      {
        title: "Everything in Starter",
        text: "Business includes the full Starter app, ordering flow, menu system, dashboard, analytics, branding, setup and launch support."
      },
      {
        title: "Table booking system",
        text:
          "Customers book tables directly through your branded app. You confirm or decline requests from the dashboard and customers receive automated status updates."
      },
      {
        title: "Loyalty and offers programme",
        text:
          "Create promotional offers, discount codes and repeat-guest rewards from the admin dashboard, then push them to customers who already have your app installed."
      },
      {
        title: "WhatsApp integration",
        text:
          "Send order status notifications and marketing broadcasts through WhatsApp so the restaurant owns a direct customer communication channel."
      },
      {
        title: "Rider and delivery management app",
        text:
          "Delivery riders get a dedicated app to accept deliveries, see navigation, update availability, view delivery history and share live status with the restaurant."
      },
      {
        title: "Multi-branch support",
        text:
          "Manage up to three restaurant locations from one dashboard while keeping each branch menu, queue, revenue and analytics separate."
      }
    ],
    features: [
      "Everything in Starter",
      "Table booking and reservations",
      "Loyalty offers and promo codes",
      "WhatsApp notifications and broadcasts",
      "Rider delivery app with GPS",
      "Up to 3 restaurant locations"
    ]
  },
  {
    name: "Pro",
    price: "$399",
    was: "$798",
    maintenance: "$49/yr optional from year two",
    bestFor:
      "Established independent restaurants that want AI-powered growth intelligence, complete white-label ownership and source code independence.",
    cta: "Claim Early Access - $399",
    upgrade: "Full ownership package",
    sections: [
      {
        title: "Everything in Business",
        text: "Pro includes every Business feature: direct ordering, booking, loyalty, WhatsApp, delivery management and multi-branch operations."
      },
      {
        title: "AI sales insights and demand forecasting",
        text:
          "The app analyzes order data and surfaces specific recommendations: what to promote, when to run offers, which hours are strongest and where demand is likely to rise."
      },
      {
        title: "AI menu recommendations",
        text:
          "Customers see item suggestions based on order history, time of day, popular trends and seasonal behavior, helping increase average order value."
      },
      {
        title: "AI ordering chatbot",
        text:
          "A built-in ordering assistant answers menu questions, guides customers through choices and reduces friction that causes abandoned carts."
      },
      {
        title: "Full source code ownership",
        text:
          "The complete iOS app, Android app and admin dashboard source code is delivered to you. You can self-host, modify, extend or hand it to another developer."
      },
      {
        title: "100% white-label",
        text:
          "No Loglime mention inside the app, notifications, emails or app store listing metadata. Customers know only your restaurant brand."
      },
      {
        title: "Unlimited multi-branch and priority support",
        text:
          "Scale beyond three locations, get a dedicated setup manager and move support requests above the standard queue."
      }
    ],
    features: [
      "Everything in Business",
      "AI sales insights and forecasting",
      "AI menu recommendations",
      "AI ordering chatbot",
      "Full source code ownership",
      "100% white-label experience"
    ]
  }
];

const comparisonGroups = [
  {
    group: "Pricing",
    rows: [
      ["Early access price", "$149", "$249", "$399"],
      ["Standard price", "$298", "$498", "$798"],
      ["Annual maintenance from year two", "$49/yr", "$49/yr", "$49/yr"]
    ]
  },
  {
    group: "App and platform",
    rows: [
      ["Branded iOS app - App Store", true, true, true],
      ["Branded Android app - Google Play", true, true, true],
      ["Published under restaurant name", true, true, true],
      ["Zero Loglime branding in app", true, true, true],
      ["100% white-label - zero Loglime anywhere", false, false, true],
      ["Full source code ownership", false, false, true],
      ["Restaurant admin dashboard", true, true, true]
    ]
  },
  {
    group: "Ordering and customer experience",
    rows: [
      ["Direct ordering - pickup, delivery, dine-in", true, true, true],
      ["Unlimited orders - no volume caps", true, true, true],
      ["0% commission on all orders", true, true, true],
      ["Menu with categories, photos, modifiers", true, true, true],
      ["Real-time order management", true, true, true],
      ["Google / Apple / OTP login", true, true, true],
      ["Automated push notifications", true, true, true],
      ["One-tap reorder", true, true, true],
      ["AI menu recommendations", false, false, true],
      ["AI ordering chatbot", false, false, true]
    ]
  },
  {
    group: "Payments and analytics",
    rows: [
      ["All payment gateways supported", true, true, true],
      ["Revenue direct to restaurant account", true, true, true],
      ["Loglime commission on orders", "0%", "0%", "0%"],
      ["Sales revenue dashboard", true, true, true],
      ["Top-selling items report", true, true, true],
      ["AI sales insights", false, false, true],
      ["AI demand forecasting", false, false, true]
    ]
  },
  {
    group: "Bookings, loyalty, delivery and branches",
    rows: [
      ["Table booking system", false, true, true],
      ["Loyalty and offers programme", false, true, true],
      ["WhatsApp order notifications", false, true, true],
      ["WhatsApp marketing broadcasts", false, true, true],
      ["Rider delivery management app", false, true, true],
      ["Real-time rider GPS tracking", false, true, true],
      ["Route optimization", false, true, true],
      ["Number of locations", "1", "Up to 3", "Unlimited"]
    ]
  },
  {
    group: "Setup, launch and support",
    rows: [
      ["Full technical setup by Loglime", true, true, true],
      ["Free logo design", true, true, true],
      ["Free marketing launch kit", true, true, true],
      ["App Store and Google Play submission guidance", true, true, true],
      ["Developer account setup guidance", true, true, true],
      ["Dedicated setup manager", false, false, true],
      ["Email and live chat support", true, true, true],
      ["Priority support", false, false, true],
      ["Minor updates included", true, true, true]
    ]
  },
  {
    group: "Upgrade path",
    rows: [
      ["Upgrade to Business - pay difference only", "$100", "-", "-"],
      ["Upgrade to Pro - pay difference only", "$250", "$150", "-"]
    ]
  }
];

const yearOneCosts = [
  ["Loglime setup fee - early access", "Loglime", "$149", "$249", "$399"],
  ["Apple Developer Account", "Apple direct", "$99/yr", "$99/yr", "$99/yr"],
  ["Google Play Developer Account", "Google direct", "$25 one-time", "$25 one-time", "$25 one-time"],
  ["Firebase backend hosting", "Google direct", "Free", "Free", "Free"],
  ["Payment gateway fees", "Your gateway", "2.9% + 30c/txn", "2.9% + 30c/txn", "2.9% + 30c/txn"],
  ["Loglime commission on orders", "N/A", "$0", "$0", "$0"],
  ["Monthly subscription to Loglime", "N/A", "$0", "$0", "$0"],
  ["Total fixed costs - year one", "", "~$273", "~$373", "~$523"]
];

const yearTwoCosts = [
  ["Loglime annual maintenance - optional", "$49/yr", "$49/yr", "$49/yr"],
  ["Apple Developer Account", "$99/yr", "$99/yr", "$99/yr"],
  ["Google Play Developer Account", "$0 one-time paid", "$0", "$0"],
  ["Firebase backend", "Free", "Free", "Free"],
  ["Payment gateway fees", "2.9% + 30c/txn", "2.9% + 30c/txn", "2.9% + 30c/txn"],
  ["Total fixed costs - year two+", "~$148/yr", "~$148/yr", "~$148/yr"]
];

const roiRows = [
  ["$2,000/mo via marketplace at 25%", "$500/mo = $6,000/yr", "$273 total", "First direct order weekend"],
  ["$4,000/mo via marketplace at 25%", "$1,000/mo = $12,000/yr", "$273 total", "First day of direct orders"],
  ["$6,000/mo via marketplace at 25%", "$1,500/mo = $18,000/yr", "$273 total", "First few hours of orders"]
];

const addons = [
  {
    icon: Rocket,
    name: "Priority / Express Setup",
    price: "$79 one-time",
    copy:
      "Move your restaurant to the front of the build queue when a launch date, seasonal push or grand opening is already scheduled."
  },
  {
    icon: Store,
    name: "Extra Branch Setup",
    price: "$79 per branch",
    copy:
      "Add a second Starter location or branches beyond the Business plan limit with a one-time branch setup."
  },
  {
    icon: Languages,
    name: "Additional Language Support",
    price: "$99 per language",
    copy:
      "Configure the customer app interface, buttons, notifications and checkout flow in another language."
  },
  {
    icon: CreditCard,
    name: "Custom Payment Gateway",
    price: "$99 one-time",
    copy:
      "Connect a specific payment provider beyond the standard supported gateway options."
  },
  {
    icon: Code2,
    name: "Custom Feature Development",
    price: "Quoted per project",
    copy:
      "Scope and build a bespoke loyalty mechanic, POS data connection, unique ordering flow or restaurant-specific feature."
  }
];

const maintenanceItems = [
  "Minor app updates, bug fixes, performance improvements and small interface enhancements",
  "Hosting infrastructure support for Firebase or backend issues",
  "Email and chat support for ongoing technical questions",
  "App store compliance updates as Apple and Google guidelines change"
];

const faqs = [
  {
    q: "How much does Loglime cost in total, including everything I need to pay?",
    a: "In year one with the early access Starter plan, fixed costs are approximately $273: $149 to Loglime, $99 to Apple for the Apple Developer Account and $25 to Google for the Google Play Developer Account. Firebase is expected to stay free at independent restaurant scale. Payment gateway fees are paid directly to the chosen gateway, not to Loglime. From year two onward, fixed costs are approximately $148 per year if the restaurant keeps optional Loglime maintenance active."
  },
  {
    q: "Is there a monthly fee for Loglime?",
    a: "No. Loglime pricing is a one-time setup fee: $149 for Starter, $249 for Business and $399 for Pro during early access. There is no monthly subscription to Loglime. The only recurring Loglime cost is optional $49 per year maintenance from year two onward, covering minor updates, technical support and small compliance help."
  },
  {
    q: "Does Loglime take commission on my orders?",
    a: "Never. Loglime charges zero commission on every order your restaurant takes through its own app, on every plan and at every volume level. Payment goes directly to the restaurant payment gateway account. Loglime does not sit between the restaurant and the customer payment."
  },
  {
    q: "What is the early access offer?",
    a: "The first 10 independent restaurants receive 50% off standard setup pricing. Starter drops from $298 to $149, Business from $498 to $249 and Pro from $798 to $399. Early access closes when those spots are taken, and standard pricing applies after that."
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes. A restaurant can upgrade from Starter to Business or Pro later and pay only the difference while early access pricing is active: $100 from Starter to Business, $250 from Starter to Pro and $150 from Business to Pro."
  },
  {
    q: "What do I need to pay Apple and Google?",
    a: "To publish branded apps under the restaurant name, the restaurant needs an Apple Developer Account at $99 per year and a Google Play Developer Account at $25 one-time. These accounts are paid directly to Apple and Google and belong to the restaurant."
  },
  {
    q: "What happens if I do not renew the $49 maintenance fee?",
    a: "The app continues to run and customers can keep ordering. The restaurant simply loses access to Loglime support, minor updates and technical assistance. The maintenance fee is optional."
  },
  {
    q: "Are there any per-order fees from Loglime?",
    a: "No. Loglime charges zero per-order fees and zero transaction fees. Standard payment gateway processing fees, such as Stripe fees, are paid directly to the payment gateway."
  },
  {
    q: "Is Starter really a complete app?",
    a: "Yes. Starter includes branded iOS and Android apps, direct ordering, admin dashboard, menu customization, customer login, order tracking, push notifications, supported payment gateways, analytics, logo design, launch kit, technical setup and support."
  },
  {
    q: "What makes Pro different?",
    a: "Pro adds full source code ownership, AI sales insights, demand forecasting, AI menu recommendations, an AI ordering chatbot, unlimited multi-branch support, priority support and a 100% white-label experience with no Loglime mention anywhere."
  },
  {
    q: "Is there a free trial?",
    a: "There is no free trial because each restaurant app is configured around that restaurant brand, menu and business details. Instead, restaurants can book a demo and review the full app flow before committing."
  },
  {
    q: "Cuanto cuesta Loglime para restaurantes en Estados Unidos?",
    a: "Loglime ofrece acceso anticipado desde $149 de pago unico para Starter, sin mensualidades ni comision por pedido. Business cuesta $249 y Pro cuesta $399 durante acceso anticipado. Todos los planes incluyen apps iOS y Android con la marca del restaurante."
  }
];

const productOffers = plans.map((plan) => ({
  "@type": "Product",
  name: `Loglime ${plan.name}`,
  description: plan.bestFor,
  offers: {
    "@type": "Offer",
    price: plan.price.replace("$", ""),
    priceCurrency: "USD",
    availability: "https://schema.org/LimitedAvailability"
  }
}));

const schema = [
  {
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
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://loglime.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pricing",
        item: "https://loglime.com/pricing"
      }
    ]
  },
  ...productOffers
];

function ValueCell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="pricing-table-check" aria-label="Included">
        <Check size={16} />
      </span>
    ) : (
      <span className="pricing-table-dash" aria-label="Not included">
        -
      </span>
    );
  }

  return <span>{value}</span>;
}

export default function PricingPage() {
  return (
    <main className="pricing-template">
      <JsonLd data={schema} />

      <section className="pricing-hero">
        <div className="container pricing-hero-inner">
          <span className="pricing-pill">Simple, transparent, honest pricing - no surprises</span>
          <h1>
            One-time setup. <span>Zero commission.</span> Zero monthly fees. Forever.
          </h1>
          <p>
            Every Loglime plan is a single one-time payment. Your fully branded iOS and Android restaurant app goes live
            under your restaurant name, and Loglime never charges commission on a single order.
          </p>
          <div className="pricing-urgency">
            <Zap size={16} />
            Early Access Offer - 50% off for the first 10 restaurants only. Early access prices: $149 / $249 / $399.
          </div>
          <div className="pricing-hero-actions">
            <Link className="pricing-btn pricing-btn-lime" href="#plans">
              Claim Your Early Access Spot
              <ArrowRight size={16} />
            </Link>
            <Link className="pricing-btn pricing-btn-outline" href="#calculator">
              Calculate savings
            </Link>
          </div>
          <div className="pricing-trust-row">
            {[
              "One-time payment",
              "0% commission forever",
              "No monthly subscription",
              "iOS and Android included",
              "Your name on app stores",
              "7-day review window"
            ].map((item) => (
              <span key={item}>
                <Check size={14} /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-philosophy-section">
        <div className="container pricing-philosophy-grid">
          <div>
            <span className="pricing-eyebrow">Why we charge a one-time fee</span>
            <h2>We built Loglime so your app pays for itself, not the other way around.</h2>
            <p>
              Most restaurant software companies make money by locking you into a monthly subscription forever. Some
              pile commission on top. Others charge per location, per feature or per user. The fees compound. The
              savings never materialise.
            </p>
            <p>
              Loglime works differently. We charge a one-time setup fee because your restaurant app should become a
              permanent asset that saves money every month, not another recurring bill sitting next to marketplace fees.
            </p>
          </div>
          <div className="pricing-power-callout">
            <span />
            <p>
              DoorDash can charge up to 30% per order, every order, forever. Loglime early access starts at $149 once.
              The math is not complicated.
            </p>
          </div>
        </div>
      </section>

      <section className="pricing-access-band">
        <div className="container pricing-access-grid">
          <div>
            <span className="pricing-eyebrow">Limited - first 10 restaurants only</span>
            <h2>Early Access: 50% off setup for the first 10 independent restaurants.</h2>
            <p>
              We are onboarding our first 10 independent restaurants at 50% off the standard setup fee. When these spots
              are gone, standard pricing applies.
            </p>
          </div>
          <div className="pricing-spots-card">
            <strong>10 spots</strong>
            <span>Limited launch batch</span>
            <div className="pricing-spots-bar">
              <span />
            </div>
          </div>
        </div>
        <div className="container pricing-table-wrap pricing-access-table-wrap">
          <table className="pricing-simple-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Standard Price</th>
                <th>Early Access Price</th>
                <th>You Save</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Starter", "$298", "$149", "$149"],
                ["Business", "$498", "$249", "$249"],
                ["Pro", "$798", "$399", "$399"]
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td className={index === 2 ? "pricing-table-highlight" : ""} key={cell}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pricing-plans-section" id="plans">
        <div className="container">
          <div className="pricing-section-head">
            <span className="pricing-eyebrow">Choose your plan</span>
            <h2>Three plans. Every independent restaurant covered. Upgrade anytime.</h2>
            <p>
              Every plan includes a fully branded iOS and Android app published under the restaurant name. Upgrade
              later and pay only the price difference.
            </p>
          </div>

          <div className="pricing-plan-grid">
            {plans.map((plan) => (
              <article className={plan.featured ? "pricing-plan-card featured" : "pricing-plan-card"} key={plan.name}>
                {plan.featured ? <span className="pricing-plan-badge">Most popular</span> : null}
                <div className="pricing-plan-head">
                  <h3>{plan.name}</h3>
                  <div className="pricing-price-row">
                    <strong>{plan.price}</strong>
                    <span>{plan.was}</span>
                  </div>
                  <p>{plan.bestFor}</p>
                  <small>{plan.maintenance}</small>
                </div>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span>
                        <Check size={12} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link className={plan.featured ? "pricing-plan-cta dark" : "pricing-plan-cta"} href="/demo">
                  {plan.cta}
                </Link>
              </article>
            ))}
          </div>

          <div className="pricing-plan-details">
            {plans.map((plan) => (
              <article className="pricing-detail-card" key={`${plan.name}-details`}>
                <div className="pricing-detail-head">
                  <span>{plan.name}</span>
                  <h3>{plan.name} full feature breakdown</h3>
                  <p>{plan.upgrade}</p>
                </div>
                <div className="pricing-detail-grid">
                  {plan.sections.map((section) => (
                    <div className="pricing-detail-item" key={section.title}>
                      <h4>{section.title}</h4>
                      <p>{section.text}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PricingCalculator />

      <section className="pricing-comparison-section" id="compare">
        <div className="container">
          <div className="pricing-section-head">
            <span className="pricing-eyebrow">Every feature, side by side</span>
            <h2>Starter vs Business vs Pro - complete feature comparison.</h2>
            <p>Use this table to choose the lowest plan that matches the restaurant&apos;s current launch needs.</p>
          </div>
          <div className="pricing-table-wrap">
            <table className="pricing-comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Starter</th>
                  <th>Business</th>
                  <th>Pro</th>
                </tr>
              </thead>
              <tbody>
                {comparisonGroups.map((group) => (
                  <Fragment key={group.group}>
                    <tr className="pricing-table-group" key={`${group.group}-group`}>
                      <td colSpan={4}>{group.group}</td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={`${group.group}-${row[0]}`}>
                        <td>{row[0]}</td>
                        <td>
                          <ValueCell value={row[1]} />
                        </td>
                        <td className="pricing-featured-col">
                          <ValueCell value={row[2]} />
                        </td>
                        <td>
                          <ValueCell value={row[3]} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="pricing-cost-section" id="costs">
        <div className="container">
          <div className="pricing-section-head">
            <span className="pricing-eyebrow">Complete transparency - no surprises</span>
            <h2>Every single cost you will pay in year one.</h2>
            <p>
              Loglime shows the setup fee plus the third-party costs that go directly to Apple, Google and your payment
              gateway, so restaurants understand the full commitment before spending a dollar.
            </p>
          </div>

          <div className="pricing-table-wrap">
            <table className="pricing-simple-table">
              <thead>
                <tr>
                  <th>Cost Item</th>
                  <th>Who You Pay</th>
                  <th>Starter</th>
                  <th>Business</th>
                  <th>Pro</th>
                </tr>
              </thead>
              <tbody>
                {yearOneCosts.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td className={row[0].startsWith("Total") || cell === "$0" ? "pricing-table-highlight" : ""} key={`${row[0]}-${index}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pricing-notes-grid">
            {[
              "Apple Developer Account is paid directly to Apple and is required to publish and maintain an iOS app.",
              "Google Play Developer Account is paid directly to Google and is a one-time registration fee.",
              "Firebase free tier covers most independent restaurant use cases until order volume becomes very high.",
              "Payment gateway fees are charged by the chosen gateway. Loglime charges zero order commission."
            ].map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>

          <div className="pricing-dual-table">
            <div className="pricing-table-wrap">
              <table className="pricing-simple-table">
                <thead>
                  <tr>
                    <th>Year two cost item</th>
                    <th>Starter</th>
                    <th>Business</th>
                    <th>Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {yearTwoCosts.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => (
                        <td className={row[0].startsWith("Total") ? "pricing-table-highlight" : ""} key={`${row[0]}-${index}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pricing-table-wrap">
              <table className="pricing-simple-table">
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>Marketplace Cost</th>
                    <th>Loglime Year One</th>
                    <th>Break-Even Point</th>
                  </tr>
                </thead>
                <tbody>
                  {roiRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => (
                        <td className={index === 2 ? "pricing-table-highlight" : ""} key={`${row[0]}-${index}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-addons-section">
        <div className="container">
          <div className="pricing-section-head">
            <span className="pricing-eyebrow">Extend your app</span>
            <h2>Optional add-ons available on any plan.</h2>
            <p>Every plan is complete as sold. These add-ons are only for restaurants that need something beyond scope.</p>
          </div>
          <div className="pricing-addon-grid">
            {addons.map((addon) => {
              const Icon = addon.icon;
              return (
                <article className="pricing-addon-card" key={addon.name}>
                  <span>
                    <Icon size={22} />
                  </span>
                  <strong>{addon.price}</strong>
                  <h3>{addon.name}</h3>
                  <p>{addon.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pricing-upgrade-section">
        <div className="container pricing-upgrade-grid">
          <div>
            <span className="pricing-eyebrow">Start small. Scale when ready.</span>
            <h2>Upgrade anytime and pay only the difference.</h2>
            <p>
              Restaurants do not need to commit to the biggest package on day one. Start with the first direct ordering
              channel, then add booking, loyalty, AI and ownership when ready.
            </p>
          </div>
          <div className="pricing-upgrade-cards">
            {[
              ["Starter", "Business", "$100"],
              ["Starter", "Pro", "$250"],
              ["Business", "Pro", "$150"]
            ].map(([from, to, price]) => (
              <article key={`${from}-${to}`}>
                <span>{from}</span>
                <ArrowRight size={18} />
                <span>{to}</span>
                <strong>{price}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-maintenance-section">
        <div className="container pricing-maintenance-grid">
          <div>
            <span className="pricing-eyebrow">What happens after year one</span>
            <h2>The $49/year maintenance fee is optional and clear.</h2>
            <p>
              If a restaurant skips maintenance, the app keeps running and orders keep coming in. Maintenance keeps
              Loglime support, minor updates and technical assistance active.
            </p>
          </div>
          <div className="pricing-maintenance-card">
            <h3>What $49/year covers</h3>
            <ul>
              {maintenanceItems.map((item) => (
                <li key={item}>
                  <Check size={14} />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              Major new features and custom development requests are quoted separately as optional upgrades or add-ons.
            </p>
          </div>
        </div>
      </section>

      <section className="pricing-guarantee-section">
        <div className="container">
          <div className="pricing-section-head">
            <span className="pricing-eyebrow">Zero risk</span>
            <h2>Full refund before setup starts. 7 days to review after delivery.</h2>
            <p>
              If setup has not started, the restaurant can receive a full refund. After delivery, there is a 7-day
              review window for issues that need to be fixed.
            </p>
          </div>
          <div className="pricing-guarantee-grid">
            {[
              ["Before setup starts", "Full refund of the setup fee if the restaurant changes its mind before build work begins."],
              ["After delivery", "7 days to test, review every feature and raise issues. We fix legitimate technical problems."],
              ["Not covered", "Third-party Apple, Google and payment gateway costs are subject to those providers policies."]
            ].map(([title, copy]) => (
              <article key={title}>
                <ShieldCheck size={24} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-reseller-section">
        <div className="container pricing-reseller-card">
          <div>
            <span className="pricing-eyebrow">For agencies and digital studios</span>
            <h2>Resell Loglime restaurant apps to your clients.</h2>
            <p>
              Marketing agencies, web design studios and hospitality consultants can offer branded iOS and Android
              restaurant apps without hiring a development team. We handle the build and technical setup.
            </p>
          </div>
          <ul>
            {[
              "White-label builds under your agency process",
              "Volume pricing for multiple restaurant orders",
              "Dedicated agency account manager",
              "Co-branded sales materials if required",
              "Priority build queue for agency clients"
            ].map((item) => (
              <li key={item}>
                <Check size={14} />
                {item}
              </li>
            ))}
          </ul>
          <Link className="pricing-btn pricing-btn-dark" href="/contact">
            Apply for reseller programme
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="pricing-faq-section" id="faq">
        <div className="container pricing-faq-grid">
          <div className="pricing-section-head left">
            <span className="pricing-eyebrow">Every pricing question answered</span>
            <h2>Detailed answers for independent restaurant owners.</h2>
            <p>No hidden commission, no monthly surprise and no complicated platform rebuild.</p>
          </div>
          <div className="pricing-faq-list">
            {faqs.map((faq, index) => (
              <details className="pricing-faq-item" key={faq.q} open={index === 0}>
                <summary>
                  <span>{faq.q}</span>
                  <span className="pricing-faq-toggle" aria-hidden="true" />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-final-cta">
        <div className="container">
          <span className="pricing-pill">
            <Sparkles size={14} />
            Early access spots are limited
          </span>
          <h2>Your restaurant app is $149 away. The next commission invoice is not.</h2>
          <p>
            You now have every number, feature and cost in front of you. At $149 early access, Loglime can pay for
            itself on the first direct order weekend.
          </p>
          <div className="pricing-hero-actions">
            <Link className="pricing-btn pricing-btn-dark" href="/signup">
              Claim Early Access - From $149
              <ArrowRight size={16} />
            </Link>
            <Link className="pricing-btn pricing-btn-outline-dark" href="/demo">
              See a full demo first
            </Link>
          </div>
          <div className="pricing-final-proof">
            <span>
              <CircleCheck size={17} /> Full refund before setup starts
            </span>
            <span>
              <CircleCheck size={17} /> No monthly fees
            </span>
            <span>
              <CircleCheck size={17} /> No commission
            </span>
          </div>
          <p className="pricing-seo-note">
            Loglime pricing starts at $149 one-time setup for independent restaurants across the USA, including New
            York, Los Angeles, Houston, Chicago, Miami and Dallas. No monthly subscription. Zero commission on every
            order. Standard pricing: Starter $298, Business $498, Pro $798.
          </p>
        </div>
      </section>
    </main>
  );
}
