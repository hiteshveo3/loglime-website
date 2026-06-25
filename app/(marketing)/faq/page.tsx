import type { Metadata } from "next";
import Script from "next/script";

import { DocumentToc } from "@/components/marketing/document-toc";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { getFaqCategories } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Loglime",
  description: "Answers about Loglime restaurant apps, online ordering, pricing, setup, security, support, publishing, and Zest AI.",
  alternates: {
    canonical: "https://loglime.com/faq",
  },
};

export default function FaqPage() {
  const categories = getFaqCategories();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };
  const headings = categories.map((category) => ({ id: category.slug, label: category.name, level: 2 as const }));

  return (
    <main className="bg-white">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="border-b border-border bg-surface-alt px-4 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-small font-semibold uppercase tracking-widest text-coral">Help center</p>
          <h1 className="mt-4 text-h1 text-text-primary lg:text-[3rem]">Frequently asked questions.</h1>
          <p className="mt-4 text-body text-text-secondary">
            A few useful answers before you go. Everything about Loglime products, pricing, onboarding, security, and app publishing.
          </p>
          <a className="mt-6 inline-flex items-center gap-2 text-small font-semibold text-coral hover:underline" href="/contact">
            Still need help? Contact us
            <i className="hgi-stroke hgi-arrow-right-01" />
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-page gap-8 px-4 py-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8 lg:py-14">
        <DocumentToc headings={headings} />
        <div className="min-w-0 max-w-[960px]">
          {categories.map((category, categoryIndex) => (
            <section key={category.slug} id={category.slug} className="scroll-mt-28 border-b border-border py-10 first:pt-0 last:border-0">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-caption uppercase tracking-wider text-coral">Category {categoryIndex + 1}</p>
                  <h2 className="mt-2 text-h2 capitalize text-text-primary">{category.name.toLowerCase()}</h2>
                </div>
                <span className="text-small font-semibold text-text-muted">{category.items.length} answers</span>
              </div>
              <FaqAccordion items={category.items} defaultOpen={categoryIndex === 0 ? 0 : null} />
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
