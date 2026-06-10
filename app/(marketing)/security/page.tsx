import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { createMetadata, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/security"));

export default function SecurityPage() {
  return (
    <main>
      <section className="hero">
        <div className="container section-head center">
          <span className="feature-icon">
            <ShieldCheck size={26} />
          </span>
          <h1 className="display">Security</h1>
          <p className="sub">The practical security posture behind Loglime restaurant apps.</p>
        </div>
      </section>
      <section className="section">
        <div className="container legal-page">
          <article className="nex-legal-card">
            <section>
              <h2 className="h3">Tenant isolation</h2>
              <p className="body">The Supabase schema uses organization-scoped tables and Row Level Security policies for restaurant data.</p>
            </section>
            <section>
              <h2 className="h3">Access control</h2>
              <p className="body">V1 roles include owner, manager, server, kitchen and cashier. Product behavior can layer more permission checks on top.</p>
            </section>
            <section>
              <h2 className="h3">Operational posture</h2>
              <p className="body">Environment secrets stay outside the repo. Public pages are static or server-rendered and app routes are protected by middleware.</p>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
