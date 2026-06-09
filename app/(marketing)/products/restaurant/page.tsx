import type { Metadata } from "next";
import { BarChart3, ChefHat, Clock, MenuSquare, ShieldCheck, Table2 } from "lucide-react";
import { DashboardMock } from "@/components/marketing/DashboardMock";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createMetadata, restaurantSoftwareJsonLd, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/products/restaurant"));

const modules = [
  ["Ordering app", "Customers order pickup, delivery or dine-in from a branded restaurant app.", Table2],
  ["Digital menu", "QR menu, categories, item prices, photos and availability.", MenuSquare],
  ["Booking app", "Table booking and reservation requests from restaurant guests.", ChefHat],
  ["Loyalty offers", "Promos, repeat-customer rewards and customer updates.", ShieldCheck],
  ["App analytics", "Orders, top items, bookings and customer actions.", BarChart3],
  ["Launch support", "Brand, menu and customer flow setup for faster go-live.", Clock]
] as const;

export default function RestaurantProductPage() {
  return (
    <main>
      <JsonLd data={restaurantSoftwareJsonLd} />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Badge tone="coral">Loglime Restaurant Apps</Badge>
            <h1 className="display">Customer-facing apps for modern restaurants.</h1>
            <p className="sub">
              Sell branded restaurant apps for digital menus, online ordering, table bookings, loyalty offers and customer
              updates.
            </p>
            <div className="cta-row">
              <ButtonLink href="/signup" size="lg">
                Get an app package
              </ButtonLink>
              <ButtonLink href="/app/dashboard" variant="outline" size="lg">
                View sample app
              </ButtonLink>
            </div>
          </div>
          <DashboardMock />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="App modules" title="Everything a restaurant needs to launch a customer app." />
          <div className="grid-3">
            {modules.map(([title, copy, Icon]) => (
              <article className="card feature-card" key={title}>
                <div className="feature-icon">
                  <Icon size={22} />
                </div>
                <h2 className="h3">{title}</h2>
                <p className="body">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="future-modules" style={{ background: "#fff", borderBlock: "1px solid var(--border)" }}>
        <div className="container">
          <SectionHeading eyebrow="Growth modules" title="Start with one restaurant app, then add more ways to sell." />
          <div className="grid-4">
            {[
              ["Bookings", "Reservation requests and table booking pages", "teal"],
              ["Loyalty", "Customer rewards and offer workflows", "purple"],
              ["Ordering", "Direct online ordering and pickup flow", "amber"],
              ["Analytics", "Restaurant app sales and customer insights", "blue"]
            ].map(([name, copy, tone]) => (
              <article className="card card-pad" key={name}>
                <span className={`badge badge-${tone}`}>
                  <span className="badge-dot" />
                  Coming later
                </span>
                <h3 className="h3">Loglime {name}</h3>
                <p className="body">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
