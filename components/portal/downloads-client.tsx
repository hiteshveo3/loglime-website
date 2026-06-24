"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { Button, Card, EmptyState, PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type Document = {
  id: string; name: string; file_type: string | null; file_url: string | null;
  file_size: number | null; created_at: string | null;
};

function formatBytes(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function getFileIcon(type: string | null) {
  if (!type) return "hgi-file-01";
  if (type.includes("pdf")) return "hgi-pdf-01";
  if (type.includes("image")) return "hgi-image-01";
  if (type.includes("zip")) return "hgi-zip-01";
  return "hgi-file-01";
}

export function PortalDownloadsClient({ customerId }: { customerId: string }) {
  const { data: docs = [], isLoading } = useQuery({
    queryKey: ["portal-downloads", customerId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("documents").select("*").eq("customer_id", customerId).order("created_at", { ascending: false });
      return (data ?? []) as unknown as Document[];
    },
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Downloads" subtitle="Access your files, documents and deliverables." />

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-100" />)}</div>
      ) : docs.length === 0 ? (
        <EmptyState
          title="No files yet"
          description="Files and deliverables shared with you will appear here."
          icon={<i className="hgi-stroke hgi-download-01 text-xl" />}
        />
      ) : (
        <Card>
          <div className="space-y-3">
            {docs.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 rounded-xl border border-border p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-coral-light text-xl text-coral">
                  <i className={`hgi-stroke ${getFileIcon(doc.file_type)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-small font-semibold text-text-primary">{doc.name}</p>
                  <p className="mt-0.5 text-caption text-text-muted">
                    {doc.file_type?.toUpperCase() ?? "FILE"} · {formatBytes(doc.file_size)}
                    {doc.created_at ? ` · ${format(new Date(doc.created_at), "dd MMM yyyy")}` : ""}
                  </p>
                </div>
                {doc.file_url ? (
                  <a href={doc.file_url} target="_blank" rel="noreferrer" download>
                    <Button variant="secondary">
                      <i className="hgi-stroke hgi-download-01" />Download
                    </Button>
                  </a>
                ) : (
                  <Button variant="secondary" disabled>
                    <i className="hgi-stroke hgi-time-01" />Pending
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
