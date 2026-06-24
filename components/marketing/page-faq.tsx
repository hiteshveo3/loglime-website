"use client";

import { usePathname } from "next/navigation";

import { FaqAccordion } from "@/components/marketing/faq-accordion";
import type { FaqItem } from "@/lib/faqs";

const generalFaqs: FaqItem[] = [
  { question: "What is Loglime?", answer: "Loglime is a restaurant technology platform for direct online ordering, digital menus, table booking, loyalty, and branded restaurant apps." },
  { question: "Does Loglime charge order commission?", answer: "No. Loglime uses flat package or subscription pricing. Standard payment processor fees can still apply." },
  { question: "How quickly can a restaurant launch?", answer: "Most restaurant launches target 7 to 14 business days after menu, branding, and payment details are ready." },
  { question: "Do I need technical experience?", answer: "No. The Loglime team handles setup, menu configuration, branding, publishing guidance, and onboarding." },
];

const pricingFaqs: FaqItem[] = [
  { question: "What is the current promotional price?", answer: "The current promotional launch offer is $149 for the Ordering App plus its Admin Panel." },
  { question: "Are there setup fees?", answer: "The promotional package has no separate setup fee unless custom integrations or additional scope are agreed in writing." },
  { question: "Does checkout charge commission per order?", answer: "No Loglime commission is charged per order. Stripe or another payment provider may charge its standard processing fee." },
  { question: "Can I request a custom multi-location quote?", answer: "Yes. Franchise, multi-location, and custom integration work is scoped through a demo and written proposal." },
];

const productFaqs: FaqItem[] = [
  { question: "Can products work together?", answer: "Yes. Ordering, menus, booking, loyalty, QR channels, and the restaurant app are designed to share the same operational data." },
  { question: "Can Loglime work with my existing website?", answer: "Yes. Direct ordering, booking, and digital menu links can be added to an existing website." },
  { question: "Do customers need to install an app?", answer: "No. Customers can use web ordering and QR menus without installing an app. A branded app can be added for repeat engagement." },
  { question: "Who manages menu updates?", answer: "Restaurant teams can update items, pricing, availability, modifiers, and sold-out states from the admin panel." },
];

const legalFaqs: FaqItem[] = [
  { question: "What is the legal company name?", answer: "The legal company name is Loglime LLC." },
  { question: "Where is Loglime registered?", answer: "Loglime LLC is registered at 1207 Delaware Ave Ste 303, Wilmington, DE 19806, United States." },
  { question: "Which law governs the agreement?", answer: "The governing law is the State of Delaware, United States, with disputes handled in the courts of Delaware unless applicable terms require arbitration." },
  { question: "Which arbitration body is named?", answer: "The named arbitration body is the American Arbitration Association (AAA)." },
];

const blogFaqs: FaqItem[] = [
  { question: "Who writes the Loglime blog?", answer: "Sameer Ahmad Basra is the primary authoritative restaurant technology writer for the current Loglime blog library." },
  { question: "What topics does the blog cover?", answer: "The blog covers direct ordering, restaurant technology, loyalty, operations, growth, and case studies." },
  { question: "Can I subscribe to new articles?", answer: "Yes. Article pages include a restaurant technology newsletter signup." },
  { question: "Can I ask a question about an article?", answer: "Yes. Article comments support moderated questions and practical operator discussion." },
];

function getItems(pathname: string) {
  if (pathname.startsWith("/pricing") || pathname.startsWith("/demo")) return pricingFaqs;
  if (pathname.startsWith("/products") || pathname.startsWith("/solutions") || pathname.startsWith("/platform")) return productFaqs;
  if (["/privacy", "/terms", "/cookies", "/refunds", "/acceptable-use"].some((path) => pathname.startsWith(path))) return legalFaqs;
  if (pathname.startsWith("/blog")) return blogFaqs;
  return generalFaqs;
}

export function PageFaqSection() {
  const pathname = usePathname();
  if (pathname === "/faq") return null;
  const items = getItems(pathname);

  return (
    <section className="bg-white px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-page gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-caption uppercase tracking-wider text-coral">Frequently asked questions</p>
          <h2 className="mt-3 text-h2 text-text-primary">A few useful answers before you go.</h2>
          <p className="mt-3 max-w-md text-body text-text-secondary">Need a restaurant-specific answer? Zest can help, or the team can walk through your exact setup.</p>
          <a className="mt-5 inline-flex items-center gap-2 text-small font-semibold text-coral hover:text-coral-hover" href="/faq">
            Browse all FAQs
            <i className="hgi-stroke hgi-arrow-right-01" />
          </a>
        </div>
        <FaqAccordion items={items} defaultOpen={null} />
      </div>
    </section>
  );
}
