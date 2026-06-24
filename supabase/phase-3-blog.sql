-- Loglime Phase 3: Blog system, comments, likes, newsletter, and moderation.
-- Safe to run after supabase/schema.sql. Uses IF NOT EXISTS and policy refreshes.

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
