"use client";

import Link from "next/link";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const GOOD_HABITS = [
  "Respecter le brief",
  "Respecter les délais",
  "Communiquer clairement",
  "Prévenir rapidement en cas de problème",
  "Accepter correctement les retours prévus",
  "Livrer des fichiers propres",
  "Rester agréable et professionnelle",
];

const RETURN_REASONS = [
  {
    emoji: "🆕",
    title: "Un nouveau produit",
    quote:
      "« J'ai vu le lancement de votre nouvelle gamme et j'ai immédiatement pensé à un concept UGC autour de… »",
  },
  {
    emoji: "💡",
    title: "Une nouvelle idée",
    quote:
      "« En voyant vos derniers contenus, j'ai imaginé un format face cam autour de… »",
  },
  {
    emoji: "📅",
    title: "Une période importante",
    quote: "Noël, rentrée, été, Saint-Valentin, soldes, lancement…",
  },
  {
    emoji: "🎬",
    title: "Un nouveau format",
    quote:
      "« Depuis notre dernière collaboration, j'ai beaucoup développé mes contenus storytelling et je pense que ce format pourrait bien fonctionner pour… »",
  },
];

const ORG_FIELDS = ["Marque", "Contenu à produire", "Statut", "Deadline", "Montant", "Facture", "Paiement"];

const STATUS_FLOW = [
  "À préparer",
  "À tourner",
  "À monter",
  "Envoyée",
  "Retours",
  "Validée",
  "Facturée",
  "Payée ✓",
];

const BATCHES = [
  { emoji: "🎥", title: "Tournage", body: "Tourner plusieurs contenus pendant une même session lorsque c'est possible." },
  { emoji: "💻", title: "Montage", body: "Prévoir des plages dédiées." },
  { emoji: "💌", title: "Prospection", body: "Réserver certains moments pour trouver des marques, envoyer des pitchs et relancer." },
  { emoji: "🧾", title: "Administratif", body: "Vérifier régulièrement contrats, factures et paiements." },
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>{title}</h2>
      {children}
    </>
  );
}

