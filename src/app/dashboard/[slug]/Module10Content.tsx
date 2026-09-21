"use client";

import Link from "next/link";
import { useWorkbookField } from "@/lib/useWorkbookField";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const WORKBOOK_KEY = "module10:folder";

const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const STEPS_HEADER = [
  "Qui tu es",
  "Ton univers",
  "Ce que tu sais créer",
  "Comment te contacter",
];

const VIDEO_SOURCES = ["Produits personnels", "Gifting", "Contenus d'entraînement"];

const SECTIONS: {
  key: string;
  emoji: string;
  title: string;
  items: string[];
  note?: string;
}[] = [
  {
    key: "toi",
    emoji: "👤",
    title: "Toi",
    items: ["Photo", "Prénom", "Courte présentation"],
  },
  {
    key: "univers",
    emoji: "✨",
    title: "Ton univers",
    items: ["3 catégories", "Style", "Personnalité"],
    note: "Tu peux reprendre directement ta fiche persona du Module 2.",
  },
  {
    key: "travail",
    emoji: "🎥",
    title: "Ton travail",
    items: ["4 à 6 vidéos", "Éventuelles photos"],
  },
  {
    key: "services",
    emoji: "💼",
    title: "Tes services",
    items: ["Vidéo UGC", "Face cam", "Voice-over", "B-roll", "Photos UGC"],
  },
  {
    key: "contacts",
    emoji: "📩",
    title: "Tes contacts",
    items: ["Email pro", "Instagram", "TikTok"],
  },
];

const CHECKLIST: { id: string; label: string }[] = [
  { id: "photo", label: "Ma photo" },
  { id: "presentation", label: "Ma courte présentation" },
  { id: "univers", label: "Mes 3 univers principaux" },
  { id: "videos", label: "Mes 4 à 6 meilleures vidéos" },
  { id: "services", label: "Mes services" },
  { id: "materiel", label: "Mon matériel" },
  { id: "email", label: "Mon email professionnel" },
  { id: "reseaux", label: "Mes réseaux sociaux" },
];

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

