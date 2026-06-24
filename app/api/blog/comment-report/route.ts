import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const schema = z.object({
  commentId: z.string().uuid(),
  reason: z.enum(["spam", "hate", "off-topic", "other"]).default("spam"),
});

function getFingerprint(request: Request) {
  return crypto
    .createHash("sha256")
    .update(`${request.headers.get("x-forwarded-for") ?? "unknown"}:${request.headers.get("user-agent") ?? "unknown"}`)
    .digest("hex");
}

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid report request." }, { status: 400 });

  const supabase = createServiceClient();
  if (supabase) {
    await supabase.from("blog_comment_reports").insert({ comment_id: parsed.data.commentId, reporter_fingerprint: getFingerprint(request), reason: parsed.data.reason } as never);
  }

  return NextResponse.json({ ok: true });
}
