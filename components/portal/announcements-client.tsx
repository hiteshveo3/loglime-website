"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

import { Badge, Card, EmptyState, PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type Announcement = {
  id: string; title: string; content: string | null; type: string | null;
  published_at: string | null; status: string | null;
};

function getTypeTone(t: string | null): "info" | "warning" | "success" | "neutral" {
  if (t === "update" || t === "feature") return "success";
  if (t === "maintenance") return "warning";
  if (t === "news") return "info";
  return "neutral";
}

export function PortalAnnouncementsClient() {
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["portal-announcements"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("announcements").select("*").eq("status", "published").order("published_at", { ascending: false });
      return (data ?? []) as unknown as Announcement[];
    },
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Announcements" subtitle="Platform news, maintenance schedules, and feature updates." />

      {isLoading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />)}</div>
      ) : announcements.length === 0 ? (
        <EmptyState
          title="No announcements yet"
          description="Platform updates and news will appear here."
          icon={<i className="hgi-stroke hgi-megaphone-01 text-xl" />}
        />
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <Card key={a.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral-light text-coral">
                    <i className="hgi-stroke hgi-megaphone-01" />
                  </div>
                  <div>
                    <h2 className="text-small font-bold text-text-primary">{a.title}</h2>
                    {a.content ? <p className="mt-2 text-small leading-relaxed text-text-secondary">{a.content}</p> : null}
                    <p className="mt-3 text-caption text-text-muted">
                      {a.published_at ? formatDistanceToNow(new Date(a.published_at), { addSuffix: true }) : ""}
                    </p>
                  </div>
                </div>
                {a.type ? <Badge tone={getTypeTone(a.type)}>{a.type.charAt(0).toUpperCase() + a.type.slice(1)}</Badge> : null}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
