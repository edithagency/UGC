export const metadata = { title: "Mentions légales — edithappp" };

export default function MentionsLegales() {
  return (
    <article className="max-w-2xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-black">Mentions légales</h1>
      <p className="text-[var(--muted)] text-sm mt-1">Dernière mise à jour : 2026-08-31.</p>

      <h2 className="text-xl font-bold mt-8">Éditeur</h2>
      <p>
        edithappp — micro-entreprise Édith [Nom].<br />
        SIRET : [à compléter]<br />
        Adresse : [à compléter]<br />
        Contact : hello@edithappp.com
      </p>

      <h2 className="text-xl font-bold mt-8">Hébergeur</h2>
      <p>
        Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, USA.<br />
        Base de données : Supabase (Union Européenne).
      </p>

      <h2 className="text-xl font-bold mt-8">Propriété intellectuelle</h2>
      <p>
        Le contenu du parcours (textes, checklists, badge) appartient à edithappp.
        Utilisation personnelle autorisée, revente interdite.
      </p>
    </article>
  );
}
