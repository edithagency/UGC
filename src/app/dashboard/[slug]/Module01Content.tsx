import Link from "next/link";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

const STEPS = [
  {
    n: "Étape 1",
    t: "La prise de contact",
    d: "La marque te contacte ou tu l'as toi-même démarchée. Elle explique qu'elle recherche une créatrice pour présenter son nouveau sérum.",
  },
  {
    n: "Étape 2",
    t: "La discussion",
    d: "Vous échangez sur le nombre de contenus, les formats, le concept, les délais, les droits d'utilisation, les tarifs…",
  },
  {
    n: "Étape 3",
    t: "L'accord",
    d: "Une fois les conditions acceptées et correctement cadrées, vous signez un contrat/devis et la collaboration peut commencer.",
  },
  {
    n: "Étape 4",
    t: "Le brief",
    d: "La marque t'indique ce qu'elle souhaite retrouver dans le contenu : messages importants, caractéristiques du produit, contraintes, références créatives…",
  },
  {
    n: "Étape 5",
    t: "La création",
    d: "Tu prépares ton concept ou ton script. Tu filmes. Tu montes.",
  },
  {
    n: "Étape 6",
    t: "La livraison",
    d: "Tu transmets le contenu selon les modalités convenues. La marque peut éventuellement demander les modifications prévues dans votre accord.",
  },
  {
    n: "Étape 7",
    t: "Validation et paiement",
    d: "Une fois le travail réalisé, tu factures selon les conditions prévues.",
  },
];

const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";
const H3_CLASS = "font-bold";

