import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/favicon.png"
      alt="Loglime"
      className={cn("h-10 w-10", className)}
    />
  );
}
