-- FIX: Add TITLE to the community table
-- This allows us to save the custom title without needing permission to update the original wheel.

alter table public.community_shares 
add column if not exists title text;

-- Run this to update existing rows to match their wheel title (optional cleanup)
update public.community_shares cs
set title = w.title
from public.wheels w
where cs.wheel_id = w.id
and cs.title is null;
