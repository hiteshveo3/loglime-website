"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    if (!isSupabaseConfigured()) {
      setStatus("Demo mode is active. Sending you into the sample restaurant workspace.");
      setTimeout(() => router.push("/app/dashboard"), 450);
      return;
    }

    const supabase = createBrowserSupabaseClient();
    const result =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (result.error) {
      setStatus(result.error.message);
      return;
    }

    router.push(mode === "signup" ? "/onboarding" : "/app/dashboard");
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div style={{ display: "grid", gap: 10 }}>
        <span className="badge">
          <span className="badge-dot" />
          {mode === "signup" ? "Start restaurant workspace" : "Welcome back"}
        </span>
        <h1 className="h1">{mode === "signup" ? "Create your Loglime restaurant account." : "Log in to Loglime."}</h1>
        <p className="body">
          {mode === "signup"
            ? "Set up your first restaurant, import your menu and bring the team in when you are ready."
            : "Open your restaurant dashboard, kitchen queue and floor plan."}
        </p>
      </div>
      {mode === "signup" ? (
        <div className="field">
          <label htmlFor="business">Restaurant name</label>
          <input className="input" id="business" name="business" placeholder="Brioche and Co." required />
        </div>
      ) : null}
      <div className="field">
        <label htmlFor="email">Email</label>
        <input className="input" id="email" name="email" placeholder="you@restaurant.com" required type="email" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input className="input" id="password" minLength={6} name="password" required type="password" />
      </div>
      <button className="btn btn-primary btn-lg" disabled={loading} type="submit">
        {loading ? "Working..." : mode === "signup" ? "Create workspace" : "Log in"}
      </button>
      {status ? <p className="body">{status}</p> : null}
    </form>
  );
}
