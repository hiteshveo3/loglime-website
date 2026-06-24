"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SetupAlert } from "@/components/crm/setup-alert";
import { Badge, Button, Card, Drawer, EmptyState, Input, PageHeader, Select, Stat, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Textarea, useToast } from "@/components/ui";
import type { Database } from "@/types/database";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

const leadStatuses = ["all", "new", "contacted", "qualified", "proposal_sent", "negotiation", "payment_pending", "won", "lost"];

const leadSchema = z.object({
  fullName: z.string().min(2, "Enter a full name."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().optional(),
  company: z.string().optional(),
  restaurantName: z.string().min(2, "Enter the restaurant name."),
  country: z.string().min(2, "Enter a country."),
  source: z.string().min(1, "Choose a source."),
  product: z.string().min(1, "Choose a product."),
  budget: z.string().optional(),
  notes: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

function formatStatus(status: string | null) {
  return (status ?? "new")
    .split("_")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

function getStatusTone(status: string | null) {
  if (status === "won") return "success";
  if (status === "lost") return "error";
  if (status === "payment_pending" || status === "negotiation") return "warning";
  if (status === "qualified" || status === "proposal_sent") return "info";
  return "neutral";
}

async function fetchLeads() {
  const response = await fetch("/api/crm/leads", { cache: "no-store" });
  const payload = (await response.json()) as { leads?: Lead[]; error?: string };
  if (!response.ok) throw new Error(payload.error ?? "Could not load leads.");
  return payload.leads ?? [];
}

async function createLead(values: LeadFormValues) {
  const response = await fetch("/api/crm/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const payload = (await response.json()) as { error?: string };
  if (!response.ok) throw new Error(payload.error ?? "Could not create lead.");
}

export function LeadsClient() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const leadsQuery = useQuery({
    queryKey: ["crm-leads"],
    queryFn: fetchLeads,
    retry: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      restaurantName: "",
      country: "",
      source: "website",
      product: "Ordering App + Admin Panel",
      notes: "",
    },
  });

  const createLeadMutation = useMutation({
    mutationFn: createLead,
    onSuccess: async () => {
      reset();
      setDrawerOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["crm-leads"] });
      showToast({ title: "Lead created", description: "The lead has been added to the pipeline.", tone: "success" });
    },
    onError: (error) => {
      showToast({
        title: "Could not create lead",
        description: error instanceof Error ? error.message : "Please check Supabase setup and try again.",
        tone: "error",
      });
    },
  });

  const leads = useMemo(() => leadsQuery.data ?? [], [leadsQuery.data]);
  const filteredLeads = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesSearch =
        !normalizedSearch ||
        [lead.full_name, lead.email, lead.company, lead.restaurant_name, lead.country].some((value) => value?.toLowerCase().includes(normalizedSearch));
      return matchesStatus && matchesSearch;
    });
  }, [leads, search, statusFilter]);

  const stats = [
    { label: "All Leads", value: String(leads.length) },
    { label: "New", value: String(leads.filter((lead) => (lead.status ?? "new") === "new").length) },
    { label: "Qualified", value: String(leads.filter((lead) => lead.status === "qualified").length) },
    { label: "Won", value: String(leads.filter((lead) => lead.status === "won").length) },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Leads"
        subtitle="Track website, demo, referral, social, and outbound opportunities."
        actions={
          <Button onClick={() => setDrawerOpen(true)}>
            <i className="hgi-stroke hgi-add-01" />
            Add Lead
          </Button>
        }
      />
      {leadsQuery.isError ? <SetupAlert message="Run supabase/schema.sql and sign in with a CRM user to read leads. Anonymous visitors can still create leads through public forms once RLS is applied." /> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Stat key={stat.label} label={stat.label} value={leadsQuery.isLoading ? "..." : stat.value} />
        ))}
      </div>
      <Card>
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <Input className="h-12 text-[15px]" leftIcon={<i className="hgi-stroke hgi-search-01 text-lg" />} aria-label="Search leads" placeholder="Search leads by name, email, company, restaurant, or country" value={search} onChange={(event) => setSearch(event.target.value)} />
          <div className="flex flex-wrap gap-2">
            {leadStatuses.map((status) => (
              <button
                key={status}
                className={statusFilter === status ? "rounded-full bg-coral px-4 py-2 text-small font-semibold text-white" : "rounded-full bg-slate-100 px-4 py-2 text-small font-semibold text-text-secondary"}
                onClick={() => setStatusFilter(status)}
              >
                {formatStatus(status)}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5">
          {filteredLeads.length ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Restaurant</TableHeaderCell>
                  <TableHeaderCell>Country</TableHeaderCell>
                  <TableHeaderCell>Source</TableHeaderCell>
                  <TableHeaderCell>Product</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Created</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLeads.map((lead: Lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <a className="font-semibold text-text-primary hover:text-coral" href={`/crm/leads/${lead.id}`}>
                        {lead.full_name}
                      </a>
                      <p className="mt-1 text-small text-text-secondary">{lead.email}</p>
                    </TableCell>
                    <TableCell>{lead.restaurant_name ?? lead.company ?? "-"}</TableCell>
                    <TableCell>{lead.country ?? "-"}</TableCell>
                    <TableCell>{formatStatus(lead.source)}</TableCell>
                    <TableCell>{lead.interested_products?.[0] ?? "-"}</TableCell>
                    <TableCell>
                      <Badge tone={getStatusTone(lead.status)}>{formatStatus(lead.status)}</Badge>
                    </TableCell>
                    <TableCell>{lead.created_at ? formatDistanceToNow(new Date(lead.created_at), { addSuffix: true }) : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              title={leadsQuery.isLoading ? "Loading leads" : "No leads found"}
              description={leadsQuery.isLoading ? "Pulling the latest lead list from Supabase." : "Create a lead or adjust filters to see pipeline records here."}
              action={<Button onClick={() => setDrawerOpen(true)}>Add Lead</Button>}
              icon={<i className="hgi-stroke hgi-user-search-01 text-xl" />}
            />
          )}
        </div>
      </Card>
      <Drawer open={drawerOpen} title="Add Lead" onClose={() => setDrawerOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit((values) => createLeadMutation.mutate(values))}>
          <Input label="Full Name" error={errors.fullName?.message} {...register("fullName")} />
          <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
          <Input label="Phone" error={errors.phone?.message} {...register("phone")} />
          <Input label="Company" error={errors.company?.message} {...register("company")} />
          <Input label="Restaurant Name" error={errors.restaurantName?.message} {...register("restaurantName")} />
          <Input label="Country" error={errors.country?.message} {...register("country")} />
          <Select
            label="Lead Source"
            error={errors.source?.message}
            options={[
              { label: "Website", value: "website" },
              { label: "Demo", value: "demo" },
              { label: "Referral", value: "referral" },
              { label: "Social", value: "social" },
              { label: "Cold Outreach", value: "cold_outreach" },
              { label: "Other", value: "other" },
            ]}
            {...register("source")}
          />
          <Select
            label="Interested Product"
            error={errors.product?.message}
            options={[
              { label: "Ordering App + Admin Panel", value: "Ordering App + Admin Panel" },
              { label: "Digital Menu", value: "Digital Menu" },
              { label: "Table Booking", value: "Table Booking" },
              { label: "Loyalty & Offers", value: "Loyalty & Offers" },
            ]}
            {...register("product")}
          />
          <Input label="Budget" type="number" min="0" error={errors.budget?.message} {...register("budget")} />
          <Textarea label="Internal Notes" error={errors.notes?.message} {...register("notes")} />
          <Button className="w-full" type="submit" isLoading={createLeadMutation.isPending}>
            Create Lead
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
