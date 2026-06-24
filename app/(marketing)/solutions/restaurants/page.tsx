import type { Metadata } from "next";
import { Check, CircleCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { createMetadata, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/solutions/restaurants"));

export default function RestaurantsSolutionPage() {
  return (
    <main>
      <section className="hero">
        <div className="container section-head center">
          <Badge>For restaurants and cafes</Badge>
          <h1 className="display">Sell app packages restaurants instantly understand.</h1>
          <p className="sub">
            Loglime helps restaurants launch the customer-facing app layer: digital menus, direct orders, bookings, loyalty
            offers and customer updates.
          </p>
          <div className="cta-row" style={{ justifyContent: "center" }}>
            <ButtonLink href="/demo" size="lg">
              Book a demo
            </ButtonLink>
            <ButtonLink href="/pricing" variant="outline" size="lg">
              View pricing
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="nex-section nex-section-white">
        <div className="container grid-3">
          {[
            ["Cafe", "Menu, pre-order and loyalty apps for regular customers."],
            ["QSR", "Fast ordering apps for takeaway, pickup and delivery intent."],
            ["Multi-location", "Branded app packages that can grow across locations."]
          ].map(([title, copy]) => (
            <article className="nex-soft-card" key={title}>
              <span className="feature-icon">
                <Check size={20} />
              </span>
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="nex-section">
        <div className="container">
          <div className="nex-section-head center">
            <Badge>Built around selling</Badge>
            <h2>Use one clean pitch from first demo to live restaurant app.</h2>
            <p>Keep the offer simple for restaurant owners: launch the app customers use, then expand modules later.</p>
          </div>
          <div className="grid-2">
            {[
              "Show a branded app experience instead of abstract software screens.",
              "Start with menus or ordering, then add bookings and loyalty.",
              "Use QR codes, website CTAs and social links to drive customers.",
              "Keep POS and payments as future integrations, not the first sales hurdle."
            ].map((item) => (
              <div className="order-chip" key={item}>
                <Check size={17} color="var(--primary)" />
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="nex-closer">
        <div className="container">
          <span className="nex-small-pill">
            <Sparkles size={14} /> Restaurant apps
          </span>
          <h2>Give restaurants a direct customer channel they can launch quickly.</h2>
          <p>Digital menus, ordering, bookings and loyalty packaged for clear sales conversations.</p>
          <div className="nex-proof-row">
            <span>
              <CircleCheck size={18} /> Customer-facing apps
            </span>
            <span>
              <CircleCheck size={18} /> Restaurant-first launch flow
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
