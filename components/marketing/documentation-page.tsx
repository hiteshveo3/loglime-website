import { DocumentRenderer, getDocumentHeadings } from "@/components/marketing/document-renderer";
import { DocumentToc } from "@/components/marketing/document-toc";

export function DocumentationPage({
  title,
  description,
  content,
  eyebrow = "Documentation",
  updated = "June 23, 2026",
}: {
  title: string;
  description: string;
  content: string;
  eyebrow?: string;
  updated?: string;
}) {
  const headings = getDocumentHeadings(content, title);

  return (
    <main className="bg-white">
      <section className="border-b border-border bg-surface-alt px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-page">
          <p className="text-caption uppercase tracking-wider text-coral">{eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-h1 text-text-primary lg:text-[3rem]">{title}</h1>
          <p className="mt-4 max-w-3xl text-body text-text-secondary">{description}</p>
          <p className="mt-5 text-small font-semibold text-text-muted">Last updated: {updated}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-page gap-8 px-4 py-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8 lg:py-14">
        <DocumentToc headings={headings} />
        <article className="min-w-0 max-w-[900px]">
          <DocumentRenderer content={content} pageTitle={title} />
        </article>
      </section>
    </main>
  );
}
