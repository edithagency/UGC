"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const FREE_LIMIT = 10;
const PRO_URL = "/boutique";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  a_contacter: { bg: "#f0e59b", color: "#6f5f1f" },
  contactee: { bg: "#e5eefc", color: "#4c6b9c" },
  relancer: { bg: "#fde3c8", color: "#b86b2c" },
  discussion: { bg: "#ece0f5", color: "#7a5aa1" },
  collab: { bg: "#dff0dd", color: "#4f7d55" },
  terminee: { bg: "#e2ebe2", color: "#556d55" },
  refus: { bg: "#fadada", color: "#a56b6b" },
};

const STATUS_FLOW = [
  { key: "a_contacter", label: "À contacter", desc: "Tu as identifié la marque mais tu ne l'as pas encore démarchée." },
  { key: "contactee", label: "Contactée", desc: "Ton premier message a été envoyé." },
  { key: "relancer", label: "À relancer", desc: "Tu n'as pas reçu de réponse et une relance est prévue." },
  { key: "discussion", label: "En discussion", desc: "Vous échangez sur une collaboration, le brief, les tarifs ou les conditions." },
  { key: "collab", label: "Collaboration en cours", desc: "La collaboration est confirmée." },
  { key: "terminee", label: "Terminée", desc: "La prestation a été réalisée." },
];

const FICHE_FIELDS = [
  { emoji: "🏷️", label: "Marque", body: "Nom + secteur" },
  { emoji: "🔗", label: "Liens", body: "Site / Instagram / TikTok" },
  { emoji: "👤", label: "Contact", body: "Nom du contact + email / Instagram / LinkedIn" },
  { emoji: "💬", label: "Canal de prospection", body: "Email / DM Instagram / autre" },
  { emoji: "📅", label: "Premier contact", body: "Date d'envoi de ton premier message" },
  { emoji: "🔔", label: "Prochaine relance", body: "La date à laquelle tu souhaites revenir vers elle" },
  { emoji: "📍", label: "Statut", body: "Où en est la marque actuellement ?" },
  { emoji: "💡", label: "Idée de contenu", body: "L'idée imaginée au Module 16" },
  { emoji: "📝", label: "Notes", body: "Budget, réponse reçue, informations importantes…" },
];

const PRO_FEATURES = [
  "Marques illimitées",
  "Relances et dates de suivi",
  "Pipeline complet",
  "Filtres et recherche",
  "Suivi des collaborations",
  "Montants des collaborations",
  "Contrat signé ✓",
  "Facture envoyée ✓",
  "Paiement reçu ✓",
  "Statistiques de prospection",
  "Historique de tes clients",
  "Clients à recontacter",
];

const LOCKED_FEATURES = [
  { emoji: "📊", label: "Mes statistiques" },
  { emoji: "💰", label: "Mon CA UGC" },
  { emoji: "🤝", label: "Mes clients" },
];

function CtaTracker({ label = "Ouvrir mon Tracker →" }: { label?: string }) {
  return (
    <Link
      href="/tracker"
      className="inline-block uppercase tracking-wider text-xs md:text-sm font-black px-5 py-3 rounded-full hover:scale-105 transition-transform"
      style={{ backgroundColor: OLIVE, color: "#ffffff" }}
    >
      {label}
    </Link>
  );
}

function TrackerBadge({ count }: { count: number }) {
  const capped = Math.min(count, FREE_LIMIT);
  return (
    <div
      className="sticky top-16 md:top-20 z-30 mt-6 rounded-2xl p-3 md:p-4 flex items-center justify-between gap-3 backdrop-blur"
      style={{ backgroundColor: "rgba(244, 239, 194, 0.95)" }}
    >
      <div>
        <div
          className="uppercase tracking-wider text-[9px] md:text-[10px] font-black"
          style={{ color: OLIVE, opacity: 0.7 }}
        >
          Mon Tracker
        </div>
        <div
          className="uppercase tracking-tight font-black text-sm md:text-base"
          style={{ color: OLIVE }}
        >
          {capped} / {FREE_LIMIT} marques
        </div>
      </div>
      <Link
        href="/tracker"
        className="uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full"
        style={{ backgroundColor: OLIVE, color: "#ffffff" }}
      >
        Ouvrir →
      </Link>
    </div>
  );
}

