"use client";

import Link from "next/link";
import { useWorkbookField } from "@/lib/useWorkbookField";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const WORKBOOK_KEY = "module06:script";
type Script06 = {
  hook: string;
  problem: string;
  solution: string;
  benefit1: string;
  benefit2: string;
  proof: string;
  cta: string;
};
const SCRIPT_INIT: Script06 = {
  hook: "",
  problem: "",
  solution: "",
  benefit1: "",
  benefit2: "",
  proof: "",
  cta: "",
};

const STRUCTURE = ["Hook", "Problème", "Solution", "Bénéfice", "CTA"];

const HOOK_ANGLES = ["Problème", "Curiosité", "Question", "Résultat", "Avant / après", "Avis"];
const PLAN_TYPES = ["Ouverture", "Texture", "Application", "Utilisation", "Résultat"];
const PROOF_TYPES = ["Avant / après", "Démonstration", "Texture", "Résultat", "Expérience perso"];
const CTA_TYPES = ["En savoir plus", "Découvrir", "Tester", "Commander", "Télécharger"];

const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

function ChainSchema() {
  return (
    <div className="mt-8 rounded-2xl p-5 md:p-6" style={{ backgroundColor: CREAM }}>
      <div className="uppercase tracking-wider text-[10px] md:text-xs font-bold text-center mb-4" style={{ color: OLIVE }}>
        La structure à retenir
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {STRUCTURE.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span
              className="uppercase tracking-tight text-xs md:text-sm font-black px-4 py-2 rounded-full"
              style={{ backgroundColor: OLIVE, color: "#ffffff" }}
            >
              {s}
            </span>
            {i < STRUCTURE.length - 1 && <span style={{ color: OLIVE }}>→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

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
}: {
  bad: string;
  good: string;
}) {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="rounded-2xl p-5 border-2 border-red-200 bg-red-50/40">
        <div className="uppercase tracking-wider text-[10px] md:text-xs font-black text-red-700">
          ❌ À éviter
        </div>
        <p className="mt-2 italic text-base leading-relaxed" style={{ color: OLIVE }}>
          « {bad} »
        </p>
      </div>
      <div className="rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
        <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE }}>
          ✅ À faire
        </div>
        <p className="mt-2 italic text-base leading-relaxed" style={{ color: OLIVE }}>
          « {good} »
        </p>
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

export function Module06Content() {
  const [script, setScript] = useWorkbookField<Script06>(WORKBOOK_KEY, SCRIPT_INIT);
  const setField = (k: keyof Script06) => (v: string) =>
    setScript((s) => ({ ...s, [k]: v }));
  const { hook, problem, solution, benefit1, benefit2, proof, cta } = script;
  const setHook = setField("hook");
  const setProblem = setField("problem");
  const setSolution = setField("solution");
  const setBenefit1 = setField("benefit1");
  const setBenefit2 = setField("benefit2");
  const setProof = setField("proof");
  const setCta = setField("cta");

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
            06
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Construire une bonne vidéo UGC
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Une bonne vidéo UGC ne consiste pas seulement à montrer un joli produit.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Elle doit donner envie de rester, de comprendre… et parfois de passer
          à l'action. Tu connais maintenant les principaux formats UGC. Dans ce
          module, on va apprendre à{" "}
          <strong>
            structurer ta vidéo pour éviter d'enchaîner des plans sans véritable
            fil conducteur.
          </strong>
        </p>
      </div>

      <ChainSchema />

      <hr className="my-10 border-[var(--border)]" />

      {/* Le hook */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Le hook : les premières secondes
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Le hook, c'est <strong>ce qui donne envie de continuer à regarder.</strong>{" "}
          Il peut être parlé, écrit à l'écran ou même visuel.
        </p>
        <p>Évite les introductions qui prennent trop de temps :</p>
      </div>

      <BeforeAfter
        bad="Hello tout le monde, aujourd'hui je vais vous présenter un produit que j'ai reçu…"
        good="Si ton maquillage ne tient jamais toute la journée, essaie ça."
      />

      <p className="mt-6 text-base md:text-lg leading-relaxed">Autres exemples qui fonctionnent :</p>
      <ul className="mt-3 space-y-2 text-base md:text-lg italic">
        <li>« J'aurais aimé connaître ce produit beaucoup plus tôt. »</li>
        <li>« Voilà pourquoi j'ai arrêté d'utiliser mon ancienne crème. »</li>
      </ul>

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Quelques <strong>angles à tester</strong> :
      </p>
      <TagRow options={HOOK_ANGLES} />

      <p className="mt-4 text-base md:text-lg leading-relaxed italic">
        <strong>Conseil</strong> : écris plusieurs hooks pour une même vidéo.
        Changer uniquement les premières secondes peut donner une sensation
        complètement différente au contenu.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Le problème */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Le problème ou le besoin
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Maintenant que tu as capté l'attention,{" "}
          <strong>donne une raison de continuer.</strong> Ton audience doit
          pouvoir penser :
        </p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « Ah oui, ça me concerne. »
        </p>
        <p>Par exemple :</p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « J'ai la peau sèche, mais je déteste les crèmes qui laissent un film
          gras. »
        </p>
        <p>
          On comprend immédiatement le problème. Et tous les produits ne
          résolvent pas un problème grave.{" "}
          <strong>Le « besoin » peut simplement être une envie</strong> :
          gagner du temps, se faire plaisir, avoir un joli intérieur, découvrir
          un nouveau restaurant…
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Solution */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Introduis le produit comme la solution
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          C'est ici que <strong>ton produit entre naturellement dans l'histoire.</strong>
        </p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « Du coup, j'ai testé cette crème… »
        </p>
        <p>
          Puis montre-le en situation. Au lieu de rester face caméra avec le
          produit dans la main,{" "}
          <strong>utilise les plans que tu as appris à tourner</strong> :
        </p>
      </div>
      <TagRow options={PLAN_TYPES} />
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Montre autant que possible <strong>ce que tu es en train d'expliquer.</strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Bénéfices */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Parle bénéfices, pas seulement caractéristiques
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Une marque peut te donner une liste de caractéristiques produit.{" "}
          <strong>Ton rôle est de les rendre compréhensibles et intéressantes.</strong>
        </p>
      </div>

      <BeforeAfter
        bad="Cette batterie possède une capacité de X mAh."
        good="Je peux partir toute la journée sans chercher une prise toutes les trois heures."
      />

      <p className="mt-6 text-base md:text-lg leading-relaxed">Autre exemple :</p>
      <div
        className="mt-3 rounded-2xl p-5 space-y-2 text-base md:text-lg leading-relaxed"
        style={{ backgroundColor: CREAM, color: OLIVE }}
      >
        <p>
          <strong>Caractéristique</strong> : texture légère.
        </p>
        <p>
          <strong>Bénéfice</strong> : « Je peux me maquiller juste après sans
          avoir la peau collante. »
        </p>
      </div>

      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Pose-toi toujours cette question :{" "}
        <em>
          « OK, mais qu'est-ce que ça change concrètement pour la personne qui
          utilise le produit ? »
        </em>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Preuve */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ajoute de la preuve
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          <strong>Dire qu'un produit est génial ne suffit pas toujours.</strong>{" "}
          Quand c'est possible, montre pourquoi. La preuve peut prendre
          différentes formes :
        </p>
      </div>
      <TagRow options={PROOF_TYPES} />

      <BeforeAfter
        bad="Ce détachant fonctionne super bien."
        good="Je montre la tache, j'applique le produit, je montre le résultat."
      />

      <p className="mt-6 text-base md:text-lg leading-relaxed italic">
        ⚠️ <strong>Reste toujours honnête</strong> : ne fabrique pas de faux
        résultats et n'invente pas une expérience que tu n'as pas vécue.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* CTA */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Termine avec un CTA
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          <strong>CTA signifie Call To Action</strong>, ou appel à l'action.
          C'est ce que tu veux que la personne fasse après avoir regardé.
        </p>
      </div>
      <TagRow options={CTA_TYPES} />

      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>Il peut être très direct :</p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « Tu peux le retrouver directement sur leur site. »
        </p>
        <p>Ou plus naturel :</p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « Si tu as le même problème que moi, ça vaut clairement le coup
          d'aller voir. »
        </p>
        <p>
          Le CTA dépend surtout du brief et de l'objectif de la vidéo.{" "}
          <strong>
            Ne force pas systématiquement une phrase commerciale si elle n'a pas
            sa place.
          </strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Rythme */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Et le rythme ?
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Même un bon script peut devenir ennuyant si rien ne se passe
          visuellement. Tu peux maintenir l'attention avec des{" "}
          <strong>
            changements de plans, des B-roll, du texte à l'écran, des gros
            plans, des démonstrations et des cuts.
          </strong>
        </p>
        <p>
          Mais attention : dynamique ne veut pas dire mettre une transition
          toutes les deux secondes.{" "}
          <strong>Chaque élément doit avoir une utilité.</strong> On
          approfondira ça dans les modules Tournage et Montage.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* À toi de jouer */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer : écris ton premier script
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Choisis un produit et complète les 6 champs. Ton script se génère en
        temps réel plus bas.
      </p>

      <div
        className="mt-6 rounded-2xl p-6 md:p-8 space-y-2"
        style={{ backgroundColor: CREAM }}
      >
        <TextField label="Mon hook" value={hook} onChange={setHook} placeholder="La phrase d'accroche" />
        <TextField label="Le problème / besoin" value={problem} onChange={setProblem} placeholder="Ce que ta cible vit" />
        <TextField label="Ma solution / le produit" value={solution} onChange={setSolution} placeholder="Le produit que tu introduis" />
        <TextField label="Bénéfice 1" value={benefit1} onChange={setBenefit1} placeholder="Premier bénéfice principal" />
        <TextField label="Bénéfice 2" value={benefit2} onChange={setBenefit2} placeholder="Second bénéfice principal" />
        <TextField label="Ma preuve / ce que je vais montrer" value={proof} onChange={setProof} placeholder="Ex : montrer le résultat" />
        <TextField label="Mon CTA" value={cta} onChange={setCta} placeholder="L'appel à l'action" />
      </div>

      {(hook || problem || solution || benefit1 || benefit2 || proof || cta) && (
        <div className="mt-6">
          <div
            className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-3"
            style={{ color: OLIVE }}
          >
            Ton script généré
          </div>
          <div
            className="rounded-2xl p-6 md:p-8 space-y-4 text-base md:text-lg leading-relaxed italic"
            style={{ backgroundColor: "#ffffff", border: `1.5px solid ${CREAM}`, color: OLIVE }}
          >
            {hook && <p>« {hook} »</p>}
            {problem && <p>« {problem} »</p>}
            {solution && <p>« {solution} »</p>}
            {(benefit1 || benefit2) && (
              <p>
                «{" "}
                {[benefit1, benefit2].filter(Boolean).join(" Et surtout, ")} »
              </p>
            )}
            {proof && <p className="not-italic">{proof}</p>}
            {cta && <p>« {cta} »</p>}
          </div>
        </div>
      )}

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Puis <strong>lis ton script à voix haute.</strong> Si une phrase te
        semble trop écrite ou trop publicitaire, réécris-la comme si tu
        expliquais le produit <strong>à une amie</strong>.
      </p>

      <p className="mt-6 text-sm md:text-base italic" style={{ color: OLIVE }}>
        💾 Tu retrouveras <strong>ton script</strong> à tout moment dans{" "}
        <Link href="/compte" className="underline">Mon compte</Link>.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module06Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        maintenant que ton script est prêt, on va apprendre à bien le filmer.
      </strong>
    </p>
  );
}
