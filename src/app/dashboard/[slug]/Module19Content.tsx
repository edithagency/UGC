"use client";

import Link from "next/link";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const IMPROVE = [
  { title: "Ton ciblage", body: "Est-ce que tu contactes les bonnes marques ?" },
  { title: "Ton pitch", body: "Est-il réellement personnalisé ?" },
  { title: "Ton portfolio", body: "Montre-t-il rapidement ton niveau et ton univers ?" },
  { title: "Tes idées", body: "Proposes-tu quelque chose d'intéressant pour la marque ?" },
  { title: "Ta régularité", body: "As-tu suffisamment prospecté pour pouvoir réellement analyser tes résultats ?" },
];

const FLOW = ["Pitch", "Attente", "Relance", "Puis on avance"];

function CtaTracker() {
  return (
    <Link
      href="/tracker"
      className="inline-block uppercase tracking-wider text-xs md:text-sm font-black px-5 py-3 rounded-full hover:scale-105 transition-transform"
      style={{ backgroundColor: OLIVE, color: "#ffffff" }}
    >
      Ouvrir mon Tracker →
    </Link>
  );
}

export function Module19Content() {
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
            19
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Décroche ta première collab
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Place à l'action. Tu sais trouver des marques, écrire un pitch et
        relancer. À ce stade, regarder encore dix vidéos sur la prospection
        ne va pas t'aider davantage. <strong>Il faut prospecter.</strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Contacte-les
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu as déjà envoyé tes premiers pitchs au Module 18. Continue
        maintenant jusqu'à avoir <strong>contacté tes 10 marques</strong>.
        Tu peux répartir tes envois sur plusieurs jours. Le but n'est pas
        d'envoyer 10 messages le plus rapidement possible, le but est
        d'envoyer <strong>10 bons messages</strong>.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Suis tes démarches
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        À chaque message envoyé, mets simplement ton Tracker à jour. La
        date est enregistrée pour savoir depuis combien de temps ton
        message est parti.
      </p>
      <div className="mt-4">
        <CtaTracker />
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Relance quand c'est nécessaire
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Si une marque ne répond pas après un délai raisonnable, effectue
        la relance que tu as préparée au Module 18. Puis mets ton suivi à
        jour. <strong>Pas besoin de multiplier les messages.</strong>
      </p>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Tu pourras toujours revenir vers certaines marques plus tard avec
        un nouveau portfolio, une nouvelle idée ou au moment d'un lancement.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Une réponse est déjà une avancée
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Toutes tes réponses ne seront pas <em>« Oui, on veut travailler
        avec toi ! »</em>. Tu peux recevoir :
      </p>
      <ul className="mt-4 pl-6 list-disc text-base md:text-lg leading-relaxed">
        <li>« Quels sont vos tarifs ? »</li>
        <li>« Pouvez-vous nous envoyer votre portfolio ? »</li>
        <li>« Nous n'avons pas de besoin actuellement. »</li>
        <li>« Nous travaillons déjà avec d'autres créateurs. »</li>
      </ul>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ou aucune réponse. Tout cela fait partie de la prospection. Ton
        premier objectif est de <strong>créer des conversations</strong>.
        Une marque qui te demande tes tarifs ou davantage d'informations
        est déjà une opportunité.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Si personne ne répond
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ne conclus pas immédiatement <em>« Je ne suis pas faite pour
        l'UGC »</em>. Regarde plutôt ce que tu peux améliorer.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {IMPROVE.map((i) => (
          <div
            key={i.title}
            className="rounded-2xl p-5"
            style={{ backgroundColor: "#faf7e0" }}
          >
            <div className="uppercase tracking-tight font-black text-sm md:text-base" style={{ color: OLIVE }}>
              {i.title}
            </div>
            <p className="mt-2 text-sm md:text-base" style={{ color: OLIVE }}>{i.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Ensuite : <strong>Ajuste → Reteste → Continue.</strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Trouve ton rythme
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Une fois ce challenge terminé, la prospection ne doit pas s'arrêter.
        Tu peux consacrer <strong>15 à 30 minutes par jour</strong>, ou
        quelques sessions de prospection par semaine. Le meilleur rythme
        n'est pas le plus impressionnant, c'est <strong>celui que tu
        arrives à tenir dans le temps</strong>. Même quand tes premières
        collaborations arriveront, continue à alimenter régulièrement ta
        liste de prospects.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer
      </h2>
      <div
        className="mt-6 rounded-2xl p-5 md:p-6 text-center"
        style={{ backgroundColor: OLIVE, color: "#ffffff" }}
      >
        <div className="text-2xl mb-1">🏆</div>
        <div className="uppercase tracking-tight font-black text-base md:text-lg">
          Mission bonus : décrocher ta première collaboration UGC
        </div>
        <p className="mt-2 text-sm md:text-base opacity-90">
          Tu n'as pas besoin d'attendre qu'une marque dise oui pour continuer
          la formation. Les réponses des marques ne dépendent pas
          entièrement de toi.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module19Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        une marque te répond : comment répondre, annoncer tes tarifs et
        négocier sans casser tes prix ?
      </strong>
    </p>
  );
}
