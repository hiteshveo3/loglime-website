import type { Metadata } from "next";

const documents = [
  { title: "Privacy Policy", description: "How Loglime collects, uses, stores, and protects personal information.", href: "/privacy", icon: "hgi-shield-01" },
  { title: "Terms of Service", description: "The terms governing access to and use of Loglime products and services.", href: "/terms", icon: "hgi-license" },
  { title: "Cookie Policy", description: "Cookies, local storage, analytics, and preference controls used by Loglime.", href: "/cookies", icon: "hgi-cookie" },
  { title: "Refund Policy", description: "Eligibility, exclusions, and the process for requesting a refund.", href: "/refunds", icon: "hgi-invoice-03" },
  { title: "Acceptable Use", description: "Rules that keep Loglime systems secure, lawful, and reliable.", href: "/acceptable-use", icon: "hgi-check-list" },
];

export const metadata: Metadata = {
  title: "Loglime Legal Center",
  description: "Loglime privacy, terms, cookies, refunds, and acceptable use policies.",
};

export default function LegalCenterPage() {
  return (
    <main className="bg-surface-alt">
      <section className="mx-auto max-w-page px-4 py-14 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-caption uppercase tracking-wider text-coral">Legal Center</p>
          <h1 className="mt-3 text-h1 text-text-primary">Clear policies. One place.</h1>
          <p className="mt-4 text-body text-text-secondary">Legal documents for Loglime LLC, registered at 1207 Delaware Ave Ste 303, Wilmington, Delaware 19806, United States.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {documents.map((document) => (
            <a key={document.href} className="group rounded-2xl border border-border bg-white p-6 shadow-card transition hover:border-coral/30 hover:shadow-premium" href={document.href}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-coral-light text-coral"><i className={`hgi-stroke ${document.icon} text-xl`} /></span>
              <h2 className="mt-5 text-h3 text-text-primary group-hover:text-coral">{document.title}</h2>
              <p className="mt-3 text-body text-text-secondary">{document.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-small font-bold text-coral">Read policy <i className="hgi-stroke hgi-arrow-right-01" /></span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
