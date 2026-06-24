-- Focused recovery for tables skipped when the original schema stopped midway.
-- Safe to run more than once. Existing tables and records are preserved.

create extension if not exists pgcrypto;

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity integer default 1,
  unit_price numeric,
  total numeric
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id),
  order_id uuid references public.orders(id),
  name text not null,
  description text,
  status text default 'planning',
  start_date date,
  end_date date,
  progress integer default 0 check (progress between 0 and 100),
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.project_members (
  project_id uuid references public.projects(id) on delete cascade,
  user_id uuid references public.profiles(id),
  role text,
  primary key (project_id, user_id)
);

create table if not exists public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  title text,
  due_date date,
  completed boolean default false,
  completed_at timestamptz,
  sort_order integer
);

create table if not exists public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  content text,
  visible_to_customer boolean default true,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  priority text default 'medium',
  status text default 'todo',
  due_date timestamptz,
  assigned_to uuid references public.profiles(id),
  related_type text,
  related_id uuid,
  project_id uuid references public.projects(id),
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.task_comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references public.tasks(id) on delete cascade,
  content text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id),
  title text not null,
  category text,
  priority text default 'medium',
  status text default 'open',
  assigned_to uuid references public.profiles(id),
  resolution_notes text,
  ai_created boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references public.tickets(id) on delete cascade,
  sender_id uuid references public.profiles(id),
  content text,
  is_internal_note boolean default false,
  attachments jsonb,
  created_at timestamptz default now()
);

create table if not exists public.threads (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id),
  subject text,
  status text default 'active',
  last_message_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references public.threads(id) on delete cascade,
  sender_id uuid references public.profiles(id),
  content text,
  attachments jsonb,
  read_by uuid[],
  created_at timestamptz default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text unique,
  customer_id uuid references public.customers(id),
  order_id uuid references public.orders(id),
  line_items jsonb,
  subtotal numeric,
  discount numeric default 0,
  tax numeric default 0,
  total numeric,
  currency text default 'USD',
  status text default 'draft',
  due_date date,
  paid_at timestamptz,
  stripe_invoice_id text,
  stripe_payment_link text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  type text,
  title text,
  body text,
  link text,
  read boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.kb_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  category text,
  content text,
  status text default 'draft',
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text,
  start_time timestamptz,
  end_time timestamptz,
  all_day boolean default false,
  related_type text,
  related_id uuid,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  file_url text,
  file_type text,
  file_size bigint,
  related_type text,
  related_id uuid,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  status text default 'draft',
  published_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table if not exists public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  visitor_email text,
  mode text,
  messages jsonb default '[]'::jsonb,
  lead_created boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'order_items','projects','project_members','project_milestones','project_updates',
    'tasks','task_comments','tickets','ticket_messages','threads','messages','invoices',
    'notifications','kb_articles','calendar_events','documents','announcements','ai_conversations'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

drop policy if exists "anonymous visitors can create leads" on public.leads;
create policy "anonymous visitors can create leads" on public.leads for insert to anon with check (true);
drop policy if exists "authenticated users can read leads" on public.leads;
create policy "authenticated users can read leads" on public.leads for select to authenticated using (true);
drop policy if exists "authenticated users can create leads" on public.leads;
create policy "authenticated users can create leads" on public.leads for insert to authenticated with check (true);
drop policy if exists "authenticated users can update leads" on public.leads;
create policy "authenticated users can update leads" on public.leads for update to authenticated using (true) with check (true);

do $$
declare table_name text;
begin
  foreach table_name in array array['projects','tasks','tickets','invoices','threads','messages','notifications','kb_articles','calendar_events','documents']
  loop
    execute format('drop policy if exists "authenticated users can manage %s" on public.%I', table_name, table_name);
    execute format('create policy "authenticated users can manage %s" on public.%I for all to authenticated using (true) with check (true)', table_name, table_name);
  end loop;
end $$;

drop policy if exists "anonymous visitors can create ai conversations" on public.ai_conversations;
create policy "anonymous visitors can create ai conversations" on public.ai_conversations for insert to anon with check (true);
drop policy if exists "anonymous visitors can update ai conversations" on public.ai_conversations;
create policy "anonymous visitors can update ai conversations" on public.ai_conversations for update to anon using (true) with check (true);
drop policy if exists "authenticated users can manage ai conversations" on public.ai_conversations;
create policy "authenticated users can manage ai conversations" on public.ai_conversations for all to authenticated using (true) with check (true);

notify pgrst, 'reload schema';
