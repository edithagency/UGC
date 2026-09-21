"use client";

import Link from "next/link";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const DEMAND_FIELDS = [
  { emoji: "🎥", title: "Le contenu", body: "Combien de vidéos ? Quel format ? Quelle durée ? Des photos ? Plusieurs hooks ? Des rushs ?" },
  { emoji: "📅", title: "Le délai", body: "Quand souhaite-t-elle recevoir les contenus ?" },
  { emoji: "🔄", title: "Les retours", body: "Combien de modifications sont prévues ?" },
  { emoji: "📣", title: "Les droits", body: "Organique ou Ads ? Quelles plateformes ? Quelle durée ? Quel territoire ?" },
  { emoji: "💰", title: "Le budget", body: "La marque a-t-elle déjà prévu un budget pour la campagne ?" },
];

const REFUSAL_REASONS = [
  "Le budget est trop faible",
  "Les délais sont irréalistes",
  "Les droits demandés sont disproportionnés",
  "Le produit ne te correspond pas",
  "Les demandes dépassent largement ce qui est rémunéré",
  "Certaines conditions te mettent mal à l'aise",
];

function ScenarioBox({
  title,
  intro,
  quote,
  reply,
}: {
  title: string;
  intro?: string;
  quote?: string;
  reply: string;
}) {
  return (
    <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: "#faf7e0" }}>
      <div className="uppercase tracking-tight font-black text-base md:text-lg" style={{ color: OLIVE }}>
        {title}
      </div>
      {intro && (
        <p className="mt-2 text-sm md:text-base leading-relaxed" style={{ color: OLIVE }}>
          {intro}
        </p>
      )}
      {quote && (
        <p className="mt-3 italic pl-4 border-l-2 text-sm md:text-base leading-relaxed"
           style={{ color: OLIVE, borderColor: CREAM }}>
          {quote}
        </p>
      )}
      <div
        className="mt-4 rounded-xl p-4 bg-white text-sm md:text-base whitespace-pre-wrap leading-relaxed"
        style={{ color: OLIVE }}
      >
        {reply}
      </div>
    </div>
  );
}