export function Module01Content() {
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
            01
          </span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Comprendre l'UGC
        </h1>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Avant de te lancer, comprends exactement ce que tu vas vendre aux marques.
      </p>

      {/* Intro */}
      <div className="mt-24 space-y-5 text-base md:text-lg leading-relaxed text-[var(--muted)]">
        <p>
          <strong style={{ color: OLIVE }}>
            Bienvenue dans ton premier module !
          </strong>
        </p>
        <p>
          Si tu es ici, tu as probablement déjà entendu parler de l'UGC sur
          TikTok, Instagram ou ailleurs. Peut-être que tu sais vaguement qu'il
          est possible de créer des vidéos pour des marques et d'être rémunérée
          pour ça, mais sans forcément comprendre comment ça fonctionne
          concrètement. Et c'est totalement normal.
        </p>
        <p>
          Avant de parler portfolio, tarifs, prospection ou collaborations, on
          va commencer par la base :{" "}
          <strong style={{ color: OLIVE }}>
            comprendre ce qu'est réellement l'UGC et quel est le rôle d'une
            créatrice UGC.
          </strong>
        </p>
        <p>
          À la fin de ce module, tu dois être capable d'expliquer en quelques
          phrases ce que tu proposes à une marque.
        </p>
      </div>

      <hr className="my-10 border-[var(--border)]" />

      {/* Qu'est-ce que l'UGC */}
      <h2 className={H2_CLASS} style={{ color: OLIVE, marginTop: 0 }}>
        Qu'est-ce que l'UGC ?
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          UGC signifie{" "}
          <strong style={{ color: OLIVE }}>User Generated Content</strong>, que
          l'on pourrait traduire par «&nbsp;contenu généré par les
          utilisateurs&nbsp;».
        </p>
        <p>
          À l'origine, le terme désigne tout simplement du contenu créé par les
          consommateurs autour d'une marque ou d'un produit : avis, photos,
          vidéos, témoignages, publications sur les réseaux sociaux…
        </p>
        <p>
          Mais lorsqu'on parle aujourd'hui de <strong>créatrice UGC</strong>,
          on parle généralement d'une personne qui crée volontairement du
          contenu pour une marque, en échange d'une rémunération ou dans le
          cadre d'une collaboration définie.
        </p>
      </div>

      <h3 className="mt-8 uppercase italic text-[var(--muted)] text-sm md:text-base tracking-wide">
        Prenons un exemple :
      </h3>
      <p className="mt-3 italic text-[var(--muted)] text-base md:text-lg leading-relaxed">
        Une marque de skincare lance un nouveau sérum et souhaite obtenir une
        vidéo TikTok/Reel naturelle montrant : une personne face caméra, le
        problème qu'elle rencontre avec sa peau, le produit, son utilisation,
        ses bénéfices… La marque peut faire appel à une créatrice UGC pour
        réaliser cette vidéo. Tu reçois le brief et éventuellement le produit.
        Tu imagines ou suis le concept demandé, tu filmes, tu montes la vidéo,
        tu la livres à la marque.{" "}
        <strong className="italic">
          Et la marque te rémunère pour ton travail de création.
        </strong>
      </p>

      {/* UGC ≠ influence */}
      <hr className="my-10 border-[var(--border)]" />
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        UGC ≠ Influence
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          C'est probablement la distinction la plus importante à comprendre
          quand tu commences. Une créatrice UGC{" "}
          <strong style={{ color: OLIVE }}>
            n'a pas besoin d'avoir une grosse communauté.
          </strong>
        </p>
        <p>Pourquoi&nbsp;?</p>
        <p>
          Parce qu'une marque ne te rémunère pas nécessairement pour avoir
          accès à ton audience. Elle te rémunère avant tout{" "}
          <strong style={{ color: OLIVE }}>
            pour ta capacité à créer du contenu.
          </strong>
        </p>
      </div>

      <div className="mt-6 max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-[var(--border)]">
        <table className="w-full text-center border-collapse text-sm md:text-base">
          <thead>
            <tr>
              <th
                className="py-3 px-4 uppercase tracking-wider text-xs md:text-sm bg-[var(--accent)] text-center"
                style={{ color: OLIVE }}
              >
                Influence
              </th>
              <th
                className="py-3 px-4 uppercase tracking-wider text-xs md:text-sm bg-[var(--accent)] border-l border-[var(--border)] text-center"
                style={{ color: OLIVE }}
              >
                UGC
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {[
              [
                "Tu vends notamment l'accès à ton audience",
                "Tu vends principalement ta création de contenu",
              ],
              [
                "Le nombre d'abonnés a de l'importance",
                "Il n'est pas nécessaire d'avoir une grosse communauté",
              ],
              [
                "Le contenu est généralement publié sur ton compte",
                "Le contenu peut être livré directement à la marque",
              ],
              [
                "La marque recherche aussi ta visibilité",
                "La marque recherche surtout tes compétences créatives",
              ],
            ].map(([a, b], i) => (
              <tr key={i}>
                <td className="py-3 px-4 align-middle text-center w-1/2">{a}</td>
                <td className="py-3 px-4 align-middle text-center w-1/2 border-l border-[var(--border)]">
                  {b}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-base md:text-lg leading-relaxed">
        Et bien sûr,{" "}
        <strong style={{ color: OLIVE }}>tu peux faire les deux</strong>. Une
        influenceuse peut proposer de l'UGC à des marques et une créatrice UGC
        peut développer sa propre communauté. Ce sont simplement deux
        prestations différentes.
      </p>

      {/* Pourquoi les marques achètent-elles */}
      <hr className="my-10 border-[var(--border)]" />
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Pourquoi les marques achètent-elles de l'UGC ?
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          Parce que sur TikTok, Instagram et les autres plateformes sociales,
          les utilisateurs sont habitués à consommer du contenu créé avec un
          téléphone. Une publicité très travaillée et tournée en studio peut
          avoir sa place. Mais les marques ont également besoin de contenus qui
          s'intègrent naturellement dans les codes des réseaux sociaux. C'est
          là que la créatrice UGC intervient.
        </p>
        <p>
          Ton travail peut permettre à une marque de disposer régulièrement de
          nouveaux contenus pour <strong>ses réseaux sociaux</strong>,{" "}
          <strong>ses publicités</strong>, <strong>ses pages produits</strong>,{" "}
          <strong>son site internet</strong>, ou d'autres supports selon les
          besoins et les droits convenus.
        </p>
        <p>
          Et surtout, <strong style={{ color: OLIVE }}>
            les marques ont besoin de volume et de variété
          </strong>
          . Elles peuvent vouloir tester plusieurs créatrices, hooks, angles
          marketing, formats, montages…
        </p>
      </div>

      {/* Qu'est-ce qu'une marque attend */}
      <hr className="my-10 border-[var(--border)]" />
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Qu'est-ce qu'une marque attend réellement de toi ?
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          <strong style={{ color: OLIVE }}>
            Être créatrice UGC, ce n'est pas uniquement être jolie devant une
            caméra.
          </strong>
        </p>
        <p>
          Une bonne créatrice doit progressivement apprendre à{" "}
          <strong>
            comprendre un brief, trouver des idées, créer un bon hook, filmer
            proprement, être naturelle face caméra, monter une vidéo dynamique,
            respecter les délais…
          </strong>
        </p>
        <p>
          Ne t'inquiète pas si tu ne maîtrises pas encore tout.{" "}
          <strong>
            C'est précisément ce que tu vas apprendre dans ce parcours.
          </strong>
        </p>
      </div>

      {/* Collaboration concrètement */}
      <hr className="my-10 border-[var(--border)]" />
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        À quoi ressemble une collaboration concrètement ?
      </h2>
      <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed">
        {STEPS.map((s) => (
          <div key={s.n}>
            <h3 className={H3_CLASS} style={{ color: OLIVE }}>
              {s.n} : {s.t}
            </h3>
            <p className="mt-1">{s.d}</p>
          </div>
        ))}
      </div>

      {/* Est-ce qu'il faut de l'expérience */}
      <hr className="my-10 border-[var(--border)]" />
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Est-ce qu'il faut déjà avoir de l'expérience ?
      </h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        <p>
          <strong style={{ color: OLIVE }}>NON.</strong>
        </p>
        <p>
          Et c'est une des raisons pour lesquelles la suite de ce parcours est
          importante.
        </p>
        <p>
          Au début, tu n'as probablement, aucune collaboration, aucun
          témoignage client, aucun portfolio, aucune marque avec laquelle tu as
          travaillé.
        </p>
        <p>
          Mais tu peux quand même commencer à créer. Tu peux prendre un produit
          que tu possèdes déjà chez toi et imaginer une vidéo comme si la
          marque t'avait demandé de la réaliser. C'est exactement ce que nous
          ferons dans quelques modules.
        </p>
        <p>
          Tu n'as donc pas besoin d'attendre qu'une marque te donne
          l'autorisation de commencer.
        </p>
      </div>

      {/* Validation heading */}
      <hr className="my-10 border-[var(--border)]" />
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Peux-tu valider ce module ?
      </h2>
    </article>
  );
}

export function Module01Footer() {
  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted)]">
      Prochain module :{" "}
      <strong style={{ color: OLIVE }}>
        trouver ton persona et commencer à construire ton identité de créatrice
        UGC.
      </strong>
    </p>
  );
}
