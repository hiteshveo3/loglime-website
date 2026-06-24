"use client";

import { useState } from "react";

import type { FaqItem } from "@/lib/faqs";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const open = openIndex === index;
        const answerId = `faq-answer-${index}-${item.question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        return (
          <div key={item.question}>
            <button
              className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              aria-controls={answerId}
            >
              <h3 className="text-body font-semibold text-text-primary">{item.question}</h3>
              <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-text-secondary transition", open && "bg-coral-light text-coral")}>
                <i className={cn("hgi-stroke", open ? "hgi-minus-sign" : "hgi-add-01")} />
              </span>
            </button>
            {open ? (
              <div id={answerId} className="pb-5 pr-14 text-body leading-7 text-text-secondary">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
