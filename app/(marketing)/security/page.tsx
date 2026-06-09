import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { createMetadata, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/security"));

export default function SecurityPage() {
  return (
    <main className="container legal-page">
      <article>
        <ShieldCheck size={38} color="var(--primary)" />
        <h1 className="display">Security</h1>
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
    </main>
  );
}
