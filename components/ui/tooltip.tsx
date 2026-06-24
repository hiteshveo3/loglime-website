import type { ReactNode } from "react";

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 rounded-xl bg-slate-950 px-3 py-2 text-caption font-semibold uppercase tracking-wide text-white opacity-0 shadow-card transition group-hover:opacity-100">
        {label}
      </span>
    </span>
  );
}
