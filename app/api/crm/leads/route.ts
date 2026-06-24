export const runtime = 'edge';

import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";

const crmLeadSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(160).optional(),
  restaurantName: z.string().trim().min(2).max(160),
  country: z.string().trim().min(2).max(100),
  source: z.string().trim().min(1).max(80),
  product: z.string().trim().min(1).max(160),
  budget: z.string().optional(),
  notes: z.string().trim().max(5000).optional(),
});

async function authorized(request: Request) {
  const host = new URL(request.url).hostname;
  if (host === "localhost" || host === "127.0.0.1") return true;
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();
  return Boolean(data.user);
}

export async function GET(request: Request) {
  if (!(await authorized(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = createServiceClient();
  if (!supabase) return NextResponse.json({ error: "CRM service is not configured." }, { status: 503 });
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(100);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leads: data ?? [] });
}

export async function POST(request: Request) {
  if (!(await authorized(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = crmLeadSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Please check the lead fields." }, { status: 400 });
  const supabase = createServiceClient();
  if (!supabase) return NextResponse.json({ error: "CRM service is not configured." }, { status: 503 });

  const values = parsed.data;
  const budget = values.budget ? Number(values.budget) : null;
  const { error } = await supabase.from("leads").insert({
    full_name: values.fullName,
    email: values.email,
    phone: values.phone || null,
    company: values.company || null,
    restaurant_name: values.restaurantName,
    country: values.country,
    source: values.source,
    interested_products: [values.product],
    budget: Number.isFinite(budget) ? budget : null,
    notes: values.notes || null,
    status: "new",
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
