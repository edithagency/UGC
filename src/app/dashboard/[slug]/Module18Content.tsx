"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useWorkbookField } from "@/lib/useWorkbookField";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const WB_PROFILE = "module18:profile";
const WB_PITCHES = "module18:pitches";

type Lead = {
  id: string;
  brand_name: string;
  sector: string | null;
  link: string | null;
  contact: string | null;
  why: string | null;
  content_idea: string | null;
  status: string;
  next_reminder_at: string | null;
  sent_at: string | null;
  updated_at: string;
};

type Profile = { first_name: string; portfolio_url: string };
type PitchState = {
  perso: string;
  idea: string;
  canal: "email" | "dm";
};
type PitchesMap = Record<string, PitchState>;

const STRUCTURE_STEPS = ["Personnalisation", "Présentation", "Idée", "Portfolio", "CTA"];

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

function buildPitch(
  lead: Lead,
  pitch: PitchState,
  profile: Profile
): string {
  const first = profile.first_name.trim() || "[Prénom]";
  const portfolio = profile.portfolio_url.trim() || "[lien portfolio]";
  const brand = lead.brand_name;
  const perso = pitch.perso.trim() || `[élément précis observé sur ${brand}]`;
  const idea = pitch.idea.trim() || "[ton idée de contenu]";

  if (pitch.canal === "dm") {
    return `Bonjour ! Je suis ${first}, créatrice UGC. J'ai vu ${perso} chez ${brand} et j'ai imaginé un contenu : ${idea}. Mon portfolio : ${portfolio}. À qui puis-je m'adresser pour vos collaborations UGC ? 😊`;
  }
  return `Bonjour,

Je suis ${first}, créatrice UGC. J'ai découvert ${brand} et j'ai particulièrement aimé ${perso}.

Je verrais très bien un contenu UGC autour de : ${idea}.

Je vous laisse mon portfolio pour découvrir mon univers : ${portfolio}

Travaillez-vous actuellement avec des créatrices UGC ?

Belle journée,
${first}`;
}

