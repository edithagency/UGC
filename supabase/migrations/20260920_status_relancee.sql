-- edithappp — nouveau statut "relancee"
alter table public.leads drop constraint if exists leads_status_check;
alter table public.leads add constraint leads_status_check
  check (status in (
    'a_contacter',
    'envoye',
    'a_relancer',
    'relancee',
    'en_discussion',
    'collab_signee',
    'terminee',
    'sans_suite'
  ));
