"use client";

import Link from "next/link";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

const APPS = [
  {
    name: "CapCut",
    logo: "/apps/capcut.png",
    tagline: "Le plus complet et le plus utilisé pour débuter",
    ios: "https://apps.apple.com/app/capcut/id1500855883",
    android:
      "https://play.google.com/store/apps/details?id=com.lemon.lvoverseas",
    desktop: "https://www.capcut.com/",
    highlight: true,
  },
  {
    name: "VN",
    logo: "/apps/vn.png",
    tagline: "Alternative légère et gratuite",
    ios: "https://apps.apple.com/app/vn-video-editor-maker-vlognow/id1450841749",
    android:
      "https://play.google.com/store/apps/details?id=com.frontrow.vlog",
    desktop: "https://www.vn.video/",
  },
  {
    name: "InShot",
    logo: "/apps/inshot.png",
    tagline: "Interface simple, idéal pour les tout premiers montages",
    ios: "https://apps.apple.com/app/inshot-video-editor/id997362197",
    android:
      "https://play.google.com/store/apps/details?id=com.camerasideas.instashot",
    desktop: null,
  },
];

const RHYTHM_TAGS = ["Cuts", "B-roll", "Changements de plan", "Zooms légers", "Texte"];

const SUBTITLES_CHECKS = [
  "Corrige les fautes",
  "Vérifie les noms de marques/produits",
  "Fais des phrases faciles à lire",
  "Garde une police lisible",
  "Évite de placer le texte trop près des bords",
];

const OK_TRANSITIONS = ["Cut simple", "Zoom léger", "Texte", "Transitions utiles"];
const AVOID_TRANSITIONS = ["Effets partout", "10 polices", "Transitions à chaque plan"];

const FINAL_CHECKS = [
  "Le hook arrive rapidement",
  "Il n'y a pas de blanc inutile",
  "Les sous-titres sont corrects",
  "Les B-roll correspondent à ce que tu racontes",
  "Le produit est bien visible",
  "La musique ne couvre pas ta voix",
  "Il n'y a aucune faute ou rush oublié",
];

