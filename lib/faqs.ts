import { getWebsiteSection } from "@/lib/content";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  name: string;
  slug: string;
  items: FaqItem[];
};

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getFaqCategories(): FaqCategory[] {
  const content = getWebsiteSection("# PART I", "# PART J");
  const lines = content.split(/\r?\n/);
  const categories: FaqCategory[] = [];
  let category: FaqCategory | null = null;
  let current: FaqItem | null = null;

  function flushItem() {
    if (!category || !current) return;
    current.answer = current.answer.replace(/\s+/g, " ").trim();
    if (current.question && current.answer) category.items.push(current);
    current = null;
  }

  function flushCategory() {
    flushItem();
    if (category?.items.length) categories.push(category);
    category = null;
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line === "```" || line === "---" || line === "SUBHEADING:" || line.startsWith("H1:")) continue;

    if (line.startsWith("CATEGORY:")) {
      flushCategory();
      const name = line.replace("CATEGORY:", "").trim();
      category = { name, slug: slugifyHeading(name), items: [] };
      continue;
    }

    if (line.startsWith("Q:")) {
      flushItem();
      current = { question: line.replace("Q:", "").trim(), answer: "" };
      continue;
    }

    if (line.startsWith("A:")) {
      if (current) current.answer = line.replace("A:", "").trim();
      continue;
    }

    if (current) current.answer = `${current.answer} ${line}`.trim();
  }

  flushCategory();
  return categories;
}

export function getFaqItems() {
  return getFaqCategories().flatMap((category) => category.items);
}
