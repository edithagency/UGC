"use client";

import Link from "next/link";
import { useState } from "react";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const GUIDE_URL =
  "https://www.economie.gouv.fr/particuliers/droit-auteur";
const TIKTOK_URL = "https://www.tiktok.com/@edithapouey";

type Usage = "organic" | "ads" | "both";
type Duration = "1" | "3" | "6" | "12";
type Territory = "france" | "europe" | "monde";

const SUPPORTS = ["Instagram", "TikTok", "Meta Ads", "Site web", "Autre"];

const CHECKLIST_4Q = [
  "Où souhaitez-vous utiliser le contenu ?",
  "Sera-t-il utilisé en organique, en publicité payante ou les deux ?",
  "Pendant combien de temps souhaitez-vous disposer des droits ?",
  "Sur quel territoire le contenu sera-t-il diffusé ?",
];

const CONTRACT_ITEMS = [
  "Contenu concerné",
  "Utilisations autorisées",
  "Plateformes / supports",
  "Durée",
  "Territoire",
  "Rémunération / conditions",
];

function ChipButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="uppercase tracking-wider text-xs md:text-sm font-bold px-4 py-2 rounded-full transition-transform hover:scale-105"
      style={
        active
          ? { backgroundColor: OLIVE, color: "#ffffff" }
          : { backgroundColor: CREAM, color: OLIVE }
      }
    >
      {label}
    </button>
  );
}

