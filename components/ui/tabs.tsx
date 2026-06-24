"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type TabItem = {
  label: string;
  value: string;
};

export function Tabs({
  items,
  defaultValue,
  value,
  onChange,
  className,
}: {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value);
  const activeValue = value ?? internalValue;

  return (
    <div className={cn("inline-flex rounded-full bg-slate-100 p-1", className)} role="tablist">
      {items.map((item) => (
        <button
          key={item.value}
          className={cn(
            "h-9 rounded-full px-4 text-small font-semibold transition",
            activeValue === item.value ? "bg-white text-coral shadow-card" : "text-text-secondary hover:text-text-primary",
          )}
          role="tab"
          aria-selected={activeValue === item.value}
          onClick={() => {
            setInternalValue(item.value);
            onChange?.(item.value);
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
