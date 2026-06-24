"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useMemo, useState } from "react";

import { SetupAlert } from "@/components/crm/setup-alert";
import { Badge, Button, Card, Drawer, EmptyState, Input, PageHeader, Select, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Textarea, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type TableName = "customers" | "products" | "orders" | "projects" | "tasks" | "tickets" | "invoices" | "blog_posts" | "blog_categories" | "blog_tags" | "blog_authors" | "spam_rules";

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "number" | "date" | "textarea" | "select";
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
};

type EntityListClientProps = {
  title: string;
  subtitle: string;
  table: TableName;
  primaryAction: string;
  columns: Array<{ key: string; label: string }>;
  fields: FieldConfig[];
  defaults?: Record<string, string | number | boolean | null>;
};

function formatCell(value: unknown, key: string) {
  if (value === null || value === undefined || value === "") return "-";
  if (key.includes("created_at") && typeof value === "string") {
    return formatDistanceToNow(new Date(value), { addSuffix: true });
  }
  if (key.includes("status") && typeof value === "string") {
    return value
      .split("_")
      .map((part) => part[0]?.toUpperCase() + part.slice(1))
      .join(" ");
  }
  if (typeof value === "number") return value.toLocaleString();
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function EntityListClient({ title, subtitle, table, primaryAction, columns, fields, defaults = {} }: EntityListClientProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [formState, setFormState] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const query = useQuery({
    queryKey: ["crm-entity", table],
    retry: false,
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      return (data ?? []) as Array<Record<string, unknown>>;
    },
  });

  const rows = useMemo(() => query.data ?? [], [query.data]);
  const filteredRows = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(needle));
  }, [rows, search]);

  const mutation = useMutation({
    mutationFn: async () => {
      const payload: Record<string, unknown> = { ...defaults };
      fields.forEach((field) => {
        const value = formState[field.name];
        if (value === undefined || value === "") return;
        payload[field.name] = field.type === "number" ? Number(value) : value;
      });
      const supabase = createClient();
      const { error } = await supabase.from(table).insert(payload as never);
      if (error) throw error;
    },
    onSuccess: async () => {
      setDrawerOpen(false);
      setFormState({});
      await queryClient.invalidateQueries({ queryKey: ["crm-entity", table] });
      showToast({ title: `${title} updated`, description: "Record created successfully.", tone: "success" });
    },
    onError: (error) => {
      showToast({ title: "Could not create record", description: error instanceof Error ? error.message : "Check Supabase policies and required fields.", tone: "error" });
    },
  });

  function updateField(name: string, value: string) {
    setFormState((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <Button onClick={() => setDrawerOpen(true)}>
            <i className="hgi-stroke hgi-add-01" />
            {primaryAction}
          </Button>
        }
      />
      {query.isError ? <SetupAlert message={`Could not read ${table}. Re-run supabase/schema.sql after the latest policies or sign in with a CRM role.`} /> : null}
      <Card>
        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <Input leftIcon={<i className="hgi-stroke hgi-search-01 text-lg" />} aria-label={`Search ${title}`} placeholder={`Search ${title.toLowerCase()}`} value={search} onChange={(event) => setSearch(event.target.value)} />
          <Badge tone="info">{query.isLoading ? "Loading" : `${filteredRows.length} records`}</Badge>
        </div>
        {filteredRows.length ? (
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableHeaderCell key={column.key}>{column.label}</TableHeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={String(row.id)}>
                  {columns.map((column) => (
                    <TableCell key={`${row.id}-${column.key}`}>{formatCell(row[column.key], column.key)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState title={query.isLoading ? `Loading ${title}` : `No ${title.toLowerCase()} yet`} description="Create a record to start using this CRM module with live Supabase data." action={<Button onClick={() => setDrawerOpen(true)}>{primaryAction}</Button>} icon={<i className="hgi-stroke hgi-database-01 text-xl" />} />
        )}
      </Card>
      <Drawer open={drawerOpen} title={primaryAction} onClose={() => setDrawerOpen(false)}>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            mutation.mutate();
          }}
        >
          {fields.map((field) => {
            const value = formState[field.name] ?? "";
            if (field.type === "textarea") {
              return <Textarea key={field.name} label={field.label} required={field.required} value={value} onChange={(event) => updateField(field.name, event.target.value)} />;
            }
            if (field.type === "select") {
              return <Select key={field.name} label={field.label} required={field.required} name={field.name} value={value || field.options?.[0]?.value} options={field.options ?? []} onChange={(event) => updateField(field.name, event.target.value)} />;
            }
            return <Input key={field.name} label={field.label} required={field.required} type={field.type ?? "text"} value={value} onChange={(event) => updateField(field.name, event.target.value)} />;
          })}
          <Button className="w-full" type="submit" isLoading={mutation.isPending}>
            Save
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
