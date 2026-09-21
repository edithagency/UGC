-- edithappp — flag Tracker Pro sur les profils
alter table public.profiles add column if not exists tracker_pro boolean not null default false;
