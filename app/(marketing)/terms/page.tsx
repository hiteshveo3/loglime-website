import type { Metadata } from "next";
import { createMetadata, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/terms"));

export default function TermsPage() {
  return (
    <main className="container legal-page">
      <article>
        <h1 className="display">Terms of Service</h1>
        <section>
          <h2 className="h3">Service use</h2>
          <p className="body">Loglime provides restaurant operations software for authorized business users and their teams.</p>
        </section>
        <section>
          <h2 className="h3">Accounts</h2>
          <p className="body">Customers are responsible for app access, restaurant content and the accuracy of menu, offer and order data.</p>
        </section>
        <section>
          <h2 className="h3">Billing</h2>
          <p className="body">Subscription billing, trials and cancellations are governed by the plan selected at signup.</p>
        </section>
      </article>
    </main>
  );
}
