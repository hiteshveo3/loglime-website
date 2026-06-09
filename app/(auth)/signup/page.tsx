import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Sign Up Free - Loglime Restaurant",
  description: "Create your Loglime Restaurant workspace.",
  robots: {
    index: false,
    follow: true
  }
};

export default function SignupPage() {
  return (
    <main className="auth-shell">
      <aside className="auth-brand">
        <Logo inverse />
        <div style={{ display: "grid", gap: 14 }}>
          <span className="eyebrow" style={{ color: "var(--g2)" }}>
            Free restaurant setup
          </span>
          <h2 className="h1" style={{ color: "#fff" }}>
            Start with tables, menu, orders and kitchen flow.
          </h2>
        </div>
        <p className="body" style={{ color: "rgba(255,255,255,.72)" }}>
          The schema is multi-tenant from day one, so your first restaurant can become a multi-location operation later.
        </p>
      </aside>
      <section className="auth-panel">
        <AuthForm mode="signup" />
        <p className="body" style={{ marginTop: 18 }}>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
