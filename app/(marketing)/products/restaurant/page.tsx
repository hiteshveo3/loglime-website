import type { Metadata } from "next";
import { BarChart3, ChefHat, Clock, MenuSquare, ShieldCheck, Sparkles, Table2 } from "lucide-react";
import { DashboardMock } from "@/components/marketing/DashboardMock";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { createMetadata, restaurantSoftwareJsonLd, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/products/restaurant"));

const modules = [
  ["Ordering app", "Customers order pickup, delivery or dine-in from a branded restaurant app.", Table2, "yellow"],
  ["Digital menu", "QR menu, categories, item prices, photos and availability.", MenuSquare, "cyan"],
  ["Booking app", "Table booking and reservation requests from restaurant guests.", ChefHat, "peach"],
  ["Loyalty offers", "Promos, repeat-customer rewards and customer updates.", ShieldCheck, "purple"],
  ["App analytics", "Orders, top items, bookings and customer actions.", BarChart3, "dark"],
  ["Launch support", "Brand, menu and customer flow setup for faster go-live.", Clock, "cyan"]
] as const;

export default function RestaurantProductPage() {
  return (
    <main>
      <JsonLd data={restaurantSoftwareJsonLd} />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Badge>Loglime Restaurant Apps</Badge>
            <h1 className="display">Customer-facing apps for modern restaurants.</h1>
            <p className="sub">
              Sell branded apps for digital menus, online ordering, table bookings, loyalty offers and customer updates.
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
      <section className="nex-section nex-section-white">
        <div className="container">
          <div className="nex-section-head center">
            <Badge>App modules</Badge>
            <h2>Everything a restaurant needs to launch a customer app.</h2>
            <p>Start with the product a restaurant understands first, then add more customer actions later.</p>
          </div>
          <div className="nex-product-grid">
            {modules.map(([title, copy, Icon, tone]) => (
              <article className={`nex-product-card nex-card-${tone}`} key={title}>
                <span className="nex-product-icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="nex-section" id="future-modules">
        <div className="container">
          <div className="nex-section-head center">
            <Badge>Growth modules</Badge>
            <h2>Start with one restaurant app, then add more ways to sell.</h2>
            <p>Keep future modules visible without making the first launch feel complicated.</p>
          </div>
          <div className="grid-4">
            {[
              ["Bookings", "Reservation requests and table booking pages", "teal"],
              ["Loyalty", "Customer rewards and offer workflows", "purple"],
              ["Ordering", "Direct online ordering and pickup flow", "amber"],
              ["Analytics", "Restaurant app sales and customer insights", "blue"]
            ].map(([name, copy, tone]) => (
              <article className="nex-soft-card" key={name}>
                <span className={`badge badge-${tone}`}>
                  <span className="badge-dot" />
                  Coming later
                </span>
                <h3>Loglime {name}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="nex-closer">
        <div className="container">
          <span className="nex-small-pill">
            <Sparkles size={14} /> Launch
          </span>
          <h2>Package the app, add the restaurant brand, and start selling direct customer actions.</h2>
          <p>Loglime gives restaurants the app layer customers see, without forcing a POS replacement conversation.</p>
          <div className="cta-row" style={{ justifyContent: "center" }}>
            <ButtonLink href="/demo">Book a demo</ButtonLink>
            <ButtonLink href="/pricing" variant="outline">View pricing</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
