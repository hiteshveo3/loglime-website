import type { MetadataRoute } from "next";
import { marketingRoutes, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return marketingRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date("2026-06-03"),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
