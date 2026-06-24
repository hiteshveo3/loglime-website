"use client";

import { useMemo, useState } from "react";

import { PostCard } from "@/components/blog/post-card";
import { EmptyState, Input } from "@/components/ui";
import { searchBlogPosts } from "@/lib/blog";

export function BlogSearchClient({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchBlogPosts(query), [query]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-4 shadow-card">
        <Input
          aria-label="Search blog"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search direct ordering, QR menus, loyalty..."
          leftIcon={<i className="hgi-stroke hgi-search-01" />}
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-small font-semibold text-text-secondary">{results.length} articles found</p>
        {query ? <a className="text-small font-semibold text-coral" href="/blog/search">Clear search</a> : null}
      </div>
      {results.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {results.map((post) => (
            <PostCard key={`${post.categorySlug}-${post.slug}`} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState title={`No posts found for "${query}"`} description="Try searching by category, product, or restaurant challenge." icon={<i className="hgi-stroke hgi-search-01 text-xl" />} />
      )}
    </div>
  );
}
