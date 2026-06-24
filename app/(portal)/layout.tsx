import type { Metadata } from "next";
import type { ReactNode } from "react";

import { PortalMobileNav, PortalSidebar, PortalTopbar } from "@/components/portal/nav";

export const metadata: Metadata = {
  title: "My Portal — Loglime",
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-alt lg:flex">
      <PortalSidebar />
      <div className="min-w-0 flex-1 pb-24 lg:pb-0">
        <PortalTopbar />
        <main className="mx-auto max-w-page px-4 py-5 lg:px-6">{children}</main>
      </div>
      <PortalMobileNav />
    </div>
  );
}