export function Module10Content() {
  const [done, setDone] = useWorkbookField<Record<string, boolean>>(WORKBOOK_KEY, {});
  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));
  const count = CHECKLIST.filter((c) => done[c.id]).length;
  const pct = (count / CHECKLIST.length) * 100;

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
            10
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Préparer son portfolio UGC
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Ton portfolio va devenir l'un de tes outils les plus importants pour
        trouver des collaborations. Avant de le construire, préparons tout ce
        dont tu vas avoir besoin.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* À quoi sert */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À quoi sert ton portfolio ?
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ton portfolio, c'est un peu <strong>ta vitrine de créatrice UGC.</strong>{" "}
        Quand tu contacteras une marque, tu pourras lui envoyer un lien pour
        qu'elle découvre rapidement :
      </p>
      <ArrowFlow items={STEPS_HEADER} />
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Contrairement à un CV classique, une marque va surtout vouloir{" "}
        <strong>voir ton travail.</strong> Ton portfolio doit lui permettre
        de penser :
      </p>
      <p className="mt-2 italic pl-4 border-l-2 border-[var(--border)] text-base md:text-lg leading-relaxed">
        « J'aime son univers et je peux imaginer cette créatrice avec mon
        produit. »
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Sans avoir travaillé avec une marque */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Tu peux créer ton portfolio sans avoir travaillé avec une marque
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        C'est important parce que beaucoup de débutantes restent bloquées
        ici. <strong>Tu n'as pas besoin d'attendre ta première
        collaboration.</strong> Les vidéos que tu as créées avec :
      </p>
      <TagRow options={VIDEO_SOURCES} />
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        peuvent tout à fait te permettre de montrer tes compétences. Tu ne
        dois simplement pas présenter{" "}
        <strong>une création personnelle comme une collaboration
        rémunérée</strong>{" "}
        si ce n'en était pas une.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Meilleures créations */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Prépare tes meilleures créations
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Retourne voir les vidéos que tu as réalisées depuis le début de la
        formation. Ne cherche pas forcément à montrer tous les formats :
        sélectionne surtout tes contenus les plus convaincants. Pour
        commencer, <strong>4 à 6 bonnes vidéos peuvent largement
        suffire.</strong>
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Pose-toi simplement ces questions :
      </p>
      <ul className="mt-2 pl-6 list-disc text-base md:text-lg leading-relaxed">
        <li>Est-ce que je suis fière de cette vidéo ?</li>
        <li>Est-ce qu'elle représente mon niveau actuel ?</li>
        <li>
          Est-ce qu'une marque pourrait m'imaginer créer quelque chose de
          similaire pour elle ?
        </li>
        <li>Est-ce que mes vidéos sont suffisamment variées ?</li>
      </ul>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Et si tu réalises qu'il te manque un type de contenu, tu sais
        maintenant exactement comment en recréer un grâce aux modules
        précédents.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Prépare les infos */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Prépare les informations dont tu vas avoir besoin
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Avant de construire ton portfolio, rassemble tout dans un même
        dossier.
      </p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {SECTIONS.map((s) => (
          <div
            key={s.key}
            className="rounded-2xl p-5 md:p-6"
            style={{ backgroundColor: "#faf7e0" }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl">{s.emoji}</span>
              <span
                className="uppercase tracking-tight font-black text-base md:text-lg"
                style={{ color: OLIVE }}
              >
                {s.title}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.items.map((it) => (
                <span
                  key={it}
                  className="uppercase tracking-wider text-[10px] md:text-xs font-bold px-3 py-2 rounded-full bg-white"
                  style={{ color: OLIVE }}
                >
                  {it}
                </span>
              ))}
            </div>
            {s.note && (
              <p className="mt-3 text-xs md:text-sm italic" style={{ color: OLIVE, opacity: 0.8 }}>
                {s.note}
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Et c'est quasiment tout ce qu'il te faut pour commencer.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Et les tarifs */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Et les tarifs ?
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Pas besoin de bloquer ton portfolio parce que tu ne connais pas
        encore tes tarifs. On va justement apprendre à{" "}
        <strong>calculer et structurer tes tarifs</strong> dans les
        prochains modules. Tu pourras ensuite décider si tu souhaites les
        afficher ou simplement indiquer :
      </p>
      <p className="mt-2 italic pl-4 border-l-2 border-[var(--border)] text-base md:text-lg leading-relaxed">
        « Tarifs sur demande »
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ton portfolio pourra évoluer avec toi.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* À toi de jouer */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer : prépare ton dossier portfolio
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Crée un dossier <strong>📁 Mon portfolio UGC</strong> et coche chaque
        élément au fur et à mesure que tu le rassembles :
      </p>

      <div
        className="mt-6 rounded-2xl p-6"
        style={{ backgroundColor: CREAM }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <span
            className="uppercase tracking-wider text-[10px] md:text-xs font-black"
            style={{ color: OLIVE }}
          >
            Mon dossier portfolio
          </span>
          <span
            className="uppercase tracking-wider text-xs md:text-sm font-black"
            style={{ color: OLIVE }}
          >
            {count === CHECKLIST.length ? "Dossier prêt ✓" : `${count} / ${CHECKLIST.length}`}
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden mb-5"
          style={{ backgroundColor: "#ffffff" }}
        >
          <span
            className="block h-full rounded-full transition-all"
            style={{ width: `${pct}%`, backgroundColor: OLIVE }}
          />
        </div>
        <ul className="space-y-2">
          {CHECKLIST.map((c) => {
            const isChecked = !!done[c.id];
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => toggle(c.id)}
                  className="flex items-center gap-3 text-left w-full py-1"
                  style={{ color: OLIVE }}
                >
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-md flex-shrink-0"
                    style={{
                      backgroundColor: isChecked ? OLIVE : "#ffffff",
                      border: `1.5px solid ${OLIVE}`,
                      color: "#ffffff",
                    }}
                  >
                    {isChecked && (
                      <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
                        <path
                          d="M4 10.5l4 4 8-9"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`text-base md:text-lg ${isChecked ? "line-through opacity-60" : ""}`}
                  >
                    {c.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Ne construis encore rien. L'objectif de ce module est simplement
        d'avoir <strong>tout ton contenu prêt pour passer à la
        création.</strong>
      </p>

      <p className="mt-6 text-sm md:text-base italic" style={{ color: OLIVE }}>
        💾 Tu retrouveras <strong>ton dossier portfolio</strong> à tout
        moment dans <Link href="/compte" className="underline">Mon compte</Link>.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module10Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        on transforme tout ça en un vrai portfolio UGC.
      </strong>
    </p>
  );
}
