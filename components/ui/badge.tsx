import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import type { StatusTone } from "@/types/app";

const toneClasses: Record<StatusTone, string> = {
  success: "bg-status-successSoft text-status-success",
  warning: "bg-status-warningSoft text-status-warning",
  error: "bg-status-errorSoft text-status-error",
  info: "bg-status-infoSoft text-status-info",
  neutral: "bg-slate-100 text-text-secondary",
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: StatusTone;
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-caption font-semibold uppercase tracking-wide",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
