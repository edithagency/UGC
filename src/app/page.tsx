import Link from "next/link";
import { getSubscriberCount } from "@/lib/dal";
import { MODULES, MODULE_COUNT } from "@/lib/modules";

// Compteur affiché seulement une fois qu'il y a une masse crédible.
const COUNTER_THRESHOLD = 50;

export default async function Landing() {
  let count = 0;
  try {
    count = await getSubscriberCount();
  } catch {
    // pas grave si Supabase pas encore branchée — on masque le compteur.
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-12 md:py-20">
      {/* HERO */}
      <section className="text-center">
        <span className="pill">100% gratuit — 13 étapes</span>
        <h1 className="text-4xl md:text-6xl font-black mt-6 tracking-tight leading-[1.05]">
          Devenir créatrice UGC,
          <br />
          <span className="text-[var(--brand)]">gratuitement</span>, étape par étape.
        </h1>
        <p className="text-lg md:text-xl mt-6 text-[var(--muted)] max-w-2xl mx-auto">
          La méthode que j'aurais aimé avoir quand j'ai commencé.
          {" "}
          <strong className="text-[var(--foreground)]">13 modules gratuits</strong> qui
          reprennent chaque épisode TikTok. On coche, on avance, on démarche.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/login" className="btn btn-primary text-lg py-4 px-8">
            Commencer gratuitement →
          </Link>
          <Link href="#modules" className="btn btn-ghost text-lg py-4 px-8">
            Voir les 13 modules
          </Link>
        </div>

        {count >= COUNTER_THRESHOLD && (
          <p className="mt-6 text-sm text-[var(--muted)]">
            <strong className="text-[var(--foreground)]">{count.toLocaleString("fr-FR")} filles</strong>{" "}
            sont déjà en train de suivre le parcours.
          </p>
        )}
      </section>

      {/* PROMESSE */}
      <section className="mt-20 grid md:grid-cols-3 gap-4">
        {[
          { t: "Gratuit, vraiment", d: "Pas de carte demandée, pas de freemium. Le parcours entier est libre." },
          { t: "13 modules = 13 épisodes", d: "Chaque module reprend le contenu d'un épisode TikTok. Complémentaire, pas redondant." },
          { t: "Concret", d: "Texte + checklist à cocher. Tu débloques le suivant quand t'as terminé." },
        ].map((f) => (
          <div key={f.t} className="card">
            <h3 className="font-bold text-lg">{f.t}</h3>
            <p className="text-[var(--muted)] mt-2 text-sm">{f.d}</p>
          </div>
        ))}
      </section>

      {/* MODULES LIST */}
      <section id="modules" className="mt-20">
        <h2 className="text-3xl md:text-4xl font-black">Les 13 modules</h2>
        <p className="text-[var(--muted)] mt-2">
          Séquentiel : tu débloques le module N+1 quand tu as coché tout N.
        </p>
        <ol className="mt-8 space-y-3">
          {MODULES.map((m) => (
            <li
              key={m.slug}
              className="card flex items-start gap-4"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--brand)]/10 text-[var(--brand-ink)] font-bold flex items-center justify-center text-sm">
                {String(m.order).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <div className="font-bold">{m.title}</div>
                <div className="text-sm text-[var(--muted)]">{m.tagline}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA FINAL */}
      <section className="mt-20 card text-center bg-gradient-to-br from-[var(--brand)]/10 to-[var(--accent)]/10 border-[var(--brand)]/20">
        <h2 className="text-2xl md:text-3xl font-black">
          Prête à te lancer ?
        </h2>
        <p className="text-[var(--muted)] mt-2 max-w-xl mx-auto">
          Inscription en 10 secondes (email seulement, pas de mot de passe à retenir).
          {" "}
          {MODULE_COUNT} modules qui t'attendent.
        </p>
        <Link href="/login" className="btn btn-primary text-lg mt-6 py-4 px-8 inline-flex">
          Commencer gratuitement →
        </Link>
      </section>
    </div>
  );
}
