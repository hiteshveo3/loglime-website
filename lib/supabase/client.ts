"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";

export { isSupabaseConfigured };

export function createBrowserSupabaseClient() {
  const env = getSupabaseEnv();

  if (!env.url || !env.publishableKey) {
    throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
  }

  return createBrowserClient(env.url, env.publishableKey);
}
