drop policy if exists "authenticated users can read products" on products;
drop policy if exists "authenticated users can create products" on products;
drop policy if exists "authenticated users can update products" on products;
drop policy if exists "authenticated users can read orders" on orders;
drop policy if exists "authenticated users can create orders" on orders;
drop policy if exists "authenticated users can update orders" on orders;
drop policy if exists "authenticated users can read projects" on projects;
drop policy if exists "authenticated users can create projects" on projects;
drop policy if exists "authenticated users can update projects" on projects;
drop policy if exists "authenticated users can read tickets" on tickets;
drop policy if exists "authenticated users can create tickets" on tickets;
drop policy if exists "authenticated users can update tickets" on tickets;
drop policy if exists "authenticated users can read invoices" on invoices;
drop policy if exists "authenticated users can create invoices" on invoices;
drop policy if exists "authenticated users can update invoices" on invoices;
drop policy if exists "authenticated users can read tasks" on tasks;
drop policy if exists "authenticated users can create tasks" on tasks;
drop policy if exists "authenticated users can update tasks" on tasks;
drop policy if exists "authenticated users can read customers" on customers;
drop policy if exists "authenticated users can create customers" on customers;
drop policy if exists "authenticated users can update customers" on customers;
drop policy if exists "anonymous visitors can create ai conversations" on ai_conversations;
drop policy if exists "authenticated users can create ai conversations" on ai_conversations;
drop policy if exists "anonymous visitors can update ai conversations" on ai_conversations;
drop policy if exists "authenticated users can update ai conversations" on ai_conversations;

create policy "authenticated users can read products" on products for select to authenticated using (true);
create policy "authenticated users can create products" on products for insert to authenticated with check (true);
create policy "authenticated users can update products" on products for update to authenticated using (true) with check (true);

create policy "authenticated users can read customers" on customers for select to authenticated using (true);
create policy "authenticated users can create customers" on customers for insert to authenticated with check (true);
create policy "authenticated users can update customers" on customers for update to authenticated using (true) with check (true);

create policy "authenticated users can read orders" on orders for select to authenticated using (true);
create policy "authenticated users can create orders" on orders for insert to authenticated with check (true);
create policy "authenticated users can update orders" on orders for update to authenticated using (true) with check (true);

create policy "authenticated users can read projects" on projects for select to authenticated using (true);
create policy "authenticated users can create projects" on projects for insert to authenticated with check (true);
create policy "authenticated users can update projects" on projects for update to authenticated using (true) with check (true);

create policy "authenticated users can read tasks" on tasks for select to authenticated using (true);
create policy "authenticated users can create tasks" on tasks for insert to authenticated with check (true);
create policy "authenticated users can update tasks" on tasks for update to authenticated using (true) with check (true);

create policy "authenticated users can read tickets" on tickets for select to authenticated using (true);
create policy "authenticated users can create tickets" on tickets for insert to authenticated with check (true);
create policy "authenticated users can update tickets" on tickets for update to authenticated using (true) with check (true);

create policy "authenticated users can read invoices" on invoices for select to authenticated using (true);
create policy "authenticated users can create invoices" on invoices for insert to authenticated with check (true);
create policy "authenticated users can update invoices" on invoices for update to authenticated using (true) with check (true);

create policy "anonymous visitors can create ai conversations" on ai_conversations for insert to anon with check (true);
create policy "authenticated users can create ai conversations" on ai_conversations for insert to authenticated with check (true);
create policy "anonymous visitors can update ai conversations" on ai_conversations for update to anon using (true) with check (true);
create policy "authenticated users can update ai conversations" on ai_conversations for update to authenticated using (true) with check (true);
