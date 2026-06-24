import { getBlogAuthor, getBlogCategory, getBlogPostUrl, getPublishedBlogPosts } from "@/lib/blog";

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

export async function GET() {
  const posts = getPublishedBlogPosts().slice(0, 20);
  const items = posts
    .map((post) => {
      const author = getBlogAuthor(post.authorUsername);
      const category = getBlogCategory(post.categorySlug);
      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${getBlogPostUrl(post)}</link>
          <guid>${getBlogPostUrl(post)}</guid>
          <description>${escapeXml(post.excerpt)}</description>
          <author>${escapeXml(author?.name ?? "Loglime")}</author>
          <category>${escapeXml(category?.name ?? post.categorySlug)}</category>
          <pubDate>${new Date(`${post.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Loglime Restaurant Technology Blog</title>
        <link>https://loglime.com/blog</link>
        <description>Direct ordering, restaurant apps, loyalty, digital menus, and restaurant growth guides.</description>
        <language>en-us</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
