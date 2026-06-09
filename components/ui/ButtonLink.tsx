import Link from "next/link";
import { clsx } from "clsx";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "dark" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variantClass = {
  primary: "btn-primary",
  outline: "btn-outline",
  dark: "btn-dark",
  ghost: "btn-ghost"
};

const sizeClass = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg"
};

export function ButtonLink({ href, children, variant = "primary", size = "md" }: ButtonLinkProps) {
  return (
    <Link className={clsx("btn", variantClass[variant], sizeClass[size])} href={href}>
      {children}
    </Link>
  );
}
