import type { Metadata } from "next";

import { CategoryBadge } from "@/components/blog/category-badge";
import { PostCard } from "@/components/blog/post-card";
import { Button } from "@/components/ui";
import { blogCategories, getPublishedBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Restaurant Technology Blog | Loglime",
  description: "Practical restaurant technology guides on commission-free ordering, digital menus, QR menus, loyalty, operations, and growth.",
  alternates: {
    canonical: "https://loglime.com/blog",
    types: {
      "application/rss+xml": "https://loglime.com/blog/rss.xml",
    },
  },
  openGraph: {
    title: "Restaurant Technology Blog | Loglime",
    description: "Direct ordering, restaurant apps, digital menus, loyalty, and restaurant growth guides.",
    url: "https://loglime.com/blog",
    type: "website",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Loglime restaurant technology blog" }],
  },
};

const postsPerPage = 9;

export default function BlogPage({ searchParams }: { searchParams?: { category?: string; page?: string } }) {
  const categoryFilter = searchParams?.category;
  const page = Math.max(1, Number(searchParams?.page ?? "1") || 1);
  const allPosts = getPublishedBlogPosts();
  const filteredPosts = categoryFilter ? allPosts.filter((post) => post.categorySlug === categoryFilter) : allPosts;
  const featured = filteredPosts.find((post) => post.isFeatured) ?? filteredPosts[0];
  const gridPosts = filteredPosts.filter((post) => post.slug !== featured?.slug);
  const pageCount = Math.max(1, Math.ceil(gridPosts.length / postsPerPage));
  const pagePosts = gridPosts.slice((page - 1) * postsPerPage, page * postsPerPage);

  return (
    <main className="bg-surface-alt">
      <section className="mx-auto max-w-page px-4 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <p className="text-caption uppercase tracking-wider text-coral">Restaurant growth library</p>
            <h1 className="mt-3 text-h1 text-text-primary lg:text-[3rem]">Restaurant technology advice that protects margin.</h1>
          </div>
          <div className="space-y-4">
            <p className="text-body text-text-secondary">Guides for independent restaurant owners who want more direct orders, cleaner operations, better loyalty, and fewer platform dependencies.</p>
            <div className="flex flex-wrap gap-2">
              <Button asChildHack="a" href="/blog/search" variant="secondary">
                <i className="hgi-stroke hgi-search-01" />
                Search blog
              </Button>
              <Button asChildHack="a" href="/demo">
                Book a demo
              </Button>
            </div>
          </div>
        </div>

        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Blog categories">
          <a className="rounded-full bg-white px-4 py-2 text-small font-semibold text-text-secondary shadow-card transition hover:text-coral" href="/blog">
            All
          </a>
          {blogCategories.map((category) => (
            <CategoryBadge key={category.slug} slug={category.slug} className="shadow-card" />
          ))}
        </nav>

        {featured ? (
          <div className="mt-8">
            <PostCard post={featured} featured />
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pagePosts.map((post) => (
            <PostCard key={`${post.categorySlug}-${post.slug}`} post={post} />
          ))}
        </div>

        {pageCount > 1 ? (
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((item) => (
              <a key={item} className={item === page ? "rounded-full bg-coral px-4 py-2 text-small font-semibold text-white" : "rounded-full bg-white px-4 py-2 text-small font-semibold text-text-secondary shadow-card"} href={`/blog?page=${item}`}>
                {item}
              </a>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
