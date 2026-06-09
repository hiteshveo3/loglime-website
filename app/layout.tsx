import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://loglime.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Loglime - Apps for Restaurants",
    template: "%s | Loglime"
  },
  description:
    "Ready-to-launch restaurant apps for digital menus, online ordering, bookings, loyalty and customer updates.",
  icons: {
    icon: "/brand/favicon.png",
    shortcut: "/brand/favicon.png",
    apple: "/brand/favicon.png"
  },
  openGraph: {
    title: "Loglime - Apps for Restaurants",
    description:
      "Restaurant app packages for digital menus, online ordering, bookings, loyalty and customer updates.",
    url: siteUrl,
    siteName: "Loglime",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Loglime Restaurant Apps",
    description: "Apps for restaurants that want menus, orders, bookings and loyalty online."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
