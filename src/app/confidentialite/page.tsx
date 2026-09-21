export const metadata = { title: "Politique de confidentialité — edithappp" };

export default function Confidentialite() {
  return (
    <article className="max-w-2xl mx-auto px-5 py-12 space-y-6">
      <div>
        <h1 className="text-3xl font-black" style={{ color: "#615326" }}>
          Politique de confidentialité
        </h1>
        <p className="text-[var(--muted)] text-sm mt-1">
          Dernière mise à jour : 21 septembre 2026.
        </p>
      </div>

      <p>
        edithappp respecte ta vie privée. Cette page explique quelles données on
        collecte, pourquoi, combien de temps on les garde, et comment tu peux
        exercer tes droits (RGPD).
      </p>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Responsable de traitement
        </h2>
        <p className="mt-2">
          Édith Apouey (micro-entreprise) — contact :{" "}
          <a href="mailto:edithappro@gmail.com" className="link">edithappro@gmail.com</a>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Données collectées
        </h2>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Ton adresse email (pour créer et te connecter à ton compte).</li>
          <li>Ta progression dans les 23 modules (dates, cases cochées, notes de workbook).</li>
          <li>Les marques et notes que tu enregistres dans le Tracker démarchage.</li>
          <li>En cas d&apos;achat : ton email, l&apos;identifiant de la commande et le reçu Stripe. Aucune coordonnée bancaire n&apos;est stockée par edithappp — le paiement est traité directement par Stripe.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Finalités et base légale
        </h2>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>
            <strong>Fournir le service</strong> (accès aux modules, sauvegarde de ta progression,
            tracker) — base légale : exécution du contrat.
          </li>
          <li>
            <strong>Envoi d&apos;emails de relance</strong> pour t&apos;aider à reprendre le parcours si tu
            l&apos;abandonnes — base légale : intérêt légitime. Tu peux te désinscrire à tout moment.
          </li>
          <li>
            <strong>Facturation et obligations comptables</strong> — base légale : obligation légale.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Durée de conservation
        </h2>
        <p className="mt-2">
          Tes données sont conservées tant que ton compte existe. Les factures et
          reçus Stripe sont conservés 10 ans (obligation comptable). Tu peux
          supprimer ton compte et toutes tes données depuis{" "}
          <a href="/compte" className="link">ton espace compte</a>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Sous-traitants
        </h2>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Supabase — hébergement de la base de données et authentification (UE).</li>
          <li>Vercel — hébergement du site (États-Unis, sous clauses contractuelles types).</li>
          <li>Stripe — traitement des paiements (Irlande / États-Unis).</li>
          <li>Resend — envoi des emails transactionnels et de relance (UE / États-Unis).</li>
        </ul>
        <p className="mt-2">
          Aucune donnée n&apos;est vendue ni utilisée à des fins publicitaires.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Cookies
        </h2>
        <p className="mt-2">
          Le site utilise uniquement des cookies techniques strictement nécessaires
          au fonctionnement (session de connexion via Supabase). Aucun cookie de
          mesure d&apos;audience, de publicité ou de traçage tiers n&apos;est déposé — donc
          aucune bannière de consentement n&apos;est requise.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Tes droits
        </h2>
        <p className="mt-2">
          Conformément au RGPD, tu disposes d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, de portabilité, de limitation et d&apos;opposition sur tes
          données. Pour les exercer, écris à{" "}
          <a href="mailto:edithappro@gmail.com" className="link">edithappro@gmail.com</a>.
        </p>
        <p className="mt-2">
          Tu peux également introduire une réclamation auprès de la CNIL —{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="link">
            cnil.fr
          </a>.
        </p>
      </section>
    </article>
  );
}
