create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id),
  full_name text,
  avatar_url text,
  role text check (role in ('owner','admin','sales','support','developer','designer','customer')),
  restaurant_name text,
  restaurant_logo text,
  phone text,
  timezone text default 'UTC',
  email_notifications boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  company text,
  restaurant_name text,
  country text,
  website text,
  source text,
  interested_products text[],
  budget numeric,
  budget_currency text default 'USD',
  expected_launch date,
  status text default 'new',
  assigned_to uuid references profiles(id),
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  type text,
  content text,
  metadata jsonb,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  lead_id uuid references leads(id),
  business_name text not null,
  contact_name text,
  email text,
  phone text,
  country text,
  website text,
  stripe_customer_id text,
  status text default 'active',
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text,
  price numeric,
  currency text default 'USD',
  setup_fee numeric default 0,
  is_recurring boolean default true,
  billing_cycle text default 'monthly',
  delivery_days integer,
  status text default 'active',
  metadata jsonb,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  status text default 'pending',
  payment_status text default 'unpaid',
  subtotal numeric,
  discount numeric default 0,
  tax numeric default 0,
  total numeric,
  currency text default 'USD',
  assigned_to uuid references profiles(id),
  delivery_date date,
  notes text,
  stripe_payment_intent_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity integer default 1,
  unit_price numeric,
  total numeric
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  order_id uuid references orders(id),
  name text not null,
  description text,
  status text default 'planning',
  start_date date,
  end_date date,
  progress integer default 0,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists project_members (
  project_id uuid references projects(id) on delete cascade,
  user_id uuid references profiles(id),
  role text,
  primary key (project_id, user_id)
);

create table if not exists project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  title text,
  due_date date,
  completed boolean default false,
  completed_at timestamptz,
  sort_order integer
);

create table if not exists project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  content text,
  visible_to_customer boolean default true,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  priority text default 'medium',
  status text default 'todo',
  due_date timestamptz,
  assigned_to uuid references profiles(id),
  related_type text,
  related_id uuid,
  project_id uuid references projects(id),
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists task_comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references tasks(id) on delete cascade,
  content text,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  title text not null,
  category text,
  priority text default 'medium',
  status text default 'open',
  assigned_to uuid references profiles(id),
  resolution_notes text,
  ai_created boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references tickets(id) on delete cascade,
  sender_id uuid references profiles(id),
  content text,
  is_internal_note boolean default false,
  attachments jsonb,
  created_at timestamptz default now()
);

create table if not exists threads (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  subject text,
  status text default 'active',
  last_message_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references threads(id) on delete cascade,
  sender_id uuid references profiles(id),
  content text,
  attachments jsonb,
  read_by uuid[],
  created_at timestamptz default now()
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text unique,
  customer_id uuid references customers(id),
  order_id uuid references orders(id),
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
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  type text,
  title text,
  body text,
  link text,
  read boolean default false,
  created_at timestamptz default now()
);

create table if not exists kb_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  category text,
  content text,
  status text default 'draft',
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text,
  start_time timestamptz,
  end_time timestamptz,
  all_day boolean default false,
  related_type text,
  related_id uuid,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  file_path text,
  file_type text,
  file_size integer,
  folder text,
  related_type text,
  related_id uuid,
  customer_id uuid references customers(id),
  uploaded_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  status text default 'draft',
  published_at timestamptz,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  visitor_email text,
  mode text,
  messages jsonb default '[]',
  lead_created boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles enable row level security;
alter table leads enable row level security;
alter table lead_activities enable row level security;
alter table customers enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table projects enable row level security;
alter table project_members enable row level security;
alter table project_milestones enable row level security;
alter table project_updates enable row level security;
alter table tasks enable row level security;
alter table task_comments enable row level security;
alter table tickets enable row level security;
alter table ticket_messages enable row level security;
alter table threads enable row level security;
alter table messages enable row level security;
alter table invoices enable row level security;
alter table notifications enable row level security;
alter table kb_articles enable row level security;
alter table calendar_events enable row level security;
alter table documents enable row level security;
alter table announcements enable row level security;
alter table ai_conversations enable row level security;

create policy "authenticated users can read crm seed tables" on leads for select to authenticated using (true);
create policy "anonymous visitors can create leads" on leads for insert to anon with check (true);
create policy "authenticated users can create leads" on leads for insert to authenticated with check (true);
create policy "authenticated users can update leads" on leads for update to authenticated using (true) with check (true);

create policy "authenticated users can read customers" on customers for select to authenticated using (true);
create policy "authenticated users can read orders" on orders for select to authenticated using (true);
create policy "authenticated users can read projects" on projects for select to authenticated using (true);
create policy "authenticated users can read tickets" on tickets for select to authenticated using (true);
create policy "authenticated users can read invoices" on invoices for select to authenticated using (true);
create policy "authenticated users can read tasks" on tasks for select to authenticated using (true);

create policy "anonymous visitors can create ai conversations" on ai_conversations for insert to anon with check (true);
create policy "authenticated users can create ai conversations" on ai_conversations for insert to authenticated with check (true);
create policy "conversation owners can update ai conversations" on ai_conversations for update to anon using (true) with check (true);
create policy "authenticated users can update ai conversations" on ai_conversations for update to authenticated using (true) with check (true);
create policy "authenticated users can create tickets" on tickets for insert to authenticated with check (true);

insert into products (name, description, category, price, currency, setup_fee, is_recurring, billing_cycle, delivery_days, status, metadata)
values (
  'Ordering App + Admin Panel',
  'Promotional launch package for a restaurant ordering app with admin panel.',
  'app',
  149,
  'USD',
  0,
  false,
  'one_time',
  14,
  'active',
  '{"promo": true}'::jsonb
)
on conflict do nothing;

