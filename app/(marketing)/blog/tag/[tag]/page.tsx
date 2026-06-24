import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/blog/post-card";
import { blogTags, getPostsByTag } from "@/lib/blog";

export function generateStaticParams() {
  return blogTags.map((tag) => ({ tag }));
}

export function generateMetadata({ params }: { params: { tag: string } }): Metadata {
  return {
    title: `${params.tag} Articles | Loglime Blog`,
    description: `Loglime blog articles tagged ${params.tag}.`,
    alternates: { canonical: `https://loglime.com/blog/tag/${params.tag}` },
  };
}

export default function BlogTagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag);
  if (!posts.length) notFound();

  return (
    <main className="bg-surface-alt">
      <section className="mx-auto max-w-page px-4 py-14 lg:px-8 lg:py-20">
        <p className="text-caption uppercase tracking-wider text-coral">Tag</p>
        <h1 className="mt-3 text-h1 text-text-primary">#{params.tag}</h1>
        <p className="mt-2 text-body text-text-secondary">{posts.length} matching articles.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
