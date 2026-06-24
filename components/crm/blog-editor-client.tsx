"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Button, Card, Input, PageHeader, Select, Textarea, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 6)
    .join("-");
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export function BlogEditorClient() {
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [mode, setMode] = useState<"write" | "preview">("write");
  const words = useMemo(() => wordCount(content), [content]);
  const readingTime = Math.max(1, Math.ceil(words / 200));
  const draftKey = "loglime-blog-editor-draft";

  useEffect(() => {
    const stored = localStorage.getItem(draftKey);
    if (!stored) return;
    try {
      const draft = JSON.parse(stored) as { title?: string; slug?: string; excerpt?: string; content?: string; status?: string };
      setTitle(draft.title ?? "");
      setSlug(draft.slug ?? "");
      setExcerpt(draft.excerpt ?? "");
      setContent(draft.content ?? "");
      setStatus(draft.status ?? "draft");
    } catch {
      localStorage.removeItem(draftKey);
    }
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      localStorage.setItem(draftKey, JSON.stringify({ title, slug, excerpt, content, status }));
    }, 30_000);
    return () => window.clearInterval(id);
  }, [content, excerpt, slug, status, title]);

  const mutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const generatedSlug = slug || slugify(title);
      const payload = {
        title,
        slug: generatedSlug,
        excerpt,
        content,
        status,
        word_count: words,
        reading_time_minutes: readingTime,
        published_at: status === "published" ? new Date().toISOString() : null,
      };
      const { error } = await supabase.from("blog_posts").insert(payload as never);
      if (error) throw error;
    },
    onSuccess: () => {
      localStorage.removeItem(draftKey);
      showToast({ title: "Post saved", description: "Blog post is now in Supabase.", tone: "success" });
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContent("");
      setStatus("draft");
    },
    onError: (error) => {
      showToast({ title: "Could not save post", description: error instanceof Error ? error.message : "Check blog schema and policies.", tone: "error" });
    },
  });

  const zestPrompts = ["/outline direct ordering", "/faq loyalty program", "/seo-title QR menu", "/meta-desc online ordering"];

  return (
    <div className="space-y-5">
      <PageHeader
        title="New Blog Post"
        subtitle="Markdown-first editor with autosave, SEO preview, word count, and Zest prompt starters."
        actions={
          <Button onClick={() => mutation.mutate()} isLoading={mutation.isPending}>
            Save post
          </Button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card>
          <div className="grid gap-4">
            <Input label="Title" value={title} onChange={(event) => {
              setTitle(event.target.value);
              if (!slug) setSlug(slugify(event.target.value));
            }} required />
            <Input label="Slug" value={slug} onChange={(event) => setSlug(slugify(event.target.value))} helperText="Max 6 words, keyword-rich, no date." />
            <Textarea label="Meta excerpt" value={excerpt} onChange={(event) => setExcerpt(event.target.value.slice(0, 160))} helperText={`${excerpt.length}/160 characters`} />
            <div className="flex rounded-full bg-slate-100 p-1">
              {(["write", "preview"] as const).map((item) => (
                <button key={item} className={item === mode ? "flex-1 rounded-full bg-white px-4 py-2 text-small font-semibold text-coral shadow-card" : "flex-1 px-4 py-2 text-small font-semibold text-text-secondary"} onClick={() => setMode(item)}>
                  {item}
                </button>
              ))}
            </div>
            {mode === "write" ? (
              <Textarea label="Markdown content" value={content} onChange={(event) => setContent(event.target.value)} rows={18} required placeholder={"Start with the direct answer.\n\n## What question does this section answer?\nAnswer first, then explain."} />
            ) : (
              <div className="min-h-[420px] rounded-2xl bg-surface-alt p-5">
                <h2 className="text-h2 text-text-primary">{title || "Preview title"}</h2>
                <p className="mt-3 text-body text-text-secondary">{excerpt || "Meta description preview appears here."}</p>
                <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-white p-4 text-small text-text-secondary shadow-card">{content || "Markdown preview appears here."}</pre>
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-5">
          <Card>
            <h2 className="text-h3 text-text-primary">Publishing</h2>
            <div className="mt-4 grid gap-4">
              <Select
                label="Status"
                name="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                options={[
                  { label: "Draft", value: "draft" },
                  { label: "Published", value: "published" },
                  { label: "Scheduled", value: "scheduled" },
                  { label: "Archived", value: "archived" },
                ]}
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-surface-alt p-4">
                  <p className="text-caption uppercase tracking-wider text-text-muted">Words</p>
                  <p className="mt-1 text-h3 text-text-primary">{words}</p>
                </div>
                <div className="rounded-2xl bg-surface-alt p-4">
                  <p className="text-caption uppercase tracking-wider text-text-muted">Read time</p>
                  <p className="mt-1 text-h3 text-text-primary">{readingTime}m</p>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <h2 className="text-h3 text-text-primary">Google preview</h2>
            <div className="mt-4 rounded-2xl bg-surface-alt p-4">
              <p className="text-small text-blue-700">{title || "SEO title preview"}</p>
              <p className="mt-1 text-caption text-green-700">loglime.com/blog/category/{slug || "post-slug"}</p>
              <p className="mt-2 text-small text-text-secondary">{excerpt || "Meta description preview."}</p>
            </div>
          </Card>
          <Card>
            <h2 className="text-h3 text-text-primary">Zest starters</h2>
            <div className="mt-4 grid gap-2">
              {zestPrompts.map((prompt) => (
                <button key={prompt} className="rounded-xl bg-slate-100 px-3 py-2 text-left text-small font-semibold text-text-secondary hover:bg-coral-light hover:text-coral" onClick={() => setContent((current) => `${current}${current ? "\n\n" : ""}${prompt}`)}>
                  {prompt}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
