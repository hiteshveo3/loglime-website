"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export function CheckoutButton({ plan, children, variant = "primary", className }: { plan: "starter" | "growth" | "scale"; children: string; variant?: "primary" | "secondary"; className?: string }) {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  async function startCheckout() {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const payload = (await response.json()) as { url?: string; error?: string; nextStep?: string };

      if (!response.ok || !payload.url) {
        showToast({
          title: payload.error ?? "Checkout unavailable",
          description: payload.nextStep ?? "Book a demo and the team will set up billing manually.",
          tone: "warning",
        });
        return;
      }

      window.location.href = payload.url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button className={className ?? "w-full"} type="button" variant={variant} isLoading={loading} onClick={startCheckout}>
      {children}
    </Button>
  );
}
