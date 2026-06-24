import type { ReactNode } from "react";

import type { TocHeading } from "@/components/marketing/document-toc";
import { slugifyHeading } from "@/lib/faqs";
import { cn } from "@/lib/utils";

function parseInline(text: string) {
  return text.replace(/\*\*/g, "").replace(/`/g, "");
}

function getHeading(line: string): { level: 1 | 2 | 3 | 4; label: string } | null {
  const trimmed = line.trim();
  if (trimmed.startsWith("#### ")) return { level: 4, label: parseInline(trimmed.replace(/^####\s*/, "")) };
  if (trimmed.startsWith("### ")) return { level: 3, label: parseInline(trimmed.replace(/^###\s*/, "")) };
  if (trimmed.startsWith("## ")) return { level: 2, label: parseInline(trimmed.replace(/^##\s*/, "")) };
  if (trimmed.startsWith("# ")) return { level: 1, label: parseInline(trimmed.replace(/^#\s*/, "")) };
  if (/^H1:\s*/i.test(trimmed)) return { level: 1, label: parseInline(trimmed.replace(/^H1:\s*/i, "")) };
  if (/^H2:\s*/i.test(trimmed)) return { level: 2, label: parseInline(trimmed.replace(/^H2:\s*/i, "")) };
  if (/^H3:\s*/i.test(trimmed)) return { level: 3, label: parseInline(trimmed.replace(/^H3:\s*/i, "")) };
  if (/^SECTION\s+\d+:\s*/i.test(trimmed)) return { level: 2, label: parseInline(trimmed.replace(/^SECTION\s+\d+:\s*/i, "")) };
  if (trimmed === "PLATFORM FEATURES:") return { level: 2, label: "Platform features" };
  return null;
}

export function getDocumentHeadings(content: string, pageTitle?: string): TocHeading[] {
  const seen = new Map<string, number>();
  return content
    .split(/\r?\n/)
    .map(getHeading)
    .filter((heading): heading is NonNullable<ReturnType<typeof getHeading>> => Boolean(heading))
    .filter((heading) => heading.level === 2 || heading.level === 3)
    .filter((heading) => heading.label.toLowerCase() !== pageTitle?.toLowerCase())
    .map((heading) => {
      const base = slugifyHeading(heading.label) || "section";
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      return { id: count ? `${base}-${count + 1}` : base, label: heading.label, level: heading.level as 2 | 3 };
    });
}

function splitTableRow(line: string) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => parseInline(cell.trim()));
}

export function DocumentRenderer({ content, className, pageTitle }: { content: string; className?: string; pageTitle?: string }) {
  const lines = content.split(/\r?\n/);
  const nodes: ReactNode[] = [];
  const seenHeadings = new Map<string, number>();
  let listItems: string[] = [];

  function flushList(key: string) {
    if (!listItems.length) return;
    nodes.push(
      <ul key={key} className="my-5 list-disc space-y-2 pl-6 text-body leading-7 text-text-secondary">
        {listItems.map((item, index) => <li key={`${item}-${index}`}>{parseInline(item)}</li>)}
      </ul>,
    );
    listItems = [];
  }

  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = lines[index]!.trim();

    if (!trimmed || trimmed === "```" || trimmed === "---") {
      flushList(`list-${index}`);
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || trimmed.startsWith("â€¢ ")) {
      listItems.push(trimmed.replace(/^[-•â€¢]\s*/, ""));
      continue;
    }

    flushList(`list-${index}`);

    const heading = getHeading(trimmed);
    if (heading) {
      if (heading.label.toLowerCase() === pageTitle?.toLowerCase()) continue;
      const base = slugifyHeading(heading.label) || `section-${index}`;
      const count = seenHeadings.get(base) ?? 0;
      seenHeadings.set(base, count + 1);
      const id = count ? `${base}-${count + 1}` : base;
      if (heading.level === 1) nodes.push(<h1 key={index} id={id} className="mt-2 scroll-mt-28 text-h1 text-text-primary">{heading.label}</h1>);
      if (heading.level === 2) nodes.push(<h2 key={index} id={id} className="mt-12 scroll-mt-28 text-h2 text-text-primary">{heading.label}</h2>);
      if (heading.level === 3) nodes.push(<h3 key={index} id={id} className="mt-8 scroll-mt-28 text-h3 text-text-primary">{heading.label}</h3>);
      if (heading.level === 4) nodes.push(<h4 key={index} id={id} className="mt-6 scroll-mt-28 text-h4 text-text-primary">{heading.label}</h4>);
      continue;
    }

    if (trimmed === "SUBHEADING:" || /^[A-Z][A-Z\s&/-]+:$/.test(trimmed)) continue;
    const plainLine = parseInline(trimmed);
    if (/^(ROUTE|PAGE TITLE|SEO TITLE|META DESCRIPTION):\s*/i.test(plainLine) || /^\/[a-z0-9-/]+$/i.test(plainLine)) continue;

    const separator = lines[index + 1]?.trim() ?? "";
    if (trimmed.includes("|") && /^\|?[\s:-]+\|[\s|:-]+\|?$/.test(separator)) {
      const headers = splitTableRow(trimmed);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index]!.trim().includes("|")) {
        rows.push(splitTableRow(lines[index]!));
        index += 1;
      }
      index -= 1;
      nodes.push(
        <div key={`table-${index}`} className="my-6 overflow-x-auto rounded-2xl border border-border-strong bg-white shadow-card">
          <table className="w-full min-w-[620px] border-collapse text-left text-small">
            <thead className="bg-slate-100"><tr>{headers.map((header) => <th key={header} className="px-4 py-3 font-bold text-text-primary">{header}</th>)}</tr></thead>
            <tbody>{rows.map((row, rowIndex) => <tr key={`${row.join("-")}-${rowIndex}`} className="border-t border-border even:bg-slate-50">{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`} className="px-4 py-3 leading-6 text-text-secondary">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      );
      continue;
    }

    nodes.push(<p key={index} className="my-4 max-w-[820px] text-body leading-8 text-text-secondary">{parseInline(trimmed)}</p>);
  }

  flushList("list-final");
  return <div className={cn("min-w-0", className)}>{nodes}</div>;
}
