# edithappp

Site UGC Starter — 13 modules gratuits pour se lancer en UGC, tracker de démarchage post-parcours, vente du template.

**Stack :** Next.js 16 (App Router) · Supabase (auth magic link + Postgres) · Stripe (vente template) · Resend (relances email) · Vercel (hébergement).

---

## 1. Setup local

```bash
cp .env.example .env.local
# remplis au minimum les variables NEXT_PUBLIC_SUPABASE_*
npm install
npm run dev
```

Ouvre http://localhost:3000.

## 2. Supabase — obligatoire pour que le site fonctionne

1. Crée un projet sur https://supabase.com.
2. Copie l'URL du projet + l'`anon` key dans `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. Copie la `service_role` key dans `SUPABASE_SERVICE_ROLE_KEY` (utile pour le webhook Stripe et le cron).
4. Dans le SQL editor Supabase, colle et exécute le contenu de `supabase/migrations/20260831_init.sql`.
5. Authentication → URL Configuration :
   - **Site URL** : `http://localhost:3000` en dev, `https://edithappp.com` en prod.
   - **Redirect URLs** : ajoute `http://localhost:3000/auth/callback` et `https://edithappp.com/auth/callback`.
6. Authentication → Email templates → Magic Link : personnalise si tu veux.

## 3. Stripe — pour activer la vente du template (V1.1)

1. Crée un compte Stripe, mode Test au début.
2. Crée un produit "Pack UGC Starter" avec 2 prix :
   - Plein tarif (49 €) → mets l'ID dans `STRIPE_TEMPLATE_PRICE_ID`.
   - Prix réduit diplômées (29 €) → `STRIPE_TEMPLATE_DISCOUNT_PRICE_ID`.
3. Récupère `STRIPE_SECRET_KEY` dans les API keys.
4. Webhook : dans Stripe → Developers → Webhooks, ajoute un endpoint pointant vers `https://ton-domaine.com/api/stripe/webhook`, événement `checkout.session.completed`. Copie le signing secret dans `STRIPE_WEBHOOK_SECRET`.
5. **TVA & facturation micro-entreprise** : à valider avec ton comptable — Stripe ne fait pas la facture française conforme automatiquement. Envisage un outil comme Freebe ou active Stripe Tax + template facture.

Si `STRIPE_*` n'est pas rempli, la page `/template` affiche un message "activation bientôt" à la place du bouton d'achat. Rien ne casse.

## 4. Resend — pour les relances email

1. Crée un compte sur https://resend.com et vérifie ton domaine (edithappp.com).
2. Copie l'API key dans `RESEND_API_KEY`.
3. `RESEND_FROM_EMAIL` = adresse depuis ton domaine vérifié (ex : `hello@edithappp.com`).

Si Resend n'est pas configuré, le cron ne fait rien silencieusement.

## 5. Cron Vercel (relances automatiques)

Le fichier `vercel.json` déclare un cron quotidien à 10h sur `/api/cron/reminders`. Ajoute une variable d'env `CRON_SECRET` (au moins 32 caractères aléatoires) — Vercel l'envoie automatiquement dans le header `Authorization` du cron. Sans cette var, le endpoint reste accessible sans auth (dev only).

## 6. Déploiement

```bash
npx vercel
# ou : push sur GitHub puis "Import project" sur vercel.com
```

Configure les mêmes variables d'env sur Vercel (Project → Settings → Environment Variables).

## 7. Personnalisation

- **Contenu des 13 modules** : `src/lib/modules.ts` — titres, intros, checklists, tous éditables.
- **Palette couleurs** : `src/app/globals.css` (variables CSS en tête).
- **Copy landing** : `src/app/page.tsx`.
- **Templates emails** : `src/lib/emails.ts`.

## 8. Ce qui reste à faire (non inclus V1)

- Livraison du fichier template après achat (email avec lien signé ou espace client) → aujourd'hui c'est une page "merci", pas de fichier envoyé. À câbler quand tu as le pack Notion à distribuer.
- Communauté (WhatsApp/Discord) — pas dans le scope.
- Contenu bonus additionnel post-parcours — à ajouter sous forme de nouveaux modules dans `modules.ts` avec un flag `bonus: true` si tu veux les séparer.

## Structure de fichiers

```
src/
  app/
    page.tsx                 # landing
    login/                   # magic link
    auth/callback/route.ts   # Supabase callback
    dashboard/
      page.tsx               # 13 modules avec verrous
      [slug]/
        page.tsx             # module + checklist
        actions.ts           # toggle & complete
        ChecklistItem.tsx
    badge/
      page.tsx               # attestation
      BadgeCanvas.tsx        # SVG téléchargeable en PNG
    tracker/
      page.tsx               # tracker démarchage
      actions.ts
      NewLeadForm.tsx / LeadRow.tsx
    template/
      page.tsx               # page produit
      merci/                 # thank-you post-paiement
      CheckoutButton.tsx
    compte/                  # gestion + suppression RGPD
    confidentialite/ mentions-legales/
    api/
      stripe/checkout, stripe/webhook
      cron/reminders
    actions/auth.ts          # sendMagicLink, signOut, deleteMyAccount
  lib/
    supabase/ (client, server, middleware)
    dal.ts                   # requireUser, getProgress, getSubscriberCount
    modules.ts               # les 13 modules
    stripe.ts / emails.ts
  proxy.ts                   # Next 16 auth guard (ex-middleware)
supabase/migrations/         # SQL à appliquer manuellement
vercel.json                  # cron
```
