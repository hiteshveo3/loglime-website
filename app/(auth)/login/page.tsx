import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Log in - Loglime",
  description: "Log in to your Loglime restaurant workspace.",
  robots: {
    index: false,
    follow: true
  }
};

export default function LoginPage() {
  return (
    <main className="auth-shell">
      <aside className="auth-brand">
        <Logo inverse />
        <div style={{ display: "grid", gap: 14 }}>
          <span className="eyebrow" style={{ color: "var(--g2)" }}>
            Restaurant workspace
          </span>
          <h2 className="h1" style={{ color: "#fff" }}>
            Open the floor, kitchen and orders dashboard.
          </h2>
        </div>
        <p className="body" style={{ color: "rgba(255,255,255,.72)" }}>
          Demo mode redirects straight into the sample restaurant until Supabase auth is configured.
        </p>
      </aside>
      <section className="auth-panel">
        <AuthForm mode="login" />
        <p className="body" style={{ marginTop: 18 }}>
          New to Loglime? <Link href="/signup">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
