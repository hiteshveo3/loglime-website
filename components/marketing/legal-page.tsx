import { DocumentationPage } from "@/components/marketing/documentation-page";
import { getLegalDocument } from "@/lib/content";

const descriptions: Record<number, string> = {
  1: "How Loglime LLC collects, uses, stores, shares, and protects personal information and customer data.",
  2: "The terms that govern access to and use of Loglime products, subscriptions, applications, and support services.",
  3: "How Loglime uses essential, preference, analytics, and third-party cookies across its website and applications.",
  4: "The conditions, process, and timing that apply to subscription, onboarding, and exceptional refund requests.",
  5: "The standards that protect Loglime customers, restaurant guests, platform integrity, and lawful product use.",
};

export function LegalPage({ documentNumber, title }: { documentNumber: number; title: string }) {
  const content = getLegalDocument(documentNumber);
  return <DocumentationPage title={title} description={descriptions[documentNumber] ?? "Loglime LLC legal documentation."} content={content} eyebrow="Legal documentation" />;
}
