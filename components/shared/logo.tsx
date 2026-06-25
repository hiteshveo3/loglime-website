import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/logo.svg"
      alt="Loglime"
      className={cn("h-10 w-auto", className)}
    />
  );
}
