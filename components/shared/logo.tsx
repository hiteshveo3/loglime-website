import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-coral text-lg font-bold text-white shadow-floating">
        L
      </span>
      <span className="text-h3 text-text-primary">Loglime</span>
    </div>
  );
}
