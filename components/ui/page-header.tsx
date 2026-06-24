import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 -mx-4 border-b border-border bg-surface/95 px-4 py-4 backdrop-blur lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h1 text-text-primary">{title}</h1>
          {subtitle ? <p className="mt-1 text-body text-text-secondary">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </header>
  );
}
