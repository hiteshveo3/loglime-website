create table if not exists public.launch_spots (
  id integer primary key default 1 check (id = 1),
  claimed integer not null default 8 check (claimed between 0 and 10),
  updated_at timestamptz not null default now()
);

insert into public.launch_spots (id, claimed)
values (1, 8)
on conflict (id) do nothing;

alter table public.launch_spots enable row level security;

drop policy if exists "public can read launch spots" on public.launch_spots;
create policy "public can read launch spots"
on public.launch_spots for select
to anon, authenticated
using (true);

alter publication supabase_realtime add table public.launch_spots;
