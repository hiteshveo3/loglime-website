import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  success?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, helperText, leftIcon, success, id, ...props }, ref) => {
  const inputId = id ?? props.name;

  return (
    <label className="block space-y-2" htmlFor={inputId}>
      {label ? <span className="text-small font-semibold text-text-primary">{label}</span> : null}
      <span className="relative block">
        {leftIcon ? <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-text-muted">{leftIcon}</span> : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full rounded-xl border border-border-strong bg-white px-4 text-body text-text-primary outline-none transition placeholder:text-text-muted focus:border-coral focus:ring-4 focus:ring-coral/10 disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-alt disabled:text-text-muted",
            leftIcon ? "pl-11" : undefined,
            error && "border-status-error bg-status-errorSoft/40 focus:border-status-error focus:ring-status-error/10",
            success && !error && "border-status-success focus:border-status-success focus:ring-status-success/10",
            className,
          )}
          {...props}
        />
        {success && !error ? <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-status-success"><i className="hgi-stroke hgi-checkmark-circle-01" /></span> : null}
      </span>
      {error ? <span className="text-small text-status-error">{error}</span> : null}
      {!error && helperText ? <span className="text-small text-text-muted">{helperText}</span> : null}
    </label>
  );
});

Input.displayName = "Input";
