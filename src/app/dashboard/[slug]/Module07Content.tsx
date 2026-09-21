"use client";

import Link from "next/link";
import { useWorkbookField } from "@/lib/useWorkbookField";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const WORKBOOK_KEY = "module07:shotlist";
const SCRIPT_WORKBOOK_KEY = "module06:script";
type Shots = {
  face: string;
  plan: string;
  gros: string;
  utilisation: string;
  resultat: string;
  autre: string;
};
const SHOTS_INIT: Shots = {
  face: "",
  plan: "",
  gros: "",
  utilisation: "",
  resultat: "",
  autre: "",
};

const SHOT_TYPES_EXAMPLE = [
  "Face cam",
  "Produit en main",
  "Ouverture",
  "Texture",
  "Application",
  "Résultat",
];

const PLAN_VARIETY = [
  "Plan large",
  "Plan rapproché",
  "Gros plan",
  "POV",
  "Plan en mouvement",
];

const BROLL_TYPES = [
  "Ouvrir",
  "Verser",
  "Appliquer",
  "Utiliser",
  "Texture",
  "Détail",
  "Avant / après",
];

const BROLL_GALLERY = [
  { src: "/broll/unboxing.jpeg", label: "Unboxing" },
  { src: "/broll/verser.jpeg", label: "Verser" },
  { src: "/broll/texture.jpeg", label: "Texture" },
  { src: "/broll/utilisation.jpeg", label: "Utilisation" },
  { src: "/broll/gros-plan.jpeg", label: "Gros plan" },
  { src: "/broll/resultat.jpeg", label: "Résultat" },
];

type Module6Script = {
  hook?: string;
  problem?: string;
  solution?: string;
  benefit1?: string;
  benefit2?: string;
  proof?: string;
  cta?: string;
};

const CHECKLIST_TOURNAGE = [
  { emoji: "🧼", label: "Objectif propre" },
  { emoji: "🔋", label: "Batterie" },
  { emoji: "💾", label: "Stockage" },
  { emoji: "🔕", label: "Notifications coupées" },
  { emoji: "🎙️", label: "Son testé" },
  { emoji: "☀️", label: "Lumière vérifiée" },
];

const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

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

function BeforeAfter({
  bad,
  good,
  images,
}: {
  bad: string;
  good: string;
  images?: { bad: string; good: string };
}) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
      <div className="rounded-2xl overflow-hidden border-2 border-red-200 bg-red-50/40">
        {images && (
          <div className="aspect-[3/4] bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.bad}
              alt="Mauvais exemple"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <div className="uppercase tracking-wider text-[10px] md:text-xs font-black text-red-700">
            ❌ À éviter
          </div>
          <p className="mt-2 italic text-sm md:text-base leading-relaxed" style={{ color: OLIVE }}>
            {bad}
          </p>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: CREAM }}>
        {images && (
          <div className="aspect-[3/4] bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.good}
              alt="Bon exemple"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE }}>
            ✅ À faire
          </div>
          <p className="mt-2 italic text-sm md:text-base leading-relaxed" style={{ color: OLIVE }}>
            {good}
          </p>
        </div>
      </div>
    </div>
  );
}

