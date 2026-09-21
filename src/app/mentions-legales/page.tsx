export const metadata = { title: "Mentions légales — edithappp" };

export default function MentionsLegales() {
  return (
    <article className="max-w-2xl mx-auto px-5 py-12 space-y-6">
      <div>
        <h1 className="text-3xl font-black" style={{ color: "#615326" }}>
          Mentions légales
        </h1>
        <p className="text-[var(--muted)] text-sm mt-1">
          Dernière mise à jour : 21 septembre 2026.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Éditeur du site
        </h2>
        <p className="mt-2">
          Le site <strong>edithapppugc.com</strong> est édité par :<br />
          Édith Apouey, entrepreneure individuelle (micro-entreprise).<br />
          SIRET : 904 070 372 00027<br />
          Adresse du siège : 9 impasse Varinot, 33700 Mérignac<br />
          Email : <a href="mailto:edithappro@gmail.com" className="link">edithappro@gmail.com</a>
        </p>
        <p className="mt-2">
          TVA non applicable, article 293 B du Code général des impôts.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Directrice de la publication
        </h2>
        <p className="mt-2">Édith Apouey.</p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Hébergement
        </h2>
        <p className="mt-2">
          Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="link">
            vercel.com
          </a>.
        </p>
        <p className="mt-2">
          Base de données et authentification : Supabase Inc. (données hébergées dans l&apos;Union européenne).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Propriété intellectuelle
        </h2>
        <p className="mt-2">
          L&apos;ensemble des contenus présents sur ce site (textes, vidéos, modules,
          checklists, templates, visuels, code) est la propriété exclusive d&apos;Édith
          Apouey, sauf mention contraire. Toute reproduction, diffusion ou revente,
          totale ou partielle, sans autorisation écrite préalable, est interdite.
        </p>
        <p className="mt-2">
          L&apos;achat d&apos;un template ou du Tracker Pro donne droit à un usage
          personnel uniquement — la revente, le partage et la mise à disposition à
          des tiers sont strictement interdits.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Contact
        </h2>
        <p className="mt-2">
          Pour toute question :{" "}
          <a href="mailto:edithappro@gmail.com" className="link">edithappro@gmail.com</a>.
        </p>
      </section>
    </article>
  );
}
