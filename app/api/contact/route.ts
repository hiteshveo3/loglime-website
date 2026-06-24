import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/admin";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = contactSchema.parse(body);

    const supabase = createServiceClient();

    // Save to database
    if (supabase) {
      await supabase.from("contacts").insert({
        name,
        email,
        subject,
        message,
        status: "new",
      } as any);
    }

    // Send emails via Loops transactional API
    if (process.env.LOOPS_CONTACT_CONFIRMATION_ID && process.env.LOOPS_API_KEY) {
      // Send to admin
      await fetch("https://app.loops.so/api/v1/transactional/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionalId: process.env.LOOPS_CONTACT_CONFIRMATION_ID,
          email: process.env.ZOHO_FROM_EMAIL || "info@loglime.com",
          dataVariables: {
            firstName: name.split(" ")[0],
            subject,
          },
        }),
      });

      // Send confirmation to customer
      await fetch("https://app.loops.so/api/v1/transactional/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionalId: process.env.LOOPS_CONTACT_CONFIRMATION_ID,
          email,
          dataVariables: {
            firstName: name.split(" ")[0],
            subject,
          },
        }),
      });
    }

    return NextResponse.json({ success: true, message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("[Contact API]", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 400 }
    );
  }
}
