"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const STORAGE_KEY = "edithappp:module04:entrainement";

const CATEGORIES = [
  "💄 Beauté",
  "🧴 Skincare",
  "👗 Mode",
  "🍫 Food",
  "📱 App",
  "🏠 Maison",
  "💻 Tech",
];

const PLANS = [
  "Le produit seul",
  "Le produit dans ta main",
  "L'ouverture / l'unboxing",
  "Le produit en utilisation",
  "Un gros plan",
  "Une réaction ou un plan face caméra",
  "Un plan du résultat, si pertinent",
];

const STRUCTURE = ["Hook", "Problème", "Produit", "Bénéfice", "CTA"];

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

function ChipRow({
  options,
  selected,
  setSelected,
}: {
  options: string[];
  selected: string[];
  setSelected: (v: string[]) => void;
}) {
  const toggle = (o: string) =>
    setSelected(
      selected.includes(o) ? selected.filter((s) => s !== o) : [...selected, o]
    );
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {options.map((o) => (
        <Chip key={o} selected={selected.includes(o)} onClick={() => toggle(o)}>
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

function StructureChain() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      {STRUCTURE.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span
            className="uppercase tracking-wider text-xs md:text-sm font-bold px-4 py-2 rounded-full"
            style={{ backgroundColor: CREAM, color: OLIVE }}
          >
            {s}
          </span>
          {i < STRUCTURE.length - 1 && (
            <span className="text-lg" style={{ color: OLIVE }}>
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export function Module04Content() {
  const [categories, setCategories] = useState<string[]>([]);
  const [problem, setProblem] = useState("");
  const [benefit, setBenefit] = useState("");
  const [reason, setReason] = useState("");
  const [product, setProduct] = useState("");
  const [hook, setHook] = useState("");
  const [need, setNeed] = useState("");
  const [mainBenefit, setMainBenefit] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setCategories(d.categories ?? []);
        setProblem(d.problem ?? "");
        setBenefit(d.benefit ?? "");
        setReason(d.reason ?? "");
        setProduct(d.product ?? "");
        setHook(d.hook ?? "");
        setNeed(d.need ?? "");
        setMainBenefit(d.mainBenefit ?? "");
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        categories,
        problem,
        benefit,
        reason,
        product,
        hook,
        need,
        mainBenefit,
      })
    );
  }, [
    loaded,
    categories,
    problem,
    benefit,
    reason,
    product,
    hook,
    need,
    mainBenefit,
  ]);

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
            04
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          S'entraîner sans avoir de marque
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Tu n'as pas besoin d'attendre ta première collaboration pour commencer à
        créer.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          L'une des erreurs les plus fréquentes quand on débute, c'est de
          penser :{" "}
          <em>
            « Je n'ai jamais travaillé avec une marque, donc je n'ai rien à
            montrer. »
          </em>
        </p>
        <p>
          En réalité,{" "}
          <strong>
            tu peux commencer aujourd'hui avec les produits que tu as déjà chez
            toi.
          </strong>{" "}
          Ces premières vidéos vont te permettre de t'entraîner et, pour les
          meilleures, de commencer à préparer ton futur portfolio.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Commence avec ce que tu as */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Commence avec ce que tu as
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Pas besoin d'acheter des produits spécialement pour faire de l'UGC.
          Regarde simplement autour de toi et{" "}
          <strong>choisis 3 produits que tu utilises réellement.</strong>
        </p>
      </div>
      <ChipRow
        options={CATEGORIES}
        selected={categories}
        setSelected={setCategories}
      />
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Par exemple : ton sérum préféré, une crème, une boisson, une paire de
        chaussures, une application que tu utilises tous les jours…{" "}
        <strong>Privilégie des produits que tu connais.</strong> Ce sera
        beaucoup plus facile d'en parler naturellement.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Fais comme si la marque t'avait briefée */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Fais comme si la marque t'avait briefée
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>Maintenant, imagine que la marque te contacte et te dit :</p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « Nous voulons une vidéo courte qui présente notre produit de manière
          naturelle et montre comment tu l'utilises au quotidien. »
        </p>
        <p>
          <strong>Avant de filmer, réponds à 3 questions :</strong>
        </p>
      </div>

      <div
        className="mt-4 rounded-2xl p-6 md:p-8"
        style={{ backgroundColor: CREAM }}
      >
        <TextField
          label="Quel problème ce produit résout ?"
          value={problem}
          onChange={setProblem}
          placeholder="Ta réponse…"
        />
        <TextField
          label="Quel est son principal bénéfice ?"
          value={benefit}
          onChange={setBenefit}
          placeholder="Ta réponse…"
        />
        <TextField
          label="Pourquoi est-ce que je l'utilise / l'apprécie ?"
          value={reason}
          onChange={setReason}
          placeholder="Ta réponse…"
        />
      </div>

      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu as déjà <strong>la base de ta vidéo.</strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Prépare tes plans */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Prépare tes plans
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Pas besoin de tout filmer en face caméra.{" "}
          <strong>
            Une bonne vidéo UGC mélange souvent plusieurs types de plans.
          </strong>
        </p>
        <p>Pour ton premier essai, tourne au minimum :</p>
        <ul className="list-disc pl-6 space-y-2">
          {PLANS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p>
          Ces petits plans complémentaires sont souvent appelés{" "}
          <strong>B-roll</strong>. On apprendra à mieux cadrer et filmer ces
          plans dans un prochain module. Pour l'instant, teste.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Crée une mini-histoire */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Crée une mini-histoire
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>Évite simplement :</p>
        <p className="italic pl-4 border-l-2 border-red-200">
          ❌ « Bonjour, aujourd'hui je vais vous présenter cette crème… »
        </p>
        <p>
          <strong>
            Essaie plutôt de partir d'une situation, d'un problème ou d'une
            envie.
          </strong>{" "}
          Par exemple :
        </p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « Ma peau tirait systématiquement après ma douche, jusqu'à ce que je
          change ça dans ma routine. »
        </p>
        <p>Puis tu montres le produit, son utilisation et ce qu'il t'apporte.</p>
        <p>
          <strong>Pour commencer, retiens cette structure très simple :</strong>
        </p>
      </div>

      <StructureChain />

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        On consacrera <strong>tout un module à cette structure.</strong> Pour
        l'instant, l'objectif est simplement de commencer à l'utiliser.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Ta première vidéo n'a pas besoin d'être parfaite */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ta première vidéo n'a pas besoin d'être parfaite
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Tu vas peut-être trouver ta voix bizarre. Tu vas refaire certaines
          phrases dix fois. Ton premier montage sera peut-être trop lent.{" "}
          <strong>C'est normal : tu es en train d'apprendre.</strong>
        </p>
        <p>
          Ne passe pas trois heures à essayer d'obtenir une première vidéo
          parfaite. Termine-la, regarde-la et demande-toi :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Qu'est-ce que j'aime ?</li>
          <li>Qu'est-ce qui me gêne ?</li>
          <li>Qu'est-ce que je pourrais améliorer sur la suivante ?</li>
        </ul>
        <p>
          <strong>
            Ton objectif maintenant est de créer du volume pour progresser, pas
            de chercher la perfection.
          </strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Portfolio ? */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Est-ce que tu peux mettre ces vidéos dans ton portfolio ?
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          <strong>Oui, si elles représentent réellement la qualité de ton travail.</strong>{" "}
          Tu n'as pas besoin d'avoir été payée par une marque pour montrer que
          tu sais créer du contenu.
        </p>
        <p>
          En revanche,{" "}
          <strong>
            ne présente jamais une vidéo d'entraînement comme une collaboration
            rémunérée
          </strong>{" "}
          si ce n'en était pas une.
        </p>
        <p>
          Plus tard, on fera le tri ensemble pour choisir uniquement tes
          meilleurs contenus et construire ton portfolio. Et si tu n'as pas
          suffisamment de produits intéressants chez toi, pas d'inquiétude : on
          verra aussi comment obtenir des produits grâce au <strong>gifting</strong>.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* À toi de jouer */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Choisis <strong>1 produit</strong> que tu possèdes déjà.
      </p>

      <div
        className="mt-6 rounded-2xl p-6 md:p-8 space-y-2"
        style={{ backgroundColor: CREAM }}
      >
        <TextField
          label="Mon produit"
          value={product}
          onChange={setProduct}
          placeholder="Ex : mon sérum du matin"
        />
        <TextField
          label="Mon hook"
          value={hook}
          onChange={setHook}
          placeholder="La phrase d'accroche"
        />
        <TextField
          label="Le problème / besoin"
          value={need}
          onChange={setNeed}
          placeholder="Ce que ton produit résout"
        />
        <TextField
          label="Le bénéfice principal"
          value={mainBenefit}
          onChange={setMainBenefit}
          placeholder="Ce qu'on gagne à l'utiliser"
        />
      </div>

      <div className="mt-6 space-y-4 text-base md:text-lg leading-relaxed">
        <p>Ensuite :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Filme ton face caméra</li>
          <li>Filme au moins 5 plans du produit</li>
          <li>Assemble le tout en une courte vidéo</li>
          <li>Regarde le résultat une première fois</li>
          <li>Note UNE chose à améliorer sur ta prochaine vidéo</li>
        </ul>
        <p>
          <strong>Mission terminée = 1 première vidéo UGC créée.</strong> Ne
          cherche pas encore à la publier ou à l'envoyer à une marque. Pour
          l'instant, tu t'entraînes.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module04Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        découvre les différents formats UGC et commence à varier tes créations.
      </strong>
    </p>
  );
}
