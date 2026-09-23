"use client";

import Link from "next/link";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const EVOLUTION = ["Débutante", "Créatrice", "Clients", "Clients récurrents", "Activité UGC"];

const FORCES = [
  "Face cam",
  "Storytelling",
  "Voice-over",
  "Esthétique",
  "Montage dynamique",
  "Humour",
  "Démonstration produit",
  "Contenu naturel",
  "Contenu publicitaire",
];

const RATE_FACTORS = [
  "Ton expérience",
  "La qualité de ton travail",
  "Les retours clients",
  "Les résultats que tu peux montrer",
  "La complexité des demandes",
  "La demande pour ton profil",
  "Ta capacité à vendre des offres plus complètes",
];

const OFFERS = [
  "3 vidéos avec 3 angles",
  "Plusieurs hooks à tester",
  "Pack de contenus pour un lancement",
  "Création récurrente chaque mois",
];

const OBJECTIVES = [
  "Décrocher ma première collaboration",
  "Obtenir mon premier client récurrent",
  "Améliorer mon portfolio",
  "Augmenter progressivement mes tarifs",
  "Atteindre un certain revenu UGC mensuel",
  "Travailler avec une marque que je vise depuis longtemps",
];

const ANALYSE_STEPS = [
  { emoji: "🪝", label: "Le hook", body: "Pourquoi tu t'es arrêtée ?" },
  { emoji: "🎯", label: "L'angle", body: "Quel problème ou désir est utilisé ?" },
  { emoji: "🎬", label: "Le format", body: "Face cam ? POV ? Démonstration ? Storytelling ?" },
  { emoji: "⏱️", label: "Le rythme", body: "Que se passe-t-il pendant les premières secondes ?" },
  { emoji: "🧴", label: "Le produit", body: "Quand et comment apparaît-il ?" },
  { emoji: "📣", label: "Le CTA", body: "Quelle action est demandée ?" },
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>{title}</h2>
      {children}
    </>
  );
}

