import { blogCategories, getBlogCategory } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function CategoryBadge({ slug, className }: { slug: string; className?: string }) {
  const category = getBlogCategory(slug) ?? blogCategories[0];

  return (
    <a
      className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption uppercase tracking-wider text-white", className)}
      href={`/blog/${category.slug}`}
      style={{ backgroundColor: "#FF5A5F" }}
    >
      <i className={cn("hgi-stroke text-sm", category.icon)} />
      {category.name}
    </a>
  );
}
