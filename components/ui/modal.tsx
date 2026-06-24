"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Modal({
  open,
  title,
  children,
  footer,
  onClose,
  className,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-4 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true">
      <div className={cn("w-full max-w-lg rounded-3xl bg-white p-6 shadow-modal", className)}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-h3 text-text-primary">{title}</h2>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-text-secondary" onClick={onClose} aria-label="Close modal">
            <i className="hgi-stroke hgi-cancel-01" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
        {footer ? <div className="mt-6 flex justify-end gap-3">{footer}</div> : null}
      </div>
    </div>
  );
}
