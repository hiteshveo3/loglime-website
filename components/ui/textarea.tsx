import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, error, helperText, id, ...props }, ref) => {
  const textareaId = id ?? props.name;

  return (
    <label className="block space-y-2" htmlFor={textareaId}>
      {label ? <span className="text-small font-semibold text-text-primary">{label}</span> : null}
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          "min-h-28 w-full resize-y rounded-xl border border-border bg-white px-4 py-3 text-body text-text-primary outline-none transition placeholder:text-text-muted focus:border-coral focus:ring-4 focus:ring-coral/10",
          error && "border-status-error focus:border-status-error focus:ring-status-error/10",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-small text-status-error">{error}</span> : null}
      {!error && helperText ? <span className="text-small text-text-muted">{helperText}</span> : null}
    </label>
  );
});

Textarea.displayName = "Textarea";
