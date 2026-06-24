import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase/admin";

const schema = z.object({
  email: z.string().email(),
  postSlug: z.string().optional(),
  sourceType: z.string().optional(),
});

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json") ? await request.json().catch(() => ({})) : Object.fromEntries((await request.formData()).entries());
  const parsed = schema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

  const supabase = createServiceClient();
  if (supabase) {
    await supabase.from("blog_newsletter_signups").upsert(
      {
        email: parsed.data.email,
        source_post_slug: parsed.data.postSlug ?? null,
        source_type: parsed.data.sourceType ?? "article_sidebar",
      } as never,
      { onConflict: "email" },
    );
  }

  if (contentType.includes("application/json")) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.redirect(new URL("/blog?newsletter=success", request.url), { status: 303 });
}
