"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Badge, Button, Card, EmptyState, PageHeader, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type CommentRow = {
  id: string;
  post_slug: string | null;
  author_name: string;
  author_email: string;
  content: string;
  status: string | null;
  spam_score: number | null;
  spam_reasons: string[] | null;
  created_at: string | null;
};

export function BlogModerationClient() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const query = useQuery({
    queryKey: ["crm-blog-comments"],
    retry: false,
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("blog_comments").select("id, post_slug, author_name, author_email, content, status, spam_score, spam_reasons, created_at").order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      return (data ?? []) as CommentRow[];
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const supabase = createClient();
      const { error } = await supabase.from("blog_comments").update({ status, updated_at: new Date().toISOString() } as never).eq("id", id);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["crm-blog-comments"] });
      showToast({ title: "Comment updated", tone: "success" });
    },
    onError: (error) => showToast({ title: "Could not update comment", description: error instanceof Error ? error.message : "Check policies.", tone: "error" }),
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Comment Moderation" subtitle="Approve, hold, or remove blog comments with spam-score context." />
      {query.data?.length ? (
        <div className="grid gap-4">
          {query.data.map((comment) => (
            <Card key={comment.id}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={comment.status === "approved" ? "success" : comment.status === "spam" ? "error" : "warning"}>{comment.status ?? "pending"}</Badge>
                    <span className="text-small font-semibold text-text-muted">{comment.post_slug ?? "unknown post"}</span>
                    <span className="text-small text-text-muted">Spam {Number(comment.spam_score ?? 0).toFixed(2)}</span>
                  </div>
                  <h2 className="mt-3 text-h3 text-text-primary">{comment.author_name}</h2>
                  <p className="text-small text-text-muted">{comment.author_email}</p>
                  <p className="mt-3 whitespace-pre-line text-body text-text-secondary">{comment.content}</p>
                  {comment.spam_reasons?.length ? <p className="mt-3 text-small text-status-warning">Reasons: {comment.spam_reasons.join(", ")}</p> : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary" onClick={() => mutation.mutate({ id: comment.id, status: "approved" })}>Approve</Button>
                  <Button size="sm" variant="secondary" onClick={() => mutation.mutate({ id: comment.id, status: "pending" })}>Hold</Button>
                  <Button size="sm" variant="danger" onClick={() => mutation.mutate({ id: comment.id, status: "spam" })}>Spam</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title={query.isLoading ? "Loading comments" : "No comments yet"} description="New public comments will appear here for approval and spam review." icon={<i className="hgi-stroke hgi-comment-01 text-xl" />} />
      )}
    </div>
  );
}
