import type { HTMLAttributes } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg";

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-caption",
  md: "h-10 w-10 text-small",
  lg: "h-14 w-14 text-body",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  src?: string | null;
  size?: AvatarSize;
};

export function Avatar({ className, name, src, size = "md", ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-coral-soft font-bold text-coral",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {src ? <Image src={src} alt={name} width={56} height={56} className="h-full w-full object-cover" unoptimized /> : getInitials(name)}
    </div>
  );
}