function PitchCard({
  lead,
  pitch,
  setPitch,
  profile,
  onSent,
  onRelance,
}: {
  lead: Lead;
  pitch: PitchState;
  setPitch: (v: PitchState) => void;
  profile: Profile;
  onSent: () => void;
  onRelance: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const text = useMemo(() => buildPitch(lead, pitch, profile), [lead, pitch, profile]);
  const sent = lead.status !== "a_contacter";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: CREAM }}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE, opacity: 0.7 }}>
            Marque
          </div>
          <div className="text-lg md:text-xl font-black uppercase tracking-tight" style={{ color: OLIVE }}>
            {lead.brand_name}
          </div>
          {lead.sector && (
            <div className="text-xs mt-1" style={{ color: OLIVE, opacity: 0.7 }}>
              {lead.sector}
            </div>
          )}
        </div>
        {sent && (
          <span
            className="uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full"
            style={{ backgroundColor: "#e5eefc", color: "#4c6b9c" }}
          >
            {lead.status === "envoye" ? "Contactée ✓" : lead.status}
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>
            Personnalisation
          </label>
          <input
            type="text"
            value={pitch.perso}
            onChange={(e) => setPitch({ ...pitch, perso: e.target.value })}
            placeholder="Ex : votre gamme peaux sensibles"
            className="w-full px-4 py-3 rounded-full text-sm md:text-base bg-white outline-none"
            style={{ border: `1.5px solid #ffffff`, color: OLIVE }}
          />
        </div>
        <div>
          <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>
            Mon idée de contenu
          </label>
          <input
            type="text"
            value={pitch.idea}
            onChange={(e) => setPitch({ ...pitch, idea: e.target.value })}
            placeholder={lead.content_idea ?? "Ex : POV problème / solution"}
            className="w-full px-4 py-3 rounded-full text-sm md:text-base bg-white outline-none"
            style={{ border: `1.5px solid #ffffff`, color: OLIVE }}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>
          Canal
        </label>
        <div className="flex flex-wrap gap-2">
          {(["email", "dm"] as const).map((c) => {
            const active = pitch.canal === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setPitch({ ...pitch, canal: c })}
                className="uppercase tracking-wider text-xs md:text-sm font-black px-4 py-2 rounded-full transition-transform hover:scale-105"
                style={
                  active
                    ? { backgroundColor: OLIVE, color: "#ffffff" }
                    : { backgroundColor: "#ffffff", color: OLIVE }
                }
              >
                {c === "email" ? "Email" : "DM Instagram"}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="mt-5 rounded-2xl p-4 md:p-5 bg-white text-sm md:text-base whitespace-pre-wrap"
        style={{ color: OLIVE }}
      >
        {text}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copy}
          className="uppercase tracking-wider text-[10px] md:text-xs font-black px-4 py-2 rounded-full bg-white"
          style={{ color: OLIVE, border: `1.5px solid ${OLIVE}` }}
        >
          {copied ? "Copié ✓" : "Copier mon pitch"}
        </button>
        <button
          type="button"
          onClick={onSent}
          disabled={sent}
          className="uppercase tracking-wider text-[10px] md:text-xs font-black px-4 py-2 rounded-full disabled:opacity-60"
          style={{ backgroundColor: OLIVE, color: "#ffffff" }}
        >
          {sent ? "Message envoyé ✓" : "Message envoyé ✓"}
        </button>
      </div>
    </div>
  );
}

export function Module18Content() {
  const [profile, setProfile] = useWorkbookField<Profile>(WB_PROFILE, {
    first_name: "",
    portfolio_url: "",
  });
  const [pitches, setPitches] = useWorkbookField<PitchesMap>(WB_PITCHES, {});
  const [leads, setLeads] = useState<Lead[]>([]);

  const refresh = async () => {
    try {
      const res = await fetch("/api/leads?list=1&limit=100");
      if (!res.ok) return;
      const json = await res.json();
      setLeads(json.leads ?? []);
    } catch {}
  };

  useEffect(() => {
    refresh();
  }, []);

  const priorityLeads = useMemo(() => {
    // Take 3 first "à contacter" then complete with any others
    const toContact = leads.filter((l) => l.status === "a_contacter").slice(0, 3);
    if (toContact.length >= 3) return toContact;
    const others = leads
      .filter((l) => !toContact.includes(l))
      .slice(0, 3 - toContact.length);
    return [...toContact, ...others];
  }, [leads]);

  const sentCount = leads.filter((l) => l.status !== "a_contacter").length;

  const setPitchFor = (leadId: string, next: PitchState) => {
    setPitches({ ...pitches, [leadId]: next });
  };

  const getPitch = (leadId: string): PitchState =>
    pitches[leadId] ?? { perso: "", idea: "", canal: "email" };

  const markSent = async (leadId: string) => {
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: "envoye" }),
    });
    refresh();
  };

  const scheduleRelance = async (leadId: string) => {
    const current = leads.find((l) => l.id === leadId);
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    const iso = current?.next_reminder_at ?? defaultDate.toISOString().slice(0, 10);
    const input = typeof window !== "undefined" ? window.prompt("Date de relance (YYYY-MM-DD)", iso) : null;
    if (!input) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) return;
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ next_reminder_at: input, status: "a_relancer" }),
    });
    refresh();
  };

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
            18
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Pitcher, démarcher et relancer efficacement
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Tu as tes marques. Il faut maintenant les contacter. Ton objectif
        n'est pas d'écrire le message parfait — c'est de donner à la marque
        une bonne raison de regarder ton portfolio et de te répondre.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Un bon pitch ne parle pas uniquement de toi
      </h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-2xl p-5 border-2 border-red-200 bg-red-50/40">
          <div className="uppercase tracking-wider text-[10px] md:text-xs font-black text-red-700">❌ À éviter</div>
          <p className="mt-2 italic text-sm md:text-base leading-relaxed" style={{ color: OLIVE }}>
            « Bonjour, je suis créatrice UGC et je cherche actuellement des
            collaborations. J'adore votre marque et ce serait un rêve de
            travailler avec vous. Voici mon portfolio si jamais vous recherchez
            des créatrices. »
          </p>
          <p className="mt-3 text-xs md:text-sm" style={{ color: OLIVE }}>
            Ce message pourrait être envoyé à 200 marques différentes.
          </p>
        </div>
        <div className="rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
          <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE }}>
            ✅ Une meilleure approche
          </div>
          <p className="mt-2 italic text-sm md:text-base leading-relaxed" style={{ color: OLIVE }}>
            « Bonjour, je suis [Prénom], créatrice UGC beauté/lifestyle. J'ai
            découvert votre gamme [produit] et j'ai particulièrement aimé
            [élément précis]. Je verrais bien un contenu UGC autour de [idée].
            Portfolio : [lien]. Travaillez-vous actuellement avec des créatrices
            UGC ? »
          </p>
        </div>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Personnalise vraiment ton message
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Avant d'écrire, regarde pendant quelques minutes :
      </p>
      <TagRow options={["Son site", "Ses réseaux", "Ses produits", "Ses publicités"]} />
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Cherche un <strong>vrai élément sur lequel rebondir</strong>. C'est
        beaucoup plus crédible que{" "}
        <em>« J'adore vos valeurs et vos produits ! »</em> si tu ne connais
        même pas réellement la marque.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Email ou DM ?
      </h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
          <div className="uppercase tracking-tight font-black" style={{ color: OLIVE }}>📧 Email</div>
          <p className="mt-2 text-sm md:text-base" style={{ color: OLIVE }}>
            À privilégier lorsque tu trouves un contact pertinent (marketing,
            communication, social media, influence / creator marketing,
            partenariats).
          </p>
        </div>
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#faf7e0" }}>
          <div className="uppercase tracking-tight font-black" style={{ color: OLIVE }}>💬 DM</div>
          <p className="mt-2 text-sm md:text-base" style={{ color: OLIVE }}>
            Utile quand tu ne trouves aucun email. Le message peut être plus
            court et servir simplement à obtenir le bon contact.
          </p>
        </div>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ton CTA doit être facile à répondre
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Évite <em>« N'hésitez pas à me contacter. »</em>. Pose plutôt une
        petite question :
      </p>
      <ul className="mt-4 pl-6 list-disc text-base md:text-lg leading-relaxed">
        <li>Travaillez-vous actuellement avec des créatrices UGC ?</li>
        <li>Seriez-vous ouverte à ce que je vous envoie quelques idées de contenus ?</li>
        <li>À qui pourrais-je m'adresser concernant vos collaborations UGC ?</li>
      </ul>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Combien de marques contacter ?
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        La prospection fonctionne surtout grâce à la <strong>régularité</strong>.
        Un rythme réaliste, par exemple :{" "}
        <strong>5 nouvelles marques par jour</strong>. Mieux vaut 5 messages
        personnalisés régulièrement que 50 messages copiés-collés une fois
        puis plus rien pendant trois semaines.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Pas de réponse ? Relance.
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Une marque qui ne répond pas ne veut pas forcément dire{" "}
        <em>« Non »</em>. Ton message a pu être lu au mauvais moment, oublié
        ou noyé. Après un délai raisonnable, envoie une relance courte :
      </p>
      <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: "#faf7e0" }}>
        <p className="italic text-sm md:text-base" style={{ color: OLIVE }}>
          « Bonjour, je me permets de revenir vers vous concernant mon
          précédent message au sujet d'une potentielle collaboration UGC avec
          [Marque]. Je serais ravie d'échanger si vous avez actuellement des
          besoins en création de contenu. Portfolio : [lien]. Belle journée. »
        </p>
      </div>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Après tes tentatives prévues, passe à autre chose. Tu pourras
        éventuellement revenir vers cette marque plus tard.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ne prends pas les refus personnellement
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu vas recevoir <em>« pas de budget », « on a déjà nos créateurs »,
        « pas de besoin pour le moment »</em>. Et parfois aucune réponse.
        C'est <strong>normal</strong>. Une marque peut aimer ton contenu
        mais ne pas avoir de besoin maintenant.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Pitch builder */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer : envoie tes 3 premiers pitchs
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Je récupère automatiquement les <strong>3 premières marques de ton
        Tracker</strong> (à contacter en priorité).
      </p>

      {/* Profile inputs */}
      <div className="mt-6 rounded-2xl p-5 md:p-6" style={{ backgroundColor: "#faf7e0" }}>
        <div className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-3" style={{ color: OLIVE }}>
          Tes infos (utilisées dans chaque pitch)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>Ton prénom</label>
            <input
              type="text"
              value={profile.first_name}
              onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
              placeholder="Ex : Édith"
              className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
              style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
            />
          </div>
          <div>
            <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>Lien de ton portfolio</label>
            <input
              type="text"
              value={profile.portfolio_url}
              onChange={(e) => setProfile({ ...profile, portfolio_url: e.target.value })}
              placeholder="https://…"
              className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
              style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
            />
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6 rounded-2xl p-4 md:p-5" style={{ backgroundColor: CREAM }}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE }}>
            Marques contactées
          </span>
          <span className="uppercase tracking-wider text-xs md:text-sm font-black" style={{ color: OLIVE }}>
            {sentCount} / {Math.max(3, priorityLeads.length)}
          </span>
        </div>
        <div className="mt-3 h-2 rounded-full overflow-hidden bg-white">
          <span
            className="block h-full rounded-full transition-all"
            style={{
              width: `${Math.min(100, (sentCount / Math.max(3, priorityLeads.length)) * 100)}%`,
              backgroundColor: OLIVE,
            }}
          />
        </div>
      </div>

      {/* Pitches */}
      <div className="mt-6 space-y-6">
        {priorityLeads.length === 0 ? (
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: "#faf7e0", color: OLIVE }}>
            Aucune marque dans ton Tracker.{" "}
            <Link href="/tracker" className="underline">Ajoute-en d'abord →</Link>
          </div>
        ) : (
          priorityLeads.map((lead) => (
            <PitchCard
              key={lead.id}
              lead={lead}
              pitch={getPitch(lead.id)}
              setPitch={(v) => setPitchFor(lead.id, v)}
              profile={profile}
              onSent={() => markSent(lead.id)}
              onRelance={() => scheduleRelance(lead.id)}
            />
          ))
        )}
      </div>

      <p className="mt-6 text-sm md:text-base italic" style={{ color: OLIVE }}>
        💾 À chaque envoi, la marque passe automatiquement en{" "}
        <strong>Contactée</strong> dans{" "}
        <Link href="/tracker" className="underline">ton Tracker</Link> et la
        date est enregistrée. Ta relance est aussi mémorisée.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module18Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        fini la théorie, ton Challenge Première Collab commence.
      </strong>
    </p>
  );
}
