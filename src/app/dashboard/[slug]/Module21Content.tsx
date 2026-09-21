"use client";

import Link from "next/link";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const TIMELINE = [
  "Accord",
  "Brief",
  "Préparation",
  "Tournage",
  "Montage",
  "Livraison",
  "Retours",
  "Validation",
  "Facture",
];

const BRIEF_FIELDS = [
  { emoji: "🎯", title: "Objectif", body: "À quoi doit servir le contenu ?" },
  { emoji: "🎥", title: "Livrables", body: "Combien de vidéos ? Quelle durée ? Quels formats ?" },
  { emoji: "💬", title: "Messages clés", body: "Quels bénéfices ou informations doivent apparaître ?" },
  { emoji: "📋", title: "Consignes", body: "Y a-t-il des éléments obligatoires ou interdits ?" },
  { emoji: "📅", title: "Deadline", body: "Quand le contenu doit-il être livré ?" },
  { emoji: "📣", title: "Utilisation", body: "Les droits correspondent-ils bien à ce que vous avez convenu ?" },
];

const QUESTIONS_BRIEF = [
  "Souhaitez-vous que le produit apparaisse dès les premières secondes ?",
  "Avez-vous une prononciation particulière pour le nom de la marque ?",
  "Préférez-vous une approche très naturelle ou davantage publicitaire ?",
  "Y a-t-il des claims ou formulations que je dois absolument éviter ?",
  "Souhaitez-vous valider le script avant le tournage ?",
];

const PREP_STEPS = [
  "Script / trame",
  "Shot list",
  "Produit / accessoires",
  "Lieu",
  "Lumière",
  "Tenue si nécessaire",
];

const SHOT_LIST_EX = [
  "Produit posé",
  "Produit en main",
  "Ouverture du packaging",
  "Texture en gros plan",
  "Application",
  "Face cam",
  "Résultat",
  "Plans B-roll supplémentaires",
];

const BEFORE_REC = [
  "Lentille nettoyée",
  "Batterie suffisante",
  "Stockage disponible",
  "Téléphone en silencieux / notifications coupées",
  "Bonne lumière",
  "Son testé",
  "Arrière-plan propre",
  "Produit propre et bien présenté",
  "Brief à portée de main",
];

const RUSH_CHECK = [
  "Image ✓",
  "Son ✓",
  "Mise au point ✓",
  "Cadrage ✓",
  "Texte bien dit ✓",
  "Plans manquants ?",
];

const EDIT_CHECK = [
  "Hook conforme",
  "Messages importants présents",
  "Produit visible comme demandé",
  "Durée respectée",
  "Sous-titres vérifiés",
  "Musique adaptée si nécessaire",
  "CTA présent",
  "Format demandé respecté",
];

const QUALITY_CHECK = [
  "Ai-je respecté le brief ?",
  "La vidéo est-elle agréable à regarder ?",
  "Le produit est-il bien mis en valeur ?",
  "Y a-t-il une faute dans les sous-titres ?",
  "Un plan semble-t-il flou ou maladroit ?",
  "J'assumerais que cette vidéo soit diffusée en publicité ?",
];

const DELIVERABLES = [
  "Vidéo finale",
  "Versions éventuelles",
  "Hooks supplémentaires",
  "Photos éventuelles",
  "Autres livrables prévus",
];

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