const MISSION_TAGS = [
  "✂️ Cuts propres",
  "🎥 B-roll",
  "💬 Sous-titres",
  "🎧 Son équilibré",
  "📱 Export",
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

function AppCard({ app }: { app: (typeof APPS)[number] }) {
  return (
    <div
      className={`rounded-2xl p-5 md:p-6 flex flex-col ${
        app.highlight ? "ring-2" : ""
      }`}
      style={{
        backgroundColor: app.highlight ? CREAM : "#faf7e0",
        // @ts-expect-error CSS var
        "--tw-ring-color": OLIVE,
      }}
    >
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={app.logo}
          alt={`Logo ${app.name}`}
          className="w-9 h-9 md:w-10 md:h-10 object-contain flex-shrink-0"
        />
        <span
          className="uppercase tracking-tight text-lg md:text-xl font-black"
          style={{ color: OLIVE }}
        >
          {app.name}
        </span>
        {app.highlight && (
          <span
            className="uppercase tracking-wider text-[9px] md:text-[10px] font-black px-2 py-1 rounded-full"
            style={{ backgroundColor: OLIVE, color: "#ffffff" }}
          >
            Recommandé
          </span>
        )}
      </div>
      <p className="mt-2 text-sm md:text-base leading-snug" style={{ color: OLIVE }}>
        {app.tagline}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={app.ios}
          target="_blank"
          rel="noopener noreferrer"
          className="uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full bg-white"
          style={{ color: OLIVE, border: `1.5px solid ${OLIVE}` }}
        >
          iOS
        </a>
        <a
          href={app.android}
          target="_blank"
          rel="noopener noreferrer"
          className="uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full bg-white"
          style={{ color: OLIVE, border: `1.5px solid ${OLIVE}` }}
        >
          Android
        </a>
        {app.desktop && (
          <a
            href={app.desktop}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full"
            style={{ backgroundColor: OLIVE, color: "#ffffff" }}
          >
            Ordinateur
          </a>
        )}
      </div>
    </div>
  );
}

export function Module08Content() {
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
            08
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Apprendre les bases du montage
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Le montage ne doit pas rendre ta vidéo compliquée. Il doit surtout la
        rendre plus fluide, claire et agréable à regarder.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Tu as maintenant ton script et tes rushs. Il est temps de les
          assembler. Pas besoin de maîtriser des effets complexes : pour
          commencer, concentre-toi sur{" "}
          <strong>les cuts, le rythme, les sous-titres, le son et quelques
          B-roll.</strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Choisis ton app */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Choisis ton application de montage
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu peux totalement monter tes premières vidéos directement sur ton
        téléphone. <strong>Choisis-en une seule au début</strong> et apprends
        à bien l'utiliser plutôt que de changer constamment.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {APPS.map((a) => (
          <AppCard key={a.name} app={a} />
        ))}
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Pour la suite du module, je prends <strong>CapCut</strong> comme
        exemple : il permet de faire facilement les actions essentielles pour
        débuter.
      </p>

      <div
        className="mt-6 rounded-2xl p-4"
        style={{ backgroundColor: "#faf7e0" }}
      >
        <div
          className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-2"
          style={{ color: OLIVE }}
        >
          Démo vidéo : bases de CapCut
        </div>
        <div className="aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src="https://www.youtube.com/embed/R6P3SSgXp1Y"
            title="Tuto CapCut pour débutantes"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Fais le tri */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Commence par faire le tri
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Importe tous tes rushs et sélectionne tes meilleures prises.
          Supprime :
        </p>
        <ul className="list-none pl-0 space-y-2">
          <li>❌ Les hésitations</li>
          <li>❌ Les gros blancs</li>
          <li>❌ Les répétitions inutiles</li>
          <li>❌ Les débuts/fins de prises</li>
          <li>❌ Les plans ratés</li>
        </ul>
        <p>
          Ton premier objectif est simplement d'obtenir une{" "}
          <strong>vidéo fluide</strong>. Si une séquence n'apporte rien à la
          vidéo, demande-toi si elle a vraiment besoin d'être là.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Rythme */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Travaille le rythme
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Sur les réseaux sociaux, l'attention peut partir très vite. Évite
          donc les longueurs inutiles. Tu peux dynamiser ta vidéo avec :
        </p>
      </div>
      <TagRow options={RHYTHM_TAGS} />
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Mais attention : <strong>dynamique ne veut pas dire surchargé.</strong>{" "}
        Pas besoin d'une transition spectaculaire entre chaque plan. Très
        souvent, un simple cut suffit. Regarde ta vidéo sans réfléchir :{" "}
        <em>« À quel moment est-ce que je commence à m'ennuyer ? »</em> C'est
        souvent l'endroit à retravailler.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* B-roll */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ajoute tes B-roll
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Tes B-roll vont permettre d'illustrer ce que tu racontes. Par
          exemple, pendant :
        </p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          « Je l'utilise tous les matins avant de me maquiller. »
        </p>
        <p>
          Tu peux afficher directement le plan où tu appliques le produit.
          Essaie de faire correspondre <strong>ce que l'on entend avec ce que
          l'on voit</strong> : ton montage devient immédiatement plus clair.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Sous-titres */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ajoute des sous-titres
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Beaucoup de contenus sont regardés <strong>sans le son</strong>, et
        les sous-titres facilitent aussi la compréhension. Utilise les
        sous-titres automatiques, puis <strong>toujours les relire.</strong>
      </p>
      <ul className="mt-4 space-y-2 text-base md:text-lg leading-relaxed list-disc pl-6">
        {SUBTITLES_CHECKS.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu peux mettre en valeur certains mots importants, mais évite de
        transformer chaque phrase en arc-en-ciel.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Son */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Musique, voix et volume
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Si tu ajoutes une musique derrière une face cam ou une voice-over,
          elle doit rester <strong>en arrière-plan</strong>. La règle est
          simple :
        </p>
        <p className="italic pl-4 border-l-2 border-[var(--border)]">
          Si la musique empêche de comprendre ta voix, elle est trop forte.
        </p>
        <p>
          Vérifie aussi que le <strong>volume reste cohérent</strong> entre
          tes différents rushs.
        </p>
        <div
          className="rounded-2xl p-4 md:p-5"
          style={{ backgroundColor: "#faf7e0" }}
        >
          <p style={{ color: OLIVE }}>
            Pour une collaboration, n'utilise pas automatiquement n'importe
            quelle musique tendance : les droits musicaux et usages
            commerciaux peuvent être différents selon la plateforme et
            l'utilisation prévue par la marque.{" "}
            <strong>Suis le brief et utilise une musique adaptée à l'usage
            demandé.</strong>
          </p>
        </div>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Transitions */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Les transitions et effets
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Tu n'as pas besoin de maîtriser 50 transitions pour être une bonne
        créatrice UGC.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
          <div
            className="uppercase tracking-wider text-[10px] md:text-xs font-black"
            style={{ color: OLIVE }}
          >
            ✅ Pour débuter
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {OK_TRANSITIONS.map((t) => (
              <span
                key={t}
                className="uppercase tracking-wider text-xs font-bold px-3 py-2 rounded-full bg-white"
                style={{ color: OLIVE }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-5 border-2 border-red-200 bg-red-50/40">
          <div className="uppercase tracking-wider text-[10px] md:text-xs font-black text-red-700">
            ❌ À éviter
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {AVOID_TRANSITIONS.map((t) => (
              <span
                key={t}
                className="uppercase tracking-wider text-xs font-bold px-3 py-2 rounded-full bg-white"
                style={{ color: OLIVE }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Le spectateur doit surtout retenir <strong>le message et le
        produit</strong>, pas ton effet de montage.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Vérifie avant d'exporter */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Vérifie avant d'exporter
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Regarde ta vidéo une dernière fois du début à la fin, idéalement{" "}
        <strong>avec puis sans le son</strong>. Vérifie :
      </p>
      <ul className="mt-4 space-y-2 text-base md:text-lg leading-relaxed list-disc pl-6">
        {FINAL_CHECKS.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Puis exporte dans une qualité adaptée au brief. Pour beaucoup de
        contenus verticaux, <strong>1080 × 1920 (9:16)</strong> est une base
        courante, mais respecte toujours les spécifications demandées par la
        marque ou la plateforme.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* À toi de jouer */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer : monte ta première vidéo
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed">
        Reprends les rushs tournés au module précédent et réalise ton
        montage. Ta mission :
      </p>
      <div
        className="mt-6 rounded-2xl p-5 md:p-6 flex flex-wrap gap-2 justify-center"
        style={{ backgroundColor: CREAM }}
      >
        {MISSION_TAGS.map((t) => (
          <span
            key={t}
            className="uppercase tracking-wider text-xs md:text-sm font-black px-4 py-2 rounded-full bg-white"
            style={{ color: OLIVE }}
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Une fois terminée, regarde ta vidéo une première fois normalement,
        puis une deuxième fois <strong>sans le son</strong>. Demande-toi
        simplement :{" "}
        <em>
          « Est-ce que je comprends toujours le produit et le message ? »
        </em>{" "}
        Si oui, tu as déjà acquis les bases essentielles.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module08Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        maintenant que tu sais créer une vidéo de A à Z, on va voir comment
        obtenir des produits grâce au gifting.
      </strong>
    </p>
  );
}
