"use client";

import Link from "next/link";
import { useState } from "react";
import { useWorkbookField } from "@/lib/useWorkbookField";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const SERVICE_PUBLIC_URL =
  "https://entreprendre.service-public.fr/vosdroits/F31808";
const FACTURATION_ELEC_URL =
  "https://www.impots.gouv.fr/facturation-electronique";

const KIT_KEY = "module15:kit";
const KIT_ITEMS = [
  { id: "contrats", label: "Un emplacement pour mes contrats" },
  { id: "factures", label: "Un emplacement pour mes factures" },
  { id: "numero", label: "Mon système de numérotation" },
  { id: "infos", label: "Mes informations professionnelles prêtes" },
  { id: "modele", label: "Mon modèle de facture" },
  { id: "suivi", label: "Un endroit pour suivre les paiements" },
];

const TRACKING_FLOW = [
  "Marque",
  "Montant",
  "Facture envoyée",
  "Échéance",
  "Payée ✓",
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

function InvoiceMockup() {
  const [open, setOpen] = useState<string | null>(null);
  const annotations = [
    { n: "1", t: "Ton identité / entreprise", body: "Nom et prénom + mention « Entrepreneur individuel » ou « EI », adresse et SIREN si tu exerces sous ce statut." },
    { n: "2", t: "Infos du client", body: "Nom ou dénomination de l'entreprise et informations nécessaires." },
    { n: "3", t: "Numéro unique", body: "Chaque facture possède un numéro unique suivant une séquence chronologique et continue." },
    { n: "4", t: "Dates", body: "Date d'émission et date de la prestation." },
    { n: "5", t: "Prestation détaillée", body: "Description suffisamment claire de ce que tu factures." },
    { n: "6", t: "Montant + TVA", body: "Prix et informations relatives à la TVA selon ta situation." },
    { n: "7", t: "Conditions de paiement", body: "Notamment l'échéance applicable." },
  ];
  return (
    <div
      className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6"
    >
      <div className="rounded-2xl p-6 md:p-8 bg-white border" style={{ borderColor: CREAM }}>
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <div className="font-black uppercase tracking-tight" style={{ color: OLIVE }}>
              1. Prénom Nom · EI
            </div>
            <div className="text-xs" style={{ color: OLIVE, opacity: 0.7 }}>
              123 rue Exemple, 75000 Paris<br />
              SIREN 000 000 000
            </div>
          </div>
          <div className="text-right">
            <div className="uppercase tracking-wider text-[10px] font-black" style={{ color: OLIVE }}>
              3. Facture
            </div>
            <div className="font-black" style={{ color: OLIVE }}>F2026-001</div>
            <div className="text-xs" style={{ color: OLIVE, opacity: 0.7 }}>4. Émise le 15/03/2026</div>
          </div>
        </div>

        <div className="mt-6 rounded-xl p-4" style={{ backgroundColor: "#faf7e0" }}>
          <div className="uppercase tracking-wider text-[10px] font-black" style={{ color: OLIVE }}>
            2. Facturé à
          </div>
          <div className="mt-1 font-semibold" style={{ color: OLIVE }}>Marque Exemple SAS</div>
          <div className="text-xs" style={{ color: OLIVE, opacity: 0.7 }}>
            10 avenue de la Marque, 75000 Paris<br />
            SIRET 000 000 000 00000
          </div>
        </div>

        <div className="mt-6">
          <div className="uppercase tracking-wider text-[10px] font-black" style={{ color: OLIVE }}>
            5. Prestation
          </div>
          <table className="mt-2 w-full text-sm" style={{ color: OLIVE }}>
            <tbody>
              <tr className="border-b" style={{ borderColor: CREAM }}>
                <td className="py-2">1 vidéo UGC 30s + 3 hooks + droits ads 3 mois Meta/TikTok France</td>
                <td className="py-2 text-right font-black">300 €</td>
              </tr>
              <tr>
                <td className="py-2 uppercase tracking-wider text-[10px] font-black">6. Total</td>
                <td className="py-2 text-right font-black text-lg">300 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs" style={{ color: OLIVE, opacity: 0.8 }}>
          TVA non applicable, art. 293 B du CGI.
        </div>
        <div className="mt-3 text-xs" style={{ color: OLIVE }}>
          <strong>7. Conditions de paiement :</strong> virement bancaire — échéance selon
          les conditions convenues (ex : 30 jours).
        </div>
      </div>

      <div className="space-y-2">
        {annotations.map((r) => {
          const isOpen = open === r.n;
          return (
            <div key={r.n} className="rounded-xl overflow-hidden" style={{ backgroundColor: CREAM }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : r.n)}
                className="w-full flex items-center gap-3 p-3 text-left hover:opacity-90"
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs"
                  style={{ backgroundColor: OLIVE, color: "#fff" }}
                >
                  {r.n}
                </span>
                <span
                  className="flex-1 uppercase tracking-wider text-[10px] md:text-xs font-black leading-snug"
                  style={{ color: OLIVE }}
                >
                  {r.t}
                </span>
                <span
                  className="text-sm font-black"
                  style={{ color: OLIVE, transform: isOpen ? "rotate(180deg)" : undefined, transition: "transform 0.2s" }}
                >
                  ▾
                </span>
              </button>
              {isOpen && (
                <div className="px-3 pb-3 text-sm leading-relaxed" style={{ color: OLIVE }}>
                  {r.body}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InteractiveChecklist({
  storageKey,
  items,
  resetLabel,
  bg,
}: {
  storageKey: string;
  items: { id: string; label: string }[];
  resetLabel?: string;
  bg: string;
}) {
  const [done, setDone] = useWorkbookField<Record<string, boolean>>(storageKey, {});
  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));
  const reset = () => setDone({});
  const count = items.filter((i) => done[i.id]).length;

  return (
    <div className="mt-6 rounded-2xl p-6 md:p-8" style={{ backgroundColor: bg }}>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <span
          className="uppercase tracking-wider text-[10px] md:text-xs font-black"
          style={{ color: OLIVE }}
        >
          {count} / {items.length}
        </span>
        <button
          type="button"
          onClick={reset}
          className="uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full bg-white"
          style={{ color: OLIVE, border: `1.5px solid ${OLIVE}` }}
        >
          {resetLabel ?? "Réinitialiser"}
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((it) => {
          const checked = !!done[it.id];
          return (
            <li key={it.id}>
              <button
                type="button"
                onClick={() => toggle(it.id)}
                className="flex items-center gap-3 text-left w-full py-1"
                style={{ color: OLIVE }}
              >
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-md flex-shrink-0"
                  style={{
                    backgroundColor: checked ? OLIVE : "#ffffff",
                    border: `1.5px solid ${OLIVE}`,
                    color: "#ffffff",
                  }}
                >
                  {checked && (
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
                  className={`text-base md:text-lg ${
                    checked ? "line-through opacity-60" : ""
                  }`}
                >
                  {it.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Module15Content() {
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
            15
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Contrats et facturation
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Une marque accepte ta proposition ? Avant de commencer à filmer, il
        reste une étape essentielle : mettre votre accord au clair.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          <strong>Le contrat</strong> définit ce qui a été convenu.{" "}
          <strong>La facture</strong> indique ce que la marque doit te payer.
          L'objectif de ce module n'est pas de faire de toi une juriste ou
          une comptable, mais de t'apprendre{" "}
          <strong>les bons réflexes pour travailler professionnellement.</strong>
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
          Les informations de ce module sont générales et{" "}
          <strong>
            ne remplacent pas un conseil juridique, fiscal ou comptable
            adapté à ta situation.
          </strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Avant de filmer */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Avant de filmer : mets tout par écrit
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Évite de commencer une collaboration avec seulement{" "}
        <em>« Super, on part là-dessus ! »</em>. Avant de tourner, tu dois
        savoir exactement <strong>ce que la marque attend</strong> et{" "}
        <strong>ce qu'elle te propose en échange.</strong> Ton accord doit
        permettre de retrouver clairement :
      </p>
      <div className="mt-8 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          <strong>🎥 Les livrables.</strong> Qu'est-ce que tu dois créer
          exactement ? Ex : <em>1 vidéo UGC de 30s + 3 hooks + 5 rushs
          B-roll</em>. Plus c'est précis, moins tu risques d'entendre
          ensuite : <em>« Est-ce que tu pourrais aussi nous faire une
          deuxième version ? »</em>
        </p>
        <p>
          <strong>📅 Les délais.</strong> Date de réception du produit → date
          de tournage → date de livraison. Vérifie toujours que le délai est
          <strong> réaliste</strong> avant de l'accepter.
        </p>
        <p>
          <strong>🔄 Les modifications.</strong> Précise combien
          d'allers-retours sont compris dans ton tarif : <em>ex : 1
          aller-retour inclus.</em> Si la marque demande quelque chose qui
          sort complètement du brief initial, tu peux également déterminer
          <strong> s'il s'agit d'une nouvelle prestation à facturer.</strong>
        </p>
        <p>
          <strong>📣 Les droits d'utilisation.</strong> Tu viens de les voir
          au Module 14. Ton accord doit être cohérent avec ce qui a été
          négocié :
        </p>
      </div>

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        <strong>💰 La rémunération et le paiement.</strong> Il faut aussi
        savoir : combien ? quand ? comment ? Ne découvre pas les conditions
        de paiement <strong>après avoir livré ton contenu.</strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Avant de signer — Checklist interactive */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Lis toujours le contrat
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Certaines marques ou agences vont t'envoyer leur propre contrat.{" "}
        <strong>Ne signe pas automatiquement</strong> parce que tu es
        contente d'avoir décroché la collaboration. Vérifie que ce qui est
        écrit correspond bien à ce que vous avez négocié.
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Si quelque chose n'est pas clair : demande une explication avant de
        signer. Tu peux aussi proposer une modification :
      </p>
      <p className="mt-2 italic pl-4 border-l-2 border-[var(--border)] text-base md:text-lg leading-relaxed">
        « Nous avions convenu de 3 mois d'utilisation publicitaire, mais le
        contrat indique 12 mois. Pouvez-vous modifier cette partie avant
        signature ? »
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        C'est <strong>professionnel</strong>, pas gênant.
      </p>

      <div
        className="mt-6 rounded-2xl p-5 md:p-6"
        style={{ backgroundColor: CREAM }}
      >
        <div className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-2" style={{ color: OLIVE }}>
          UGC ≠ Influence
        </div>
        <p style={{ color: OLIVE }} className="text-sm md:text-base leading-relaxed">
          Une prestation de création UGC pour les supports de la marque
          n'est pas automatiquement la même chose qu'une prestation où tu
          publies une promotion auprès de ta propre communauté. En France,
          des règles spécifiques existent pour l'influence commerciale.
          Depuis le 1er janvier 2026, lorsque les conditions prévues par la
          réglementation sont réunies,{" "}
          <strong>
            un contrat écrit comportant certaines mentions devient
            obligatoire à partir de 1 000 € HT
          </strong>{" "}
          (en tenant compte des rémunérations et avantages en nature versés
          par un même annonceur au cours de l'année pour une prestation ou
          un ensemble de prestations poursuivant le même objectif
          promotionnel). Vérifie les règles spécifiques applicables à ta
          situation.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Facture annotée */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Une fois la prestation réalisée : la facture
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Une facture n'est pas simplement <em>« Vidéo UGC : 300 € »</em>.
        Elle doit comporter différentes <strong>mentions
        obligatoires</strong>. Voici une facture UGC fictive avec chaque
        zone annotée :
      </p>

      <InvoiceMockup />

      <p className="mt-6 text-sm md:text-base italic" style={{ color: OLIVE }}>
        La liste exacte dépend de la situation. Service-Public tient à jour
        les mentions obligatoires et les cas particuliers.
      </p>
      <div className="mt-3">
        <a
          href={SERVICE_PUBLIC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block uppercase tracking-wider text-xs md:text-sm font-black px-5 py-3 rounded-full hover:scale-105 transition-transform"
          style={{ backgroundColor: OLIVE, color: "#ffffff" }}
        >
          Vérifier les mentions obligatoires sur Service-Public →
        </a>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* TVA */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Et la TVA ?
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ne copie pas simplement la facture d'une autre créatrice. Si tu
        bénéficies de la franchise en base de TVA, tes factures doivent
        comporter la mention :
      </p>
      <p className="mt-2 italic pl-4 border-l-2 border-[var(--border)] text-base md:text-lg leading-relaxed">
        « TVA non applicable, art. 293 B du code général des impôts »
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Mais cette mention ne s'utilise que lorsque ta situation correspond
        effectivement à ce régime. Tes obligations peuvent évoluer avec ton
        activité et ton chiffre d'affaires.{" "}
        <strong>
          Vérifie régulièrement ta situation sur les sources officielles.
        </strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Organise */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Organise tes factures dès le début
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Même avec seulement deux collaborations, prends de bonnes habitudes.
        Une numérotation <strong>unique, chronologique et continue</strong> :
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {["F2026-001", "F2026-002", "F2026-003"].map((f) => (
          <span
            key={f}
            className="uppercase tracking-wider text-xs md:text-sm font-bold px-4 py-2 rounded-full"
            style={{ backgroundColor: CREAM, color: OLIVE }}
          >
            {f}
          </span>
        ))}
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Et garde un suivi simple :
      </p>
      <ArrowFlow items={TRACKING_FLOW} />
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Cela devient particulièrement important lorsque plusieurs
        collaborations arrivent en même temps. Tu retrouveras ce type de
        suivi dans <strong>le tracker démarchage</strong> à la fin du
        parcours.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Facturation électronique */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Facturation électronique : ça change en 2026 / 2027
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Depuis le <strong>1er septembre 2026</strong>, les entreprises
          concernées doivent être en capacité de <strong>recevoir</strong>{" "}
          des factures électroniques. Pour les micro-entreprises,
          l'obligation d'<strong>émission</strong> électronique B2B
          concernée par la réforme arrive au{" "}
          <strong>1er septembre 2027</strong>.
        </p>
        <p>
          Attention : dans le cadre de cette réforme, une « facture
          électronique » <strong>n'est pas simplement un PDF envoyé par
          email</strong>. Elle doit respecter le format et le circuit
          prévus, notamment via une plateforme agréée.
        </p>
      </div>
      <div className="mt-4">
        <a
          href={FACTURATION_ELEC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block uppercase tracking-wider text-xs md:text-sm font-black px-5 py-3 rounded-full hover:scale-105 transition-transform"
          style={{ backgroundColor: OLIVE, color: "#ffffff" }}
        >
          Informations officielles sur la facturation électronique →
        </a>
      </div>
      <p className="mt-4 text-xs md:text-sm italic text-[var(--muted)]">
        Informations vérifiées en septembre 2026 — vérifie les dernières
        évolutions sur le site officiel.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Impayé */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Et si la marque ne paie pas ?
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Première règle : <strong>suis tes échéances.</strong> Une facture
        envoyée n'est pas une facture payée. Quand la date approche ou
        qu'elle est dépassée, vérifie ton compte et ton suivi. Si le
        paiement n'est pas arrivé, commence par une relance
        professionnelle :
      </p>
      <p className="mt-2 italic pl-4 border-l-2 border-[var(--border)] text-base md:text-lg leading-relaxed">
        « Bonjour, je me permets de revenir vers vous concernant la facture
        F2026-004 arrivée à échéance le XX/XX. Sauf erreur de ma part, je
        n'ai pas encore reçu le règlement. Pourriez-vous me confirmer sa
        mise en paiement ? Merci beaucoup. »
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ne laisse pas une facture impayée pendant des mois simplement parce
        que tu <strong>n'oses pas relancer.</strong>
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Kit administratif */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer : prépare ton kit administratif UGC
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Avant ta première collaboration rémunérée, prépare ton{" "}
        <strong>dossier « Admin UGC »</strong> :
      </p>
      <InteractiveChecklist storageKey={KIT_KEY} items={KIT_ITEMS} bg={CREAM} />
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Puis crée <strong>une facture fictive</strong> pour une fausse
        collaboration UGC afin de comprendre comment elle fonctionne avant
        d'avoir à le faire pour une vraie marque.
      </p>
      <p className="mt-6 text-sm md:text-base italic" style={{ color: OLIVE }}>
        💾 Tu retrouveras <strong>ton kit administratif</strong> à tout
        moment dans <Link href="/compte" className="underline">Mon compte</Link>.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module15Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        ton activité est prête, ton portfolio aussi. Maintenant, on va
        trouver les marques que tu vas contacter.
      </strong>
    </p>
  );
}
