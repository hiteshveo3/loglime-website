import type { Metadata } from "next";
import Script from "next/script";
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
      <body>
        {children}
        <Script id="tawk-to-chatbot" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6a3a80757cb51a1d46e0c6ef/1jrq8bj7o';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
