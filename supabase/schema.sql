-- ============================================================
-- Supabase Schema for Portfolio Contact Form
-- ------------------------------------------------------------
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Table to store contact form submissions
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (important for safety)
alter table public.contact_messages enable row level security;

-- Allow anonymous visitors to INSERT (so the contact form works)
create policy "Allow anonymous inserts"
  on public.contact_messages
  for insert
  to anon
  with check (true);

-- Only authenticated admins can SELECT (read) the messages
create policy "Allow authenticated read"
  on public.contact_messages
  for select
  to authenticated
  using (true);

-- Optional: update/delete only by authenticated users
create policy "Allow authenticated update"
  on public.contact_messages
  for update
  to authenticated
  using (true);

create policy "Allow authenticated delete"
  on public.contact_messages
  for delete
  to authenticated
  using (true);

