import type { Metadata } from "next";
import { Check, CircleCheck, Sparkles } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { createMetadata, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/pricing"));

const faqs = [
  {
    q: "Can a restaurant start with one app?",
    a: "Yes. Start with a digital menu or ordering app, then add booking, loyalty and analytics later."
  },
  {
    q: "Does this replace POS?",
    a: "No. Loglime sells customer-facing restaurant apps. POS/payment integrations can be added later where needed."
  },
  {
    q: "Can the app be branded?",
    a: "Yes. Packages can use the restaurant logo, colors, menu, offers, photos and customer flow."
  }
];

const schema = {
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

export default function PricingPage() {
  return (
    <main>
      <JsonLd data={schema} />
      <section className="hero">
        <div className="container section-head center">
          <Badge>Transparent restaurant app pricing</Badge>
          <h1 className="display">Pick the app package your restaurant needs.</h1>
          <p className="sub">
            Start with a digital menu or ordering app. Add bookings, loyalty and growth tools when the restaurant is ready.
          </p>
        </div>
      </section>
      <section className="nex-section nex-section-white">
        <div className="container nex-pricing-grid">
          {[
            {
              name: "Menu Starter",
              price: "$29",
              copy: "For one restaurant launching a digital menu.",
              features: ["Digital menu app", "QR-ready menu", "Brand setup", "Basic support"]
            },
            {
              name: "Ordering Growth",
              price: "$79",
              copy: "For restaurants selling online orders.",
              features: ["Online ordering app", "Booking requests", "Loyalty offers", "Priority support"],
              featured: true
            },
            {
              name: "Restaurant Scale",
              price: "Custom",
              copy: "For custom branded app rollouts.",
              features: ["Full app bundle", "Multi-location setup", "Custom flows", "Dedicated launch help"]
            }
          ].map((tier) => (
            <article className={`nex-price-card ${tier.featured ? "featured" : ""}`} key={tier.name}>
              <div className="price-head">
                <h3>{tier.name}</h3>
                {tier.featured ? <span className="nex-small-pill">Popular</span> : null}
              </div>
              <div className="price">
                {tier.price}
                {tier.price.startsWith("$") ? <small> /mo</small> : null}
              </div>
              <p className="body">{tier.copy}</p>
              <ul className="check-list">
                {tier.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} color="var(--primary)" />
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink href={tier.featured ? "/signup" : "/demo"} variant={tier.featured ? "primary" : "outline"}>
                {tier.featured ? "Get Growth" : "Talk to sales"}
              </ButtonLink>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container nex-faq-grid">
          <div className="nex-section-head">
            <Badge>FAQ</Badge>
            <h2>Pricing questions, briefly answered.</h2>
            <p>Clear packages for restaurants that want customer-facing apps without a heavy platform rebuild.</p>
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
      <section className="nex-closer">
        <div className="container">
          <span className="nex-small-pill">
            <Sparkles size={14} /> Start
          </span>
          <h2>Choose a package and launch the first restaurant app.</h2>
          <p>Start small with a menu app, or launch a full ordering and loyalty bundle when the restaurant is ready.</p>
          <div className="nex-proof-row">
            <span>
              <CircleCheck size={18} /> Guided setup
            </span>
            <span>
              <CircleCheck size={18} /> Restaurant-first app packages
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
