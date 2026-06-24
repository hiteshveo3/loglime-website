"use client";

import { forwardRef, useEffect, useMemo, useRef, useState, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange"> & {
  label?: string;
  error?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (event: { target: { name?: string; value: string } }) => void;
};

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  ({ className, label, error, id, options, name, value, defaultValue, onChange, disabled, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? options[0]?.value ?? "");
    const wrapperRef = useRef<HTMLLabelElement>(null);
    const selectedValue = value ?? internalValue;
    const selectedOption = useMemo(() => options.find((option) => option.value === selectedValue) ?? options[0], [options, selectedValue]);
    const selectId = id ?? name;

    useEffect(() => {
      function onPointerDown(event: MouseEvent) {
        if (!wrapperRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      }

      document.addEventListener("mousedown", onPointerDown);
      return () => document.removeEventListener("mousedown", onPointerDown);
    }, []);

    function selectOption(option: SelectOption) {
      setInternalValue(option.value);
      onChange?.({ target: { name, value: option.value } });
      setOpen(false);
    }

    return (
      <label ref={wrapperRef} className="relative block space-y-2" htmlFor={selectId}>
        {label ? <span className="text-small font-semibold text-text-primary">{label}</span> : null}
        <input ref={ref} id={selectId} type="hidden" name={name} value={selectedValue} readOnly {...props} />
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-11 w-full items-center justify-between rounded-xl border border-border bg-white px-4 text-left text-body text-text-primary outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/10 disabled:opacity-55",
            error && "border-status-error focus:border-status-error focus:ring-status-error/10",
            className,
          )}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span>{selectedOption?.label ?? "Select"}</span>
          <i className={cn("hgi-stroke hgi-arrow-down-01 text-text-muted transition", open && "rotate-180")} />
        </button>
        {open ? (
          <div className="absolute z-30 mt-1 max-h-72 w-full overflow-hidden rounded-2xl border border-border bg-white p-1 shadow-modal" role="listbox">
            <div className="grid gap-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === selectedValue}
                  className={cn(
                    "flex min-h-10 items-center justify-between rounded-xl px-3 py-2 text-left text-small font-semibold transition",
                    option.value === selectedValue ? "bg-coral-light text-coral" : "text-text-secondary hover:bg-slate-100 hover:text-text-primary",
                  )}
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                  {option.value === selectedValue ? <i className="hgi-stroke hgi-tick-02" /> : null}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {error ? <span className="text-small text-status-error">{error}</span> : null}
      </label>
    );
  },
);

Select.displayName = "Select";
