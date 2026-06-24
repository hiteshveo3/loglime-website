import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Logo } from "@/components/shared/logo";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-surface-alt px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center">
        <div className="mb-8 text-center">
          <Logo className="justify-center" />
        </div>
        {children}
      </div>
    </main>
  );
}
