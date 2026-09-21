"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useWorkbookField } from "@/lib/useWorkbookField";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const CALC_KEY = "module13:calc";
const GRID_KEY = "module13:grid";

const WORKFLOW = [
  "Brief",
  "Recherche",
  "Concept",
  "Script",
  "Tournage",
  "Montage",
  "Sous-titres",
  "Retours",
  "Livraison",
];

const OPTION_TAGS = [
  "Hook supplémentaire",
  "Rushs bruts",
  "CTA supplémentaire",
  "Photo UGC",
  "Livraison express",
  "Variante",
  "Droits ads",
];

const RIGHTS_TAGS = ["Organique", "Publicité / Ads", "1 mois", "3 mois", "6 mois", "Plusieurs plateformes"];

const PROGRESSION = [
  { label: "Expérience", arrow: "↑" },
  { label: "Qualité", arrow: "↑" },
  { label: "Demandes", arrow: "↑" },
  { label: "Résultats", arrow: "↑" },
];

type CalcState = {
  brief: string;
  script: string;
  prep: string;
  tournage: string;
  montage: string;
  echanges: string;
  tarif: string;
};

type GridState = {
  video1: string;
  pack3: string;
  pack5: string;
  hook: string;
  cta: string;
  rushs: string;
  express: string;
  autre: string;
  baseIncludes: string;
};

const CALC_INIT: CalcState = {
  brief: "",
  script: "",
  prep: "",
  tournage: "",
  montage: "",
  echanges: "",
  tarif: "",
};

const GRID_INIT: GridState = {
  video1: "",
  pack3: "",
  pack5: "",
  hook: "",
  cta: "",
  rushs: "",
  express: "",
  autre: "",
  baseIncludes: "",
};

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

