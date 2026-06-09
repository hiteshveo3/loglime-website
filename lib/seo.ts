import type { Metadata, MetadataRoute } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://loglime.com";

export type MarketingRoute = {
  path: string;
  title: string;
  description: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export const marketingRoutes: MarketingRoute[] = [
  {
    path: "/",
    title: "Loglime - Apps for Restaurants",
    description: "Ready-to-launch restaurant apps for digital menus, online ordering, bookings, loyalty and customer updates.",
    priority: 1,
    changeFrequency: "weekly"
  },
  {
    path: "/pricing",
    title: "Pricing - Loglime Restaurant Apps",
    description: "Simple pricing for restaurant app packages, from digital menus to ordering, booking and loyalty apps.",
    priority: 0.9,
    changeFrequency: "monthly"
  },
  {
    path: "/products/restaurant",
    title: "Loglime Restaurant Apps - Ordering, Menu, Booking and Loyalty",
    description: "Customer-facing restaurant apps for online ordering, digital menus, bookings, loyalty offers and growth insights.",
    priority: 0.9,
    changeFrequency: "monthly"
  },
  {
    path: "/solutions/restaurants",
    title: "Loglime for Restaurants and Cafes",
    description: "Restaurant app packages for cafes, QSRs, bakeries and full-service restaurants.",
    priority: 0.8,
    changeFrequency: "monthly"
  },
  {
    path: "/demo",
    title: "Book a Demo - Loglime Restaurant Apps",
    description: "Get a personalized walkthrough of Loglime restaurant app packages for menus, ordering, bookings and loyalty.",
    priority: 0.8,
    changeFrequency: "monthly"
  },
  {
    path: "/contact",
    title: "Contact Loglime",
    description: "Talk to the Loglime team about sales, restaurant rollout, support or partnerships.",
    priority: 0.5,
    changeFrequency: "monthly"
  },
  {
    path: "/privacy",
    title: "Privacy Policy - Loglime",
    description: "How Loglime collects, uses and protects data.",
    priority: 0.2,
    changeFrequency: "yearly"
  },
  {
    path: "/terms",
    title: "Terms of Service - Loglime",
    description: "The terms governing use of Loglime products and services.",
    priority: 0.2,
    changeFrequency: "yearly"
  },
  {
    path: "/security",
    title: "Security - Loglime",
    description: "How Loglime protects restaurant operations data.",
    priority: 0.5,
    changeFrequency: "monthly"
  }
];

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path}`;
}

export function createMetadata(route: Pick<MarketingRoute, "path" | "title" | "description">): Metadata {
  return {
    title: route.title,
    description: route.description,
    alternates: {
      canonical: absoluteUrl(route.path)
    },
    openGraph: {
      title: route.title,
      description: route.description,
      url: absoluteUrl(route.path),
      siteName: "Loglime",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description
    }
  };
}

export function routeMeta(path: string) {
  const route = marketingRoutes.find((item) => item.path === path);
  if (!route) {
    throw new Error(`Missing SEO route metadata for ${path}`);
  }
  return route;
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Loglime",
  url: siteUrl,
  logo: absoluteUrl("/brand/favicon.png"),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@loglime.com"
  }
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Loglime",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export const restaurantSoftwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Loglime Restaurant Apps",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: absoluteUrl("/products/restaurant"),
  offers: [
    {
      "@type": "Offer",
      name: "Menu Starter",
      price: "29",
      priceCurrency: "USD"
    },
    {
      "@type": "Offer",
      name: "Ordering Growth",
      price: "79",
      priceCurrency: "USD"
    }
  ]
};
