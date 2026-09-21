"use client";

import Link from "next/link";
import { useState } from "react";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

const LIGHTING = [
  "Lumière naturelle",
  "Ring light",
  "LED",
  "Softbox",
];

const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="uppercase tracking-wider text-xs md:text-sm font-bold px-4 py-2 rounded-full transition hover:opacity-80"
      style={
        selected
          ? { backgroundColor: OLIVE, color: "#ffffff" }
          : { backgroundColor: CREAM, color: OLIVE }
      }
    >
      {children}
    </button>
  );
}

function ChipRow({
  options,
  selected,
  setSelected,
}: {
  options: string[];
  selected: string[];
  setSelected: (v: string[]) => void;
}) {
  const toggle = (o: string) =>
    setSelected(selected.includes(o) ? selected.filter((s) => s !== o) : [...selected, o]);
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {options.map((o) => (
        <Chip key={o} selected={selected.includes(o)} onClick={() => toggle(o)}>
          {o}
        </Chip>
      ))}
    </div>
  );
}

// Comparaison visuelle éclairage
function LightingComparison() {
  const items = [
    { src: "/lighting/mauvaise.jpg", label: "Mauvais éclairage" },
    { src: "/lighting/bonne.jpeg", label: "Bon éclairage" },
  ];
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 max-w-md mx-auto">
      {items.map((v) => (
        <div key={v.label}>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={v.src}
              alt={v.label}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="mt-2 uppercase tracking-wider text-[10px] md:text-xs font-bold text-center"
            style={{ color: OLIVE }}
          >
            {v.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Module03Content() {
  const [lighting, setLighting] = useState<string[]>([]);

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
            03
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Le matériel pour commencer
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Bonne nouvelle : tu n'as pas besoin d'un setup à 1 000 € pour te lancer
        dans l'UGC.
      </p>

      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Quand on débute, on peut vite penser qu'il faut une caméra
          professionnelle, des lumières partout et un micro hors de prix. En
          réalité,{" "}
          <strong>
            commence avec ce que tu as et investis seulement quand tu en
            ressens vraiment le besoin.
          </strong>{" "}
          L'objectif, c'est surtout d'obtenir{" "}
          <strong>une vidéo nette, lumineuse et agréable à regarder.</strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Téléphone */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ton téléphone suffit
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Pour commencer, <strong>un smartphone récent suffit largement</strong>.
          L'UGC doit généralement rester naturel et adapté aux codes de TikTok,
          Reels ou Shorts.
        </p>
        <p>Quelques réflexes simples font déjà une grosse différence :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Nettoie ton objectif avant de filmer</li>
          <li>
            Filme généralement en <strong>vertical 9:16</strong> pour les
            contenus destinés aux formats verticaux
          </li>
          <li>Évite le zoom numérique si tu peux te rapprocher</li>
          <li>Vérifie la mise au point avant de tourner</li>
          <li>Active la meilleure qualité adaptée à ton téléphone et au brief</li>
          <li>Garde suffisamment de stockage disponible</li>
        </ul>
        <p className="italic">
          <strong>À retenir</strong> : une vidéo bien éclairée avec un
          téléphone sera souvent plus réussie qu'une vidéo mal éclairée avec
          une caméra coûteuse.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Lumière */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        La lumière
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Avant d'acheter une lumière, teste ce que tu as gratuitement :{" "}
          <strong>une fenêtre.</strong> Place-toi{" "}
          <strong>face à elle</strong> ou légèrement de côté et évite, si
          possible, d'avoir une fenêtre très lumineuse directement derrière toi.
        </p>
      </div>

      <LightingComparison />
      <p className="mt-3 text-xs md:text-sm italic text-center text-[var(--muted)]">
        Même téléphone. Seule la lumière change.
      </p>

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Tu peux ensuite investir progressivement :
      </p>
      <ChipRow options={LIGHTING} selected={lighting} setSelected={setLighting} />

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Pour débuter, <strong>lumière naturelle + téléphone = largement
        suffisant</strong> pour t'entraîner. Fais aussi attention aux{" "}
        <strong>mélanges de lumière</strong> — une fenêtre très froide + une
        lampe très jaune peuvent donner un rendu étrange à la peau ou au
        produit.
      </p>

      <hr className="my-10 border-[var(--border)]" />

      {/* Trépied */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Le trépied
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Ce n'est pas obligatoire, mais c'est probablement{" "}
          <strong>l'un des premiers accessoires que je conseillerais.</strong>{" "}
          Il te permet de filmer seule, garder ton téléphone stable et varier
          beaucoup plus facilement les cadrages.
        </p>
        <p>
          Pas encore de trépied ? Une pile de livres, une étagère ou un support
          stable peuvent très bien dépanner au début.{" "}
          <strong>Petit conseil</strong> : si tu en achètes un, privilégie un
          modèle suffisamment haut et facile à déplacer plutôt qu'un
          mini-trépied que tu vas rapidement vouloir remplacer.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Son */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Le son
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Si tu fais du face caméra, ton audience doit pouvoir{" "}
          <strong>comprendre facilement ce que tu dis.</strong> Commence
          simplement avec le micro de ton téléphone, surtout dans une pièce
          calme.
        </p>
        <p>Avant de tourner :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Ferme les fenêtres si la rue est bruyante</li>
          <li>Coupe TV, ventilateur ou autres bruits parasites</li>
          <li>Évite les pièces qui résonnent beaucoup</li>
          <li>Fais un test de 10 secondes et réécoute-le</li>
        </ul>
        <p>
          Plus tard, si tu fais beaucoup de face cam,{" "}
          <strong>un micro-cravate peut être un investissement intéressant.</strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Décor */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Ton décor
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          <strong>Pas besoin d'avoir un appartement Pinterest.</strong> Ce qui
          compte surtout, c'est que l'environnement{" "}
          <strong>
            ne détourne pas l'attention du produit ou de ton message.
          </strong>
        </p>
        <p>
          Avant d'appuyer sur REC, regarde rapidement derrière toi : linge qui
          traîne, emballages, câbles visibles, miroir sale…
        </p>
        <p>
          Parfois, déplacer trois objets suffit à rendre ton plan beaucoup plus
          propre. Et <strong>adapte ton décor au produit</strong> : une
          skincare dans une salle de bain, une recette dans une cuisine, une
          application au bureau… Le décor doit aider à raconter la scène,{" "}
          <strong>pas simplement être joli.</strong>
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* À toi de jouer */}
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À toi de jouer
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Prends ton téléphone et trouve <strong>2 endroits chez toi</strong>{" "}
          dans lesquels tu pourrais tourner.
        </p>
        <p>Pour chaque endroit, vérifie :</p>
      </div>

      <div
        className="mt-6 rounded-2xl p-6 md:p-8"
        style={{ backgroundColor: CREAM }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { emoji: "💡", label: "Lumière" },
            { emoji: "🎙️", label: "Son" },
            { emoji: "🖼️", label: "Arrière-plan" },
            { emoji: "📱", label: "Place pour le téléphone" },
          ].map((t) => (
            <div key={t.label}>
              <div
                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: "#ffffff" }}
              >
                {t.emoji}
              </div>
              <div
                className="mt-2 uppercase tracking-wider text-[10px] md:text-xs font-bold"
                style={{ color: OLIVE }}
              >
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Ensuite, <strong>filme simplement 10 secondes face caméra</strong>{" "}
          dans les deux endroits. Regarde les vidéos et{" "}
          <strong>choisis celui qui fonctionne le mieux.</strong> Tu viens de
          trouver ton premier spot de tournage.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module03Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochaine étape :{" "}
      <strong style={{ color: OLIVE }}>
        on arrête la théorie, tu vas créer tes premiers contenus UGC.
      </strong>
    </p>
  );
}
