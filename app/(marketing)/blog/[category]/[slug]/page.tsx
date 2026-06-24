import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleActions, MobileStickyArticleCta, MobileSwipeNavigation, ReadingProgress, ScrollToTopButton } from "@/components/blog/article-actions";
import { CategoryBadge } from "@/components/blog/category-badge";
import { CommentSection } from "@/components/blog/comments";
import { PostCard } from "@/components/blog/post-card";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { Avatar, Button, Card } from "@/components/ui";
import {
  blogPosts,
  formatBlogDate,
  getAdjacentPosts,
  getArticleSchema,
  getBlogAuthor,
  getBlogBreadcrumbs,
  getBlogCategory,
  getBlogPost,
  getBlogPostUrl,
  getBreadcrumbSchema,
  getFaqSchema,
  getReadingTime,
  getRelatedPosts,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ category: post.categorySlug, slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getBlogPost(category, slug);
  if (!post) return {};
  const author = getBlogAuthor(post.authorUsername);
  return {
    title: post.title.length > 55 ? `${post.title.slice(0, 52)}...` : post.title,
    description: post.excerpt,
    alternates: { canonical: getBlogPostUrl(post) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: getBlogPostUrl(post),
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: author ? [`https://loglime.com/blog/author/${author.username}`] : undefined,
      images: [{ url: post.featuredImage, width: 1200, height: 900, alt: post.featuredImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

function ArticleBody({ post }: { post: NonNullable<ReturnType<typeof getBlogPost>> }) {
  return (
    <div className="article-body">
      {post.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {post.sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2>{section.heading}</h2>
          <p className="answer-first">{section.answer}</p>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.bullets?.length ? (
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          {section.table ? (
            <div className="not-prose overflow-x-auto rounded-2xl bg-white shadow-card">
              <table className="w-full min-w-[560px] text-left text-small">
                <thead className="bg-slate-50 text-text-primary">
                  <tr>
                    {section.table.columns.map((column) => (
                      <th key={column} className="px-4 py-3 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row) => (
                    <tr key={row.join("-")} className="border-t border-border">
                      {row.map((cell) => (
                        <td key={cell} className="px-4 py-3 text-text-secondary">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          {section.callout ? (
            <div className={cn("not-prose my-8 rounded-r-2xl border-l-4 p-5", section.callout.tone === "warning" ? "border-status-warning bg-status-warningSoft" : section.callout.tone === "info" ? "border-status-info bg-status-infoSoft" : "border-coral bg-coral-light")}>
              <p className="font-semibold text-text-primary">{section.callout.title}</p>
              <p className="mt-1 text-body text-text-secondary">{section.callout.body}</p>
            </div>
          ) : null}
        </section>
      ))}

      <section id="faq">
        <h2>Frequently asked questions</h2>
        <div className="not-prose mt-5 rounded-2xl bg-white px-5 shadow-card"><FaqAccordion items={post.faqs} defaultOpen={null} /></div>
      </section>

      <h2>Conclusion</h2>
      <p>{post.conclusion}</p>
    </div>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: categorySlug, slug } = await params;
  const post = getBlogPost(categorySlug, slug);
  if (!post) notFound();

  const category = getBlogCategory(post.categorySlug);
  const author = getBlogAuthor(post.authorUsername);
  const adjacent = getAdjacentPosts(post);
  const relatedPosts = getRelatedPosts(post);
  const postUrl = getBlogPostUrl(post);
  const schemas = [getArticleSchema(post), getFaqSchema(post), getBreadcrumbSchema(post)];
  const previousHref = adjacent.previous ? `/blog/${adjacent.previous.categorySlug}/${adjacent.previous.slug}` : undefined;
  const nextHref = adjacent.next ? `/blog/${adjacent.next.categorySlug}/${adjacent.next.slug}` : undefined;

  return (
    <main className="bg-surface-alt">
      <ReadingProgress />
      <MobileSwipeNavigation previousHref={previousHref} nextHref={nextHref} />
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <article className="mx-auto max-w-page px-4 py-12 lg:px-8 lg:py-16">
        <nav className="mb-8 hidden text-small font-semibold text-text-muted sm:block" aria-label="Breadcrumb">
          {getBlogBreadcrumbs(post).map((crumb, index) => (
            <span key={crumb.item}>
              {index > 0 ? <span className="px-2">/</span> : null}
              <a className="hover:text-coral" href={crumb.item.replace("https://loglime.com", "")}>{index === 3 ? `${crumb.name.slice(0, 40)}${crumb.name.length > 40 ? "..." : ""}` : crumb.name}</a>
            </span>
          ))}
        </nav>

        <header className="mx-auto max-w-[920px]">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge slug={post.categorySlug} />
            <span className="text-small font-semibold text-text-muted">{getReadingTime(post)} min read</span>
          </div>
          <h1 className="mt-5 text-h1 text-text-primary lg:text-[3.25rem] lg:leading-[1.08]">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-body text-text-secondary">{post.excerpt}</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Avatar src={author?.avatarUrl} name={author?.name ?? "Loglime"} />
              <div>
                <a className="text-small font-semibold text-text-primary hover:text-coral" href={`/blog/author/${author?.username ?? "loglime"}`}>{author?.name ?? "Loglime"}</a>
                <p className="text-small text-text-muted">
                  <time dateTime={post.publishedAt}>Published {formatBlogDate(post.publishedAt)}</time>
                  {post.updatedAt !== post.publishedAt ? (
                    <>
                      {" "}
                      <span aria-hidden="true">.</span>{" "}
                      <time dateTime={post.updatedAt}>Updated {formatBlogDate(post.updatedAt)}</time>
                    </>
                  ) : null}
                </p>
              </div>
            </div>
            <ArticleActions title={post.title} url={postUrl} postSlug={post.slug} />
          </div>
          <figure className="mt-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-card">
              <Image src={post.featuredImage} alt={post.featuredImageAlt} fill className="object-cover" sizes="(min-width: 1024px) 920px, 100vw" priority />
            </div>
            <figcaption className="mt-3 text-center text-small italic text-text-muted">{post.featuredImageCaption}</figcaption>
          </figure>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,720px)_320px] lg:justify-center">
          <div>
            <ArticleBody post={post} />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {adjacent.previous ? (
                <a className="rounded-2xl bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-premium" href={`/blog/${adjacent.previous.categorySlug}/${adjacent.previous.slug}`}>
                  <p className="text-caption uppercase tracking-wider text-text-muted">Previous</p>
                  <h3 className="mt-2 text-h4 text-text-primary">{adjacent.previous.title}</h3>
                </a>
              ) : null}
              {adjacent.next ? (
                <a className="rounded-2xl bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-premium" href={`/blog/${adjacent.next.categorySlug}/${adjacent.next.slug}`}>
                  <p className="text-caption uppercase tracking-wider text-text-muted">Next</p>
                  <h3 className="mt-2 text-h4 text-text-primary">{adjacent.next.title}</h3>
                </a>
              ) : null}
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <Card>
              <p className="text-caption uppercase tracking-wider text-coral">Contents</p>
              <nav className="mt-3 grid gap-2">
                {post.sections.map((section) => (
                  <a key={section.id} className="text-small font-semibold text-text-secondary hover:text-coral" href={`#${section.id}`}>{section.heading}</a>
                ))}
                <a className="text-small font-semibold text-text-secondary hover:text-coral" href="#faq">Frequently asked questions</a>
              </nav>
            </Card>
            <Card>
              <div className="flex items-center gap-3">
                <Avatar src={author?.avatarUrl} name={author?.name ?? "Loglime"} size="lg" />
                <div>
                  <p className="font-semibold text-text-primary">{author?.name ?? "Loglime"}</p>
                  <p className="text-small text-text-muted">{author?.roleTitle ?? "Restaurant technology team"}</p>
                </div>
              </div>
              <p className="mt-3 text-small text-text-secondary">{author?.bio}</p>
              <Button className="mt-4 w-full" asChildHack="a" href={`/blog/author/${author?.username ?? ""}`} variant="secondary">
                View author
              </Button>
            </Card>
            <Card>
              <p className="text-caption uppercase tracking-wider text-coral">Product fit</p>
              <h2 className="mt-2 text-h3 text-text-primary">{category?.name ?? "Loglime"} support</h2>
              <p className="mt-2 text-small text-text-secondary">See how this topic maps to Loglime&apos;s restaurant app and admin panel stack.</p>
              <div className="mt-4 grid gap-2">
                {post.relatedProductSlugs.map((slug) => (
                  <a key={slug} className="rounded-xl bg-slate-100 px-3 py-2 text-small font-semibold text-text-secondary hover:bg-coral-light hover:text-coral" href={`/products/${slug}`}>
                    {slug.split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" ")}
                  </a>
                ))}
              </div>
            </Card>
            <Card>
              <p className="text-caption uppercase tracking-wider text-coral">Newsletter</p>
              <h2 className="mt-2 text-h3 text-text-primary">Restaurant tech notes</h2>
              <p className="mt-2 text-small text-text-secondary">Get practical guides on direct ordering, loyalty, and operations.</p>
              <form className="mt-4 grid gap-3" action="/api/blog/newsletter" method="post">
                <input type="hidden" name="postSlug" value={post.slug} />
                <input className="h-11 rounded-xl border border-border-strong px-4 text-body outline-none focus:border-coral focus:ring-4 focus:ring-coral/10" name="email" type="email" placeholder="you@restaurant.com" required />
                <Button type="submit">Subscribe</Button>
              </form>
            </Card>
          </aside>
        </div>

        {relatedPosts.length ? (
          <section className="mt-14">
            <h2 className="text-h2 text-text-primary">Related articles</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <CommentSection postSlug={post.slug} />
      <ScrollToTopButton />
      <MobileStickyArticleCta />
    </main>
  );
}
