import type { MetadataRoute } from "next";

import { blogCategories, blogTags, getPublishedBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://loglime.com";
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/demo`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.88 },
    { url: `${baseUrl}/products/online-ordering`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/products/restaurant-app`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/products/digital-menu`, lastModified: now, changeFrequency: "weekly", priority: 0.82 },
    { url: `${baseUrl}/products/table-booking`, lastModified: now, changeFrequency: "weekly", priority: 0.82 },
    { url: `${baseUrl}/products/loyalty`, lastModified: now, changeFrequency: "weekly", priority: 0.82 },
    { url: `${baseUrl}/products/qr-menu`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/solutions/cafes`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/qsr`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/cloud-kitchen`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/franchise`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/dine-in`, lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${baseUrl}/solutions/bakeries`, lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${baseUrl}/platform`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    ...blogCategories.map((category) => ({ url: `${baseUrl}/blog/${category.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.58 })),
    ...blogTags.map((tag) => ({ url: `${baseUrl}/blog/tag/${tag}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.4 })),
    ...getPublishedBlogPosts().map((post) => ({ url: `${baseUrl}/blog/${post.categorySlug}/${post.slug}`, lastModified: new Date(`${post.updatedAt}T00:00:00`), changeFrequency: "monthly" as const, priority: post.isPillar ? 0.78 : 0.72 })),
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.25 },
    { url: `${baseUrl}/refunds`, lastModified: now, changeFrequency: "yearly", priority: 0.25 },
    { url: `${baseUrl}/acceptable-use`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
