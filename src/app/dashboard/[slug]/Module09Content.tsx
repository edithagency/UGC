"use client";

import Link from "next/link";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

type Platform = {
  name: string;
  emoji: string;
  tagline: string;
  minFollowers: string;
  description: string;
  url: string;
  cta: string;
};

const PLATFORMS: Platform[] = [
  {
    name: "Skeepers",
    emoji: "⭐",
    tagline: "",
    minFollowers: "Min. 1 000 abonnés IG / TikTok / YouTube",
    description:
      "Skeepers met en relation des créateurs avec des marques proposant des campagnes de gifting, des collaborations et certaines campagnes rémunérées. Idéal pour découvrir le fonctionnement d'une vraie campagne.",
    url: "https://skeepers.io/fr/influencer/",
    cta: "Découvrir Skeepers",
  },
  {
    name: "YOO",
    emoji: "💜",
    tagline: "",
    minFollowers: "Min. 1 000 abonnés IG / TikTok / YouTube",
    description:
      "Plateforme française dédiée aux collaborations entre marques et créateurs. Beauté, mode, food, sport, tech, voyage, famille, tu candidates aux campagnes qui t'intéressent.",
    url: "https://yoo.world/",
    cta: "Découvrir YOO",
  },
  {
    name: "L'Oréalistar",
    emoji: "💄",
    tagline: "",
    minFollowers: "Min. 1 000 abonnés IG / TikTok / YouTube",
    description:
      "Si ton univers est beauté, skincare ou cheveux : produits en avant-première, missions, événements, récompenses avec les marques du groupe. Accès soumis à conditions.",
    url: "https://www.lorealistar.fr/",
    cta: "Voir les conditions",
  },
];

const STEPS = [
  "Crée ton profil",
  "Découvre les campagnes",
  "Candidate",
  "Reçois le produit",
  "Crée le contenu",
];

const FUNNEL = [
  "Produit reçu",
  "Contenu créé",
  "Expérience",
  "Portfolio",
  "Premières prospections",
  "Collaborations rémunérées",
];

const CHECK_BEFORE = [
  "Contenu ?",
  "Publication ?",
  "Deadline ?",
  "Droits d'utilisation ?",
];

