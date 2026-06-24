import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg";
type SpinnerTone = "coral" | "white" | "slate";

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
};

const toneClasses: Record<SpinnerTone, string> = {
  coral: "border-coral/25 border-t-coral",
  white: "border-white/35 border-t-white",
  slate: "border-slate-300 border-t-slate-700",
};

export function Spinner({ size = "md", tone = "coral", className }: { size?: SpinnerSize; tone?: SpinnerTone; className?: string }) {
  return <span className={cn("inline-block animate-spin rounded-full", sizeClasses[size], toneClasses[tone], className)} aria-label="Loading" />;
}