create table if not exists blog_authors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  name text not null,
  username text unique not null,
  bio text,
  avatar_url text,
  role_title text,
  twitter_handle text,
  linkedin_url text,
  expertise text[],
  post_count integer default 0,
  created_at timestamptz default now()
);

create table if not exists blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  color text,
  icon text,
  post_count integer default 0,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists blog_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  post_count integer default 0,
  created_at timestamptz default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  content_html text,
  featured_image text,
  featured_image_alt text,
  featured_image_caption text,
  author_id uuid references blog_authors(id),
  category_id uuid references blog_categories(id),
  status text default 'draft',
  is_featured boolean default false,
  is_pillar boolean default false,
  reading_time_minutes integer,
  word_count integer,
  view_count integer default 0,
  like_count integer default 0,
  comment_count integer default 0,
  seo_title text,
  seo_description text,
  canonical_url text,
  og_image text,
  schema_faq jsonb,
  related_product_slugs text[],
  published_at timestamptz,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists blog_post_tags (
  post_id uuid references blog_posts(id) on delete cascade,
  tag_id uuid references blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create table if not exists blog_post_likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references blog_posts(id) on delete cascade,
  post_slug text,
  visitor_fingerprint text not null,
  created_at timestamptz default now(),
  unique(post_slug, visitor_fingerprint)
);

create table if not exists blog_bookmarks (
  user_id uuid references profiles(id) on delete cascade,
  post_id uuid references blog_posts(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, post_id)
);

create table if not exists blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references blog_posts(id) on delete cascade,
  post_slug text,
  parent_id uuid references blog_comments(id),
  author_user_id uuid references profiles(id),
  author_name text not null,
  author_email text not null,
  author_website text,
  author_ip text,
  author_user_agent text,
  content text not null,
  content_html text,
  status text default 'pending',
  is_pinned boolean default false,
  like_count integer default 0,
  spam_score numeric default 0,
  spam_reasons text[],
  time_on_page_seconds integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists blog_comment_likes (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid references blog_comments(id) on delete cascade,
  visitor_fingerprint text not null,
  created_at timestamptz default now(),
  unique(comment_id, visitor_fingerprint)
);

create table if not exists blog_comment_reports (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid references blog_comments(id) on delete cascade,
  reporter_fingerprint text,
  reason text,
  created_at timestamptz default now()
);

create table if not exists spam_rules (
  id uuid primary key default gen_random_uuid(),
  rule_type text not null,
  rule_value text not null,
  action text default 'mark_spam',
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists blog_newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source_post_id uuid references blog_posts(id),
  source_post_slug text,
  source_type text,
  confirmed boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_blog_posts_status on blog_posts(status);
create index if not exists idx_blog_posts_category on blog_posts(category_id);
create index if not exists idx_blog_posts_author on blog_posts(author_id);
create index if not exists idx_blog_posts_published on blog_posts(published_at desc);
create index if not exists idx_blog_comments_post on blog_comments(post_id);
create index if not exists idx_blog_comments_post_slug on blog_comments(post_slug);
create index if not exists idx_blog_comments_status on blog_comments(status);
create index if not exists idx_blog_comments_parent on blog_comments(parent_id);

alter table blog_authors enable row level security;
alter table blog_categories enable row level security;
alter table blog_tags enable row level security;
alter table blog_posts enable row level security;
alter table blog_post_tags enable row level security;
alter table blog_post_likes enable row level security;
alter table blog_bookmarks enable row level security;
alter table blog_comments enable row level security;
alter table blog_comment_likes enable row level security;
alter table blog_comment_reports enable row level security;
alter table spam_rules enable row level security;
alter table blog_newsletter_signups enable row level security;

drop policy if exists "public can read published blog authors" on blog_authors;
create policy "public can read published blog authors" on blog_authors for select to anon, authenticated using (true);

drop policy if exists "public can read blog categories" on blog_categories;
create policy "public can read blog categories" on blog_categories for select to anon, authenticated using (true);

drop policy if exists "public can read blog tags" on blog_tags;
create policy "public can read blog tags" on blog_tags for select to anon, authenticated using (true);

drop policy if exists "public can read published posts" on blog_posts;
create policy "public can read published posts" on blog_posts for select to anon, authenticated using (status = 'published');

drop policy if exists "authenticated users can manage blog content" on blog_posts;
create policy "authenticated users can manage blog content" on blog_posts for all to authenticated using (true) with check (true);

drop policy if exists "authenticated users can manage blog taxonomy" on blog_categories;
create policy "authenticated users can manage blog taxonomy" on blog_categories for all to authenticated using (true) with check (true);

drop policy if exists "authenticated users can manage blog authors" on blog_authors;
create policy "authenticated users can manage blog authors" on blog_authors for all to authenticated using (true) with check (true);

drop policy if exists "authenticated users can manage blog tags" on blog_tags;
create policy "authenticated users can manage blog tags" on blog_tags for all to authenticated using (true) with check (true);

drop policy if exists "public can read approved comments" on blog_comments;
create policy "public can read approved comments" on blog_comments for select to anon, authenticated using (status = 'approved');

drop policy if exists "authenticated users can moderate comments" on blog_comments;
create policy "authenticated users can moderate comments" on blog_comments for all to authenticated using (true) with check (true);

drop policy if exists "authenticated users can manage spam rules" on spam_rules;
create policy "authenticated users can manage spam rules" on spam_rules for all to authenticated using (true) with check (true);
