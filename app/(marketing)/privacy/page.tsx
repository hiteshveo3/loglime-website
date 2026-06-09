import type { Metadata } from "next";
import { createMetadata, routeMeta } from "@/lib/seo";

export const metadata: Metadata = createMetadata(routeMeta("/privacy"));

export default function PrivacyPage() {
  return (
    <main className="container legal-page">
      <article>
        <h1 className="display">Privacy Policy</h1>
        <section>
          <h2 className="h3">Data we process</h2>
          <p className="body">Loglime stores account, restaurant app, menu, booking, order and customer data needed to run the service.</p>
        </section>
        <section>
          <h2 className="h3">Use of data</h2>
          <p className="body">We use data to provide the product, secure accounts, support teams and improve restaurant workflows.</p>
        </section>
        <section>
          <h2 className="h3">Control</h2>
          <p className="body">Workspace owners can request exports, corrections or deletion according to their service agreement.</p>
        </section>
      </article>
    </main>
  );
}
