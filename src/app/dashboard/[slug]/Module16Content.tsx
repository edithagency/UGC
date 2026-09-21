"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const GOAL = 10;
const META_URL = "https://www.facebook.com/ads/library/";

const UNIVERSES = [
  "Skincare",
  "Make-up",
  "Mode",
  "Food",
  "Sport",
  "Maison",
  "Applis",
  "Voyage",
  "Animaux",
];

const IG_CHECKS = [
  "Publie-t-elle régulièrement ?",
  "Utilise-t-elle des vidéos verticales ?",
  "Montre-t-elle des personnes utilisant ses produits ?",
  "Utilise-t-elle déjà du contenu qui ressemble à de l'UGC ?",
  "Ses vidéos pourraient-elles être améliorées ou diversifiées ?",
  "Mon profil pourrait-il correspondre à ses clients ?",
];

const MINI_TEST = [
  "correspond à l'un de mes univers",
  "possède un produit/service que je pourrais naturellement présenter",
  "communique activement en ligne",
  "utilise ou pourrait utiliser de la vidéo courte",
  "me donne au moins une idée de contenu",
];

const ALTERNATIVE_TAGS = [
  "Petites marques",
  "E-commerce",
  "Start-ups",
  "Marques émergentes",
  "Entreprises de ton univers",
];

const SOURCES = [
  { emoji: "📱", label: "TikTok", body: "Comptes de marques + publicités" },
  { emoji: "📷", label: "Instagram", body: "Reels + contenus sponsorisés" },
  { emoji: "🔎", label: "Meta Ad Library", body: "Marques qui diffusent des publicités" },
  { emoji: "🌐", label: "Google", body: "Marques par secteur" },
  { emoji: "🧴", label: "Tes propres produits", body: "Marques que tu connais déjà" },
  { emoji: "🔁", label: "Concurrents", body: "Une marque trouvée peut t'en faire découvrir 10 autres" },
  { emoji: "🎁", label: "Gifting", body: "Reprends aussi les marques découvertes au Module 9" },
];

type NewBrand = {
  brand_name: string;
  contact: string;
  sector: string;
  link: string;
  why: string;
  content_idea: string;
  source: string;
};

const BRAND_INIT: NewBrand = {
  brand_name: "",
  contact: "",
  sector: "",
  link: "",
  why: "",
  content_idea: "",
  source: "",
};

const SECTORS = [
  "Skincare",
  "Make-up",
  "Cheveux",
  "Mode",
  "Food",
  "Boisson",
  "Sport",
  "Maison",
  "Applis / Tech",
  "Voyage",
  "Animaux",
  "Bien-être",
  "Autre",
];

function TagRow({ options }: { options: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {options.map((o) => (
        <span
          key={o}
          className="uppercase tracking-wider text-xs md:text-sm font-bold px-4 py-2 rounded-full"
          style={{ backgroundColor: CREAM, color: OLIVE }}
        >
          {o}
        </span>
      ))}
    </div>
  );
}

