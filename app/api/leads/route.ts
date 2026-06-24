import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase/admin";

const leadSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().min(2).max(160),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(10).max(5000),
  source: z.enum(["demo", "contact"]).default("contact"),
});

export async function POST(request: Request) {
  const parsed = leadSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });

  const supabase = createServiceClient();
  if (!supabase) return NextResponse.json({ error: "Lead service is not configured." }, { status: 503 });

  const values = parsed.data;
  const { error } = await supabase.from("leads").insert({
    full_name: values.fullName,
    email: values.email,
    company: values.company,
    restaurant_name: values.company,
    phone: values.phone || null,
    notes: values.message,
    source: values.source,
    status: "new",
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send emails via Loops transactional API
  try {
    // Send to admin via Loops
    if (process.env.LOOPS_WELCOME_LEAD_ID && process.env.LOOPS_API_KEY) {
      await fetch("https://app.loops.so/api/v1/transactional/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionalId: process.env.LOOPS_WELCOME_LEAD_ID,
          email: process.env.ZOHO_FROM_EMAIL || "info@loglime.com",
          dataVariables: {
            firstName: values.fullName.split(" ")[0],
            visitorEmail: values.email,
            visitorName: values.fullName,
          },
        }),
      });
    }

    // Send confirmation to customer via Loops
    if (process.env.LOOPS_WELCOME_LEAD_ID && process.env.LOOPS_API_KEY) {
      await fetch("https://app.loops.so/api/v1/transactional/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionalId: process.env.LOOPS_WELCOME_LEAD_ID,
          email: values.email,
          dataVariables: {
            firstName: values.fullName.split(" ")[0],
          },
        }),
      });
    }
  } catch (emailError) {
    console.error("[Lead Email Error]", emailError);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
