import type { ReactNode } from "react";

import { MarketingFooter } from "@/components/marketing/footer";
import { MarketingHeader } from "@/components/marketing/header";
import { MarketingBottomNav } from "@/components/marketing/mobile-bottom-nav";
import { PageFaqSection } from "@/components/marketing/page-faq";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MarketingHeader />
      {children}
      <PageFaqSection />
      <MarketingFooter />
      <MarketingBottomNav />
    </>
  );
}
