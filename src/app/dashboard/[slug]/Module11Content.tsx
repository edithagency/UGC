"use client";

import Link from "next/link";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

type Template = {
  slug: string;
  name: string;
  desc: string;
  price: string;
  image?: string;
};

const TEMPLATES: Template[] = [
  { slug: "template-01", name: "Template 1", desc: "Petite description du style", price: "XX €" },
  { slug: "template-02", name: "Template 2", desc: "Petite description du style", price: "XX €" },
  { slug: "template-03", name: "Template 3", desc: "Petite description du style", price: "XX €" },
  { slug: "template-04", name: "Template 4", desc: "Petite description du style", price: "XX €" },
  { slug: "template-05", name: "Template 5", desc: "Petite description du style", price: "XX €" },
  { slug: "template-06", name: "Template 6", desc: "Petite description du style", price: "XX €" },
];

const STEPS = [
  {
    emoji: "✨",
    number: "1",
    title: "Choisis",
    desc: "Sélectionne le template qui correspond le mieux à ton univers.",
  },
  {
    emoji: "🛍️",
    number: "2",
    title: "Achète",
    desc: "Ajoute-le au panier ou clique sur « Acheter maintenant » pour passer directement à la commande.",
  },
  {
    emoji: "💌",
    number: "3",
    title: "Reçois",
    desc: "Une fois ta commande validée, tu reçois ton template et les instructions directement par email.",
  },
  {
    emoji: "🎨",
    number: "4",
    title: "Personnalise",
    desc: "Tu n'as plus qu'à intégrer les éléments que tu as préparés au Module 10.",
  },
];

const FLOW_ITEMS = ["Photo", "Présentation", "Univers", "Vidéos", "Services", "Contact"];

const CHALLENGE_STEPS = [
  "Choisis ton template",
  "Reçois-le",
  "Personnalise-le",
  "Teste-le",
  "Prêt à être envoyé",
];

function TemplateCard({ t }: { t: Template }) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ backgroundColor: "#faf7e0" }}
    >
      <div
        className="aspect-[4/3] flex items-center justify-center"
        style={{ backgroundColor: CREAM }}
      >
        {t.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
        ) : (
          <span
            className="uppercase tracking-wider text-[10px] md:text-xs font-bold"
            style={{ color: OLIVE, opacity: 0.6 }}
          >
            Aperçu à venir
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div
          className="font-black uppercase tracking-tight text-base md:text-lg"
          style={{ color: OLIVE }}
        >
          {t.name}
        </div>
        <p className="mt-2 text-sm md:text-base leading-relaxed flex-1" style={{ color: OLIVE }}>
          {t.desc}
        </p>
        <div
          className="mt-3 font-black text-lg md:text-xl"
          style={{ color: OLIVE }}
        >
          {t.price}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full bg-white"
            style={{ color: OLIVE, border: `1.5px solid ${OLIVE}` }}
          >
            Ajouter au panier
          </button>
          <button
            type="button"
            className="uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full"
            style={{ backgroundColor: OLIVE, color: "#ffffff" }}
          >
            Acheter maintenant
          </button>
        </div>
      </div>
    </div>
  );
}

