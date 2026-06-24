"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Drawer({
  open,
  title,
  subtitle,
  children,
  onClose,
  className,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className={cn("fixed inset-x-0 bottom-0 max-h-[92vh] overflow-auto rounded-t-3xl bg-white p-5 shadow-modal lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[420px] lg:rounded-l-3xl lg:rounded-tr-none lg:p-6", className)}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-h3 text-text-primary">{title}</h2>
            {subtitle && <p className="mt-1 text-small text-text-muted">{subtitle}</p>}
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-text-secondary" onClick={onClose} aria-label="Close drawer">
            <i className="hgi-stroke hgi-cancel-01" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
