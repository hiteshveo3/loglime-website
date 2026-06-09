import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { createMetadata, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/demo"));

export default function DemoPage() {
  return (
    <main className="section">
      <div className="container grid-2" style={{ alignItems: "start" }}>
        <div className="section-head">
          <Badge>Restaurant app demo</Badge>
          <h1 className="display">See a restaurant app package in action.</h1>
          <p className="sub">
            Walk through online ordering, digital menu, table booking, loyalty offers and customer updates.
          </p>
          <ButtonLink href="/app/dashboard" variant="outline" size="lg">
            View sample app
          </ButtonLink>
        </div>
        <form className="card card-pad" style={{ display: "grid", gap: 16 }}>
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
    </main>
  );
}
