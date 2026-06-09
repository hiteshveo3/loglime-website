import type { Metadata } from "next";
import { Check } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
      <section className="section-tight">
        <div className="container grid-3">
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
            <article className={`card price-card ${tier.featured ? "featured" : ""}`} key={tier.name}>
              {tier.featured ? <Badge>Recommended</Badge> : null}
              <h2 className="h3">{tier.name}</h2>
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
        <div className="container">
          <SectionHeading eyebrow="FAQ" title="Pricing questions, briefly answered." />
          <div className="grid-3">
            {faqs.map((faq) => (
              <article className="card card-pad" key={faq.q}>
                <h2 className="h3">{faq.q}</h2>
                <p className="body">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
