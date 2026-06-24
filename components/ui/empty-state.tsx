import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-card", className)}>
      {icon ? <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-soft text-coral">{icon}</div> : null}
      <h3 className="text-h3 text-text-primary">{title}</h3>
      <p className="mt-2 max-w-md text-body text-text-secondary">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
