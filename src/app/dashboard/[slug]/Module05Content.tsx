"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const STORAGE_KEY = "edithappp:module05:formats";

type Format = {
  id: string;
  icon: string;
  title: string;
  intro: React.ReactNode;
  extra?: React.ReactNode;
};

const FORMATS: Format[] = [
  {
    id: "face-cam",
    icon: "🎥",
    title: "La face cam",
    intro: (
      <>
        <p>
          Tu parles directement à la caméra,{" "}
          <strong>comme si tu recommandais quelque chose à une amie.</strong>{" "}
          Elle fonctionne particulièrement bien pour partager une expérience,
          raconter une histoire ou expliquer un problème.
        </p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « J'ai testé plein de produits pour éviter que ma peau tiraille après
          la douche, et celui-là est clairement celui que je préfère. »
        </p>
        <p>
          <strong>À travailler</strong> : naturel, énergie, regard caméra et
          diction.
        </p>
      </>
    ),
  },
  {
    id: "voice-over",
    icon: "🎙️",
    title: "La voice-over",
    intro: (
      <>
        <p>
          Tu filmes différents plans du produit ou de son utilisation, puis tu{" "}
          <strong>ajoutes ta voix par-dessus.</strong> C'est pratique si tu es
          encore peu à l'aise face caméra et parfait pour montrer une routine,
          une démonstration ou une expérience.
        </p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « Ça fait deux semaines que j'ai ajouté ce produit à ma routine du
          matin et voilà comment je l'utilise… »
        </p>
        <p>
          Évite simplement d'enchaîner de beaux plans sans raconter quelque
          chose. <strong>La voice-over doit apporter une histoire ou une
          information.</strong>
        </p>
      </>
    ),
  },
  {
    id: "probleme-solution",
    icon: "🎯",
    title: "Le problème → solution",
    intro: (
      <>
        <p>
          C'est <strong>l'un des grands classiques de l'UGC.</strong> Tu
          commences par un problème auquel la cible peut s'identifier, puis tu
          introduis le produit comme une solution.
        </p>
        <div className="flex flex-wrap items-center gap-2 my-3">
          {["Problème", "Solution", "Utilisation", "Bénéfice"].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span
                className="uppercase tracking-wider text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: CREAM, color: OLIVE }}
              >
                {s}
              </span>
              {i < 3 && <span style={{ color: OLIVE }}>→</span>}
            </span>
          ))}
        </div>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « Si ton fond de teint ne tient jamais jusqu'à la fin de la journée,
          teste ça avant de te maquiller. »
        </p>
        <p>
          Le produit n'arrive donc pas au hasard :{" "}
          <strong>il répond à un besoin.</strong>
        </p>
      </>
    ),
  },
  {
    id: "demonstration",
    icon: "🧴",
    title: "La démonstration produit",
    intro: (
      <>
        <p>
          Ici,{" "}
          <strong>tu montres concrètement comment le produit fonctionne.</strong>{" "}
          Ça peut être :
        </p>
        <div className="flex flex-wrap gap-2 my-3">
          {["Avant / après", "Tutoriel", "Test", "Application", "Démonstration"].map(
            (s) => (
              <span
                key={s}
                className="uppercase tracking-wider text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: CREAM, color: OLIVE }}
              >
                {s}
              </span>
            )
          )}
        </div>
        <p>
          Par exemple, pour un produit ménager, montrer la surface avant →
          utiliser le produit → montrer le résultat.
        </p>
        <p>
          Quand un produit a un <strong>résultat très visuel</strong>,
          montre-le plutôt que de simplement l'expliquer.
        </p>
      </>
    ),
  },
  {
    id: "temoignage",
    icon: "⭐",
    title: "Le témoignage",
    intro: (
      <>
        <p>
          Le témoignage repose sur{" "}
          <strong>ton expérience avec le produit.</strong> L'idée n'est pas de
          réciter une liste de caractéristiques :
        </p>
        <p className="italic pl-4 border-l-2 border-red-200">
          ❌ « Cette crème contient X, Y et Z. »
        </p>
        <p>
          Mais plutôt d'expliquer{" "}
          <strong>ce que cela change concrètement pour toi</strong> :
        </p>
        <p className="italic pl-4 border-l-2 border-green-200">
          ✅ « Ce que j'aime surtout, c'est qu'elle hydrate ma peau sans
          laisser cette sensation grasse que je déteste. »
        </p>
        <p>Le contenu paraît ainsi beaucoup plus naturel.</p>
        <p>
          <strong>Reste honnête</strong> : n'invente jamais une expérience ou un
          résultat que tu n'as pas obtenu.
        </p>
      </>
    ),
  },
  {
    id: "unboxing",
    icon: "📦",
    title: "L'unboxing",
    intro: (
      <>
        <p>
          Tu filmes la découverte du produit : colis, packaging, ouverture,
          détails, première réaction… L'unboxing peut fonctionner seul, mais il{" "}
          <strong>
            devient souvent plus intéressant lorsqu'il est associé à une
            histoire ou une première utilisation.
          </strong>
        </p>
        <p>Au lieu de simplement :</p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « J'ai reçu ce colis aujourd'hui. »
        </p>
        <p>Tu peux créer davantage de curiosité :</p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « J'attendais ce colis depuis une semaine parce que tout le monde me
          parle de ce produit… »
        </p>
      </>
    ),
  },
  {
    id: "storytelling",
    icon: "📖",
    title: "Le storytelling",
    intro: (
      <>
        <p>
          Ici, <strong>le produit est intégré dans une petite histoire.</strong>{" "}
          Par exemple :
        </p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « Je partais en week-end et évidemment, j'avais encore oublié de
          charger mon téléphone… »
        </p>
        <p>
          Puis tu introduis naturellement la batterie externe. Le produit devient
          une partie de l'histoire au lieu d'être présenté directement comme une
          publicité.
        </p>
        <p>
          Un bon storytelling{" "}
          <strong>
            fait souvent oublier qu'on est en train de regarder une présentation
            produit.
          </strong>
        </p>
      </>
    ),
  },
];

