import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/logo.svg"
        alt="Loglime"
        width={40}
        height={40}
        className="h-10 w-auto"
        priority
      />
      <span className="text-h3 text-text-primary">Loglime</span>
    </div>
  );
}
