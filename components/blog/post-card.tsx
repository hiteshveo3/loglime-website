import Image from "next/image";

import { CategoryBadge } from "@/components/blog/category-badge";
import { Avatar } from "@/components/ui/avatar";
import { getBlogAuthor, getReadingTime, type BlogPost, formatBlogDate } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const author = getBlogAuthor(post.authorUsername);

  return (
    <article className={cn("overflow-hidden rounded-2xl bg-white shadow-card", featured && "grid lg:grid-cols-[1.05fr_0.95fr]")}>
      <a className={cn("relative block bg-slate-100", featured ? "aspect-[4/3] lg:min-h-[420px]" : "aspect-[4/3]")} href={`/blog/${post.categorySlug}/${post.slug}`} aria-label={post.title}>
        <Image src={post.featuredImage} alt={post.featuredImageAlt} fill className="object-cover" sizes={featured ? "(min-width: 1024px) 650px, 100vw" : "(min-width: 1024px) 33vw, 100vw"} priority={featured} />
      </a>
      <div className={cn("flex flex-col p-5", featured && "justify-center lg:p-8")}>
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge slug={post.categorySlug} />
          <span className="text-small font-semibold text-text-muted">{getReadingTime(post)} min read</span>
        </div>
        <a href={`/blog/${post.categorySlug}/${post.slug}`}>
          <h2 className={cn("mt-4 text-text-primary", featured ? "text-h1" : "text-h3")}>{post.title}</h2>
        </a>
        <p className={cn("mt-3 text-body text-text-secondary", !featured && "line-clamp-3")}>{post.excerpt}</p>
        <div className="mt-5 flex items-center gap-3">
          <Avatar src={author?.avatarUrl} name={author?.name ?? "Loglime"} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-small font-semibold text-text-primary">{author?.name ?? "Loglime"}</p>
            <p className="text-caption uppercase tracking-wider text-text-muted">{formatBlogDate(post.publishedAt)}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
