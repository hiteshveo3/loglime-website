import Link from "next/link";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export default function NotFound() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="section">
        <div className="container section-head center">
          <span className="badge">
            <span className="badge-dot" />
            404
          </span>
          <h1 className="display">This page is off the floor plan.</h1>
          <p className="sub">Head back to Loglime Restaurant or check the core restaurant pages.</p>
          <div className="cta-row">
            <Link className="btn btn-primary btn-lg" href="/">
              Go home
            </Link>
            <Link className="btn btn-outline btn-lg" href="/products/restaurant">
              View restaurant product
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
