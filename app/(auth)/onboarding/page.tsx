import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Onboarding - Loglime Restaurant",
  robots: {
    index: false,
    follow: false
  }
};

export default function OnboardingPage() {
  return (
    <main className="auth-shell">
      <aside className="auth-brand">
        <Logo inverse />
        <h1 className="h1" style={{ color: "#fff" }}>
          Set up your first restaurant location.
        </h1>
        <p className="body" style={{ color: "rgba(255,255,255,.72)" }}>
          These fields map to organizations, locations, menus and staff invites in Supabase.
        </p>
      </aside>
      <section className="auth-panel">
        <form className="form-card">
          <div className="field">
            <label htmlFor="location">Location name</label>
            <input className="input" id="location" placeholder="Downtown cafe" />
          </div>
          <div className="field">
            <label htmlFor="timezone">Timezone</label>
            <input className="input" id="timezone" placeholder="America/New_York" />
          </div>
          <div className="field">
            <label htmlFor="role">Your role</label>
            <select className="select" id="role">
              <option>Owner</option>
              <option>Manager</option>
              <option>Operations lead</option>
            </select>
          </div>
          <ButtonLink href="/app/dashboard" size="lg">
            Finish setup
          </ButtonLink>
        </form>
      </section>
    </main>
  );
}
