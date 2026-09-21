-- edithappp — champs enrichis pour le tracker
alter table public.leads
  add column if not exists sector text,
  add column if not exists link text,
  add column if not exists why text,
  add column if not exists content_idea text,
  add column if not exists source text;