function Timeline({ items }: { items: string[] }) {
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

function CheckList({ items, bg }: { items: string[]; bg: string }) {
  return (
    <div className="mt-6 rounded-2xl p-6" style={{ backgroundColor: bg }}>
      <ul className="space-y-2 list-disc pl-6 text-base md:text-lg" style={{ color: OLIVE }}>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
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

export function Module21Content() {
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
            21
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Réussir sa première collaboration
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        La marque a accepté ta proposition. Ton travail ne s'arrête pas au
        moment où elle dit oui — une collaboration réussie, c'est aussi
        respecter le brief, les délais et communiquer correctement.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          C'est ce qui peut faire la différence entre{" "}
          <strong>une marque qui travaille avec toi une fois</strong> et{" "}
          <strong>une marque qui a envie de te recontacter</strong>. Voici
          le déroulement d'une collaboration de A à Z :
        </p>
      </div>
      <Timeline items={TIMELINE} />

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Lis vraiment le brief">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Avant de sortir ton téléphone, prends le temps de comprendre ce
          que la marque attend. Repère notamment :
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {BRIEF_FIELDS.map((f) => (
            <div key={f.title} className="rounded-2xl p-5 flex items-start gap-3" style={{ backgroundColor: CREAM }}>
              <span className="text-2xl">{f.emoji}</span>
              <div>
                <div className="uppercase tracking-tight font-black text-sm md:text-base" style={{ color: OLIVE }}>
                  {f.title}
                </div>
                <p className="mt-1 text-sm md:text-base" style={{ color: OLIVE }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-base md:text-lg leading-relaxed">
          Si quelque chose n'est pas clair,{" "}
          <strong>demande avant de tourner</strong>. Il vaut mieux envoyer
          une question maintenant que devoir refaire toute la vidéo ensuite.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Pose tes questions avant de commencer">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          N'aie pas peur de demander une précision à la marque :
        </p>
        <ul className="mt-4 pl-6 list-disc text-base md:text-lg leading-relaxed">
          {QUESTIONS_BRIEF.map((q) => (
            <li key={q} className="italic">« {q} »</li>
          ))}
        </ul>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Prépare ton tournage">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Tu as déjà appris à construire, filmer et monter une vidéo UGC{" "}
          (revois les{" "}
          <Link href="/dashboard/06-construire-une-bonne-video" className="underline" style={{ color: OLIVE }}>
            Modules 6
          </Link>{" "}
          et{" "}
          <Link href="/dashboard/07-apprendre-a-filmer" className="underline" style={{ color: OLIVE }}>
            7
          </Link>{" "}
          si besoin). Ici, applique simplement ta méthode. Avant le
          tournage, prépare :
        </p>
        <TagRow options={PREP_STEPS} />

        <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: "#faf7e0" }}>
          <div className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-3" style={{ color: OLIVE }}>
            Exemple de shot list — vidéo skincare
          </div>
          <ul className="space-y-2 list-disc pl-6 text-base md:text-lg" style={{ color: OLIVE }}>
            {SHOT_LIST_EX.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Cette préparation peut te faire gagner{" "}
          <strong>énormément de temps au montage</strong>.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Avant d'appuyer sur REC">
        <p className="mt-4 text-base md:text-lg leading-relaxed">Petite vérification :</p>
        <CheckList items={BEFORE_REC} bg={CREAM} />
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Puis tourne <strong>plusieurs prises</strong> des plans
          importants. Une deuxième prise prend parfois 30 secondes ;
          refaire tout ton setup deux jours plus tard parce qu'un plan est
          inutilisable en prend beaucoup plus.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Vérifie AVANT de ranger">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Avant de ranger ton produit, changer de tenue ou démonter ton
          décor : <strong>regarde tes rushs</strong>.
        </p>
        <TagRow options={RUSH_CHECK} />
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Tu repères un problème ? <strong>Refais le plan immédiatement.</strong>
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Monte en gardant le brief à côté">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Au montage, ne te fie pas uniquement à ta mémoire. Reprends le
          brief et vérifie au fur et à mesure :
        </p>
        <CheckList items={EDIT_CHECK} bg="#faf7e0" />
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Puis regarde ta vidéo <strong>une première fois avec le son</strong>{" "}
          et <strong>une deuxième fois sans le son</strong>.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Fais ton propre contrôle qualité">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Avant d'envoyer quoi que ce soit à la marque, regarde ton contenu
          comme si tu étais la cliente. Demande-toi :
        </p>
        <ul className="mt-4 pl-6 list-disc text-base md:text-lg leading-relaxed italic">
          {QUALITY_CHECK.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Puis exporte dans le <strong>format demandé</strong>.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Livre proprement">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Évite d'envoyer simplement <em>« Coucou, voilà 🙂 »</em>. Présente
          ta livraison clairement :
        </p>
        <div className="mt-6 rounded-2xl p-5 md:p-6 bg-white text-sm md:text-base whitespace-pre-wrap leading-relaxed" style={{ color: OLIVE, border: `1.5px solid ${CREAM}` }}>
{`Bonjour [Prénom],

Je vous partage la première version de la vidéo UGC prévue pour la campagne [nom].

Vous pouvez la retrouver ici : [lien].

Je reste disponible pour les éventuels retours prévus dans le cadre de notre collaboration.

Belle journée,
[Prénom]`}
        </div>

        <p className="mt-6 text-base md:text-lg leading-relaxed">
          Si tu as plusieurs fichiers, nomme-les correctement :
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-2xl p-5 border-2 border-red-200 bg-red-50/40">
            <div className="uppercase tracking-wider text-[10px] font-black text-red-700 mb-2">❌ À éviter</div>
            <code className="text-sm" style={{ color: OLIVE }}>video_finale2vraiefinale.mp4</code>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
            <div className="uppercase tracking-wider text-[10px] font-black mb-2" style={{ color: OLIVE }}>✅ À faire</div>
            <code className="text-sm block" style={{ color: OLIVE }}>MARQUE_UGC_VIDEO01_V1.mp4</code>
            <code className="text-sm block mt-1" style={{ color: OLIVE }}>MARQUE_VIDEO01_HOOK01_V1.mp4</code>
            <code className="text-sm block mt-1" style={{ color: OLIVE }}>MARQUE_VIDEO01_HOOK02_V1.mp4</code>
          </div>
        </div>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="La marque demande des modifications">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          C'est normal. Recevoir un retour ne signifie pas que ton travail
          est mauvais. Si cela correspond aux modifications prévues dans
          votre accord, réalise-les puis livre ta nouvelle version.
        </p>
        <Timeline items={["V1", "Retours", "V2", "Validation ✓"]} />

        {/* Correction vs nouvelle prestation */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
            <div className="uppercase tracking-tight font-black text-sm md:text-base" style={{ color: OLIVE }}>
              🔄 Une modification
            </div>
            <p className="mt-2 text-sm md:text-base" style={{ color: OLIVE }}>
              La marque demande d'ajuster un élément du contenu prévu.
              Inclus dans la prestation.
            </p>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: "#fde3c8" }}>
            <div className="uppercase tracking-tight font-black text-sm md:text-base" style={{ color: "#b86b2c" }}>
              ➕ Une nouvelle prestation
            </div>
            <p className="mt-2 text-sm md:text-base" style={{ color: "#b86b2c" }}>
              La marque ajoute quelque chose qui n'était pas prévu. Ex : un
              autre concept, 3 nouveaux hooks…
            </p>
          </div>
        </div>
        <p className="mt-6 text-base md:text-lg leading-relaxed">
          Reviens à ce qui avait été convenu et réponds simplement :
        </p>
        <p className="mt-2 italic pl-4 border-l-2 border-[var(--border)] text-base md:text-lg leading-relaxed">
          « Avec plaisir. Cette demande n'était pas comprise dans la
          prestation initiale, je peux vous transmettre le tarif
          correspondant pour cette version supplémentaire. »
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Tu peux être arrangeante <strong>sans transformer une prestation
          en travail illimité</strong>.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Facture et suis ton paiement">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Une fois que la marque confirme <em>« C'est validé ! »</em>, la
          collaboration créative est terminée, mais administrativement,
          elle ne l'est pas forcément. Selon les conditions convenues,
          envoie ta facture et note son échéance. Tu as déjà appris à
          préparer ta facture au{" "}
          <Link href="/dashboard/15-contrats-facturation" className="underline" style={{ color: OLIVE }}>
            Module 15
          </Link>
          .
        </p>
        <Timeline items={["Contenu validé ✓", "Facture envoyée", "Paiement en attente", "Payée ✓"]} />

        <div className="mt-6 rounded-2xl p-5 md:p-6 flex items-start gap-4" style={{ backgroundColor: "#faf7e0" }}>
          <span className="text-2xl">📊</span>
          <div>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: OLIVE }}>
              Dans ton Tracker, passe la marque en{" "}
              <strong>Collaboration en cours</strong> pendant la
              production, puis <strong>Terminée</strong> une fois la
              facture réglée.
            </p>
            <div className="mt-3">
              <Link
                href="/tracker"
                className="inline-block uppercase tracking-wider text-[10px] md:text-xs font-black px-4 py-2 rounded-full"
                style={{ backgroundColor: OLIVE, color: "#ffffff" }}
              >
                Ouvrir mon Tracker →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Le petit détail qui fait professionnel">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Une fois la collaboration terminée, <strong>ne disparais pas</strong>.
          Tu peux simplement envoyer :
        </p>
        <p className="mt-2 italic pl-4 border-l-2 border-[var(--border)] text-base md:text-lg leading-relaxed">
          « Merci encore pour cette collaboration, j'ai beaucoup aimé
          travailler sur ce projet. N'hésitez pas à me tenir au courant des
          performances du contenu et de vos prochains besoins UGC. »
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Tu laisses une bonne dernière impression et surtout, tu ouvres la
          porte à une prochaine collaboration. C'est exactement ce qu'on va
          travailler au prochain module.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module21Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        transformer une collaboration ponctuelle en client qui revient,
        tout en t'organisant quand les projets commencent à s'accumuler.
      </strong>
    </p>
  );
}
