import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CrmMobileNav, CrmSidebar, CrmTopbar } from "@/components/crm/nav";
import { GlobalSearch } from "@/components/crm/global-search";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function CrmLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-alt lg:flex">
      <CrmSidebar />
      <div className="min-w-0 flex-1 pb-24 lg:pb-0">
        <CrmTopbar />
        <main className="mx-auto max-w-page px-4 py-6 lg:px-6">{children}</main>
      </div>
      <CrmMobileNav />
      <GlobalSearch />
    </div>
  );
}
