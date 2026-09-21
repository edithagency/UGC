"use client";

import Link from "next/link";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const GUICHET_URL = "https://formalites.entreprises.gouv.fr/";

const PREP_TAGS = [
  { emoji: "🪪", label: "Identité" },
  { emoji: "🏠", label: "Adresse" },
  { emoji: "💼", label: "Activité" },
  { emoji: "📄", label: "Justificatifs" },
];

const HABITS = [
  "Facturer",
  "Suivre ton chiffre d'affaires",
  "Déclarer",
  "Payer tes cotisations",
  "Conserver tes documents",
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

export function Module12Content() {
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
            12
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Créer sa micro-entreprise
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Ton portfolio est prêt. Avant de commencer à facturer tes premières
        collaborations, il faut donner un cadre professionnel à ton activité.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Pour ma part, j'ai choisi la <strong>micro-entreprise</strong>, un
          régime simplifié de l'entreprise individuelle. C'est une solution
          souvent utilisée pour démarrer une activité indépendante, mais ce
          n'est pas la seule possibilité :{" "}
          <strong>
            le statut adapté dépend toujours de ta situation personnelle et
            de ton activité.
          </strong>
        </p>
      </div>

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
          Cette partie partage mon expérience et des informations générales,
          pas un conseil juridique, fiscal ou comptable personnalisé.{" "}
          <strong>
            Les règles peuvent évoluer : utilise toujours les sites
            officiels pour tes démarches.
          </strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Pourquoi */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Pourquoi avoir un statut ?
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          À partir du moment où ton activité devient professionnelle et que
          tu souhaites facturer tes prestations aux marques, tu dois exercer
          dans un cadre adapté.
        </p>
        <p>
          Cela va notamment te permettre d'avoir une entreprise identifiée,
          <strong> d'émettre tes factures</strong> et de{" "}
          <strong>déclarer les revenus</strong> générés par ton activité.
        </p>
        <p>
          En micro-entreprise, tu restes entrepreneure individuelle, avec un
          régime social et fiscal simplifié. Les cotisations sociales sont
          calculées en appliquant{" "}
          <strong>un pourcentage à ton chiffre d'affaires déclaré.</strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Comment créer */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Comment créer ta micro-entreprise ?
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        La création se fait en ligne via le{" "}
        <strong>Guichet unique des formalités des entreprises</strong>,
        opéré par l'INPI. C'est le portail officiel pour déclarer la
        création d'une entreprise.
      </p>
      <div className="mt-4">
        <a
          href={GUICHET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 uppercase tracking-wider text-xs md:text-sm font-black pl-4 pr-5 py-2 rounded-full hover:scale-105 transition-transform"
          style={{ backgroundColor: OLIVE, color: "#ffffff" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/inpi.png"
            alt="INPI"
            className="w-8 h-8 md:w-9 md:h-9 rounded-md bg-white object-contain p-1"
          />
          Créer son entreprise sur le Guichet unique →
        </a>
      </div>

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Le formulaire s'adapte aux informations que tu renseignes. Le
        Guichet unique permet notamment de déclarer{" "}
        <strong>ton identité, l'adresse de ton entreprise et ton
        activité.</strong>
      </p>

      <div
        className="mt-6 rounded-2xl p-5 md:p-6"
        style={{ backgroundColor: CREAM }}
      >
        <p style={{ color: OLIVE }} className="text-base md:text-lg leading-relaxed">
          Attention aux <strong>sites intermédiaires payants</strong>. Pour
          ta démarche, pars toujours du portail officiel ci-dessus.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Prépare tes infos */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Prépare tes informations avant de commencer
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Pour éviter de bloquer au milieu de ta déclaration, prépare tes
        documents et informations.
      </p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {PREP_TAGS.map((p) => (
          <div
            key={p.label}
            className="rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2"
            style={{ backgroundColor: CREAM }}
          >
            <span className="text-3xl">{p.emoji}</span>
            <span
              className="uppercase tracking-wider text-[10px] md:text-xs font-black"
              style={{ color: OLIVE }}
            >
              {p.label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Le Guichet unique indique notamment qu'il faut préparer une{" "}
        <strong>pièce d'identité à jour</strong>, un{" "}
        <strong>justificatif de domicile</strong> et son{" "}
        <strong>numéro de Sécurité sociale</strong>. D'autres justificatifs
        peuvent être demandés selon la situation et l'activité déclarée.
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Prends surtout le temps de{" "}
        <strong>décrire correctement ton activité réelle</strong> plutôt que
        de copier mot pour mot ce qu'une autre créatrice a déclaré.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Après la création */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Et après la création ?
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Une fois ton entreprise enregistrée, elle disposera notamment d'un{" "}
        <strong>SIREN et d'un SIRET</strong> permettant de l'identifier.
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Mais créer ta micro-entreprise n'est que le début. Tu vas ensuite
        devoir prendre de bonnes habitudes :
      </p>
      <ArrowFlow items={HABITS} />

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        En micro-entreprise, la déclaration et le paiement des cotisations
        se font selon une <strong>périodicité mensuelle ou trimestrielle</strong>.
        On verra la partie facturation plus précisément dans le Module 15.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Pense comme une entrepreneure */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Pense comme une entrepreneure
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          À partir de maintenant, l'argent versé par une marque n'est pas
          simplement <em>« 300 € dans ta poche »</em>. Tu dois prendre en
          compte tes cotisations, tes éventuels impôts, tes dépenses
          professionnelles et les autres obligations applicables à ta
          situation.
        </p>
        <p>
          Une bonne habitude dès tes premières collaborations :{" "}
          <strong>
            sépare mentalement, et idéalement dans ton organisation, ton
            chiffre d'affaires de ce que tu peux réellement dépenser.
          </strong>{" "}
          Cela va aussi devenir important dans le prochain module lorsque
          nous allons construire tes tarifs.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module12Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        maintenant que tu commences à penser comme une professionnelle, on
        répond à LA grande question : combien facturer tes contenus UGC ?
      </strong>
    </p>
  );
}
