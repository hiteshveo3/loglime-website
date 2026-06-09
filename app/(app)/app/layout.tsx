import type { Metadata } from "next";
import { AppSidebar } from "@/components/app-shell/AppSidebar";

export const metadata: Metadata = {
  title: "Restaurant App - Loglime",
  robots: {
    index: false,
    follow: false
  }
};

export default function RestaurantAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-frame">
      <AppSidebar />
      <main className="app-main">{children}</main>
    </div>
  );
}