export function Module20Content() {
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
            20
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Une marque te répond : répondre et négocier
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Tu ouvres tes mails et tu vois enfin : <em>« Bonjour, merci pour
        votre message ! Nous serions intéressés pour collaborer avec vous.
        Pouvez-vous nous transmettre vos tarifs ? »</em>
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Première réaction : être contente. Deuxième réaction :{" "}
          <strong>ne pas répondre trop vite</strong>. Une marque intéressée
          ne signifie pas encore qu'une collaboration est conclue. Avant
          d'accepter, tu dois comprendre <strong>ce qu'elle veut
          exactement</strong>.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Comprendre la demande */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Commence par comprendre la demande
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Si la marque t'envoie déjà un brief précis, parfait. Sinon,
        récupère les informations dont tu as besoin pour construire ta
        proposition :
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {DEMAND_FIELDS.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl p-5 flex items-start gap-3"
            style={{ backgroundColor: CREAM }}
          >
            <span className="text-2xl">{f.emoji}</span>
            <div>
              <div className="uppercase tracking-tight font-black text-sm md:text-base" style={{ color: OLIVE }}>
                {f.title}
              </div>
              <p className="mt-1 text-sm md:text-base" style={{ color: OLIVE }}>
                {f.body}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Tu as déjà travaillé tous ces éléments dans les modules précédents.
        Ici, on les rassemble.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Scénario : demande de tarifs */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Elle te demande directement tes tarifs
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ne réponds pas automatiquement <em>« Une vidéo = 200 € »</em> si tu
        ne sais même pas ce qu'elle veut. Tu peux répondre :
      </p>
      <div className="mt-6">
        <ScenarioBox
          title="Demande de tarifs"
          reply={`Bonjour [Prénom],

Merci beaucoup pour votre retour ! Avec plaisir.

Afin de vous transmettre une proposition adaptée, pourriez-vous me préciser le nombre et le format des contenus souhaités, ainsi que leur utilisation prévue (organique et/ou Ads), les plateformes et la durée des droits ?

Si vous avez déjà un brief ou un budget prévu pour cette campagne, je serais également ravie d'en prendre connaissance.

Belle journée,
[Prénom]`}
        />
      </div>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Une fois les informations obtenues, reprends{" "}
        <strong>ta grille du Module 13</strong> et{" "}
        <strong>tes droits du Module 14</strong>.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Budget */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        « Quel est votre budget ? »
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu peux aussi demander à la marque si elle dispose déjà d'un
        budget. Cela ne veut pas dire que tu accepteras automatiquement ce
        montant — cela te donne simplement une information supplémentaire
        pour <strong>négocier</strong>.
      </p>
      <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
        <p className="italic text-sm md:text-base" style={{ color: OLIVE }}>
          « Avez-vous déjà défini une enveloppe budgétaire pour cette
          campagne ? Cela me permettra de voir quelle proposition serait la
          plus adaptée. »
        </p>
      </div>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Si la marque te répond <em>« Notre budget est de 300 € »</em>, tu
        peux regarder ce que tu peux réellement proposer pour 300 €. Et
        c'est là que la négociation commence.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Budget trop bas */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Le budget est trop bas : ne divise pas ton prix par deux
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Imaginons : ta proposition <strong>400 €</strong>, budget de la
        marque <strong>250 €</strong>. La mauvaise réaction serait{" "}
        <em>« D'accord, je peux faire 250 € ! »</em> simplement parce que
        tu as peur de perdre la collaboration.
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Essaie d'abord de comprendre <strong>ce qui peut être ajusté</strong> :
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { n: "Option 1", t: "Réduire la prestation", b: "Moins de vidéos, moins de variantes, moins de hooks, pas de rushs supplémentaires…" },
          { n: "Option 2", t: "Revoir les droits", b: "Si la marque demande une utilisation publicitaire très longue, tu peux proposer une durée plus courte correspondant davantage au budget." },
          { n: "Option 3", t: "Proposer un autre format", b: "Peut-être qu'une prestation plus légère peut répondre à son besoin." },
        ].map((o) => (
          <div key={o.n} className="rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
            <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE, opacity: 0.7 }}>
              {o.n}
            </div>
            <div className="uppercase tracking-tight font-black text-sm md:text-base mt-1" style={{ color: OLIVE }}>
              {o.t}
            </div>
            <p className="mt-2 text-sm" style={{ color: OLIVE }}>{o.b}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Tu <strong>adaptes ce que tu vends</strong> avant de casser ton
        prix.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Exemple négociation */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Exemple de négociation
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        La marque te dit :
      </p>
      <p className="mt-2 italic pl-4 border-l-2 border-[var(--border)] text-base md:text-lg leading-relaxed">
        « Nous avons un budget maximum de 250 €, mais nous souhaiterions 2
        vidéos avec 6 mois de droits Ads. »
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ta proposition habituelle est supérieure. Tu peux répondre :
      </p>
      <div className="mt-6">
        <ScenarioBox
          title="Négociation d'une proposition"
          reply={`Merci pour votre transparence concernant le budget. Pour 2 vidéos avec 6 mois d'utilisation publicitaire, ma proposition serait supérieure à cette enveloppe.

En revanche, je peux vous proposer une prestation adaptée à votre budget, par exemple [prestation], avec [conditions].

Si vous souhaitez conserver les 2 vidéos et les droits initialement prévus, je peux également vous transmettre la proposition correspondante.`}
        />
      </div>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu ne dis pas <em>« Non, c'est trop bas »</em>. Mais tu ne dis pas
        non plus <em>« Ok pour tout à 250 € »</em>. Tu cherches un{" "}
        <strong>terrain d'entente cohérent</strong>.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Gifting */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        La marque te propose du gifting
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu avais proposé une collaboration rémunérée et elle répond :{" "}
        <em>« Nous n'avons pas de budget, mais nous pouvons vous envoyer le
        produit gratuitement. »</em>
      </p>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        À toi de décider si cela t'intéresse. Un gifting peut avoir de la
        valeur (découvrir le produit, créer du contenu portfolio), mais tu{" "}
        <strong>n'es pas obligée d'accepter</strong> simplement parce
        qu'une marque t'a répondu.
      </p>
      <div className="mt-6">
        <ScenarioBox
          title="Refuser un gifting proprement"
          reply={`Merci beaucoup pour votre retour et pour votre proposition. Pour le moment, je privilégie les collaborations UGC rémunérées. Je serais néanmoins ravie de rester en contact si un budget se libère pour une prochaine campagne.`}
        />
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Demandes supplémentaires */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        On te demande beaucoup plus que prévu
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Vous aviez parlé d'une vidéo. Puis arrivent :
      </p>
      <ul className="mt-4 pl-6 list-disc text-base md:text-lg leading-relaxed">
        <li>« On pourrait avoir les rushs aussi ? »</li>
        <li>« Vous pourriez faire trois hooks différents ? »</li>
        <li>« Et une version sans sous-titres ? »</li>
        <li>« Et quelques photos ? »</li>
      </ul>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Ne réponds pas automatiquement oui. <strong>Reviens au périmètre
        initial.</strong>
      </p>
      <div className="mt-6">
        <ScenarioBox
          title="Facturer une demande supplémentaire"
          reply={`Bien sûr, je peux ajouter cette prestation. Elle n'était pas incluse dans la proposition initiale, je peux donc vous envoyer le tarif correspondant.`}
        />
      </div>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        C'est exactement pour cela que tu as défini{" "}
        <strong>tes options au Module 13</strong>.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Dire non */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Tu as le droit de dire non
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Une collaboration n'est pas intéressante uniquement parce qu'une
        marque dit oui. Tu peux refuser si :
      </p>
      <ul className="mt-4 pl-6 list-disc text-base md:text-lg leading-relaxed">
        {REFUSAL_REASONS.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Dire non proprement fait aussi partie du métier :
      </p>
      <div className="mt-6">
        <ScenarioBox
          title="Refuser une collaboration"
          reply={`Merci beaucoup d'avoir pensé à moi. Malheureusement, les conditions proposées ne correspondent pas à celles dans lesquelles je souhaite travailler actuellement. Je préfère donc ne pas donner suite à cette collaboration, mais je serais ravie d'échanger à nouveau sur un futur projet.`}
        />
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Avant de dire oui */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Avant de dire oui
      </h2>
      <div className="mt-6 rounded-2xl p-6 md:p-8" style={{ backgroundColor: OLIVE, color: "#ffffff" }}>
        <div className="uppercase tracking-wider text-[10px] md:text-xs font-black opacity-80 mb-3">
          Checklist rapide
        </div>
        <p className="text-sm md:text-base leading-relaxed opacity-90">
          Avant d'accepter une proposition, vérifie que tu as toutes les
          informations nécessaires. Ces trois modules sont là pour ça :
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { n: "13", t: "Tarifs" },
            { n: "14", t: "Droits" },
            { n: "15", t: "Contrats & factures" },
          ].map((m) => (
            <Link
              key={m.n}
              href={`/dashboard/${m.n === "13" ? "13-fixer-tes-tarifs" : m.n === "14" ? "14-droits-utilisation" : "15-contrats-facturation"}`}
              className="uppercase tracking-wider text-[10px] md:text-xs font-black px-4 py-2 rounded-full bg-white hover:scale-105 transition-transform"
              style={{ color: OLIVE }}
            >
              Module {m.n} — {m.t}
            </Link>
          ))}
        </div>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Tracker */}
      <p className="text-base md:text-lg leading-relaxed">
        Si la discussion s'engage, pense à passer la marque en{" "}
        <strong>« En discussion »</strong> dans ton Tracker.
      </p>
      <div className="mt-4">
        <Link
          href="/tracker"
          className="inline-block uppercase tracking-wider text-xs md:text-sm font-black px-5 py-3 rounded-full hover:scale-105 transition-transform"
          style={{ backgroundColor: OLIVE, color: "#ffffff" }}
        >
          Ouvrir mon Tracker →
        </Link>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module20Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        la collaboration est confirmée : on va voir comment la réussir de A
        à Z et donner envie à la marque de retravailler avec toi.
      </strong>
    </p>
  );
}