function ArrowFlow({ items }: { items: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2 justify-center">
      {items.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span
            className="uppercase tracking-tight text-xs md:text-sm font-black px-4 py-2 rounded-full"
            style={{ backgroundColor: OLIVE, color: "#ffffff" }}
          >
            {s}
          </span>
          {i < items.length - 1 && <span style={{ color: OLIVE }}>→</span>}
        </span>
      ))}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  suffix,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2"
        style={{ color: OLIVE }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
          style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
        />
        {suffix && (
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black uppercase tracking-wider"
            style={{ color: OLIVE, opacity: 0.6 }}
          >
            {suffix}
          </span>
        )}
      </div>
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
    <div>
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

export function Module13Content() {
  const [calc, setCalc] = useWorkbookField<CalcState>(CALC_KEY, CALC_INIT);
  const [grid, setGrid] = useWorkbookField<GridState>(GRID_KEY, GRID_INIT);
  const setC = (k: keyof CalcState, v: string) => setCalc((s) => ({ ...s, [k]: v }));
  const setG = (k: keyof GridState, v: string) => setGrid((s) => ({ ...s, [k]: v }));

  const totalMinutes = useMemo(() => {
    const keys: (keyof CalcState)[] = ["brief", "script", "prep", "tournage", "montage", "echanges"];
    return keys.reduce((sum, k) => sum + (Number.parseFloat(calc[k]) || 0), 0);
  }, [calc]);

  const totalHours = totalMinutes / 60;
  const tarif = Number.parseFloat(calc.tarif) || 0;
  const hourly = totalHours > 0 && tarif > 0 ? tarif / totalHours : 0;
  const hourlyDisplay = hourly ? hourly.toFixed(0) : "—";

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
            13
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Fixer ses tarifs UGC
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        « Je demande combien pour une vidéo ? » C'est probablement l'une des
        premières questions que tu vas te poser.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Il n'existe pas un tarif universel pour une vidéo UGC. Ton prix
          dépend de <strong>ce que la marque te demande, du travail
          nécessaire, de ton expérience et de l'utilisation prévue du
          contenu.</strong>
        </p>
        <p>
          L'objectif de ce module :{" "}
          <strong>
            construire ta première grille tarifaire, que tu pourras ensuite
            faire évoluer.
          </strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Ce que tu factures */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ce que tu factures vraiment
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Une vidéo de 30 secondes ne représente pas seulement 30 secondes de
        travail. Derrière, il peut y avoir :
      </p>
      <ArrowFlow items={WORKFLOW} />
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        C'est tout ce travail que ton tarif doit prendre en compte. Ne fixe
        donc pas ton prix uniquement selon <strong>la durée finale</strong>{" "}
        de la vidéo.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Tarif de base */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Commence par un tarif de base
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Pour simplifier tes devis, définis un{" "}
        <strong>tarif de base pour 1 vidéo UGC</strong> avec une prestation
        clairement définie. Par exemple : préparation + script + tournage +
        montage + sous-titres + 1 aller-retour de modifications.
      </p>
      <div
        className="mt-6 rounded-2xl p-5 md:p-6"
        style={{ backgroundColor: CREAM }}
      >
        <p style={{ color: OLIVE }} className="text-base md:text-lg leading-relaxed">
          C'est un exemple de structure, pas une règle.{" "}
          <strong>
            À toi de définir précisément ce qui est inclus dans ton offre.
          </strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Options */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Tout ne doit pas être inclus dans ton prix de base
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Certaines demandes représentent du travail ou de la valeur
        supplémentaire. Tu peux donc prévoir des options :
      </p>
      <TagRow options={OPTION_TAGS} />
      <p className="mt-6 text-base md:text-lg leading-relaxed italic">
        Exemple : la marque commande une vidéo, puis souhaite{" "}
        <strong>3 hooks différents</strong> pour tester plusieurs
        introductions en publicité. Tu ne réalises plus exactement la
        prestation initiale → le prix peut évoluer.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Packs */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Crée des packs
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Une marque qui veut plusieurs vidéos peut être intéressante pour toi :
        tu peux optimiser le brief, la préparation et parfois le tournage.
        Le pack peut avoir un prix unitaire{" "}
        <strong>légèrement plus intéressant, sans brader ton travail.</strong>
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Par exemple, si ton tarif unitaire est de 200 €, tu n'es pas obligée
        de faire <strong>3 vidéos = 400 €</strong> juste parce que la marque
        commande plusieurs contenus. Une remise doit rester cohérente avec
        le temps réellement économisé.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Droits */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Attention aux droits d'utilisation
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        C'est très important : <strong>créer la vidéo</strong> et{" "}
        <strong>autoriser son utilisation</strong> ne sont pas exactement la
        même chose. Une marque peut vouloir utiliser ton contenu de
        plusieurs façons :
      </p>
      <TagRow options={RIGHTS_TAGS} />
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        L'usage publicitaire et sa durée peuvent donc avoir un impact sur ta
        proposition commerciale. Ne panique pas :{" "}
        <strong>le prochain module sera entièrement consacré aux droits
        d'utilisation.</strong>
      </p>
      <hr className="my-10 border-[var(--border)]" />

      {/* Sous-évaluation */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ne te sous-évalue pas parce que tu débutes
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Débuter ne signifie pas travailler gratuitement. Tu peux avoir un
        tarif moins élevé qu'une créatrice très expérimentée, mais tu
        réalises quand même <strong>un script + un tournage + un montage +
        une prestation professionnelle.</strong>
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Et surtout, ton tarif <strong>n'est pas définitif</strong>. Au fur
        et à mesure que tu progresses :
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-2 justify-center">
        {PROGRESSION.map((p) => (
          <span
            key={p.label}
            className="uppercase tracking-tight text-xs md:text-sm font-black px-4 py-2 rounded-full"
            style={{ backgroundColor: CREAM, color: OLIVE }}
          >
            {p.label} {p.arrow}
          </span>
        ))}
        <span style={{ color: OLIVE }}>→</span>
        <span
          className="uppercase tracking-tight text-xs md:text-sm font-black px-4 py-2 rounded-full"
          style={{ backgroundColor: OLIVE, color: "#ffffff" }}
        >
          Tarifs ↑
        </span>
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Ta première grille est simplement <strong>un point de départ.</strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Calculateur */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Calcule ton tarif horaire réel
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Avant de choisir un chiffre parce que tu l'as vu sur TikTok, estime
        le temps que te demande <strong>réellement</strong> une vidéo. Puis
        vois combien tu factures à l'heure.
      </p>

      <div
        className="mt-6 rounded-2xl p-6 md:p-8 space-y-5"
        style={{ backgroundColor: "#faf7e0" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberField
            label="1. Brief / recherche"
            value={calc.brief}
            onChange={(v) => setC("brief", v)}
            suffix="min"
            placeholder="30"
          />
          <NumberField
            label="2. Script"
            value={calc.script}
            onChange={(v) => setC("script", v)}
            suffix="min"
            placeholder="30"
          />
          <NumberField
            label="3. Préparation"
            value={calc.prep}
            onChange={(v) => setC("prep", v)}
            suffix="min"
            placeholder="30"
          />
          <NumberField
            label="4. Tournage"
            value={calc.tournage}
            onChange={(v) => setC("tournage", v)}
            suffix="min"
            placeholder="60"
          />
          <NumberField
            label="5. Montage"
            value={calc.montage}
            onChange={(v) => setC("montage", v)}
            suffix="min"
            placeholder="60"
          />
          <NumberField
            label="6. Échanges / modifications"
            value={calc.echanges}
            onChange={(v) => setC("echanges", v)}
            suffix="min"
            placeholder="30"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <NumberField
            label="7. Tarif envisagé pour cette vidéo"
            value={calc.tarif}
            onChange={(v) => setC("tarif", v)}
            suffix="€"
            placeholder="150"
          />
          <div className="rounded-2xl p-4" style={{ backgroundColor: CREAM }}>
            <div
              className="uppercase tracking-wider text-[10px] md:text-xs font-bold"
              style={{ color: OLIVE }}
            >
              Temps total
            </div>
            <div className="font-black text-2xl" style={{ color: OLIVE }}>
              {totalHours ? totalHours.toFixed(1) : "—"} h
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-5 md:p-6 text-center"
          style={{ backgroundColor: OLIVE, color: "#ffffff" }}
        >
          <div className="uppercase tracking-wider text-[10px] md:text-xs font-bold opacity-80">
            Ton tarif correspond à environ
          </div>
          <div className="mt-1 font-black text-3xl md:text-4xl">
            {hourlyDisplay} €/h
          </div>
          <div className="mt-1 text-xs md:text-sm opacity-80">
            avant charges et dépenses professionnelles
          </div>
        </div>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Grille */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer : crée ta première grille
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ta grille se sauvegarde automatiquement. Tu la retrouveras dans les
        prochains modules quand tu commenceras à démarcher les marques.
      </p>

      {/* Création */}
      <div
        className="mt-6 rounded-2xl p-6 md:p-8"
        style={{ backgroundColor: CREAM }}
      >
        <div
          className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-4"
          style={{ color: OLIVE }}
        >
          🎥 Création
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumberField
            label="1 vidéo UGC"
            value={grid.video1}
            onChange={(v) => setG("video1", v)}
            suffix="€"
            placeholder="150"
          />
          <NumberField
            label="Pack 3 vidéos"
            value={grid.pack3}
            onChange={(v) => setG("pack3", v)}
            suffix="€"
            placeholder="400"
          />
          <NumberField
            label="Pack 5 vidéos"
            value={grid.pack5}
            onChange={(v) => setG("pack5", v)}
            suffix="€"
            placeholder="600"
          />
        </div>
        <div className="mt-4">
          <TextField
            label="Ce qui est inclus dans le tarif de base"
            value={grid.baseIncludes}
            onChange={(v) => setG("baseIncludes", v)}
            placeholder="Ex : script + tournage + montage + sous-titres + 1 modif"
          />
        </div>
      </div>

      {/* Options */}
      <div
        className="mt-6 rounded-2xl p-6 md:p-8"
        style={{ backgroundColor: "#faf7e0" }}
      >
        <div
          className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-4"
          style={{ color: OLIVE }}
        >
          ➕ Options
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberField
            label="Hook supplémentaire"
            value={grid.hook}
            onChange={(v) => setG("hook", v)}
            suffix="€"
          />
          <NumberField
            label="CTA supplémentaire"
            value={grid.cta}
            onChange={(v) => setG("cta", v)}
            suffix="€"
          />
          <NumberField
            label="Rushs bruts"
            value={grid.rushs}
            onChange={(v) => setG("rushs", v)}
            suffix="€"
          />
          <NumberField
            label="Livraison express"
            value={grid.express}
            onChange={(v) => setG("express", v)}
            suffix="€"
          />
          <div className="md:col-span-2">
            <TextField
              label="Autre option"
              value={grid.autre}
              onChange={(v) => setG("autre", v)}
              placeholder="Ex : variante — 50 €"
            />
          </div>
        </div>
      </div>

      {/* Droits */}
      <div
        className="mt-6 rounded-2xl p-5 md:p-6"
        style={{ backgroundColor: CREAM }}
      >
        <div
          className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-2"
          style={{ color: OLIVE }}
        >
          Droits d'utilisation
        </div>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: OLIVE }}>
          Utilisation organique : à définir.<br />
          Utilisation publicitaire :{" "}
          <strong>à définir au Module 14</strong>, entièrement consacré aux
          droits d'utilisation.
        </p>
      </div>

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Ne cherche pas la grille parfaite.{" "}
        <strong>
          Construis une première base cohérente que tu pourras ajuster après
          tes premières demandes.
        </strong>
      </p>

      <p className="mt-6 text-sm md:text-base italic" style={{ color: OLIVE }}>
        💾 Tu retrouveras <strong>ta grille tarifaire</strong> à tout moment
        dans <Link href="/compte" className="underline">Mon compte</Link>.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module13Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        on s'attaque à un sujet indispensable avant d'envoyer tes tarifs aux
        marques : les droits d'utilisation.
      </strong>
    </p>
  );
}
