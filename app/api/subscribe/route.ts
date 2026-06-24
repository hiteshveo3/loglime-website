import { NextResponse } from "next/server";
import { z } from "zod";
import { sendSubscriptionEmails } from "@/lib/email/smtp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const subscribeSchema = z.object({
  email: z.string().trim().email().max(254),
  source: z.string().trim().max(100).optional(),
  company: z.string().trim().max(120).optional()
});

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const { email, source, company } = parsed.data;

  if (company) {
    return NextResponse.json({ message: "Thanks. You are subscribed." });
  }

  try {
    await sendSubscriptionEmails({ email, source: source || "website" });
    return NextResponse.json({ message: "Thanks. You are subscribed." });
  } catch (error) {
    if (error instanceof Error && error.message === "SMTP_NOT_CONFIGURED") {
      return NextResponse.json(
        { message: "Email setup is pending. Please add SMTP settings and try again." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: "We could not subscribe this email right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