function RightsSimulator() {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [duration, setDuration] = useState<Duration | null>(null);
  const [supports, setSupports] = useState<string[]>([]);
  const [territory, setTerritory] = useState<Territory | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleSupport = (s: string) => {
    setSupports((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  };

  const sentence = (() => {
    if (!usage || !duration || supports.length === 0 || !territory) return null;
    const usageText =
      usage === "organic"
        ? "Utilisation organique"
        : usage === "ads"
        ? "Utilisation publicitaire"
        : "Utilisation organique et publicitaire";
    const supportsText =
      supports.length === 1
        ? `sur ${supports[0]}`
        : `sur ${supports.slice(0, -1).join(", ")} et ${supports.at(-1)}`;
    const durationText = `pendant ${duration} mois`;
    const territoryText =
      territory === "france" ? "en France" : territory === "europe" ? "en Europe" : "dans le monde";
    return `${usageText} ${supportsText}, ${durationText}, ${territoryText}.`;
  })();

  const reset = () => {
    setUsage(null);
    setDuration(null);
    setSupports([]);
    setTerritory(null);
    setCopied(false);
  };

  const copy = async () => {
    if (!sentence) return;
    try {
      await navigator.clipboard.writeText(sentence);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      className="mt-6 rounded-2xl p-6 md:p-8 space-y-6"
      style={{ backgroundColor: "#faf7e0" }}
    >
      <div>
        <div className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-3" style={{ color: OLIVE }}>
          1. Utilisation
        </div>
        <div className="flex flex-wrap gap-2">
          <ChipButton label="Organic" active={usage === "organic"} onClick={() => setUsage("organic")} />
          <ChipButton label="Ads" active={usage === "ads"} onClick={() => setUsage("ads")} />
          <ChipButton label="Les deux" active={usage === "both"} onClick={() => setUsage("both")} />
        </div>
      </div>

      <div>
        <div className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-3" style={{ color: OLIVE }}>
          2. Durée
        </div>
        <div className="flex flex-wrap gap-2">
          {(["1", "3", "6", "12"] as Duration[]).map((d) => (
            <ChipButton
              key={d}
              label={`${d} mois`}
              active={duration === d}
              onClick={() => setDuration(d)}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-3" style={{ color: OLIVE }}>
          3. Supports (plusieurs possibles)
        </div>
        <div className="flex flex-wrap gap-2">
          {SUPPORTS.map((s) => (
            <ChipButton
              key={s}
              label={s}
              active={supports.includes(s)}
              onClick={() => toggleSupport(s)}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-3" style={{ color: OLIVE }}>
          4. Territoire
        </div>
        <div className="flex flex-wrap gap-2">
          <ChipButton label="France" active={territory === "france"} onClick={() => setTerritory("france")} />
          <ChipButton label="Europe" active={territory === "europe"} onClick={() => setTerritory("europe")} />
          <ChipButton label="Monde" active={territory === "monde"} onClick={() => setTerritory("monde")} />
        </div>
      </div>

      <div
        className="rounded-2xl p-5 md:p-6"
        style={{ backgroundColor: OLIVE, color: "#ffffff" }}
      >
        <div className="uppercase tracking-wider text-[10px] md:text-xs font-bold opacity-80">
          Ta phrase à copier
        </div>
        <div className="mt-2 text-base md:text-lg leading-relaxed">
          {sentence ?? (
            <span className="opacity-60 italic">
              Complète les 4 étapes pour générer la phrase.
            </span>
          )}
        </div>
        {sentence && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copy}
              className="uppercase tracking-wider text-[10px] md:text-xs font-black px-4 py-2 rounded-full bg-white"
              style={{ color: OLIVE }}
            >
              {copied ? "Copié ✓" : "Copier"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="uppercase tracking-wider text-[10px] md:text-xs font-black px-4 py-2 rounded-full"
              style={{ backgroundColor: "transparent", color: "#ffffff", border: "1.5px solid #ffffff" }}
            >
              Recommencer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Module14Content() {
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
            14
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Comprendre les droits d'utilisation
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Tu as fixé tes premiers tarifs. Mais avant d'envoyer un prix à une
        marque, il reste une question essentielle : qu'est-ce qu'elle va faire
        de ta vidéo ?
      </p>

      <div className="mt-16 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Créer un contenu et autoriser une marque à l'utiliser sont{" "}
          <strong>deux choses à bien distinguer.</strong> Une vidéo publiée
          quelques semaines sur les réseaux sociaux d'une marque n'a pas la
          même utilisation qu'une vidéo diffusée pendant plusieurs mois en
          publicité. Avant d'accepter une collaboration, tu dois toujours
          savoir <strong>où, comment et pendant combien de temps</strong> ton
          contenu sera utilisé.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Les droits, c'est quoi */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Les droits d'utilisation, c'est quoi ?
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Quand tu réalises une vidéo UGC pour une marque, celle-ci va vouloir
        l'exploiter. Les droits d'utilisation servent à définir{" "}
        <strong>ce qu'elle est autorisée à faire avec ton contenu.</strong> En
        pratique, on veut pouvoir répondre à ces questions :
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { q: "Où ?", a: "TikTok, Instagram, site internet, emailing…" },
          { q: "Comment ?", a: "Publication organique ou publicité payante ?" },
          { q: "Combien de temps ?", a: "1 mois, 3 mois, 6 mois…" },
          { q: "Sur quel territoire ?", a: "France, Europe, monde…" },
        ].map((r) => (
          <div key={r.q} className="rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
            <div className="uppercase tracking-tight font-black text-base" style={{ color: OLIVE }}>
              {r.q}
            </div>
            <p className="mt-1 text-sm md:text-base" style={{ color: OLIVE }}>
              {r.a}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm md:text-base italic" style={{ color: OLIVE }}>
        Pour aller plus loin, tu peux consulter le guide du ministère de
        l'Économie sur le droit d'auteur et le droit à l'image.
      </p>
      <div className="mt-3">
        <a
          href={GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 uppercase tracking-wider text-xs md:text-sm font-black pl-4 pr-5 py-2 rounded-full hover:scale-105 transition-transform"
          style={{ backgroundColor: OLIVE, color: "#ffffff" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/economie.png"
            alt="Ministère de l'Économie"
            className="w-8 h-8 md:w-9 md:h-9 rounded-md bg-white object-contain p-1"
          />
          Guide officiel du ministère de l'Économie →
        </a>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Organique VS Ads */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Organique vs Ads
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        C'est la distinction principale à comprendre au début.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: CREAM }}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="uppercase tracking-tight font-black text-base md:text-lg" style={{ color: OLIVE }}>
              Utilisation organique
            </span>
          </div>
          <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: OLIVE }}>
            La marque publie ta vidéo sur ses propres supports{" "}
            <strong>sans payer pour la diffuser</strong> comme publicité.
          </p>
          <ul className="mt-3 pl-5 list-disc text-sm md:text-base" style={{ color: OLIVE }}>
            <li>Instagram de la marque</li>
            <li>TikTok de la marque</li>
            <li>Page produit / site de la marque</li>
          </ul>
        </div>
        <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: "#faf7e0" }}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📣</span>
            <span className="uppercase tracking-tight font-black text-base md:text-lg" style={{ color: OLIVE }}>
              Utilisation publicitaire / Ads
            </span>
          </div>
          <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: OLIVE }}>
            La marque utilise ton contenu dans une{" "}
            <strong>campagne publicitaire payante</strong> pour toucher
            davantage de personnes. Ta vidéo devient une création
            publicitaire utilisée pour vendre son produit.
          </p>
        </div>
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        L'utilisation publicitaire doit être identifiée dans la proposition
        et peut justifier{" "}
        <strong>une tarification différente de la simple création du
        contenu.</strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Durée */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        La durée compte aussi
      </h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: CREAM }}>
          <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE }}>
            Marque A
          </div>
          <p className="mt-2 text-base md:text-lg" style={{ color: OLIVE }}>
            Utilise ta vidéo <strong>pendant 1 mois</strong>.
          </p>
        </div>
        <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: "#faf7e0" }}>
          <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE }}>
            Marque B
          </div>
          <p className="mt-2 text-base md:text-lg" style={{ color: OLIVE }}>
            Utilise exactement la même vidéo{" "}
            <strong>pendant 12 mois en publicité</strong>.
          </p>
        </div>
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Ce n'est pas la même exploitation. Tu peux éventuellement prévoir
        <strong> une prolongation payante</strong> si la marque souhaite
        continuer à utiliser la création après la période prévue.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Droits illimités */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Attention aux « droits illimités »
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu peux recevoir un brief ou un contrat indiquant :
      </p>
      <p className="mt-2 italic pl-4 border-l-2 border-[var(--border)] text-base md:text-lg leading-relaxed">
        « Droits monde, tous supports, pour une durée illimitée »
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ne valide pas automatiquement sans comprendre ce que cela implique.
        Cela peut donner à la marque{" "}
        <strong>une autorisation d'exploitation extrêmement large</strong>{" "}
        selon les termes exacts du contrat. Pose-toi donc la question :
      </p>
      <div
        className="mt-6 rounded-2xl p-5 md:p-6"
        style={{ backgroundColor: CREAM }}
      >
        <p className="italic text-base md:text-lg" style={{ color: OLIVE }}>
          « Est-ce que la rémunération proposée est cohérente avec l'étendue
          des droits demandés ? »
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Ton image */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ton image compte aussi
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        En UGC, tu apparais très souvent personnellement dans le contenu.
        Ton visage et ta voix peuvent donc se retrouver associés à une
        marque et à son produit <strong>pendant toute la durée de la
        campagne.</strong>
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Retiens surtout : <em>« La marque a payé ma vidéo »</em> ne signifie
        pas automatiquement <em>« elle peut en faire absolument ce qu'elle
        veut pour toujours »</em>.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Simulateur */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Simule ta demande de droits
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Clique successivement sur ce que la marque te demande. Une phrase se
        génère à la fin — tu pourras la copier pour la reprendre dans tes
        échanges ou ton contrat.
      </p>
      <RightsSimulator />

      <hr className="my-10 border-[var(--border)]" />

      {/* Les 4 questions */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Les 4 questions à poser systématiquement
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Quand une marque te contacte, avant de donner ton tarif définitif,
        demande :
      </p>
      <div className="mt-6 space-y-3">
        {CHECKLIST_4Q.map((q, i) => (
          <div
            key={q}
            className="rounded-2xl p-5 flex items-start gap-4"
            style={{ backgroundColor: "#faf7e0" }}
          >
            <span
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
              style={{ backgroundColor: OLIVE, color: "#ffffff" }}
            >
              {i + 1}
            </span>
            <p className="text-base md:text-lg" style={{ color: OLIVE }}>{q}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu peux littéralement garder ces quatre questions dans tes notes.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Exemple concret */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Exemple concret
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Une marque t'écrit :
      </p>
      <p className="mt-2 italic pl-4 border-l-2 border-[var(--border)] text-base md:text-lg leading-relaxed">
        « Bonjour, nous aimerions connaître votre tarif pour une vidéo UGC
        de 30 secondes. »
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ne réponds pas directement <strong>« C'est 200 € »</strong>. Il te
        manque des informations. Tu peux d'abord demander :
      </p>
      <p className="mt-2 italic pl-4 border-l-2 border-[var(--border)] text-base md:text-lg leading-relaxed">
        « Avec plaisir ! Pour pouvoir vous transmettre une proposition
        adaptée, pourriez-vous simplement me préciser l'utilisation prévue du
        contenu (organique et/ou Ads), les plateformes concernées, la durée
        d'utilisation ainsi que le territoire de diffusion ? »
      </p>
      <div
        className="mt-6 rounded-2xl p-5 md:p-6 text-center"
        style={{ backgroundColor: CREAM }}
      >
        <span
          className="uppercase tracking-tight font-black text-sm md:text-base"
          style={{ color: OLIVE }}
        >
          Création + Options + Droits = Proposition finale
        </span>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Écrit */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Tout doit être écrit
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Les droits accordés ne devraient pas rester sur un{" "}
        <em>« Oui oui, vous pourrez utiliser la vidéo »</em>. Ils doivent
        être définis clairement dans vos échanges et, lorsque nécessaire,
        dans le contrat.
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        On doit notamment pouvoir retrouver :
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        {CONTRACT_ITEMS.map((c) => (
          <div
            key={c}
            className="rounded-full px-4 py-2 uppercase tracking-wider text-xs md:text-sm font-bold"
            style={{ backgroundColor: CREAM, color: OLIVE }}
          >
            {c}
          </div>
        ))}
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        On verra les contrats plus précisément au Module 15.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* UGC ≠ influence */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Un dernier point : UGC ≠ toujours influence
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Comme vu au Module 1, créer une vidéo UGC pour qu'une marque
        l'utilise n'est pas nécessairement la même chose que{" "}
        <strong>publier une collaboration commerciale auprès de ta propre
        audience.</strong>
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Si tu publies toi-même du contenu promotionnel dans le cadre d'une
        activité d'influence commerciale, d'autres règles peuvent
        s'appliquer, notamment concernant{" "}
        <strong>l'identification claire de l'intention commerciale</strong>{" "}
        (mentions type « publicité » ou « collaboration commerciale »).
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module14Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        on sécurise tes collaborations avec les contrats et la facturation.
      </strong>
    </p>
  );
}
