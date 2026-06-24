"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

import { Button, Card, EmptyState, Input, PageHeader, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type Document = {
  id: string; name: string; file_path: string | null; file_size: number | null;
  file_type: string | null; uploaded_by: string | null; created_at: string | null;
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
  if (type.includes("video")) return "hgi-video-01";
  if (type.includes("zip")) return "hgi-zip-01";
  return "hgi-file-01";
}

export function DocumentsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ["crm-documents"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
      return (data ?? []) as Document[];
    },
  });

  const deleteDocMutation = useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient();
      const { error } = await supabase.from("documents").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["crm-documents"] });
      showToast({ title: "Document deleted", tone: "success" });
    },
  });

  const filtered = documents.filter(d => d.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Documents"
        subtitle="Store and manage team files and deliverables."
        actions={
          <Button onClick={() => showToast({ title: "Upload feature coming soon", tone: "info" })}>
            <i className="hgi-stroke hgi-upload-cloud-01" />Upload File
          </Button>
        }
      />

      <Input leftIcon={<i className="hgi-stroke hgi-search-01 text-lg" />} placeholder="Search documents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-100" />)}</div>
      ) : documents.length === 0 ? (
        <EmptyState
          title="No documents yet"
          description="Upload files and documents for your team here."
          icon={<i className="hgi-stroke hgi-file-01 text-xl" />}
        />
      ) : filtered.length === 0 ? (
        <Card><p className="text-small text-text-muted">No documents match your search.</p></Card>
      ) : (
        <Card>
          <div className="space-y-3">
            {filtered.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 rounded-xl border border-border p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-coral-light text-xl text-coral">
                  <i className={`hgi-stroke ${getFileIcon(doc.file_type)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-small font-semibold text-text-primary">{doc.name}</p>
                  <p className="mt-0.5 text-caption text-text-muted">
                    {doc.file_type?.toUpperCase() ?? "FILE"} · {formatBytes(doc.file_size)}
                    {doc.created_at ? ` · ${formatDistanceToNow(new Date(doc.created_at), { addSuffix: true })}` : ""}
                  </p>
                </div>
                {doc.file_path && (
                  <a href={doc.file_path} target="_blank" rel="noreferrer" download>
                    <Button variant="secondary">
                      <i className="hgi-stroke hgi-download-01" />Download
                    </Button>
                  </a>
                )}
                <Button variant="secondary" onClick={() => deleteDocMutation.mutate(doc.id)} isLoading={deleteDocMutation.isPending}>
                  <i className="hgi-stroke hgi-trash-01" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
