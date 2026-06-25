import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="Loglime"
      width={120}
      height={40}
      className={cn("h-10 w-auto", className)}
      priority
    />
  );
}
