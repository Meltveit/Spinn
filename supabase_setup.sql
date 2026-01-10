-- 1. COMMUNITY SHARES TABLE
-- This table tracks which wheels are published to the community library.
create table if not exists public.community_shares (
  wheel_id uuid references public.wheels(id) on delete cascade primary key,
  category text not null,
  description text,               -- Optional user description
  spins int default 0,            -- Track popularity
  reports int default 0,
  is_hidden boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (Security best practice)
alter table public.community_shares enable row level security;

-- Policy: Everyone can see wheels that are NOT hidden
create policy "Public can view community wheels"
on public.community_shares for select using (is_hidden = false);

-- Policy: Anyone can insert (publish) a wheel
create policy "Anyone can publish"
on public.community_shares for insert with check (true);

-- Policy: Anyone can update spin counts (via RPC basically, but useful to have open for the increment logic if needed directly, though RPC is SA)
-- Actually, for RPC 'security definer' we don't strictly need a policy for 'update' if we rely purely on RPC, 
-- but let's leave policies tight.


-- 2. MODERATION FUNCTION
-- This works with the "Report" button. If reports >= 15, it auto-hides the wheel.
create or replace function report_wheel(target_id uuid)
returns void language plpgsql security definer
as $$
begin
  update public.community_shares
  set reports = reports + 1,
      is_hidden = case when (reports + 1) >= 15 then true else is_hidden end
  where wheel_id = target_id;
end;
$$;


-- 3. SPIN COUNT FUNCTION
-- Atomically increments the spin count. Call this when a user finishes a spin.
create or replace function increment_spin_count(target_id uuid)
returns void language plpgsql security definer
as $$
begin
  update public.community_shares
  set spins = spins + 1
  where wheel_id = target_id;
end;
$$;


-- 4. AUTO-DELETE OLD WHEELS (GDPR / Cleanup)
-- This requires the 'pg_cron' extension to be enabled in Supabase.
-- It will delete any wheel that is older than 1 year (365 days).
-- Note: Because of 'on delete cascade' above, deleting a wheel will also remove it from community_shares.

-- Enable the extension
create extension if not exists pg_cron;

-- Schedule a job to run every day at midnight (0 0 * * *)
select cron.schedule(
  'delete-old-wheels', -- name of the job
  '0 0 * * *',         -- cron schedule (every midnight)
  $$
    delete from public.wheels 
    where created_at < now() - interval '1 year';
  $$
);