export function Module11Content() {
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
            11
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Créer ton portfolio UGC
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Tu as tout préparé au module précédent. Il est maintenant temps de
        transformer tes contenus en un portfolio professionnel, prêt à être
        envoyé aux marques.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Pour rappel, ton portfolio doit permettre de retrouver rapidement
          ta présentation, ton univers, tes contenus, tes services et tes
          coordonnées. Tout ça, tu l'as déjà préparé au Module 10. Maintenant,
          place à la création.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Choisis ton template */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Choisis ton template
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Pour te permettre de créer ton portfolio facilement sans partir d'une
        page blanche, j'ai créé <strong>7 templates de portfolio UGC</strong>,
        avec différents styles et univers. La structure est déjà prête : tu
        choisis ton préféré, tu l'achètes, tu le reçois par email et tu n'as
        plus qu'à le personnaliser avec tes propres contenus.
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Quel portfolio te ressemble le plus ?
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((t) => (
          <TemplateCard key={t.slug} t={t} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          href="/boutique"
          className="uppercase tracking-wider text-xs md:text-sm font-black px-5 py-3 rounded-full hover:scale-105 transition-transform"
          style={{ backgroundColor: OLIVE, color: "#ffffff" }}
        >
          Voir les 7 templates →
        </Link>
      </div>

      <p className="mt-6 text-sm md:text-base italic" style={{ color: OLIVE }}>
        💌 Produit digital : après ton achat, tu recevras ton template et les
        instructions d'accès directement par email.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Comment ça fonctionne */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Comment ça fonctionne ?
      </h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((s) => (
          <div
            key={s.number}
            className="rounded-2xl p-5 md:p-6"
            style={{ backgroundColor: CREAM }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl">{s.emoji}</span>
              <span
                className="uppercase tracking-wider text-[10px] md:text-xs font-black"
                style={{ color: OLIVE }}
              >
                Étape {s.number}
              </span>
            </div>
            <div
              className="mt-2 font-black uppercase tracking-tight text-base md:text-lg"
              style={{ color: OLIVE }}
            >
              {s.title}
            </div>
            <p className="mt-2 text-sm md:text-base leading-relaxed" style={{ color: OLIVE }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>

<hr className="my-10 border-[var(--border)]" />

      {/* Personnalise */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Personnalise vraiment ton template
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Le template te donne la structure et le design, mais l'objectif n'est
        pas de garder exactement la version que tu vois sur la fiche produit.{" "}
        <strong>Fais-en ton portfolio.</strong>
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            emoji: "🎨",
            title: "Adapte les couleurs",
            body: (
              <>
                Reprends l'univers défini dans ton persona et choisis
                quelques couleurs cohérentes.{" "}
                <strong>2 à 3 couleurs suffisent</strong> : une principale,
                une secondaire et une d'accent.
              </>
            ),
          },
          {
            emoji: "✍️",
            title: "Adapte les polices",
            body: (
              <>
                Évite d'en utiliser cinq différentes.{" "}
                <strong>1 police pour les titres + 1 police pour le
                texte</strong>{" "}
                suffisent largement pour garder un résultat propre et
                cohérent.
              </>
            ),
          },
          {
            emoji: "📸",
            title: "Remplace les visuels",
            body: (
              <>
                Ajoute tes propres photos, tes vidéos et tes créations à la
                place des exemples du template.
              </>
            ),
          },
          {
            emoji: "💬",
            title: "Personnalise les textes",
            body: (
              <>
                Ne copie pas les textes d'exemple mot pour mot. Reprends ce
                que tu as préparé au Module 10 et adapte chaque section à ta
                personnalité et à tes services.
              </>
            ),
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-2xl p-5 md:p-6"
            style={{ backgroundColor: "#faf7e0" }}
          >
            <div
              className="uppercase tracking-tight font-black text-base md:text-lg"
              style={{ color: OLIVE }}
            >
              {c.title}
            </div>
            <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: OLIVE }}>
              {c.body}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        À la fin,{" "}
        <strong>
          deux créatrices qui achètent exactement le même template peuvent
          avoir deux portfolios complètement différents.
        </strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* À toi de jouer */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ton objectif est simple :
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-2 justify-center">
        {CHALLENGE_STEPS.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span
              className="uppercase tracking-tight text-xs md:text-sm font-black px-4 py-2 rounded-full"
              style={{ backgroundColor: OLIVE, color: "#ffffff" }}
            >
              {s}
            </span>
            {i < CHALLENGE_STEPS.length - 1 && <span style={{ color: OLIVE }}>→</span>}
          </span>
        ))}
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module11Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        on passe à la partie professionnelle de ton activité.
      </strong>
    </p>
  );
}
