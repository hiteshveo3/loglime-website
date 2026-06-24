"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { StatusTone } from "@/types/app";

type ToastMessage = {
  id: string;
  title: string;
  description?: string;
  tone?: StatusTone;
};

type ToastContextValue = {
  showToast: (toast: Omit<ToastMessage, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toneClasses: Record<StatusTone, string> = {
  success: "border-status-successSoft",
  warning: "border-status-warningSoft",
  error: "border-status-errorSoft",
  info: "border-status-infoSoft",
  neutral: "border-border",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((toast: Omit<ToastMessage, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 4000);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 left-4 right-4 z-[60] flex flex-col gap-3 sm:left-auto sm:right-5 sm:w-96">
        {toasts.map((toast) => (
          <div key={toast.id} className={cn("rounded-2xl border bg-white p-4 shadow-modal", toneClasses[toast.tone ?? "neutral"])}>
            <p className="font-semibold text-text-primary">{toast.title}</p>
            {toast.description ? <p className="mt-1 text-small text-text-secondary">{toast.description}</p> : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
