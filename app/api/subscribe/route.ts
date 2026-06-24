export const runtime = 'edge';

import { NextResponse } from "next/server";
import { z } from "zod";

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

  // Honeypot
  if (company) {
    return NextResponse.json({ message: "Thanks. You are subscribed." });
  }

  // Add contact to Loops mailing list
  if (process.env.LOOPS_API_KEY) {
    try {
      await fetch("https://app.loops.so/api/v1/contacts/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: source || "website", subscribed: true }),
      });
    } catch {
      // non-fatal
    }
  }

  return NextResponse.json({ message: "Thanks. You are subscribed." });
}
