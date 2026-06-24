import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/blog/post-card";
import { blogAuthors, getBlogAuthor, getPostsByAuthor } from "@/lib/blog";

export function generateStaticParams() {
  return blogAuthors.map((author) => ({ username: author.username }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const author = getBlogAuthor(username);
  if (!author) return {};
  return {
    title: `${author.name} | Loglime Blog Author`,
    description: author.bio,
    alternates: { canonical: `https://loglime.com/blog/author/${author.username}` },
    openGraph: {
      title: `${author.name} | Loglime`,
      description: author.bio,
      images: [{ url: author.avatarUrl, width: 512, height: 512, alt: author.name }],
    },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const author = getBlogAuthor(username);
  if (!author) notFound();
  const posts = getPostsByAuthor(author.username);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: `https://loglime.com/blog/author/${author.username}`,
    image: `https://loglime.com${author.avatarUrl}`,
    jobTitle: author.roleTitle,
    knowsAbout: author.expertise,
  };

  return (
    <main className="bg-surface-alt">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="mx-auto max-w-page px-4 py-14 lg:px-8 lg:py-20">
        <div className="rounded-2xl bg-white p-6 shadow-card lg:flex lg:items-center lg:gap-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-coral-soft">
            <Image src={author.avatarUrl} alt={author.name} fill className="object-cover" unoptimized />
          </div>
          <div className="mt-5 lg:mt-0">
            <p className="text-caption uppercase tracking-wider text-coral">{author.roleTitle}</p>
            <h1 className="mt-2 text-h1 text-text-primary">{author.name}</h1>
            <p className="mt-3 max-w-3xl text-body text-text-secondary">{author.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {author.expertise.map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-small font-semibold text-text-secondary">{item}</span>
              ))}
            </div>
          </div>
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
