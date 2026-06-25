import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <img
        src="/favicon.png"
        alt="Loglime"
        className="h-8 w-8"
      />
      <span className="text-h2 font-bold text-coral">Loglime</span>
    </div>
  );
}
