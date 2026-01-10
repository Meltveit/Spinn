-- RUN THIS TO FIX YOUR DATABASE
-- It adds the missing columns (description, spins) and the missing function.

-- 1. Add missing columns safely
alter table public.community_shares 
add column if not exists description text,
add column if not exists spins int default 0;

-- 2. Create the spin counter function (Required for the Play button count)
create or replace function increment_spin_count(target_id uuid)
returns void language plpgsql security definer
as $$
begin
  update public.community_shares
  set spins = spins + 1
  where wheel_id = target_id;
end;
$$;