export function Module23Content() {
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
            23
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Se différencier et passer au niveau supérieur
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Tu es arrivée au dernier module. La question n'est plus « comment
        commencer dans l'UGC ? » mais <strong>« comment devenir une
        créatrice que les marques ont envie de choisir… et de rappeler ? »</strong>
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Au début, tu découvrais ce qu'était l'UGC. Depuis, tu as appris
          à trouver ton univers, créer, filmer, monter, construire ton
          portfolio, fixer tes tarifs, comprendre tes droits, prospecter,
          pitcher, négocier, gérer une collaboration et fidéliser tes
          clients. Voilà ta trajectoire :
        </p>
      </div>
      <ArrowFlow items={EVOLUTION} />

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Identifie tes forces">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Après avoir créé plusieurs contenus, certaines choses vont
          devenir plus naturelles. Peut-être que tu es particulièrement
          forte en :
        </p>
        <TagRow options={FORCES} />
        <p className="mt-6 text-base md:text-lg leading-relaxed">
          Regarde tes vidéos et demande-toi :
        </p>
        <ul className="mt-2 pl-6 list-disc text-base md:text-lg leading-relaxed italic">
          <li>Quelles vidéos me ressemblent le plus ?</li>
          <li>Dans quels formats suis-je la plus naturelle ?</li>
          <li>Qu'est-ce que les marques apprécient dans mon travail ?</li>
          <li>Quels contenus ai-je réellement envie de continuer à créer ?</li>
        </ul>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Tu peux te spécialiser… sans t'enfermer">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Tu peux être connue pour <strong>beauté + lifestyle</strong>,{" "}
          <strong>food + contenu dynamique</strong> ou{" "}
          <strong>applications + face cam pédagogique</strong> sans
          refuser tout le reste. La spécialisation devient intéressante
          lorsqu'elle permet à une marque de comprendre rapidement :{" "}
          <em>« cette créatrice pourrait très bien fonctionner pour
          nous »</em>. Elle doit t'aider à être identifiable, pas
          t'empêcher de créer.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Observe ce qui fonctionne">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Continue à regarder les contenus des marques. Pas pour les
          copier — <strong>pour comprendre</strong>. Quand tu vois une
          publicité qui marche, analyse :
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {ANALYSE_STEPS.map((a) => (
            <div key={a.label} className="rounded-2xl p-5 flex items-start gap-3" style={{ backgroundColor: CREAM }}>
              <span className="text-2xl">{a.emoji}</span>
              <div>
                <div className="uppercase tracking-tight font-black text-sm md:text-base" style={{ color: OLIVE }}>
                  {a.label}
                </div>
                <p className="mt-1 text-sm md:text-base" style={{ color: OLIVE }}>{a.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-base md:text-lg leading-relaxed">
          Petit à petit, tu construis une vraie culture publicitaire. Ça
          fait la différence entre <em>une créatrice qui fait de jolies
          vidéos</em> et <em>une créatrice qui comprend pourquoi elle
          fait cette vidéo de cette manière</em>.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Fais évoluer ton portfolio">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Ton premier portfolio n'est pas ton portfolio définitif. Fais
          régulièrement du tri. Si une ancienne vidéo ne représente plus
          ton niveau, <strong>retire-la</strong>. Ton portfolio doit
          montrer <strong>la créatrice que tu es aujourd'hui</strong>, pas
          toutes les vidéos depuis tes débuts.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Fais évoluer tes tarifs">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Tes premiers tarifs ne sont pas gravés dans le marbre. Ils
          peuvent évoluer avec :
        </p>
        <TagRow options={RATE_FACTORS} />
        <p className="mt-6 text-base md:text-lg leading-relaxed">
          Tu n'as pas besoin d'attendre un moment magique où quelqu'un te
          dira <em>« maintenant tu peux augmenter »</em>. Réévalue-les
          régulièrement. Si ton niveau et la valeur de tes prestations
          évoluent, <strong>ta grille peut évoluer aussi</strong>.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Ne vends plus uniquement « une vidéo »">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          En progressant, tu peux réfléchir en termes de{" "}
          <strong>besoin de la marque</strong>. Au lieu de proposer
          uniquement 1 vidéo, tu peux construire :
        </p>
        <TagRow options={OFFERS} />
        <p className="mt-6 text-base md:text-lg leading-relaxed">
          Chaque élément doit répondre à un vrai besoin. C'est ce qui te
          permet de passer de <em>« je vends une vidéo »</em> à{" "}
          <em>« j'aide une marque à produire les contenus dont elle a
          besoin »</em>.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Continue à prospecter quand ça commence à fonctionner">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          C'est un piège classique. Tu décroches plusieurs collaborations
          et tu te dis <em>« je n'ai plus besoin de prospecter »</em>.
          Puis les projets se terminent. Ton activité doit progressivement
          reposer sur deux moteurs :
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-2xl p-5 flex items-center gap-3" style={{ backgroundColor: CREAM }}>
            <span className="text-2xl">🔎</span>
            <div className="uppercase tracking-tight font-black" style={{ color: OLIVE }}>
              Nouveaux clients
            </div>
          </div>
          <div className="rounded-2xl p-5 flex items-center gap-3" style={{ backgroundColor: "#faf7e0" }}>
            <span className="text-2xl">🔁</span>
            <div className="uppercase tracking-tight font-black" style={{ color: OLIVE }}>
              Clients récurrents
            </div>
          </div>
        </div>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <Section title="Ne cherche pas à tout améliorer en même temps">
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Tu n'as pas besoin d'avoir le meilleur portfolio + le meilleur
          matériel + 10 000 € de CA + 15 clients dans trois semaines.
          <strong> Choisis ton prochain niveau</strong> :
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {OBJECTIVES.map((o, i) => (
            <div key={o} className="rounded-2xl p-4 flex items-start gap-3" style={{ backgroundColor: "#faf7e0" }}>
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs"
                style={{ backgroundColor: OLIVE, color: "#fff" }}
              >
                {i + 1}
              </span>
              <span className="text-sm md:text-base" style={{ color: OLIVE }}>{o}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-base md:text-lg leading-relaxed">
          Tu atteins une étape. Puis tu construis la suivante.
        </p>
      </Section>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module23Footer({ isCompleted }: { isCompleted?: boolean } = {}) {
  if (!isCompleted) {
    return (
      <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
        <strong style={{ color: OLIVE }}>
          Bravo, et bienvenue dans la suite de ton aventure UGC 🤍
        </strong>
      </p>
    );
  }
  return (
    <div className="mt-10">
      <FormationTermineeBloc />
    </div>
  );
}

function FormationTermineeBloc() {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      const el = document.getElementById("formation-terminee");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
  return (
    <div
      id="formation-terminee"
      className="rounded-2xl p-8 md:p-10 text-center"
      style={{ backgroundColor: OLIVE, color: "#ffffff" }}
    >
      <div className="text-4xl mb-2">🎓</div>
      <div className="uppercase tracking-tight font-black text-2xl md:text-3xl">
        Tu as terminé la formation
      </div>
      <p className="mt-4 text-sm md:text-base opacity-90 max-w-2xl mx-auto">
        Tu es partie de <em>« c'est quoi l'UGC ? »</em>. Tu sais maintenant :
      </p>
      <div className="mt-4 text-xs md:text-sm font-black uppercase tracking-wider opacity-95">
        Créer · Te présenter · Tarifer · Prospecter · Vendre · Négocier ·
        Collaborer · Fidéliser · Évoluer
      </div>
      <p className="mt-6 text-sm md:text-base opacity-90 max-w-2xl mx-auto">
        La suite ne se trouve pas dans un Module 24. La suite, c'est tes
        prochaines créations, tes prochains messages et tes prochaines
        collaborations. 🚀
      </p>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          href="/tracker"
          className="uppercase tracking-wider text-[10px] md:text-xs font-black px-4 py-2 rounded-full bg-white hover:scale-105 transition-transform"
          style={{ color: OLIVE }}
        >
          Ouvrir mon Tracker
        </Link>
        <Link
          href="/boutique"
          className="uppercase tracking-wider text-[10px] md:text-xs font-black px-4 py-2 rounded-full bg-white hover:scale-105 transition-transform"
          style={{ color: OLIVE }}
        >
          Voir les templates portfolio
        </Link>
        <Link
          href="/compte"
          className="uppercase tracking-wider text-[10px] md:text-xs font-black px-4 py-2 rounded-full bg-white hover:scale-105 transition-transform"
          style={{ color: OLIVE }}
        >
          Mon compte
        </Link>
      </div>
    </div>
  );
}
