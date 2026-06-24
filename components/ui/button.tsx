import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-coral text-white shadow-floating hover:bg-coral-hover focus-visible:ring-coral transition-all duration-200",
  secondary: "bg-slate-100 text-text-primary hover:bg-slate-200 focus-visible:ring-slate-300 transition-all duration-200",
  ghost: "bg-transparent text-text-primary hover:bg-slate-100 focus-visible:ring-slate-300 transition-all duration-200",
  danger: "bg-status-error text-white hover:bg-red-600 focus-visible:ring-status-error transition-all duration-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-small",
  md: "h-11 px-5 text-body",
  lg: "h-12 px-6 text-body",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  asChildHack?: "a";
  href?: AnchorHTMLAttributes<HTMLAnchorElement>["href"];
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", leftIcon, rightIcon, isLoading, children, disabled, asChildHack, href, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-55",
      variantClasses[variant],
      sizeClasses[size],
      className,
    );
    const content = (
      <>
        {isLoading ? <Spinner size="sm" tone={variant === "secondary" || variant === "ghost" ? "coral" : "white"} /> : leftIcon}
        {children}
        {!isLoading ? rightIcon : null}
      </>
    );

    if (asChildHack === "a" && href) {
      return (
        <a className={classes} href={href}>
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled || isLoading} {...props}>
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
