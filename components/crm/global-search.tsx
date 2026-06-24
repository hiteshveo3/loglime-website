"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

type SearchResult = {
  id: string;
  type: "lead" | "customer" | "project" | "invoice" | "ticket";
  title: string;
  subtitle?: string;
  href: string;
};

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const { data: results = [] } = useQuery({
    queryKey: ["global-search", query],
    queryFn: async () => {
      if (!query.trim()) return [];
      const supabase = createClient();
      const searchTerm = `%${query}%`;

      const [{ data: leads }, { data: customers }, { data: projects }, { data: invoices }, { data: tickets }] = await Promise.all([
        supabase.from("leads").select("id, name").ilike("name", searchTerm).limit(5),
        supabase.from("customers").select("id, name").ilike("name", searchTerm).limit(5),
        supabase.from("projects").select("id, name").ilike("name", searchTerm).limit(5),
        supabase.from("invoices").select("id, invoice_number").ilike("invoice_number", searchTerm).limit(5),
        supabase.from("tickets").select("id, title").ilike("title", searchTerm).limit(5),
      ]);

      const results: SearchResult[] = [];
      (leads ?? [] as any[]).forEach((l: any) => results.push({ id: l.id, type: "lead", title: l.full_name || l.name, href: `/crm/leads/${l.id}` }));
      (customers ?? [] as any[]).forEach((c: any) => results.push({ id: c.id, type: "customer", title: c.name, href: `/crm/customers/${c.id}` }));
      (projects ?? [] as any[]).forEach((p: any) => results.push({ id: p.id, type: "project", title: p.name, href: `/crm/projects/${p.id}` }));
      (invoices ?? [] as any[]).forEach((i: any) => results.push({ id: i.id, type: "invoice", title: `Invoice ${i.invoice_number}`, href: `/crm/invoices/${i.id}` }));
      (tickets ?? [] as any[]).forEach((t: any) => results.push({ id: t.id, type: "ticket", title: t.title, href: `/crm/support/${t.id}` }));

      return results;
    },
    enabled: query.length > 0,
  });

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-small text-text-muted transition hover:border-coral hover:bg-coral-light"
      >
        <i className="hgi-stroke hgi-search-01" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="rounded bg-surface-alt px-2 py-1 font-mono text-caption">⌘K</kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-floating">
        {/* Search Input */}
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-3">
            <i className="hgi-stroke hgi-search-01 text-lg text-text-muted" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search leads, customers, projects..."
              className="w-full bg-transparent text-small outline-none"
            />
            <button onClick={() => setOpen(false)} className="text-text-muted hover:text-text-primary">
              <i className="hgi-stroke hgi-close-01" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === "" ? (
            <div className="space-y-2 p-2 text-center text-small text-text-muted">
              <p>Start typing to search...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="space-y-2 p-2 text-center text-small text-text-muted">
              <p>No results found for &quot;{query}&quot;</p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => {
                    router.push(result.href);
                    setOpen(false);
                  }}
                  className="w-full rounded-lg border border-transparent p-3 text-left transition hover:border-coral hover:bg-coral-light"
                >
                  <div className="flex items-center gap-2">
                    {result.type === "lead" && <i className="hgi-stroke hgi-user-01 text-text-muted" />}
                    {result.type === "customer" && <i className="hgi-stroke hgi-building-01 text-text-muted" />}
                    {result.type === "project" && <i className="hgi-stroke hgi-briefcase-01 text-text-muted" />}
                    {result.type === "invoice" && <i className="hgi-stroke hgi-invoice-01 text-text-muted" />}
                    {result.type === "ticket" && <i className="hgi-stroke hgi-customer-support text-text-muted" />}
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-small font-semibold text-text-primary">{result.title}</p>
                      {result.subtitle && <p className="truncate text-caption text-text-muted">{result.subtitle}</p>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-3 text-center text-caption text-text-muted">
          <p>Press <kbd className="inline-block rounded bg-surface-alt px-1.5">ESC</kbd> to close</p>
        </div>
      </div>
    </>
  );
}
