"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const STORAGE_KEY = "edithappp:module02:persona";

const CATEGORIES = [
  "💄 Beauté & skincare",
  "👗 Mode",
  "✨ Lifestyle",
  "🍝 Food",
  "🏋️ Sport & bien-être",
  "✈️ Voyage",
  "📱 Tech & applications",
  "🏠 Maison",
  "🐶 Animaux",
  "👶 Famille",
];

const PERSONALITY = [
  "Spontanée",
  "Énergique",
  "Posée",
  "Drôle",
  "Naturelle",
  "Pédagogue",
  "Rassurante",
  "Élégante",
  "Expressive",
  "Authentique",
];

const STRENGTHS = [
  "Je suis à l'aise face caméra",
  "J'aime raconter des histoires",
  "J'adore faire de beaux plans",
  "Je suis créative",
  "J'aime le montage",
  "Je suis à l'aise en voice-over",
  "J'ai de l'humour",
  "Je sais expliquer simplement",
  "Je suis très expressive",
  "Je suis attentive aux détails",
];

const VISUAL = [
  "Minimaliste",
  "Lumineux",
  "Naturel",
  "Coloré",
  "Dynamique",
  "Premium",
  "Élégant",
  "Cocooning",
  "Spontané",
  "Fun",
];

const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

function Chip({
  selected,
  disabled,
  onClick,
  children,
}: {
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!!disabled && !selected}
      className={`uppercase tracking-wider text-xs md:text-sm font-bold px-4 py-2 rounded-full transition ${
        selected
          ? "hover:opacity-90"
          : disabled
          ? "opacity-40 cursor-not-allowed"
          : "hover:opacity-80"
      }`}
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

function MultiSelect({
  options,
  selected,
  setSelected,
  max,
}: {
  options: string[];
  selected: string[];
  setSelected: (v: string[]) => void;
  max?: number;
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      setSelected(selected.filter((s) => s !== opt));
    } else if (!max || selected.length < max) {
      setSelected([...selected, opt]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {options.map((opt) => (
        <Chip
          key={opt}
          selected={selected.includes(opt)}
          disabled={!!max && selected.length >= max}
          onClick={() => toggle(opt)}
        >
          {opt}
        </Chip>
      ))}
    </div>
  );
}

function Recap({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-4">
      <div className="uppercase tracking-wider text-xs md:text-sm font-bold" style={{ color: OLIVE }}>
        {label}
      </div>
      <div className="flex flex-wrap gap-2 mt-2 min-h-[36px]">
        {items.length === 0 ? (
          <span className="italic text-[var(--muted)] text-sm">
            (aucune sélection pour l'instant)
          </span>
        ) : (
          items.map((s) => (
            <span
              key={s}
              className="uppercase tracking-wider text-xs md:text-sm font-bold px-4 py-2 rounded-full"
              style={{ backgroundColor: OLIVE, color: "#ffffff" }}
            >
              {s}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

export function Module02Content() {
  const [categories, setCategories] = useState<string[]>([]);
  const [personality, setPersonality] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [visual, setVisual] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setCategories(d.categories ?? []);
        setPersonality(d.personality ?? []);
        setStrengths(d.strengths ?? []);
        setVisual(d.visual ?? []);
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ categories, personality, strengths, visual })
    );
  }, [loaded, categories, personality, strengths, visual]);

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
            02
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Trouver ton persona UGC
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Trouve ton univers sans t'enfermer dans une case.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Avant de commencer à créer, pose{" "}
          <strong>les premières bases de ton identité de créatrice</strong>.
          L'objectif n'est pas de trouver ton positionnement parfait aujourd'hui,
          mais de comprendre ce que tu aimes, ce qui te correspond et ce qui peut
          te différencier.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* 01 */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        C'est quoi, ton persona UGC ?
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Ton persona, c'est ce que tu vas naturellement dégager dans tes
          contenus :{" "}
          <strong>
            ta personnalité, ton énergie, tes univers, ton esthétique et ta façon
            de créer.
          </strong>
        </p>
        <p>
          Deux créatrices peuvent présenter exactement le même produit de deux
          façons complètement différentes : l'une avec une vidéo esthétique en
          voice-over, l'autre avec une face cam spontanée et humoristique.
        </p>
        <p>
          Ton objectif n'est pas de ressembler aux autres créatrices. C'est de{" "}
          <strong>découvrir progressivement ce qui fonctionne chez toi.</strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* 02 */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Choisis tes univers
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Tu n'as pas besoin de choisir une seule niche. Pour commencer,{" "}
          <strong>sélectionne 3 catégories</strong> qui correspondent vraiment à
          tes goûts et à ton quotidien.
        </p>
      </div>
      <MultiSelect
        options={CATEGORIES}
        selected={categories}
        setSelected={setCategories}
        max={3}
      />
      <p className="mt-4 text-sm md:text-base italic">
        💡 <strong>Conseil</strong> : ne choisis pas une catégorie uniquement
        parce que tu penses qu'elle rapporte. Demande-toi plutôt : « Est-ce que
        j'utilise déjà ces produits ? Est-ce que j'aurais envie de créer
        régulièrement autour de cet univers ? »
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* 03 */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Identifie ta personnalité de créatrice
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Ton persona ne doit surtout pas devenir un personnage. Si tu es
          naturellement calme, ne te force pas à crier devant la caméra parce
          que tu vois d'autres créatrices le faire.
        </p>
        <p>
          <strong>Sélectionne 3 mots qui te ressemblent le plus.</strong>
        </p>
      </div>
      <MultiSelect
        options={PERSONALITY}
        selected={personality}
        setSelected={setPersonality}
        max={3}
      />

      <hr className="my-10 border-[var(--border)]" />

      {/* 04 */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Trouve tes points forts
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Même si tu débutes, certaines choses vont probablement être plus
          naturelles pour toi.
        </p>
        <p>
          <strong>Qu'est-ce qui te ressemble ?</strong>
        </p>
      </div>
      <MultiSelect
        options={STRENGTHS}
        selected={strengths}
        setSelected={setStrengths}
      />
      <p className="mt-4 text-sm md:text-base italic">
        Pas besoin de tout cocher.{" "}
        <strong>Deux ou trois forces suffisent</strong> pour commencer.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* 05 */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Commence à définir ton univers visuel
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Maintenant,{" "}
          <strong>choisis 3 mots qui correspondent aux contenus que tu aimerais créer</strong>
          .
        </p>
      </div>
      <MultiSelect
        options={VISUAL}
        selected={visual}
        setSelected={setVisual}
        max={3}
      />
      <p className="mt-4 text-sm md:text-base italic">
        Ça ne veut pas dire que toutes tes vidéos devront se ressembler. C'est
        simplement une première direction.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* 06 */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Inspire-toi sans copier
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Choisis 3 créatrices ou vidéos UGC que tu aimes et demande-toi{" "}
          <strong>précisément pourquoi</strong>.
        </p>
        <p>Au lieu de noter « J'aime ses vidéos », cherche plutôt :</p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « J'aime ses face cams parce qu'on a l'impression qu'elle parle à une
          amie. »
        </p>
        <p>ou :</p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « J'aime ses vidéos parce que son montage est dynamique sans faire
          trop publicité. »
        </p>
        <p>
          Petit à petit, tu vas comprendre ce qui t'attire et pouvoir créer{" "}
          <strong>ta propre combinaison</strong>.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Fiche récap */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        À partir de tes réponses, voici ta première fiche :
      </p>

      <div
        className="mt-6 rounded-2xl p-6 md:p-8"
        style={{ backgroundColor: CREAM }}
      >
        <Recap label="Mes univers" items={categories} />
        <Recap label="Ma personnalité" items={personality} />
        <Recap label="Mes forces" items={strengths} />
        <Recap label="Mon style visuel" items={visual} />

        {categories.length > 0 && (
          <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: OLIVE }}>
            <strong>
              « Je veux commencer par créer du contenu autour de{" "}
              {categories.join(", ")}. Mon style sera plutôt{" "}
              {visual.join(", ") || "…"}, avec une personnalité{" "}
              {personality.join(", ") || "…"}. »
            </strong>
          </p>
        )}
      </div>

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Et c'est tout.{" "}
        <strong>Ne passe pas trois jours sur cet exercice.</strong> Ton persona
        va surtout se préciser en créant tes premières vidéos.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module02Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        le matériel dont tu as réellement besoin pour commencer.
      </strong>
    </p>
  );
}