function AddBrandButton({
  source,
  onAdded,
}: {
  source: string;
  onAdded: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<NewBrand>({ ...BRAND_INIT, source });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const submit = async () => {
    if (!form.brand_name.trim()) {
      setError("Le nom est obligatoire.");
      return;
    }
    if (!form.sector) {
      setError("Le secteur est obligatoire.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.error === "LIMIT_REACHED") {
          setLimitReached(true);
          setSaving(false);
          return;
        }
        setError(json.error ?? "Erreur");
        setSaving(false);
        return;
      }
      onAdded();
      setForm({ ...BRAND_INIT, source });
      setOpen(false);
    } catch (e) {
      console.error(e);
      setError("Erreur réseau");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full hover:scale-105 transition-transform"
        style={{ backgroundColor: OLIVE, color: "#ffffff" }}
      >
        + Ajouter une marque
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="uppercase tracking-tight font-black text-lg md:text-xl" style={{ color: OLIVE }}>
                  {limitReached ? "Limite atteinte" : "Ajouter une marque"}
                </div>
                {!limitReached && (
                  <div className="mt-1 uppercase tracking-wider text-[10px] md:text-xs" style={{ color: OLIVE, opacity: 0.7 }}>
                    Source : {source}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setLimitReached(false);
                }}
                aria-label="Fermer"
                className="rounded-full w-9 h-9 flex items-center justify-center text-lg"
                style={{ backgroundColor: CREAM, color: OLIVE }}
              >
                ✕
              </button>
            </div>

            {limitReached ? (
              <div className="mt-6 space-y-4">
                <div className="text-4xl text-center">🔒</div>
                <p className="text-base md:text-lg leading-relaxed text-center" style={{ color: OLIVE }}>
                  Tu as atteint la <strong>limite gratuite de 10 marques</strong>.
                  Passe à <strong>Tracker Pro</strong> pour suivre un nombre
                  illimité de marques.
                </p>
                <Link
                  href="/template"
                  className="block w-full text-center uppercase tracking-wider text-xs md:text-sm font-black px-4 py-3 rounded-full hover:scale-[1.02] transition-transform"
                  style={{ backgroundColor: OLIVE, color: "#ffffff" }}
                >
                  Débloquer Tracker Pro →
                </Link>
              </div>
            ) : (
            <div className="mt-6 space-y-3">
              <div>
                <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>
                  Nom de la marque *
                </label>
                <input
                  type="text"
                  value={form.brand_name}
                  onChange={(e) => setForm({ ...form, brand_name: e.target.value })}
                  placeholder="Ex : Cerave"
                  className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
                  style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
                />
              </div>
              <div>
                <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>
                  Secteur *
                </label>
                <select
                  value={form.sector}
                  onChange={(e) => setForm({ ...form, sector: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
                  style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
                >
                  <option value="" disabled>— Choisir —</option>
                  {SECTORS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              {[
                { k: "link" as const, label: "Site / réseau", placeholder: "https://…" },
                { k: "contact" as const, label: "Contact", placeholder: "contact@marque.com ou @marque" },
                { k: "why" as const, label: "Pourquoi elle m'intéresse", placeholder: "Ex : marque que j'utilise déjà" },
                { k: "content_idea" as const, label: "Idée de contenu", placeholder: "Ex : problème peau grasse → solution" },
              ].map((f) => (
                <div key={f.k}>
                  <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>
                    {f.label}
                  </label>
                  <input
                    type="text"
                    value={form[f.k]}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
                    style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
                  />
                </div>
              ))}

              {error && (
                <p className="text-sm text-red-700">{error}</p>
              )}

              <button
                type="button"
                onClick={submit}
                disabled={saving}
                className="mt-4 w-full uppercase tracking-wider text-xs md:text-sm font-black px-4 py-3 rounded-full disabled:opacity-60"
                style={{ backgroundColor: OLIVE, color: "#ffffff" }}
              >
                {saving ? "Enregistrement…" : "Ajouter au Tracker"}
              </button>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ProgressBar({ count }: { count: number }) {
  const capped = Math.min(count, GOAL);
  const pct = (capped / GOAL) * 100;
  const done = count >= GOAL;
  return (
    <div
      className="sticky top-16 md:top-20 z-30 mt-6 rounded-2xl p-4 md:p-5 backdrop-blur"
      style={{ backgroundColor: "rgba(244, 239, 194, 0.95)" }}
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span
          className="uppercase tracking-wider text-[10px] md:text-xs font-black"
          style={{ color: OLIVE }}
        >
          Objectif du module
        </span>
        <span
          className="uppercase tracking-wider text-xs md:text-sm font-black"
          style={{ color: OLIVE }}
        >
          {done ? "🎉 Ta première liste est prête !" : `${capped} / ${GOAL} marques ajoutées`}
        </span>
      </div>
      <div className="mt-3 h-2 rounded-full overflow-hidden bg-white">
        <span
          className="block h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: OLIVE }}
        />
      </div>
    </div>
  );
}

export function Module16Content() {
  const [count, setCount] = useState<number | null>(null);

  const refresh = async () => {
    try {
      const res = await fetch("/api/leads");
      if (!res.ok) return;
      const json = await res.json();
      setCount(json.count ?? 0);
    } catch {}
  };

  useEffect(() => {
    refresh();
  }, []);

  const displayCount = count ?? 0;
  const done = displayCount >= GOAL;

  return (
    <article className="text-[var(--muted)] [&_strong]:text-[#615326]">
      <Link
        href="/dashboard"
        className="inline-block uppercase tracking-wider text-xs md:text-sm hover:opacity-70"
        style={{ color: OLIVE }}
      >
        ← Retour
      </Link>

      <div className="flex items-center gap-5 mt-6">
        <span
          className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
          style={{ transform: "rotate(-10deg)", color: CREAM }}
        >
          <svg
            viewBox="0 0 100 100"
            width="80"
            height="80"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d="M50 8 L62 38 L94 40 L69 60 L78 92 L50 74 L22 92 L31 60 L6 40 L38 38 Z" />
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center font-black text-sm md:text-base leading-none"
            style={{ color: OLIVE }}
          >
            16
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Trouver les bonnes marques à contacter
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Ton portfolio est prêt, tes tarifs sont posés et ton activité est
        cadrée. Il est temps de chercher tes premiers clients.
      </p>

      <ProgressBar count={displayCount} />

      <div className="mt-16 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Prospecter ne veut pas dire envoyer le même message à 100 marques
          au hasard. L'objectif : trouver des entreprises qui pourraient{" "}
          <strong>réellement</strong> avoir besoin de ton contenu et pour
          lesquelles ton profil a du sens. À la fin de ce module, tu vas
          avoir <strong>tes 10 premières marques</strong> à contacter.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Commence par les marques que tu connais déjà
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        C'est souvent le meilleur point de départ. Regarde autour de toi :
      </p>
      <TagRow options={UNIVERSES} />
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Une créatrice lifestyle qui utilise déjà un produit peut beaucoup
        plus facilement <strong>imaginer une idée de contenu naturelle et
        crédible</strong> autour de celui-ci. Note 5 marques que tu utilises
        déjà et avec lesquelles tu pourrais imaginer créer du contenu.
      </p>
      <div className="mt-4">
        <AddBrandButton source="Marques connues" onAdded={refresh} />
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Cherche sur TikTok et Instagram
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Utilise tes réseaux comme <strong>outil de prospection</strong>.
        Quand tu tombes sur une marque, regarde son compte et pose-toi ces
        questions :
      </p>
      <ul className="mt-4 pl-6 list-disc text-base md:text-lg leading-relaxed">
        {IG_CHECKS.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p className="mt-4 text-base md:text-lg leading-relaxed italic">
        Et surtout : <strong>« Est-ce que j'arrive à imaginer une vidéo que
        je pourrais créer pour cette marque ? »</strong>
      </p>
      <div className="mt-4">
        <AddBrandButton source="TikTok / Instagram" onAdded={refresh} />
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Regarde les publicités que tu vois
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        À partir de maintenant, ne scrolle plus les pubs de la même façon.
        Quand une publicité ressemble à une vidéo TikTok ou Reel naturelle,
        demande-toi :
      </p>
      <ul className="mt-4 pl-6 list-disc text-base md:text-lg leading-relaxed">
        <li>Quelle est la marque ?</li>
        <li>Quel est le hook ?</li>
        <li>Est-ce une face cam ? Une voice-over ? Une démonstration ?</li>
        <li>Quel problème la vidéo essaie-t-elle de résoudre ?</li>
      </ul>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Quand une publicité attire ton attention,{" "}
        <strong>note la marque immédiatement.</strong>
      </p>
      <div className="mt-4">
        <AddBrandButton source="Publicités repérées" onAdded={refresh} />
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Utilise la Meta Ad Library
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Un outil gratuit très utile pour ta prospection : la Bibliothèque
        publicitaire Meta, qui permet de rechercher les publicités
        actuellement diffusées sur ses produits.
      </p>
      <div className="mt-4">
        <a
          href={META_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block uppercase tracking-wider text-xs md:text-sm font-black px-5 py-3 rounded-full hover:scale-105 transition-transform"
          style={{ backgroundColor: OLIVE, color: "#ffffff" }}
        >
          Ouvrir la Meta Ad Library →
        </a>
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Recherche une marque qui t'intéresse, puis regarde : diffuse-t-elle
        des publicités ? Utilise-t-elle de la vidéo ? Voit-on des créatrices
        ou clientes ? Quels hooks reviennent ? Et surtout :{" "}
        <em>« Qu'est-ce que je pourrais lui proposer de différent ? »</em>
      </p>
      <div className="mt-4">
        <AddBrandButton source="Meta Ad Library" onAdded={refresh} />
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Cherche des marques dans tes univers
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Reprends les univers définis au Module 2. Ne cherche pas uniquement{" "}
        <em>« marques qui recherchent des créatrices UGC »</em>. Une
        entreprise <strong>n'a pas besoin de publier</strong> qu'elle
        recherche une créatrice UGC pour en avoir besoin. C'est justement le
        principe de la prospection.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { titre: "Beauté", ex: "marques skincare françaises, nouvelle marque cosmétique, marque cheveux naturels, marque beauté e-commerce" },
          { titre: "Food", ex: "marques snacks, boissons fonctionnelles, food e-commerce, marques healthy" },
          { titre: "Lifestyle", ex: "applications, accessoires, maison, bien-être, services, mode, voyage" },
        ].map((u) => (
          <div key={u.titre} className="rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
            <div className="uppercase tracking-tight font-black text-base" style={{ color: OLIVE }}>
              {u.titre}
            </div>
            <p className="mt-2 text-sm md:text-base italic" style={{ color: OLIVE }}>
              {u.ex}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <AddBrandButton source="Recherche par univers" onAdded={refresh} />
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Comment savoir si une marque vaut la peine d'être contactée ?
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Avant de l'ajouter à ta liste, fais ce mini test. La marque…
      </p>
      <ul className="mt-4 pl-6 list-disc text-base md:text-lg leading-relaxed">
        {MINI_TEST.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu n'as pas besoin d'avoir 5/5 à chaque fois. Mais si tu ne sais
        absolument pas <strong>pourquoi cette marque aurait besoin de
        toi</strong>, elle n'est probablement pas prioritaire.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ne cherche pas uniquement les grosses marques
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu peux évidemment garder L'Oréal, Sephora, Nike ou Apple dans ta
        liste si ton profil correspond. Mais ne construis pas toute ta
        prospection autour de marques gigantesques. Cherche aussi :
      </p>
      <TagRow options={ALTERNATIVE_TAGS} />
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Ton objectif n'est pas de décrocher immédiatement la marque la plus
        impressionnante.{" "}
        <strong>Ton objectif est de décrocher ta première bonne
        collaboration.</strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Où trouver encore plus de marques ?
      </h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {SOURCES.map((s) => (
          <div key={s.label} className="rounded-2xl p-4 flex items-start gap-3" style={{ backgroundColor: "#faf7e0" }}>
            <span className="text-2xl">{s.emoji}</span>
            <div>
              <div className="uppercase tracking-tight font-black text-sm md:text-base" style={{ color: OLIVE }}>
                {s.label}
              </div>
              <p className="mt-1 text-xs md:text-sm" style={{ color: OLIVE }}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed italic">
        Une fois que tu commences à chercher avec un œil de créatrice UGC,
        tu vas voir des prospects partout.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer : tes 10 premières marques
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Objectif :
      </p>
      <ul className="mt-4 pl-6 list-disc text-base md:text-lg leading-relaxed">
        <li>3 marques que tu utilises déjà</li>
        <li>3 marques trouvées sur TikTok/Instagram</li>
        <li>2 marques repérées grâce à des publicités</li>
        <li>2 marques découvertes par recherche</li>
      </ul>

      {done ? (
        <div
          className="mt-8 rounded-2xl p-6 md:p-8 text-center"
          style={{ backgroundColor: OLIVE, color: "#ffffff" }}
        >
          <div className="text-4xl mb-2">🎉</div>
          <div className="uppercase tracking-tight font-black text-lg md:text-xl">
            Ta première liste de prospection est prête !
          </div>
          <p className="mt-2 text-sm md:text-base opacity-90">
            Tu peux passer au Module 17 pour transformer cette liste en
            système de prospection.
          </p>
          <Link
            href="/tracker"
            className="mt-4 inline-block uppercase tracking-wider text-[10px] md:text-xs font-black px-4 py-2 rounded-full bg-white"
            style={{ color: OLIVE }}
          >
            Voir mes marques dans le Tracker →
          </Link>
        </div>
      ) : (
        <div
          className="mt-8 rounded-2xl p-6 flex flex-col items-center gap-3 text-center"
          style={{ backgroundColor: CREAM }}
        >
          <p style={{ color: OLIVE }} className="text-base md:text-lg">
            Ajoute tes marques directement à ton Tracker au fur et à mesure.
          </p>
          <AddBrandButton source="À toi de jouer" onAdded={refresh} />
          <Link
            href="/tracker"
            className="uppercase tracking-wider text-[10px] md:text-xs font-black underline"
            style={{ color: OLIVE }}
          >
            Ouvrir mon Tracker →
          </Link>
        </div>
      )}

      <p className="mt-6 text-sm md:text-base italic" style={{ color: OLIVE }}>
        💾 Toutes tes marques sont enregistrées dans{" "}
        <Link href="/tracker" className="underline">ton Tracker</Link>. Ta
        version gratuite te permet de suivre <strong>jusqu'à 10 marques</strong>.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module16Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        maintenant que tu as des marques à contacter, on transforme cette
        liste en véritable système de prospection avec ton Tracker.
      </strong>
    </p>
  );
}
