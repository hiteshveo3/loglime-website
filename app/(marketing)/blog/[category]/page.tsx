import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryBadge } from "@/components/blog/category-badge";
import { PostCard } from "@/components/blog/post-card";
import { blogCategories, getBlogCategory, getPostsByCategory } from "@/lib/blog";

export function generateStaticParams() {
  return blogCategories.map((category) => ({ category: category.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getBlogCategory(params.category);
  if (!category) return {};
  return {
    title: `${category.name} Articles | Loglime Blog`,
    description: category.description,
    alternates: { canonical: `https://loglime.com/blog/${category.slug}` },
  };
}

export default function BlogCategoryPage({ params }: { params: { category: string } }) {
  const category = getBlogCategory(params.category);
  if (!category) notFound();
  const posts = getPostsByCategory(category.slug);

  return (
    <main className="bg-surface-alt">
      <section className="mx-auto max-w-page px-4 py-14 lg:px-8 lg:py-20">
        <nav className="text-small font-semibold text-text-muted" aria-label="Breadcrumb">
          <a className="hover:text-coral" href="/">Home</a>
          <span className="px-2">/</span>
          <a className="hover:text-coral" href="/blog">Blog</a>
          <span className="px-2">/</span>
          <span>{category.name}</span>
        </nav>
        <div className="mt-6 max-w-3xl">
          <CategoryBadge slug={category.slug} />
          <h1 className="mt-4 text-h1 text-text-primary">{category.name}</h1>
          <p className="mt-3 text-body text-text-secondary">{category.description}</p>
          <p className="mt-4 text-small font-semibold text-text-muted">{posts.length} articles</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
