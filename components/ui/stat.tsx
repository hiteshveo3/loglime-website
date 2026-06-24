import type { ReactNode } from "react";

import { Card } from "./card";

export function Stat({
  label,
  value,
  trend,
}: {
  label: string;
  value: string | number;
  trend?: ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-small text-text-secondary">{label}</p>
          <p className="mt-2 text-3xl font-bold text-text-primary">{value}</p>
        </div>
        {trend ? <div className="rounded-full bg-status-successSoft px-3 py-1 text-caption uppercase tracking-wide text-status-success">{trend}</div> : null}
      </div>
    </Card>
  );
}
