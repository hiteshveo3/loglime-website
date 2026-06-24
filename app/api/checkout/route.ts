export const runtime = 'edge';

import { NextResponse } from "next/server";
import { z } from "zod";

import { getStripe } from "@/lib/stripe";

const checkoutSchema = z.object({
  plan: z.enum(["starter", "growth", "scale"]).default("growth"),
});

const planAmounts = {
  starter: 149,
  growth: 249,
  scale: 399,
};

export async function POST(request: Request) {
  const parsed = checkoutSchema.safeParse(await request.json().catch(() => ({})));

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      {
        error: "Stripe is not configured yet.",
        nextStep: "Add STRIPE_SECRET_KEY and Stripe price IDs to enable live checkout.",
      },
      { status: 503 },
    );
  }

  const stripe = getStripe();
  const { plan } = parsed.data;
  const amount = planAmounts[plan];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://loglime.com";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${baseUrl}/demo?checkout=success&plan=${plan}`,
    cancel_url: `${baseUrl}/pricing?checkout=cancelled`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: amount * 100,
          product_data: {
            name: `Loglime ${plan[0].toUpperCase()}${plan.slice(1)} Restaurant App Package`,
            description: "One-time restaurant app build with complete setup.",
          },
        },
      },
    ],
    metadata: { plan, launch_offer: "true" },
  });

  return NextResponse.json({ url: session.url });
}