function PlatformCard({ p }: { p: Platform }) {
  return (
    <div className="rounded-2xl p-5 md:p-6 flex flex-col" style={{ backgroundColor: CREAM }}>
      <div className="flex items-center gap-3">
        <span className="text-2xl md:text-3xl">{p.emoji}</span>
        <div className="flex flex-col">
          <span
            className="uppercase tracking-tight text-lg md:text-xl font-black"
            style={{ color: OLIVE }}
          >
            {p.name}
          </span>
          {p.tagline && (
            <span className="text-xs md:text-sm italic" style={{ color: OLIVE, opacity: 0.7 }}>
              {p.tagline}
            </span>
          )}
        </div>
      </div>
      <div
        className="mt-4 rounded-full px-3 py-1 self-start uppercase tracking-wider text-[10px] md:text-xs font-black bg-white"
        style={{ color: OLIVE, border: `1.5px solid ${OLIVE}` }}
      >
        {p.minFollowers}
      </div>
      <p className="mt-4 text-sm md:text-base leading-relaxed flex-1" style={{ color: OLIVE }}>
        {p.description}
      </p>
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 self-start uppercase tracking-wider text-xs md:text-sm font-black px-5 py-3 rounded-full hover:scale-105 transition-transform"
        style={{ backgroundColor: OLIVE, color: "#ffffff" }}
      >
        {p.cta} →
      </a>
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

export function Module09Content() {
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
            09
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Le gifting : obtenir des produits pour ton portfolio
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Pas assez de produits pour créer tes premières vidéos ? Le gifting
        peut t'aider à construire ton portfolio sans devoir tout acheter.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Le gifting, c'est lorsqu'une marque{" "}
          <strong>t'envoie gratuitement un produit</strong>, généralement dans
          le cadre d'une campagne ou d'une collaboration. Pour une créatrice
          qui débute, c'est surtout un excellent moyen de{" "}
          <strong>
            s'entraîner sur de vrais produits, découvrir des marques et créer
            du contenu pour son portfolio.
          </strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Plateformes */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Les plateformes que je te recommande
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Probablement la méthode la plus simple pour commencer : tu crées ton
        profil, accèdes aux campagnes disponibles et candidates à celles qui
        correspondent à ton univers.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLATFORMS.map((p) => (
          <PlatformCard key={p.name} p={p} />
        ))}
      </div>

      <p className="mt-8 text-base md:text-lg leading-relaxed">
        Le fonctionnement de ces plateformes est assez simple :
      </p>
      <ArrowFlow items={STEPS} />

      <div
        className="mt-6 rounded-2xl p-5"
        style={{ backgroundColor: CREAM }}
      >
        <div
          className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-2"
          style={{ color: OLIVE }}
        >
          Ma stratégie
        </div>
        <p className="text-sm md:text-base" style={{ color: OLIVE }}>
          <strong>Ne t'inscris pas à 15 plateformes d'un coup.</strong>{" "}
          Commence par Skeepers, YOO et L'Oréalistar si tu es éligible.
          Complète bien ton profil, ajoute tes réseaux, et candidate
          régulièrement aux campagnes qui correspondent{" "}
          <strong>réellement à ton persona.</strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Contacter directement */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Contacter directement les marques
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Tu peux également obtenir du gifting sans passer par une plateforme.
          Repère une <strong>petite marque</strong> que tu apprécies sur TikTok
          ou Instagram et propose-lui de découvrir son produit et de créer du
          contenu.
        </p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « J'adore votre univers et particulièrement votre gamme X. Je suis
          créatrice UGC dans l'univers beauté/lifestyle et j'adorerais créer
          du contenu autour de vos produits. Êtes-vous ouverts aux
          collaborations gifting avec des créatrices ? »
        </p>
        <p>
          Cette méthode te permet de{" "}
          <strong>
            commencer à te faire connaître des marques avant même de passer à
            la prospection rémunérée.
          </strong>{" "}
          On apprendra plus tard à construire un vrai pitch de prospection.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Programmes ambassadeurs */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Les programmes ambassadeurs
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Certaines marques possèdent directement leur propre programme
        créateurs, ambassadeurs ou communauté. Regarde sur :
      </p>
      <TagRow options={["Leur site", "Instagram", "TikTok", "Newsletter"]} />
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu peux aussi rechercher :
      </p>
      <ul className="mt-2 pl-6 list-disc text-base md:text-lg leading-relaxed">
        <li>« Nom de la marque + programme ambassadeur »</li>
        <li>« Nom de la marque + créateurs »</li>
        <li>« Nom de la marque + gifting »</li>
      </ul>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        L'avantage : tu peux parfois construire une{" "}
        <strong>relation plus longue avec une même marque</strong>, plutôt que
        recevoir un produit une seule fois.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Pourquoi */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Mais pourquoi faire du gifting ?
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ton objectif n'est pas d'avoir une salle de bain remplie de produits
        gratuits. Ton objectif est plutôt :
      </p>
      <ArrowFlow items={FUNNEL} />

      <p className="mt-8 text-base md:text-lg leading-relaxed">
        Imaginons que tu veuilles te positionner en beauté. Tu obtiens 3
        produits intéressants grâce au gifting et tu crées :
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: "Produit 1", value: "Face cam" },
          { label: "Produit 2", value: "Voice-over esthétique" },
          { label: "Produit 3", value: "Problème / solution" },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-2xl p-4 md:p-5"
            style={{ backgroundColor: CREAM }}
          >
            <div
              className="uppercase tracking-wider text-[10px] md:text-xs font-black"
              style={{ color: OLIVE }}
            >
              {c.label}
            </div>
            <div className="mt-2 font-black text-base md:text-lg" style={{ color: OLIVE }}>
              {c.value}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu as déjà{" "}
        <strong>3 créations différentes à sélectionner pour ton futur
        portfolio.</strong>{" "}
        Choisis tes giftings en fonction des contenus qui te manquent, et pas
        seulement parce que tu veux recevoir le produit.
      </p>
      <div
        className="mt-6 rounded-2xl p-5 md:p-6"
        style={{ backgroundColor: CREAM }}
      >
        <div
          className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-2"
          style={{ color: OLIVE }}
        >
          Important
        </div>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: OLIVE }}>
          Tu peux tout à fait construire ton portfolio sans passer par le
          gifting, en filmant des produits que tu possèdes déjà. Mais{" "}
          <strong>
            le gifting te permet de dire que tu as réellement travaillé avec
            de belles marques.
          </strong>{" "}
          Tu ne peux pas prétendre sur ton portfolio avoir collaboré avec
          une marque si ce sont juste des produits que tu as achetés
          toi-même.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Avant d'accepter */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Avant d'accepter
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Un produit gratuit n'est pas automatiquement une rémunération pour
        une prestation complète. Regarde toujours ce qui est demandé :
      </p>
      <TagRow options={CHECK_BEFORE} />
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Si une marque t'envoie un produit à 20 € mais demande{" "}
        <strong>plusieurs vidéos, les rushs, une publication et de larges
        droits publicitaires</strong>, tu peux refuser ou négocier. On
        approfondira justement les droits d'utilisation dans un prochain
        module.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module09Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        maintenant que tu sais comment obtenir tes produits, on va créer
        volontairement les contenus dont ton portfolio a besoin.
      </strong>
    </p>
  );
}
