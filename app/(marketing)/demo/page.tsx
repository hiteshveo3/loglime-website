import type { Metadata } from "next";
import { CalendarCheck, CheckCircle, Smartphone } from "lucide-react";
import { DashboardMock } from "@/components/marketing/DashboardMock";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { createMetadata, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/demo"));

const demoHighlights = [
  {
    title: "Customer app preview",
    copy: "See the app the restaurant customer will actually use.",
    Icon: Smartphone
  },
  {
    title: "Launch checklist",
    copy: "Review brand, menu, customer flow and rollout assets.",
    Icon: CheckCircle
  }
];

export default function DemoPage() {
  return (
    <main>
      <section className="hero">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div className="section-head">
            <Badge>Restaurant app demo</Badge>
            <h1 className="display">See a restaurant app package in action.</h1>
            <p className="sub">
              Walk through online ordering, digital menu, table booking, loyalty offers and customer updates in one clean app
              launch flow.
            </p>
            <div className="cta-row">
              <ButtonLink href="/app/dashboard" variant="outline" size="lg">
                View sample app
              </ButtonLink>
              <ButtonLink href="/pricing" size="lg">
                View packages
              </ButtonLink>
            </div>
          </div>
          <form className="nex-form-card">
            <span className="feature-icon">
              <CalendarCheck size={24} />
            </span>
            <h2 className="h2">Book a walkthrough</h2>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input className="input" id="name" placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input className="input" id="email" placeholder="you@restaurant.com" type="email" />
            </div>
            <div className="field">
              <label htmlFor="restaurant">Restaurant type</label>
              <select className="select" id="restaurant">
                <option>Cafe</option>
                <option>Quick service</option>
                <option>Fine dining</option>
                <option>Multi-location</option>
              </select>
            </div>
            <button className="btn btn-primary" type="button">
              Request demo
            </button>
          </form>
        </div>
      </section>
      <section className="nex-section nex-section-white">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <DashboardMock />
          <div className="grid-1" style={{ display: "grid", gap: 18 }}>
            {demoHighlights.map(({ title, copy, Icon }) => (
              <article className="nex-soft-card" key={title}>
                <span className="feature-icon">
                  <Icon size={22} />
                </span>
                <h2>{title}</h2>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
