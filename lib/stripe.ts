import Stripe from "stripe";

import { getRequiredEnv } from "@/lib/utils";

export function getStripe() {
  return new Stripe(getRequiredEnv("STRIPE_SECRET_KEY"), {
    typescript: true,
  });
}
