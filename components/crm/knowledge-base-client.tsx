"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Button, Card, Drawer, Input, PageHeader, Select, Textarea, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type Article = {
  id: string; title: string; slug: string | null; content: string | null;
  category: string | null; status: string | null; views: number | null;
  created_at: string | null;
};

export function KnowledgeBaseClient() {
  const [newArticleOpen, setNewArticleOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [status, setStatus] = useState("draft");
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["kb-articles"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("kb_articles").select("*").order("created_at", { ascending: false });
      return (data ?? []) as unknown as Article[];
    },
  });

  const createArticleMutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const slug = title.toLowerCase().replace(/\s+/g, "-");
      const { error } = await supabase.from("kb_articles").insert({ title, content, category, status, slug });
      if (error) throw error;
    },
    onSuccess: async () => {
      setNewArticleOpen(false); setTitle(""); setContent(""); setCategory("general"); setStatus("draft");
      await queryClient.invalidateQueries({ queryKey: ["kb-articles"] });
      showToast({ title: "Article created", tone: "success" });
    },
    onError: () => showToast({ title: "Could not create article", tone: "error" }),
  });

  const deleteArticleMutation = useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient();
      const { error } = await supabase.from("kb_articles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["kb-articles"] });
      showToast({ title: "Article deleted", tone: "success" });
    },
  });

  const filtered = articles.filter(a => a.title?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Knowledge Base"
        subtitle="Create and manage help articles for your customers."
        actions={
          <Button onClick={() => setNewArticleOpen(true)}>
            <i className="hgi-stroke hgi-add-01" />New Article
          </Button>
        }
      />

      <Input leftIcon={<i className="hgi-stroke hgi-search-01 text-lg" />} placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-100" />)}</div>
      ) : filtered.length === 0 ? (
        <Card><p className="text-small text-text-muted">No articles found.</p></Card>
      ) : (
        <Card>
          <div className="space-y-3">
            {filtered.map((article) => (
              <div key={article.id} className="flex items-center justify-between rounded-xl border border-border p-4">
                <div className="flex-1">
                  <p className="text-small font-semibold text-text-primary">{article.title}</p>
                  <p className="mt-1 line-clamp-1 text-caption text-text-muted">{article.content}</p>
                  <div className="mt-2 flex gap-2">
                    {article.category && <span className="text-caption text-text-muted">{article.category}</span>}
                    <span className="text-caption text-text-muted">•</span>
                    <span className="text-caption text-text-muted">{article.views ?? 0} views</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select className="rounded-lg border border-border bg-white px-3 py-2 text-small">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                  <Button variant="secondary" onClick={() => deleteArticleMutation.mutate(article.id)}>
                    <i className="hgi-stroke hgi-trash-01" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Drawer open={newArticleOpen} title="New Article" onClose={() => setNewArticleOpen(false)}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); createArticleMutation.mutate(); }}>
          <Input label="Title" placeholder="How to use Loglime..." value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Select
            label="Category"
            value={category}
            options={[
              { label: "General", value: "general" },
              { label: "Getting Started", value: "getting-started" },
              { label: "Features", value: "features" },
              { label: "Billing", value: "billing" },
              { label: "Troubleshooting", value: "troubleshooting" },
            ]}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Textarea label="Content" placeholder="Write your article here..." value={content} onChange={(e) => setContent(e.target.value)} required rows={8} />
          <Select
            label="Status"
            value={status}
            options={[
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
              { label: "Archived", value: "archived" },
            ]}
            onChange={(e) => setStatus(e.target.value)}
          />
          <Button className="w-full" type="submit" isLoading={createArticleMutation.isPending}>Create Article</Button>
        </form>
      </Drawer>
    </div>
  );
}
