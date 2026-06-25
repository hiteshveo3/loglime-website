import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import type { ReactNode } from "react";

import { Providers } from "./providers";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://loglime.com"),
  applicationName: "Loglime",
  authors: [{ name: "Loglime", url: "https://loglime.com" }],
  generator: "Next.js",
  keywords: [
    "restaurant app",
    "commission free restaurant ordering",
    "digital menu restaurant",
    "restaurant online ordering system",
    "table booking restaurant",
    "restaurant loyalty program",
    "QR code menu",
    "branded restaurant app",
    "ghost kitchen ordering",
    "restaurant technology platform",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Loglime",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "Loglime — Commission-Free Restaurant Apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@loglime",
    creator: "@loglime",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    types: {
      "application/rss+xml": "https://loglime.com/blog/rss.xml",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF5A5F",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={quicksand.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://cdn.hugeicons.com/font/hgi-stroke-rounded.css" />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
