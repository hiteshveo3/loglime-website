"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { Badge, Button, Card, EmptyState, PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type Project = {
  id: string; name: string; description: string | null;
  status: string | null; progress: number | null;
  start_date: string | null; end_date: string | null;
};

type Update = { id: string; content: string | null; created_at: string | null };

function getProjectTone(s: string | null): "success" | "info" | "warning" | "neutral" {
  if (s === "completed" || s === "delivered") return "success";
  if (s === "in_progress") return "info";
  if (s === "review" || s === "client_approval") return "warning";
  return "neutral";
}

function formatStatus(s: string | null) {
  return (s ?? "—").split("_").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}

export function PortalProjectsClient({ customerId }: { customerId: string }) {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["portal-projects", customerId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("projects").select("*").eq("customer_id", customerId).order("created_at", { ascending: false });
      return (data ?? []) as unknown as Project[];
    },
  });

  return (
    <div className="space-y-5">
      <PageHeader title="My Projects" subtitle="Track the progress of your app builds and deliverables." />
      {isLoading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />)}</div>
      ) : projects.length === 0 ? (
        <EmptyState title="No projects yet" description="Your projects will appear here once your order is confirmed." icon={<i className="hgi-stroke hgi-briefcase-01 text-xl" />} />
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <a key={project.id} href={`/portal/projects/${project.id}`} className="block">
              <Card className="transition hover:border-coral hover:shadow-floating">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-coral-light text-xl text-coral">
                      <i className="hgi-stroke hgi-briefcase-01" />
                    </div>
                    <div>
                      <h2 className="text-h4 text-text-primary">{project.name}</h2>
                      {project.description ? <p className="mt-1 text-small text-text-secondary">{project.description}</p> : null}
                      <div className="mt-2 flex flex-wrap gap-3 text-caption text-text-muted">
                        {project.start_date ? <span><i className="hgi-stroke hgi-calendar-01 mr-1" />Started {format(new Date(project.start_date), "dd MMM yyyy")}</span> : null}
                        {project.end_date ? <span><i className="hgi-stroke hgi-calendar-check-01 mr-1" />Due {format(new Date(project.end_date), "dd MMM yyyy")}</span> : null}
                      </div>
                    </div>
                  </div>
                  <Badge tone={getProjectTone(project.status)}>{formatStatus(project.status)}</Badge>
                </div>
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-small font-semibold text-text-secondary">Progress</span>
                    <span className="text-small font-bold text-coral">{project.progress ?? 0}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-surface-elevated">
                    <div className="h-2 rounded-full bg-coral transition-all" style={{ width: `${project.progress ?? 0}%` }} />
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function PortalProjectDetailClient({ projectId }: { projectId: string }) {
  const { data: project, isLoading } = useQuery({
    queryKey: ["portal-project", projectId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("projects").select("*").eq("id", projectId).single();
      return data as Project;
    },
  });

  const { data: updates = [] } = useQuery({
    queryKey: ["portal-project-updates", projectId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("project_updates").select("*").eq("project_id", projectId).eq("visible_to_customer", true).order("created_at", { ascending: false });
      return (data ?? []) as unknown as Update[];
    },
  });

  if (isLoading) return <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />;
  if (!project) return <EmptyState title="Project not found" description="The project you're looking for doesn't exist." icon={<i className="hgi-stroke hgi-briefcase-01 text-xl" />} action={<Button onClick={() => window.history.back()}>Back</Button>} />;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <a href="/portal/projects" className="flex items-center gap-1.5 text-small font-semibold text-text-secondary hover:text-coral">
          <i className="hgi-stroke hgi-arrow-left-01" />Back
        </a>
        <i className="hgi-stroke hgi-arrow-right-01 text-text-muted" />
        <span className="text-small font-semibold text-text-primary">{project.name}</span>
      </div>

      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-h2 text-text-primary">{project.name}</h1>
            {project.description ? <p className="mt-1 text-small text-text-secondary">{project.description}</p> : null}
          </div>
          <Badge tone={getProjectTone(project.status)}>{formatStatus(project.status)}</Badge>
        </div>
        <div className="mt-5 border-t border-border pt-5">
          <div className="flex items-center justify-between">
            <span className="text-small font-semibold text-text-secondary">Overall Progress</span>
            <span className="text-h4 text-coral">{project.progress ?? 0}%</span>
          </div>
          <div className="mt-2 h-3 w-full rounded-full bg-surface-elevated">
            <div className="h-3 rounded-full bg-coral transition-all" style={{ width: `${project.progress ?? 0}%` }} />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-h4 text-text-primary">Team Updates</h2>
        {updates.length === 0 ? (
          <EmptyState title="No updates yet" description="The Loglime team will post updates here as your project progresses." icon={<i className="hgi-stroke hgi-message-01 text-xl" />} />
        ) : (
          <ol className="mt-5 space-y-0">
            {updates.map((u, i) => (
              <li key={u.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral-light text-coral">
                    <i className="hgi-stroke hgi-message-01 text-sm" />
                  </div>
                  {i < updates.length - 1 ? <div className="mt-1 w-px flex-1 bg-border-strong" /> : null}
                </div>
                <div className="pb-5">
                  <p className="text-small text-text-secondary">{u.content}</p>
                  <p className="mt-1 text-caption text-text-muted">{u.created_at ? new Date(u.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Card>
    </div>
  );
}
