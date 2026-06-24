"use client";

import { useEffect, useMemo, useState } from "react";

import { Button, Input, Textarea, useToast } from "@/components/ui";
import { cn } from "@/lib/utils";

type BlogComment = {
  id: string;
  author_name: string;
  content: string;
  status: "approved" | "pending" | "spam" | "trash";
  parent_id?: string | null;
  created_at: string;
  like_count?: number;
};

type SortMode = "newest" | "oldest" | "liked";

export function CommentSection({ postSlug }: { postSlug: string }) {
  const { showToast } = useToast();
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [sort, setSort] = useState<SortMode>("newest");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [website, setWebsite] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void fetch(`/api/blog/comments?postSlug=${encodeURIComponent(postSlug)}`)
      .then((response) => response.json())
      .then((payload: { comments?: BlogComment[] }) => setComments(payload.comments ?? []))
      .catch(() => undefined);
  }, [postSlug]);

  const visibleComments = useMemo(() => {
    const sorted = comments.filter((comment) => comment.status === "approved" || comment.status === "pending");
    if (sort === "oldest") return [...sorted].sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at));
    if (sort === "liked") return [...sorted].sort((a, b) => (b.like_count ?? 0) - (a.like_count ?? 0));
    return [...sorted].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
  }, [comments, sort]);

  async function submitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authorName.trim() || !authorEmail.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/blog/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postSlug,
          authorName,
          authorEmail,
          content,
          website,
          startedAt,
          timeOnPageSeconds: Math.floor((Date.now() - startedAt) / 1000),
        }),
      });
      const payload = (await response.json()) as { comment?: BlogComment; error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Comment could not be submitted.");
      if (payload.comment) setComments((current) => [payload.comment as BlogComment, ...current]);
      setContent("");
      showToast({ title: "Comment received", description: "It will appear after moderation if needed.", tone: "success" });
    } catch (error) {
      showToast({ title: "Could not submit comment", description: error instanceof Error ? error.message : "Please try again later.", tone: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function likeComment(id: string) {
    setComments((current) => current.map((comment) => (comment.id === id ? { ...comment, like_count: (comment.like_count ?? 0) + 1 } : comment)));
    await fetch("/api/blog/comment-like", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ commentId: id }) }).catch(() => undefined);
  }

  async function reportComment(id: string) {
    await fetch("/api/blog/comment-report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ commentId: id, reason: "spam" }) }).catch(() => undefined);
    showToast({ title: "Report sent", description: "Thanks. The moderation queue will review it.", tone: "info" });
  }

  return (
    <section id="comments" className="mx-auto max-w-[720px] py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-caption uppercase tracking-wider text-coral">Discussion</p>
          <h2 className="text-h2 text-text-primary">Comments</h2>
        </div>
        <div className="flex rounded-full bg-slate-100 p-1">
          {(["newest", "oldest", "liked"] as SortMode[]).map((mode) => (
            <button key={mode} className={cn("rounded-full px-3 py-1.5 text-small font-semibold capitalize", sort === mode ? "bg-white text-coral shadow-card" : "text-text-secondary")} onClick={() => setSort(mode)}>
              {mode}
            </button>
          ))}
        </div>
      </div>

      <form className="mt-6 rounded-2xl bg-white p-5 shadow-card" onSubmit={submitComment}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" value={authorName} onChange={(event) => setAuthorName(event.target.value)} required />
          <Input label="Email" type="email" value={authorEmail} onChange={(event) => setAuthorEmail(event.target.value)} required />
        </div>
        <input className="hidden" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} aria-hidden="true" />
        <Textarea className="mt-4" label="Comment" value={content} onChange={(event) => setContent(event.target.value)} required minLength={20} placeholder="Share a practical question or experience..." />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-text-muted">First-time comments may wait for moderation.</p>
          <Button type="submit" isLoading={loading}>Post comment</Button>
        </div>
      </form>

      <div className="mt-6 space-y-3">
        {visibleComments.length ? (
          visibleComments.map((comment) => (
            <article key={comment.id} className={cn("rounded-2xl bg-white p-4 shadow-card", comment.parent_id && "ml-6 border-l-4 border-coral")}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-text-primary">{comment.author_name}</p>
                  <p className="text-caption uppercase tracking-wider text-text-muted">{new Date(comment.created_at).toLocaleDateString()}</p>
                </div>
                {comment.status === "pending" ? <span className="rounded-full bg-coral-light px-2.5 py-1 text-caption uppercase tracking-wider text-coral">Awaiting approval</span> : null}
              </div>
              <p className="mt-3 whitespace-pre-line text-body text-text-secondary">{comment.content}</p>
              <div className="mt-3 flex gap-2">
                <button className="rounded-full bg-slate-100 px-3 py-1.5 text-small font-semibold text-text-secondary hover:text-coral" onClick={() => likeComment(comment.id)}>
                  Like {comment.like_count ? `(${comment.like_count})` : ""}
                </button>
                <button className="rounded-full bg-slate-100 px-3 py-1.5 text-small font-semibold text-text-secondary hover:text-coral" onClick={() => reportComment(comment.id)}>
                  Report
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-2xl bg-white p-6 text-center shadow-card">
            <p className="text-body font-semibold text-text-primary">No comments yet.</p>
            <p className="mt-1 text-small text-text-secondary">Ask a question or add what worked in your restaurant.</p>
          </div>
        )}
      </div>
    </section>
  );
}
