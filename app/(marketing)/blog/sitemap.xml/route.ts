import { blogCategories, blogTags, getPublishedBlogPosts } from "@/lib/blog";

export async function GET() {
  const urls = [
    { loc: "https://loglime.com/blog", lastmod: new Date().toISOString().split("T")[0], priority: "0.8" },
    ...blogCategories.map((category) => ({ loc: `https://loglime.com/blog/${category.slug}`, lastmod: new Date().toISOString().split("T")[0], priority: "0.7" })),
    ...blogTags.map((tag) => ({ loc: `https://loglime.com/blog/tag/${tag}`, lastmod: new Date().toISOString().split("T")[0], priority: "0.45" })),
    ...getPublishedBlogPosts().map((post) => ({ loc: `https://loglime.com/blog/${post.categorySlug}/${post.slug}`, lastmod: post.updatedAt, priority: post.isPillar ? "0.8" : "0.7" })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          (item) => `<url>
            <loc>${item.loc}</loc>
            <lastmod>${item.lastmod}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>${item.priority}</priority>
          </url>`,
        )
        .join("")}
    </urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
