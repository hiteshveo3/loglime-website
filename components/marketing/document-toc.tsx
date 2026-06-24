"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export type TocHeading = {
  id: string;
  label: string;
  level: 2 | 3;
};

export function DocumentToc({ headings }: { headings: TocHeading[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = (
    <nav className="grid gap-1" aria-label="On this page">
      {headings.map((heading) => (
        <a
          key={`${heading.id}-${heading.label}`}
          className={cn(
            "rounded-lg px-3 py-2 text-small font-semibold text-text-secondary transition hover:bg-coral-light hover:text-coral",
            heading.level === 3 && "ml-3 font-medium text-text-muted",
          )}
          href={`#${heading.id}`}
          onClick={() => setMobileOpen(false)}
        >
          {heading.label}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      <div className="mb-6 rounded-2xl bg-surface-alt p-3 lg:hidden">
        <button className="flex w-full items-center justify-between px-2 py-2 text-left text-small font-semibold text-text-primary" onClick={() => setMobileOpen((value) => !value)}>
          On this page
          <i className={cn("hgi-stroke hgi-arrow-down-01 transition", mobileOpen && "rotate-180")} />
        </button>
        {mobileOpen ? <div className="mt-2 border-t border-border pt-2">{links}</div> : null}
      </div>
      <aside className="hidden lg:block">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-3">
          <p className="px-3 text-caption uppercase tracking-wider text-text-muted">On this page</p>
          <div className="mt-3">{links}</div>
          <div className="mx-3 mt-6 border-t border-border pt-5">
            <p className="text-small font-semibold text-text-primary">Need help?</p>
            <a className="mt-2 inline-flex items-center gap-2 text-small font-semibold text-coral" href="/contact">
              Contact Loglime
              <i className="hgi-stroke hgi-arrow-right-01" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
