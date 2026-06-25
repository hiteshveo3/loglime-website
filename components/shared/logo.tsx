import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <img
        src="/favicon.png"
        alt="Loglime"
        className="h-10 w-10"
      />
      <span className="text-h3 font-bold text-coral">Loglime</span>
    </div>
  );
}
