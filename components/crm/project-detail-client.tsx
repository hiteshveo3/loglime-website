"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { useState } from "react";

import { Badge, Button, Card, Drawer, EmptyState, Select, Textarea, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type Task = Database["public"]["Tables"]["tasks"]["Row"];

const PROJECT_STATUSES = [
  { label: "Planning", value: "planning" },
  { label: "In Progress", value: "in_progress" },
  { label: "Review", value: "review" },
  { label: "Client Approval", value: "client_approval" },
  { label: "Delivered", value: "delivered" },
  { label: "Completed", value: "completed" },
];

const TABS = [
  { key: "overview" as const, label: "Overview" },
  { key: "tasks" as const, label: "Tasks" },
  { key: "updates" as const, label: "Client Updates" },
];

function formatStatus(status: string | null) {
  return (status ?? "—").split("_").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}

function getProjectTone(status: string | null): "success" | "info" | "warning" | "neutral" {
  if (status === "completed" || status === "delivered") return "success";
  if (status === "in_progress") return "info";
  if (status === "review" || status === "client_approval") return "warning";
  return "neutral";
}

function getTaskPriorityTone(priority: string | null): "error" | "warning" | "info" | "neutral" {
  if (priority === "urgent") return "error";
  if (priority === "high") return "warning";
  if (priority === "medium") return "info";
  return "neutral";
}

type ProjectUpdate = {
  id: string;
  content: string | null;
  visible_to_customer: boolean | null;
  created_by: string | null;
  created_at: string | null;
};

export function ProjectDetailClient({ projectId }: { projectId: string }) {
  const [tab, setTab] = useState<"overview" | "tasks" | "updates">("overview");
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const [statusDrawerOpen, setStatusDrawerOpen] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: project, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("projects").select("*").eq("id", projectId).single();
      if (error) throw error;
      return data as Project;
    },
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["project-tasks", projectId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("tasks").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
      return (data ?? []) as Task[];
    },
  });

  const { data: updates = [] } = useQuery({
    queryKey: ["project-updates", projectId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("project_updates").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
      return (data ?? []) as ProjectUpdate[];
    },
  });

  const postUpdateMutation = useMutation({
    mutationFn: async (content: string) => {
      const supabase = createClient();
      const { error } = await supabase.from("project_updates").insert({ project_id: projectId, content, visible_to_customer: true });
      if (error) throw error;
    },
    onSuccess: async () => {
      setUpdateText("");
      setUpdateDrawerOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["project-updates", projectId] });
      showToast({ title: "Update posted", tone: "success" });
    },
    onError: () => showToast({ title: "Could not post update", tone: "error" }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const supabase = createClient();
      const { error } = await supabase.from("projects").update({ status, updated_at: new Date().toISOString() }).eq("id", projectId);
      if (error) throw error;
    },
    onSuccess: async () => {
      setStatusDrawerOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      showToast({ title: "Status updated", tone: "success" });
    },
    onError: () => showToast({ title: "Could not update status", tone: "error" }),
  });

  if (isLoading) {
    return <div className="space-y-5"><div className="h-8 w-48 animate-pulse rounded-xl bg-slate-100" /><div className="h-64 animate-pulse rounded-2xl bg-slate-100" /></div>;
  }

  if (isError || !project) {
    return <EmptyState title="Project not found" description="This project may have been deleted." icon={<i className="hgi-stroke hgi-briefcase-01 text-xl" />} action={<Button onClick={() => window.history.back()}>Go Back</Button>} />;
  }

  const doneTasks = tasks.filter((t) => t.status === "done").length;
  const progress = project.progress ?? (tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <a href="/crm/projects" className="flex items-center gap-1.5 text-small font-semibold text-text-secondary hover:text-coral">
          <i className="hgi-stroke hgi-arrow-left-01" />
          All Projects
        </a>
        <i className="hgi-stroke hgi-arrow-right-01 text-text-muted" />
        <span className="text-small font-semibold text-text-primary">{project.name}</span>
      </div>

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-h2 text-text-primary">{project.name}</h1>
            {project.description ? <p className="mt-1 text-small text-text-secondary">{project.description}</p> : null}
            <div className="mt-2 flex gap-2">
              <Badge tone={getProjectTone(project.status)}>{formatStatus(project.status)}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => { setNewStatus(project.status ?? "planning"); setStatusDrawerOpen(true); }}>
              <i className="hgi-stroke hgi-refresh-01" />
              Update Status
            </Button>
            <Button onClick={() => setUpdateDrawerOpen(true)}>
              <i className="hgi-stroke hgi-message-01" />
              Post Client Update
            </Button>
          </div>
        </div>

        <div className="mt-5 border-t border-border pt-5">
          <div className="flex items-center justify-between">
            <span className="text-small font-semibold text-text-secondary">Progress</span>
            <span className="text-small font-bold text-coral">{progress}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-surface-elevated">
            <div className="h-2 rounded-full bg-coral transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-h4 text-text-primary">{tasks.length}</p>
              <p className="text-caption text-text-muted">Total Tasks</p>
            </div>
            <div>
              <p className="text-h4 text-coral">{tasks.filter((t) => t.status === "in_progress").length}</p>
              <p className="text-caption text-text-muted">In Progress</p>
            </div>
            <div>
              <p className="text-h4 text-status-success">{doneTasks}</p>
              <p className="text-caption text-text-muted">Completed</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-1 rounded-2xl bg-surface-alt p-1">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={tab === t.key ? "flex-1 rounded-xl bg-white px-4 py-2 text-small font-semibold text-text-primary shadow-card" : "flex-1 rounded-xl px-4 py-2 text-small font-semibold text-text-secondary hover:text-text-primary"}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h2 className="text-h4 text-text-primary">Project Info</h2>
            <div className="mt-4 space-y-3">
              {[
                { label: "Status", value: <Badge tone={getProjectTone(project.status)}>{formatStatus(project.status)}</Badge> },
                { label: "Start Date", value: project.start_date ? format(new Date(project.start_date), "dd MMM yyyy") : null },
                { label: "End Date", value: project.end_date ? format(new Date(project.end_date), "dd MMM yyyy") : null },
                { label: "Created", value: project.created_at ? formatDistanceToNow(new Date(project.created_at), { addSuffix: true }) : null },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5 border-b border-border pb-3 last:border-0 last:pb-0">
                  <span className="text-caption uppercase tracking-wider text-text-muted">{label}</span>
                  <span className="text-small font-semibold text-text-primary">{value ?? "—"}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-h4 text-text-primary">Recent Client Updates</h2>
            {updates.length === 0 ? (
              <EmptyState title="No updates yet" description="Post a client update to keep the customer informed." icon={<i className="hgi-stroke hgi-message-01 text-xl" />} action={<Button onClick={() => setUpdateDrawerOpen(true)}>Post Update</Button>} />
            ) : (
              <ul className="mt-4 space-y-3">
                {updates.slice(0, 3).map((u) => (
                  <li key={u.id} className="rounded-xl border border-border bg-surface-alt p-4">
                    <p className="text-small text-text-secondary">{u.content}</p>
                    <p className="mt-2 text-caption text-text-muted">{u.created_at ? formatDistanceToNow(new Date(u.created_at), { addSuffix: true }) : ""}</p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      )}

      {tab === "tasks" && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-text-primary">Tasks</h2>
            <Button variant="secondary"><i className="hgi-stroke hgi-add-01" />Add Task</Button>
          </div>
          {tasks.length === 0 ? (
            <EmptyState title="No tasks yet" description="Add tasks to track project work." icon={<i className="hgi-stroke hgi-task-01 text-xl" />} />
          ) : (
            <ul className="mt-5 space-y-2">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between rounded-xl border border-border p-4 hover:bg-surface-alt">
                  <div className="flex items-center gap-3">
                    <div className={`h-5 w-5 rounded-full border-2 ${task.status === "done" ? "border-status-success bg-status-success" : "border-border-strong"} flex items-center justify-center`}>
                      {task.status === "done" ? <i className="hgi-stroke hgi-checkmark-01 text-[10px] text-white" /> : null}
                    </div>
                    <div>
                      <p className={`text-small font-semibold ${task.status === "done" ? "text-text-muted line-through" : "text-text-primary"}`}>{task.title}</p>
                      {task.due_date ? <p className="text-caption text-text-muted">{format(new Date(task.due_date), "dd MMM yyyy")}</p> : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone={getTaskPriorityTone(task.priority)}>{formatStatus(task.priority)}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {tab === "updates" && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-text-primary">Client Updates</h2>
            <Button onClick={() => setUpdateDrawerOpen(true)}><i className="hgi-stroke hgi-add-01" />Post Update</Button>
          </div>
          {updates.length === 0 ? (
            <EmptyState title="No updates yet" description="Post updates to keep the customer informed about project progress." icon={<i className="hgi-stroke hgi-message-01 text-xl" />} action={<Button onClick={() => setUpdateDrawerOpen(true)}>Post First Update</Button>} />
          ) : (
            <ol className="mt-5 space-y-0">
              {updates.map((update, index) => (
                <li key={update.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral-light text-coral">
                      <i className="hgi-stroke hgi-message-01 text-sm" />
                    </div>
                    {index < updates.length - 1 ? <div className="mt-1 w-px flex-1 bg-border-strong" /> : null}
                  </div>
                  <div className="pb-5">
                    <p className="text-small text-text-secondary">{update.content}</p>
                    <p className="mt-1 text-caption text-text-muted">{update.created_at ? formatDistanceToNow(new Date(update.created_at), { addSuffix: true }) : ""}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Card>
      )}

      <Drawer open={updateDrawerOpen} title="Post Client Update" onClose={() => setUpdateDrawerOpen(false)}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); postUpdateMutation.mutate(updateText); }}>
          <Textarea label="Update" placeholder="Write a project update visible to the customer..." value={updateText} onChange={(e) => setUpdateText(e.target.value)} required />
          <Button className="w-full" type="submit" isLoading={postUpdateMutation.isPending}>Post Update</Button>
        </form>
      </Drawer>

      <Drawer open={statusDrawerOpen} title="Update Project Status" onClose={() => setStatusDrawerOpen(false)}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); updateStatusMutation.mutate(newStatus); }}>
          <Select label="Status" value={newStatus} options={PROJECT_STATUSES} onChange={(e) => setNewStatus(e.target.value)} />
          <Button className="w-full" type="submit" isLoading={updateStatusMutation.isPending}>Save</Button>
        </form>
      </Drawer>
    </div>
  );
}
