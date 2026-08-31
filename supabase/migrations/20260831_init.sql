-- edithappp — schéma initial
-- Applique cette migration dans le SQL editor Supabase.

-- 1. profils utilisatrices (étend auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now(),
  segmentation text,           -- réponse question inscription
  last_activity_at timestamptz not null default now(),
  reminder_sent_at timestamptz,
  finished_at timestamptz,     -- date de complétion du parcours (module 13 terminé)
  template_discount_used boolean not null default false
);

alter table public.profiles enable row level security;

drop policy if exists "own profile read" on public.profiles;
create policy "own profile read" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles
  for update using (auth.uid() = id);

-- Crée automatiquement un profil quand un utilisateur s'inscrit.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. progression par module
create table if not exists public.module_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  checked_items text[] not null default '{}',
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, module_slug)
);

alter table public.module_progress enable row level security;

drop policy if exists "own progress read" on public.module_progress;
create policy "own progress read" on public.module_progress
  for select using (auth.uid() = user_id);

drop policy if exists "own progress insert" on public.module_progress;
create policy "own progress insert" on public.module_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "own progress update" on public.module_progress;
create policy "own progress update" on public.module_progress
  for update using (auth.uid() = user_id);

-- 3. leads (tracker démarchage post-parcours)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  brand_name text not null,
  contact text,                                -- email/@ de la marque contactée
  status text not null default 'a_contacter'
    check (status in ('a_contacter','envoye','repondu','collab_signee','sans_suite')),
  notes text,
  sent_at date,
  responded_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_user_idx on public.leads (user_id, updated_at desc);

alter table public.leads enable row level security;

drop policy if exists "own leads" on public.leads;
create policy "own leads" on public.leads
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 4. commandes template (Stripe)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  stripe_session_id text unique,
  stripe_payment_intent text,
  amount_cents integer not null,
  currency text not null default 'eur',
  discount_applied boolean not null default false,
  status text not null default 'pending' check (status in ('pending','paid','refunded','failed')),
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

drop policy if exists "own orders read" on public.orders;
create policy "own orders read" on public.orders
  for select using (auth.uid() = user_id);

-- 5. helper : compter les inscrites (public, agrégé) via vue sécurisée
create or replace view public.subscriber_count as
select count(*)::int as total from public.profiles;

grant select on public.subscriber_count to anon, authenticated;
