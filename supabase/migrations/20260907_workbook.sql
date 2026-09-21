-- edithappp — carnet de travail des utilisatrices
-- À appliquer dans le SQL editor Supabase.

alter table public.profiles
  add column if not exists workbook jsonb not null default '{}'::jsonb;

-- Les policies existantes (own profile read / update) couvrent déjà
-- lecture et écriture de cette colonne par l'utilisatrice connectée.
