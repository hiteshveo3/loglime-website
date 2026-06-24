import { Badge, Button, Card, EmptyState, PageHeader, Stat } from "@/components/ui";

type ModulePageProps = {
  title: string;
  subtitle: string;
  badge?: string;
  primaryAction?: string;
  stats?: Array<{ label: string; value: string }>;
  sections?: string[];
};

export function ModulePage({ title, subtitle, badge, primaryAction = "Add New", stats = [], sections = [] }: ModulePageProps) {
  return (
    <div className="space-y-5">
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <Button>
            <i className="hgi-stroke hgi-add-01" />
            {primaryAction}
          </Button>
        }
      />
      {badge ? <Badge tone="info">{badge}</Badge> : null}
      {stats.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Stat key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      ) : null}
      {sections.length ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {sections.map((section) => (
            <Card key={section}>
              <h2 className="text-h3 text-text-primary">{section}</h2>
              <p className="mt-2 text-body text-text-secondary">This surface is ready for the next data and workflow implementation pass.</p>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title={`${title} is ready for data`}
          description="The CRM shell and page surface are in place. The next pass will wire Supabase records, filters, actions, and realtime behavior."
          icon={<i className="hgi-stroke hgi-database-01 text-xl" />}
        />
      )}
    </div>
  );
}