export function Module17Content() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => (r.ok ? r.json() : { count: 0 }))
      .then((j) => setCount(j.count ?? 0))
      .catch(() => setCount(0));
  }, []);

  const displayCount = count ?? 0;

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
            17
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Organiser ta prospection avec le Tracker
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Tu as trouvé tes 10 premières marques. Il faut maintenant éviter le
        piège classique : prospecter puis oublier qui tu as contacté, quand
        relancer et qui t'a répondu.
      </p>

      <TrackerBadge count={displayCount} />

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Une bonne prospection ne repose pas uniquement sur les messages
          que tu envoies. Elle repose aussi sur <strong>ton suivi</strong>.
          C'est exactement pour ça que tu as accès au{" "}
          <strong>Tracker UGC</strong> directement sur ton compte.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* À quoi sert */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À quoi sert ton Tracker ?
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Imagine que dans quelques semaines tu aies contacté 40 marques. Tu
        ne peux pas retenir de tête <em>« Est-ce que j'ai déjà contacté
        cette marque ? Elle m'avait répondu quoi ? J'avais envoyé un mail
        ou un DM ? Ça fait combien de temps ? »</em>
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ton Tracker devient <strong>ton tableau de bord de prospection</strong>.
        À chaque fois qu'une marque avance, tu mets sa fiche à jour.
      </p>
      <hr className="my-10 border-[var(--border)]" />

      {/* Statuts */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Découvre ton tableau de bord
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Les 10 marques ajoutées au Module 16 doivent déjà apparaître dans
        ton Tracker. Le suivi s'appuie sur des <strong>statuts très
        simples</strong> :
      </p>
      <div className="mt-6 space-y-3">
        {STATUS_FLOW.map((s) => {
          const c = STATUS_COLORS[s.key];
          return (
            <div
              key={s.key}
              className="rounded-2xl p-4 md:p-5 flex items-start gap-4"
              style={{ backgroundColor: "#faf7e0" }}
            >
              <span
                className="flex-shrink-0 uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full"
                style={{ backgroundColor: c.bg, color: c.color }}
              >
                {s.label}
              </span>
              <p className="text-sm md:text-base" style={{ color: OLIVE }}>
                {s.desc}
              </p>
            </div>
          );
        })}
        <div
          className="rounded-2xl p-4 md:p-5 flex items-start gap-4"
          style={{ backgroundColor: "#faf7e0" }}
        >
          <span
            className="flex-shrink-0 uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full"
            style={{ backgroundColor: STATUS_COLORS.refus.bg, color: STATUS_COLORS.refus.color }}
          >
            Refus / Pas intéressée
          </span>
          <p className="text-sm md:text-base" style={{ color: OLIVE }}>
            Ce n'est pas grave. Un refus est simplement une étape de ta
            prospection, pas la fin de celle-ci.
          </p>
        </div>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Fiche marque */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Une fiche marque = toutes les infos au même endroit
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Clique sur l'une de tes marques dans le Tracker. Sa fiche peut
        regrouper :
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {FICHE_FIELDS.map((f) => (
          <div
            key={f.label}
            className="rounded-2xl p-4 flex items-start gap-3"
            style={{ backgroundColor: CREAM }}
          >
            <span className="text-2xl">{f.emoji}</span>
            <div>
              <div className="uppercase tracking-tight font-black text-sm md:text-base" style={{ color: OLIVE }}>
                {f.label}
              </div>
              <p className="text-xs md:text-sm mt-1" style={{ color: OLIVE }}>
                {f.body}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        L'objectif : si tu ouvres une fiche dans deux mois,{" "}
        <strong>tu dois comprendre en quelques secondes tout ce qui s'est
        passé avec cette marque.</strong>
      </p>
      <hr className="my-10 border-[var(--border)]" />

      {/* Mise à jour */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Mets à jour ton Tracker au fur et à mesure
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Le Tracker ne fonctionne que si tu prends l'habitude de le mettre à
        jour. Quelques secondes après chaque action suffisent.
      </p>
      <div className="mt-6 space-y-3">
        {[
          { trigger: "Tu envoies un pitch", fromKey: "a_contacter", toKey: "contactee", from: "À contacter", to: "Contactée" },
          { trigger: "La marque te répond", fromKey: "contactee", toKey: "discussion", from: "Contactée", to: "En discussion" },
          { trigger: "Elle accepte", fromKey: "discussion", toKey: "collab", from: "En discussion", to: "Collaboration en cours" },
        ].map((r, i) => {
          const cFrom = STATUS_COLORS[r.fromKey];
          const cTo = STATUS_COLORS[r.toKey];
          return (
            <div
              key={i}
              className="rounded-2xl p-4 md:p-5"
              style={{ backgroundColor: "#faf7e0" }}
            >
              <div className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-2" style={{ color: OLIVE }}>
                {r.trigger}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="uppercase tracking-tight text-xs font-black px-3 py-1 rounded-full"
                  style={{ backgroundColor: cFrom.bg, color: cFrom.color }}
                >
                  {r.from}
                </span>
                <span style={{ color: OLIVE }}>→</span>
                <span
                  className="uppercase tracking-tight text-xs font-black px-3 py-1 rounded-full"
                  style={{ backgroundColor: cTo.bg, color: cTo.color }}
                >
                  {r.to} ✓
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <hr className="my-10 border-[var(--border)]" />

      {/* Tableau de bord */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ton tableau de bord
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        En haut du Tracker, quelques chiffres très simples te suivent :
      </p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {[
          { k: "a_contacter", l: "À contacter" },
          { k: "contactee", l: "Contactée" },
          { k: "relancer", l: "À relancer" },
          { k: "discussion", l: "En discussion" },
          { k: "collab", l: "Collaboration en cours" },
          { k: "terminee", l: "Terminée" },
          { k: "refus", l: "Refus" },
        ].map((s) => {
          const c = STATUS_COLORS[s.k];
          return (
            <div
              key={s.k}
              className="rounded-xl px-2 py-3 text-center"
              style={{ backgroundColor: c.bg }}
            >
              <div className="uppercase tracking-wider text-[9px] font-black leading-tight" style={{ color: c.color }}>
                {s.l}
              </div>
              <div className="text-xl font-black mt-1" style={{ color: c.color }}>
                0
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs md:text-sm text-center" style={{ color: OLIVE, opacity: 0.7 }}>
        {displayCount} marque{displayCount > 1 ? "s" : ""} suivie{displayCount > 1 ? "s" : ""} au total
      </p>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Au début, voir <strong>0 collaboration</strong> est totalement
        normal. Ce qui compte, c'est de faire progresser les chiffres que
        tu contrôles : marques ajoutées ↑ → messages envoyés ↑ → relances ↑.
        Les réponses et les collaborations suivront.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Ton Tracker gratuit */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ton Tracker gratuit
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ton compte te donne accès gratuitement au Tracker pour suivre{" "}
        <strong>jusqu'à 10 marques</strong>. Ce ne sont pas 10 marques « de
        démonstration » : tu peux réellement ajouter, organiser, contacter,
        changer les statuts, suivre tes prospects. Tu peux faire toute la
        formation sans payer.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Tracker Pro */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Quand tu veux prospecter davantage : Tracker Pro
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        10 marques vont rapidement devenir peu lorsque tu commenceras à
        prospecter régulièrement. Tracker Pro est là pour transformer ta
        prospection en <strong>véritable système</strong>.
      </p>

      <div
        className="mt-6 rounded-2xl p-6 md:p-8"
        style={{ backgroundColor: OLIVE, color: "#ffffff" }}
      >
        <div className="flex items-baseline justify-between flex-wrap gap-4">
          <div>
            <div className="uppercase tracking-wider text-[10px] md:text-xs font-black opacity-80">
              Tracker Pro
            </div>
            <div className="mt-1 font-black text-3xl md:text-4xl">
              19 €{" "}
              <span className="text-sm md:text-base font-normal opacity-80">
                — paiement unique
              </span>
            </div>
            <div className="text-xs md:text-sm opacity-80 mt-1">
              Pas d'abonnement mensuel.
            </div>
          </div>
          <a
            href={PRO_URL}
            className="uppercase tracking-wider text-xs md:text-sm font-black px-5 py-3 rounded-full bg-white hover:scale-105 transition-transform"
            style={{ color: OLIVE }}
          >
            Débloquer Tracker Pro →
          </a>
        </div>

        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm md:text-base">
          {PRO_FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="opacity-80">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-sm md:text-base italic" style={{ color: OLIVE }}>
        Tu peux continuer la formation avec la version gratuite. Le Pro est
        là si tu veux suivre davantage de marques et utiliser le Tracker
        sur la durée.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* À toi de jouer */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Reprends maintenant tes 10 marques du Module 16. Pour chacune :
        vérifie son nom et son secteur, ajoute son site ou réseau
        principal, ajoute ton idée de contenu, recherche un contact si tu
        peux déjà en identifier un, vérifie qu'elle est bien en{" "}
        <strong>« À contacter »</strong>.
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Puis choisis <strong>3 marques prioritaires ⭐</strong>. Ce seront
        les premières avec lesquelles nous allons travailler au prochain
        module.
      </p>
      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module17Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        on écrit ton pitch, on contacte tes premières marques et on
        apprend à les relancer efficacement.
      </strong>
    </p>
  );
}
