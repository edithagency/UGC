export const metadata = { title: "Politique de confidentialité — edithappp" };

export default function Confidentialite() {
  return (
    <article className="max-w-2xl mx-auto px-5 py-12 prose prose-neutral">
      <h1 className="text-3xl font-black">Politique de confidentialité</h1>
      <p className="text-[var(--muted)] text-sm">Dernière mise à jour : 2026-08-31.</p>

      <h2 className="text-xl font-bold mt-8">Qui gère ce site</h2>
      <p>
        edithappp est édité par Édith (micro-entrepreneure, France). Contact :{" "}
        <a href="mailto:hello@edithappp.com" className="link">hello@edithappp.com</a>.
      </p>

      <h2 className="text-xl font-bold mt-8">Quelles données on stocke</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Ton email (pour te connecter, via lien magique).</li>
        <li>Ta progression dans les 13 modules (dates, items cochés).</li>
        <li>Optionnel : ta réponse à la question de segmentation (niveau UGC).</li>
        <li>Si tu utilises le tracker : les marques que tu enregistres et leurs notes.</li>
        <li>Si tu achètes le template : email + reçu Stripe (pas de coordonnées bancaires).</li>
      </ul>

      <h2 className="text-xl font-bold mt-8">À quoi ça sert</h2>
      <p>
        Uniquement à faire fonctionner le parcours et te rappeler par email si tu
        laisses tomber (relances personnalisées avec le module en attente). Pas de
        pub, pas de vente à des tiers.
      </p>

      <h2 className="text-xl font-bold mt-8">Combien de temps</h2>
      <p>
        Tant que ton compte existe. Tu peux supprimer ton compte et toutes tes
        données depuis <a href="/compte" className="link">/compte</a>.
      </p>

      <h2 className="text-xl font-bold mt-8">Sous-traitants</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Supabase (hébergement DB + auth) — UE.</li>
        <li>Resend (envoi d'emails).</li>
        <li>Stripe (paiement template).</li>
        <li>Vercel (hébergement du site).</li>
      </ul>

      <h2 className="text-xl font-bold mt-8">Tes droits</h2>
      <p>
        RGPD : accès, rectification, suppression, portabilité. Écris à{" "}
        <a href="mailto:hello@edithappp.com" className="link">hello@edithappp.com</a>.
      </p>
    </article>
  );
}
