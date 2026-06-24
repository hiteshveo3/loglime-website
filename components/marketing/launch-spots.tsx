"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

const MAX_SPOTS = 10;

export function LaunchSpots({ initialClaimed = 8 }: { initialClaimed?: number }) {
  const [claimed, setClaimed] = useState(initialClaimed);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    void supabase
      .from("launch_spots")
      .select("claimed")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        if (active && typeof data?.claimed === "number") setClaimed(data.claimed);
      });

    const channel = supabase
      .channel("launch-spots-public")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "launch_spots", filter: "id=eq.1" }, (payload) => {
        const nextClaimed = (payload.new as { claimed?: number }).claimed;
        if (typeof nextClaimed === "number") setClaimed(nextClaimed);
      })
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  if (claimed >= MAX_SPOTS) return null;

  const remaining = MAX_SPOTS - claimed;
  const percent = Math.min(100, Math.max(0, claimed * 10));

  return (
    <section className="rounded-2xl border border-coral/30 bg-coral-light p-5" aria-label="Launch offer availability">
      <div className="grid items-center gap-5 md:grid-cols-[1fr_1.15fr_1fr]">
        <p className="font-bold text-text-primary"><span aria-hidden="true">🔥</span> Launch Pricing — {claimed} of {MAX_SPOTS} spots have been claimed.</p>
        <div>
          <div className="h-2 overflow-hidden rounded-full bg-white" role="progressbar" aria-valuemin={0} aria-valuemax={MAX_SPOTS} aria-valuenow={claimed}>
            <div className="h-full rounded-full bg-coral transition-[width] duration-500" style={{ width: `${percent}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-caption font-bold text-text-secondary">
            <span>{claimed} claimed</span>
            <span>{remaining} remaining</span>
          </div>
        </div>
        <p className="text-small text-text-secondary">Prices increase to original rates after remaining spots are filled.</p>
      </div>
    </section>
  );
}