export function Module22Content() {
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
            22
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Fidéliser ses clients et développer son activité
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Trouver une nouvelle marque demande du travail. Une marque avec
        laquelle tu as déjà travaillé, elle te connaît déjà.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Elle connaît ton travail, ta façon de communiquer, sait que tu
          respectes tes délais et a déjà validé ton contenu. Alors après
          une bonne collaboration, <strong>ne disparais pas</strong>. Ton
          prochain objectif :
        </p>
      </div>
      <ArrowFlow items={["1 collab", "2ᵉ collab", "Client récurrent 🔁"]} />

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Termine bien chaque collaboration">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          La fidélisation commence <strong>avant même que la collaboration
          soit terminée</strong>. Une marque aura davantage envie de
          retravailler avec une créatrice qui :
        </p>
        <div className="mt-6 rounded-2xl p-6" style={{ backgroundColor: CREAM }}>
          <ul className="space-y-2 list-disc pl-6 text-base md:text-lg" style={{ color: OLIVE }}>
            {GOOD_HABITS.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Ton contenu compte. Mais l'<strong>expérience de travailler avec
          toi</strong> compte aussi. Si travailler avec toi est simple et
          fluide, c'est un vrai avantage.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Ne disparais pas après la livraison">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Une fois le contenu validé, remercie simplement ton contact :
        </p>
        <div className="mt-4 rounded-2xl p-5 md:p-6 bg-white text-sm md:text-base whitespace-pre-wrap leading-relaxed" style={{ color: OLIVE, border: `1.5px solid ${CREAM}` }}>
{`Bonjour [Prénom],

Merci encore pour cette collaboration ! J'ai beaucoup aimé créer ce contenu pour [Marque].

N'hésitez pas à me tenir au courant de vos retours et de vos prochains besoins UGC, je serais ravie de retravailler avec vous.

Belle journée,
[Prénom]`}
        </div>
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Pas besoin d'envoyer immédiatement{" "}
          <em>« Vous avez une autre collaboration pour moi ? »</em>. Tu
          termines simplement la collaboration en{" "}
          <strong>laissant la porte ouverte</strong>.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Demande des retours">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Lorsque c'est pertinent, tu peux demander à la marque ce qu'elle
          a pensé du contenu :
        </p>
        <p className="mt-2 italic pl-4 border-l-2 border-[var(--border)] text-base md:text-lg leading-relaxed">
          « Si vous avez l'occasion d'avoir des retours ou des résultats
          sur le contenu, je serais également très intéressée de les
          connaître afin de continuer à améliorer mes créations. »
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Ces informations peuvent t'aider à comprendre ce qui a plu, ce
          qui a fonctionné, ce que tu peux améliorer et ce que tu pourrais
          proposer ensuite. Un retour positif peut aussi devenir un{" "}
          <strong>témoignage client dans ton portfolio</strong> (avec son
          accord si nécessaire).
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Recontacte tes anciennes marques">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Une marque qui n'a pas de besoin aujourd'hui peut en avoir dans
          quelques semaines. Mais évite de revenir avec{" "}
          <em>« Bonjour, avez-vous de nouveaux besoins ? »</em>. Tu peux
          faire mieux : <strong>reviens avec une raison</strong>.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {RETURN_REASONS.map((r) => (
            <div key={r.title} className="rounded-2xl p-5" style={{ backgroundColor: "#faf7e0" }}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{r.emoji}</span>
                <div className="uppercase tracking-tight font-black text-sm md:text-base" style={{ color: OLIVE }}>
                  {r.title}
                </div>
              </div>
              <p className="mt-2 italic text-sm md:text-base" style={{ color: OLIVE }}>
                {r.quote}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-base md:text-lg leading-relaxed">
          Tu ne demandes plus simplement du travail. Tu apportes une{" "}
          <strong>nouvelle opportunité de contenu</strong>.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Propose plusieurs contenus">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Quand une marque est satisfaite, tu peux commencer à réfléchir
          au-delà d'une seule vidéo. Au lieu de proposer{" "}
          <strong>1 vidéo</strong>, tu peux proposer{" "}
          <strong>3 vidéos</strong>, plusieurs angles / concepts, ou un{" "}
          <strong>besoin récurrent chaque mois</strong>.
        </p>
        <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
          <p className="italic text-sm md:text-base" style={{ color: OLIVE }}>
            « Si vous avez besoin de renouveler régulièrement vos
            créatives, je peux également vous proposer un pack de plusieurs
            contenus avec différents angles pour le mois. »
          </p>
        </div>
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Elle obtient plusieurs contenus avec une créatrice qu'elle
          connaît déjà. Toi, tu passes progressivement de collaborations
          isolées à des <strong>revenus plus réguliers</strong>.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Le client récurrent est précieux">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-2xl p-5" style={{ backgroundColor: "#faf7e0" }}>
            <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE, opacity: 0.7 }}>
              Option A
            </div>
            <p className="mt-2 text-sm md:text-base" style={{ color: OLIVE }}>
              Chaque mois : prospecter → pitcher → relancer → négocier → 1
              collab. Puis tout recommencer.
            </p>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
            <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE, opacity: 0.7 }}>
              Option B
            </div>
            <p className="mt-2 text-sm md:text-base" style={{ color: OLIVE }}>
              Tu continues à prospecter, mais certaines marques
              reviennent : <strong>nouveaux clients + clients récurrents
              = activité plus stable</strong>.
            </p>
          </div>
        </div>
        <p className="mt-6 text-base md:text-lg leading-relaxed">
          C'est vers cette deuxième situation que tu veux progressivement
          aller. Ça ne veut pas dire arrêter la prospection :{" "}
          <strong>tu continues à chercher de nouvelles opportunités tout
          en développant les relations existantes</strong>.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Garde une liste de marques à recontacter">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Dans ton Tracker, ne pense pas uniquement{" "}
          <em>« Prospects à contacter »</em>. Pense aussi{" "}
          <em>« Clients à recontacter »</em>. Après une collaboration
          réussie, garde la marque dans ton suivi avec la date de la
          dernière collab, ce que tu as créé, le retour reçu, le montant,
          la prochaine idée et le moment pertinent pour reprendre contact.
        </p>
        <div className="mt-6">
          <Link
            href="/tracker"
            className="inline-block uppercase tracking-wider text-xs md:text-sm font-black px-5 py-3 rounded-full hover:scale-105 transition-transform"
            style={{ backgroundColor: OLIVE, color: "#ffffff" }}
          >
            Ouvrir mon Tracker →
          </Link>
        </div>
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Au fil du temps, ton Tracker ne devient plus uniquement un outil
          de prospection : il devient aussi{" "}
          <strong>l'historique de ton activité UGC</strong>.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module22Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        dernier module — comment te différencier et passer au niveau
        supérieur.
      </strong>
    </p>
  );
}