function BrollGallery() {
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {BROLL_GALLERY.map((v) => (
        <div key={v.label} className="text-center">
          <div
            className="aspect-[9/16] rounded-2xl overflow-hidden"
            style={{ backgroundColor: CREAM }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={v.src}
              alt={v.label}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="mt-2 uppercase tracking-wider text-[10px] md:text-xs font-bold"
            style={{ color: OLIVE }}
          >
            {v.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScriptRecap({ script }: { script: Module6Script | null }) {
  const rows: { label: string; value?: string }[] = [
    { label: "Hook", value: script?.hook },
    { label: "Problème", value: script?.problem },
    { label: "Solution", value: script?.solution },
    { label: "Bénéfice 1", value: script?.benefit1 },
    { label: "Bénéfice 2", value: script?.benefit2 },
    { label: "Preuve", value: script?.proof },
    { label: "CTA", value: script?.cta },
  ];
  const hasScript = rows.some((r) => r.value && r.value.trim().length > 0);
  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: "#faf7e0" }}>
      <div
        className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-4"
        style={{ color: OLIVE }}
      >
        Ton script (module 06)
      </div>
      {!hasScript ? (
        <p className="text-sm md:text-base italic" style={{ color: OLIVE }}>
          Tu n'as pas encore rempli ton script dans le module 06. Reviens ici
          après l'avoir écrit — il s'affichera automatiquement.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.label}>
              <div
                className="uppercase tracking-wider text-[10px] md:text-xs font-bold mb-1"
                style={{ color: OLIVE }}
              >
                {r.label}
              </div>
              <div
                className="rounded-xl bg-white px-4 py-3 text-sm md:text-base leading-relaxed min-h-[44px]"
                style={{ color: OLIVE, border: `1.5px solid ${CREAM}` }}
              >
                {r.value?.trim() || <span className="opacity-40">—</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="mt-4">
      <label
        className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2"
        style={{ color: OLIVE }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
        style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
      />
    </div>
  );
}

export function Module07Content() {
  const [shots, setShots] = useWorkbookField<Shots>(WORKBOOK_KEY, SHOTS_INIT);
  const [script] = useWorkbookField<Module6Script | null>(SCRIPT_WORKBOOK_KEY, null);
  const setShot = (k: keyof Shots, v: string) =>
    setShots((s) => ({ ...s, [k]: v }));

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
            07
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Apprendre à filmer du contenu UGC
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Un bon script peut perdre tout son impact s'il est mal filmé.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Bonne nouvelle :{" "}
          <strong>
            quelques réflexes simples suffisent déjà à faire une grosse
            différence.
          </strong>{" "}
          L'objectif n'est pas d'avoir une image « cinéma », mais de créer un
          contenu <strong>propre, naturel, dynamique et agréable à regarder.</strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Prépare ton tournage */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Prépare ton tournage avant de filmer
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Avant d'appuyer sur REC, relis ton script et{" "}
          <strong>transforme-le en petite liste de plans.</strong> Par exemple,
          pour une crème :
        </p>
      </div>
      <TagRow options={SHOT_TYPES_EXAMPLE} />
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Cette liste s'appelle une <strong>shot list</strong>. Elle t'évite de
        terminer ton montage et de réaliser qu'il te manque LE plan dont tu
        avais besoin.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Soigne ton cadrage */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Soigne ton cadrage
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Pour du contenu TikTok/Reels, tu filmeras{" "}
          <strong>très souvent en vertical 9:16.</strong>
        </p>
        <p>En face cam :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Place ton téléphone à peu près à hauteur des yeux</li>
          <li>
            <strong>Regarde l'objectif</strong>, pas ton propre visage à l'écran
          </li>
          <li>Évite de couper bizarrement le haut de ta tête ou ton menton</li>
          <li>Laisse un peu d'espace si du texte doit être ajouté</li>
          <li>Vérifie ton arrière-plan avant de tourner</li>
        </ul>
        <p>
          Pense aussi aux éléments d'interface qui peuvent recouvrir le contenu
          une fois publié :{" "}
          <strong>
            évite de placer les informations importantes complètement en haut
            ou en bas de l'écran.
          </strong>
        </p>
      </div>

      <BeforeAfter
        bad="Cadrage penché, tête coupée, arrière-plan chargé qui détourne l'attention."
        good="Téléphone à hauteur des yeux, sujet centré, fond simple et propre."
      />

      <hr className="my-10 border-[var(--border)]" />

      {/* Utilise une bonne lumière */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Utilise une bonne lumière
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Tu l'as vu dans le module matériel :{" "}
          <strong>une fenêtre peut largement suffire.</strong> Teste plusieurs
          positions :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Face à la fenêtre</strong> → lumière généralement uniforme
          </li>
          <li>
            <strong>De ¾</strong> → plus de relief
          </li>
          <li>
            <strong>Dos à la fenêtre</strong> → attention au contre-jour
          </li>
        </ul>
      </div>

      <BeforeAfter
        bad="Pièce sombre, contre-jour, teint terne."
        good="Face à la fenêtre, lumière naturelle uniforme sur le visage."
        images={{ bad: "/lighting/mauvaise.jpg", good: "/lighting/bonne.jpeg" }}
      />

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Avant de tourner toute ta vidéo,{" "}
        <strong>filme 5 secondes, regarde le résultat et ajuste.</strong>
        Simple, mais ça peut t'éviter de refaire tout ton tournage.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Varie tes plans */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Varie tes plans
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          <strong>Évite de filmer ton produit toujours de la même façon.</strong>{" "}
          Pour une seule scène, tu peux créer plusieurs plans :
        </p>
      </div>
      <TagRow options={PLAN_VARIETY} />
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Exemple : tu prépares un café. Machine entière → main qui prend la
        capsule → gros plan sur le café qui coule → tasse dans la main →
        première gorgée. <strong>Une seule action = plusieurs possibilités de
        plans.</strong> C'est cette variété qui te donnera{" "}
        <strong>beaucoup plus de liberté au montage.</strong>
      </p>

      <BeforeAfter
        bad="Un seul plan large, statique, pris du même angle du début à la fin."
        good="Alternance : plan large → gros plan → main qui manipule → détail texture."
      />

      <hr className="my-10 border-[var(--border)]" />

      {/* Apprends à filmer du B-roll */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Apprends à filmer du B-roll
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Le <strong>B-roll</strong>, ce sont les plans complémentaires qui
          viennent illustrer ce que tu racontes. Si tu dis :
        </p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « Je l'utilise tous les matins avant de me maquiller. »
        </p>
        <p>
          Tu peux montrer en même temps l'application du produit, plutôt que de{" "}
          <strong>rester face caméra pendant toute la phrase.</strong>
        </p>
        <p>Quelques B-roll simples :</p>
      </div>
      <TagRow options={BROLL_TYPES} />

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Pense toujours : <em>« Est-ce que je peux montrer ce que je suis en
        train de dire ? »</em>
      </p>

      <div
        className="mt-6 rounded-2xl p-4 md:p-6"
        style={{ backgroundColor: "#faf7e0" }}
      >
        <div
          className="uppercase tracking-wider text-[10px] md:text-xs font-black text-center mb-2"
          style={{ color: OLIVE }}
        >
          6 B-roll essentiels
        </div>
        <BrollGallery />
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Fais plusieurs prises */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Fais plusieurs prises
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          <strong>Ne t'arrête pas forcément à la première prise correcte.</strong>{" "}
          Pour un plan important, filme 2 ou 3 versions : change légèrement ton
          cadrage, ton mouvement ou ton énergie.
        </p>
        <p>
          Pour une face cam, tu peux aussi{" "}
          <strong>refaire uniquement une phrase</strong> plutôt que recommencer
          toute la vidéo. Au montage, tu seras contente d'avoir le choix.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Quelques détails qui changent tout */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Quelques détails qui changent tout
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Avant chaque tournage :
      </p>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {CHECKLIST_TOURNAGE.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ backgroundColor: CREAM, color: OLIVE }}
          >
            <span className="text-2xl">{c.emoji}</span>
            <span className="uppercase tracking-wider text-[10px] md:text-xs font-black">
              {c.label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Et surtout, pense au produit : packaging propre, étiquette visible
        quand c'est pertinent, <strong>pas de traces de doigts sur un flacon
        que tu filmes en gros plan.</strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Les erreurs à éviter */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Les erreurs à éviter
      </h2>
      <ul className="mt-4 list-none pl-0 space-y-2 text-base md:text-lg leading-relaxed">
        <li>❌ Filmer tous les plans depuis exactement le même angle</li>
        <li>❌ Utiliser uniquement du face caméra</li>
        <li>❌ Avoir un arrière-plan qui détourne l'attention</li>
        <li>❌ Filmer trop sombre ou en contre-jour</li>
        <li>❌ Faire des mouvements trop rapides ou tremblants</li>
        <li>❌ Oublier de filmer suffisamment de B-roll</li>
        <li>❌ Tourner toute la vidéo sans vérifier un premier rush</li>
      </ul>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Pas besoin d'être vidéaste.{" "}
        <strong>Il faut surtout apprendre à observer ton image.</strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* À toi de jouer */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer : tourne ta vidéo
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Reprends le script créé dans le module précédent et crée ta{" "}
        <strong>shot list</strong>. Garde cette page ouverte pendant ton
        tournage.
      </p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <ScriptRecap script={script} />

        <div
          className="rounded-2xl p-6 md:p-8 space-y-2"
          style={{ backgroundColor: CREAM }}
        >
          <div
            className="uppercase tracking-wider text-[10px] md:text-xs font-black"
            style={{ color: OLIVE }}
          >
            Ta shot list
          </div>
          <TextField
            label="Face cam"
            value={shots.face}
            onChange={(v) => setShot("face", v)}
            placeholder="Ex : je parle du problème face caméra"
          />
          <TextField
            label="Plan produit"
            value={shots.plan}
            onChange={(v) => setShot("plan", v)}
            placeholder="Ex : produit posé sur mon lavabo"
          />
          <TextField
            label="Gros plan"
            value={shots.gros}
            onChange={(v) => setShot("gros", v)}
            placeholder="Ex : gros plan sur l'étiquette"
          />
          <TextField
            label="Produit en utilisation"
            value={shots.utilisation}
            onChange={(v) => setShot("utilisation", v)}
            placeholder="Ex : main qui applique la crème"
          />
          <TextField
            label="Résultat"
            value={shots.resultat}
            onChange={(v) => setShot("resultat", v)}
            placeholder="Ex : peau lisse une fois appliqué"
          />
          <TextField
            label="Autre plan"
            value={shots.autre}
            onChange={(v) => setShot("autre", v)}
            placeholder="Ex : plan large de ma salle de bain"
          />
        </div>
      </div>

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Puis tourne ta vidéo avec au moins <strong>5 plans différents</strong>.
        Pour chaque plan important, essaie de faire <strong>2 prises</strong>.
      </p>

      <p className="mt-6 text-sm md:text-base italic" style={{ color: OLIVE }}>
        💾 Tu retrouveras <strong>ta shot list</strong> à tout moment dans{" "}
        <Link href="/compte" className="underline">Mon compte</Link>.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module07Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        on transforme maintenant tous tes rushs en une vraie vidéo UGC avec les
        bases du montage.
      </strong>
    </p>
  );
}