const FORMAT_OPTIONS = [
  "Face cam",
  "Voice-over",
  "Problème / solution",
  "Démonstration",
  "Témoignage",
  "Unboxing",
  "Storytelling",
];

const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="uppercase tracking-wider text-xs md:text-sm font-bold px-4 py-2 rounded-full transition hover:opacity-80"
      style={
        selected
          ? { backgroundColor: OLIVE, color: "#ffffff" }
          : { backgroundColor: CREAM, color: OLIVE }
      }
    >
      {children}
    </button>
  );
}

function FormatSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {FORMAT_OPTIONS.map((o) => (
        <Chip key={o} selected={value === o} onClick={() => onChange(o === value ? "" : o)}>
          {o}
        </Chip>
      ))}
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
    <div className="mt-3">
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

type Concept = { format: string; hook: string };
const EMPTY_CONCEPT: Concept = { format: "", hook: "" };

export function Module05Content() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [concepts, setConcepts] = useState<Concept[]>([
    { ...EMPTY_CONCEPT },
    { ...EMPTY_CONCEPT },
    { ...EMPTY_CONCEPT },
  ]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (Array.isArray(d.concepts) && d.concepts.length === 3) {
          setConcepts(d.concepts);
        }
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ concepts }));
  }, [loaded, concepts]);

  const updateConcept = (i: number, patch: Partial<Concept>) => {
    setConcepts((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  };

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
            05
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Les formats UGC à maîtriser
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Une même marque peut avoir besoin de contenus complètement différents.
        Plus tu maîtrises de formats, plus tu peux t'adapter à ses besoins.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Tu n'as pas besoin d'en maîtriser 15 pour commencer. L'objectif de ce
          module est de{" "}
          <strong>
            découvrir les formats essentiels et d'en tester plusieurs avant de
            construire ton portfolio.
          </strong>
        </p>
        <p className="italic">Clique sur une carte pour découvrir un format.</p>
      </div>

      {/* Cartes formats */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {FORMATS.map((f) => {
          const isOpen = openId === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setOpenId(isOpen ? null : f.id)}
              className="basis-[calc(50%-0.375rem)] md:basis-[calc(33.333%-0.5rem)] lg:basis-[calc(25%-0.5625rem)] shrink-0 rounded-2xl p-4 md:p-5 flex flex-col items-center text-center transition hover:scale-[1.02]"
              style={{
                backgroundColor: isOpen ? OLIVE : CREAM,
                color: isOpen ? "#ffffff" : OLIVE,
              }}
            >
              <div className="text-3xl md:text-4xl">{f.icon}</div>
              <div className="mt-2 uppercase tracking-tight text-sm md:text-base font-black leading-tight">
                {f.title}
              </div>
            </button>
          );
        })}
      </div>

      {openId && (
        <div
          className="mt-6 rounded-2xl p-6 md:p-8 space-y-4 text-base md:text-lg leading-relaxed"
          style={{ backgroundColor: CREAM }}
        >
          {(() => {
            const f = FORMATS.find((x) => x.id === openId)!;
            return (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{f.icon}</span>
                  <h3
                    className="uppercase tracking-tight text-lg md:text-xl font-black"
                    style={{ color: OLIVE }}
                  >
                    {f.title}
                  </h3>
                </div>
                <div className="space-y-3">{f.intro}</div>
              </>
            );
          })()}
        </div>
      )}

      <hr className="my-10 border-[var(--border)]" />

      {/* Un format n'est pas une formule rigide */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Un format n'est pas une formule rigide
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          <strong>Tu peux mélanger les formats.</strong> Une vidéo peut commencer
          en face cam, continuer avec une démonstration en B-roll, intégrer une
          voice-over et terminer avec un témoignage. C'est même très fréquent.
        </p>
        <p>L'objectif est donc moins de penser :</p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « Aujourd'hui, je dois faire UNE vidéo voice-over. »
        </p>
        <p>
          que de comprendre <strong>quels outils vont servir ton idée.</strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* À toi de jouer */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer — teste 3 formats
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Reprends le produit utilisé dans le module précédent et imagine{" "}
        <strong>3 façons différentes de le présenter.</strong>
      </p>

      <div className="mt-6 space-y-4">
        {concepts.map((c, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 md:p-7"
            style={{ backgroundColor: CREAM }}
          >
            <div
              className="uppercase tracking-wider text-xs md:text-sm font-black"
              style={{ color: OLIVE }}
            >
              Concept {i + 1}
            </div>
            <div className="mt-3">
              <label
                className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2"
                style={{ color: OLIVE }}
              >
                Format
              </label>
              <FormatSelect
                value={c.format}
                onChange={(v) => updateConcept(i, { format: v })}
              />
            </div>
            <TextField
              label="Hook"
              value={c.hook}
              onChange={(v) => updateConcept(i, { hook: v })}
              placeholder="La phrase d'accroche"
            />
          </div>
        ))}
      </div>

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Puis tourne <strong>au moins 2 des 3 concepts.</strong> Tu vas
        rapidement remarquer qu'un même produit peut donner des vidéos
        complètement différentes.
      </p>

      <p className="mt-4 text-base md:text-lg leading-relaxed italic">
        <strong>Garde ces vidéos</strong> : au module 10, on fera le tri
        pour sélectionner celles qui pourront intégrer ton portfolio.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module05Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        maintenant que tu connais les formats, on va apprendre à construire une
        vidéo qui retient vraiment l'attention.
      </strong>
    </p>
  );
}
