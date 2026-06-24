import { Card } from "@/components/ui/card";

export function SetupAlert({ message }: { message: string }) {
  return (
    <Card className="border border-status-warningSoft bg-status-warningSoft/60">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-status-warning">
          <i className="hgi-stroke hgi-alert-02 text-xl" />
        </div>
        <div>
          <h2 className="text-h4 text-text-primary">Supabase setup needed</h2>
          <p className="mt-1 text-small text-text-secondary">{message}</p>
        </div>
      </div>
    </Card>
  );
}
