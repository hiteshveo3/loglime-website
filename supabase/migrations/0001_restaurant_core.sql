create extension if not exists "pgcrypto";

create type public.member_role as enum ('owner', 'manager', 'server', 'kitchen', 'cashier');
create type public.member_status as enum ('active', 'invited', 'suspended');
create type public.table_status as enum ('available', 'seated', 'ordered', 'ready', 'needs_help', 'closed');
create type public.order_status as enum ('new', 'preparing', 'ready', 'served', 'cancelled');
create type public.payment_status as enum ('unpaid', 'authorized', 'paid', 'refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete restrict,
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.member_role not null default 'server',
  status public.member_status not null default 'active',
  invited_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  timezone text not null default 'UTC',
  currency text not null default 'USD',
  address jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.menus (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  location_id uuid references public.locations(id) on delete cascade,
  name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  menu_id uuid not null references public.menus(id) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  category_id uuid not null references public.menu_categories(id) on delete cascade,
  name text not null,
  description text not null default '',
  price_cents integer not null check (price_cents >= 0),
  prep_minutes integer not null default 10 check (prep_minutes >= 0),
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.modifier_groups (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  menu_item_id uuid not null references public.menu_items(id) on delete cascade,
  name text not null,
  min_selected integer not null default 0,
  max_selected integer not null default 1,
  created_at timestamptz not null default now()
);

create table public.modifiers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  modifier_group_id uuid not null references public.modifier_groups(id) on delete cascade,
  name text not null,
  price_cents integer not null default 0,
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.floor_areas (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.restaurant_tables (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  floor_area_id uuid references public.floor_areas(id) on delete set null,
  label text not null,
  seats integer not null default 2 check (seats > 0),
  status public.table_status not null default 'available',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (location_id, label)
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  table_id uuid references public.restaurant_tables(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  opened_by uuid references auth.users(id) on delete set null,
  status public.order_status not null default 'new',
  payment_status public.payment_status not null default 'unpaid',
  subtotal_cents integer not null default 0,
  tax_cents integer not null default 0,
  total_cents integer not null default 0,
  opened_at timestamptz not null default now(),
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  menu_item_id uuid references public.menu_items(id) on delete set null,
  name text not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price_cents integer not null default 0,
  status public.order_status not null default 'new',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.staff_invites (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  role public.member_role not null default 'server',
  token text not null unique default encode(gen_random_bytes(24), 'hex'),
  invited_by uuid references auth.users(id) on delete set null,
  accepted_at timestamptz,
  expires_at timestamptz not null default now() + interval '7 days',
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at before update on public.profiles for each row execute function public.touch_updated_at();
create trigger organizations_touch_updated_at before update on public.organizations for each row execute function public.touch_updated_at();
create trigger locations_touch_updated_at before update on public.locations for each row execute function public.touch_updated_at();
create trigger menus_touch_updated_at before update on public.menus for each row execute function public.touch_updated_at();
create trigger menu_items_touch_updated_at before update on public.menu_items for each row execute function public.touch_updated_at();
create trigger restaurant_tables_touch_updated_at before update on public.restaurant_tables for each row execute function public.touch_updated_at();
create trigger customers_touch_updated_at before update on public.customers for each row execute function public.touch_updated_at();
create trigger orders_touch_updated_at before update on public.orders for each row execute function public.touch_updated_at();
create trigger order_items_touch_updated_at before update on public.order_items for each row execute function public.touch_updated_at();

create or replace function public.is_org_member(target_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members om
    where om.organization_id = target_org_id
      and om.user_id = auth.uid()
      and om.status = 'active'
  );
$$;

create or replace function public.has_org_role(target_org_id uuid, allowed_roles public.member_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members om
    where om.organization_id = target_org_id
      and om.user_id = auth.uid()
      and om.status = 'active'
      and om.role = any(allowed_roles)
  );
$$;

create or replace function public.can_access_order(target_order_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.orders o
    where o.id = target_order_id
      and public.is_org_member(o.organization_id)
  );
$$;

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.locations enable row level security;
alter table public.menus enable row level security;
alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.modifier_groups enable row level security;
alter table public.modifiers enable row level security;
alter table public.floor_areas enable row level security;
alter table public.restaurant_tables enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_events enable row level security;
alter table public.staff_invites enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles select own or shared org"
on public.profiles for select
using (
  id = auth.uid()
  or exists (
    select 1
    from public.organization_members mine
    join public.organization_members theirs on theirs.organization_id = mine.organization_id
    where mine.user_id = auth.uid()
      and theirs.user_id = profiles.id
      and mine.status = 'active'
      and theirs.status = 'active'
  )
);

create policy "profiles update own"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "profiles insert own"
on public.profiles for insert
with check (id = auth.uid());

create policy "organizations select members"
on public.organizations for select
using (public.is_org_member(id));

create policy "organizations insert owner"
on public.organizations for insert
with check (owner_id = auth.uid());

create policy "organizations update managers"
on public.organizations for update
using (public.has_org_role(id, array['owner','manager']::public.member_role[]))
with check (public.has_org_role(id, array['owner','manager']::public.member_role[]));

create policy "organization members select org"
on public.organization_members for select
using (public.is_org_member(organization_id));

create policy "organization members insert managers"
on public.organization_members for insert
with check (public.has_org_role(organization_id, array['owner','manager']::public.member_role[]));

create policy "organization members update managers"
on public.organization_members for update
using (public.has_org_role(organization_id, array['owner','manager']::public.member_role[]))
with check (public.has_org_role(organization_id, array['owner','manager']::public.member_role[]));

create policy "organization members delete owners"
on public.organization_members for delete
using (public.has_org_role(organization_id, array['owner']::public.member_role[]));

create policy "locations member access"
on public.locations for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "menus member access"
on public.menus for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "menu categories member access"
on public.menu_categories for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "menu items member access"
on public.menu_items for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "modifier groups member access"
on public.modifier_groups for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "modifiers member access"
on public.modifiers for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "floor areas member access"
on public.floor_areas for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "restaurant tables member access"
on public.restaurant_tables for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "customers member access"
on public.customers for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "orders member access"
on public.orders for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "order items member access"
on public.order_items for all
using (public.can_access_order(order_id))
with check (public.can_access_order(order_id));

create policy "order events member access"
on public.order_events for all
using (public.can_access_order(order_id))
with check (public.can_access_order(order_id));

create policy "staff invites member access"
on public.staff_invites for all
using (public.has_org_role(organization_id, array['owner','manager']::public.member_role[]))
with check (public.has_org_role(organization_id, array['owner','manager']::public.member_role[]));

create policy "audit logs member read"
on public.audit_logs for select
using (public.is_org_member(organization_id));

create policy "audit logs member insert"
on public.audit_logs for insert
with check (public.is_org_member(organization_id));

create index organization_members_user_idx on public.organization_members(user_id);
create index locations_org_idx on public.locations(organization_id);
create index menu_items_org_idx on public.menu_items(organization_id);
create index restaurant_tables_location_idx on public.restaurant_tables(location_id);
create index orders_org_location_status_idx on public.orders(organization_id, location_id, status);
create index order_items_order_idx on public.order_items(order_id);
create index order_events_order_idx on public.order_events(order_id);
create index audit_logs_org_created_idx on public.audit_logs(organization_id, created_at desc);
