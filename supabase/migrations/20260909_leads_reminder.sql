-- edithappp — date de prochaine relance
alter table public.leads add column if not exists next_reminder_at date;
