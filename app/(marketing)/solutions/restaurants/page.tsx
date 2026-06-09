import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createMetadata, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/solutions/restaurants"));

export default function RestaurantsSolutionPage() {
  return (
    <main>
      <section className="hero">
        <div className="container section-head center">
          <Badge tone="coral">For restaurants and cafes</Badge>
          <h1 className="display">Keep the floor moving and the kitchen honest.</h1>
          <p className="sub">
            Loglime Restaurant is built for operators who need fewer tools, clearer handoffs and better daily visibility.
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
      <section className="section-tight">
        <div className="container grid-3">
          {[
            ["Cafe", "Fast table turnover, item availability and shift handoff."],
            ["QSR", "Live queue, kitchen status and counter-friendly order flow."],
            ["Multi-location", "Organization and location model ready for scale."]
          ].map(([title, copy]) => (
            <article className="card card-pad" key={title}>
              <Check size={20} color="var(--primary)" />
              <h2 className="h3">{title}</h2>
              <p className="body">{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Built around service" title="Use one system from open checks to kitchen ready." />
          <div className="grid-2">
            {[
              "Servers see table status and open orders.",
              "Kitchen sees only the queue it needs.",
              "Managers track revenue and queue health.",
              "Owners keep staff access scoped by role."
            ].map((item) => (
              <div className="order-chip" key={item}>
                <Check size={17} color="var(--primary)" />
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
