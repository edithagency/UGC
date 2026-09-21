import Link from "next/link";
import { getCurrentUser } from "@/lib/dal";
import { TemplateCard } from "./TemplateCard";
import { stripeEnabled } from "@/lib/stripe";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

type Template = {
  slug: string;
  name: string;
  desc: string;
  price: number;
  image?: string;
};

const TEMPLATES: Template[] = [
  {
    slug: "tracker-pro",
    name: "TRACKER PRO",
    desc: "Débloque un nombre illimité de marques dans ton Tracker et suis toutes tes collaborations.",
    price: 19.99,
  },
  {
    slug: "black-and-white",
    name: "PORTFOLIO - Black & White",
    desc: "Un portfolio épuré, noir et blanc, qui met en avant tes vidéos.",
    price: 14.99,
    image: "/templates/black-and-white.png",
  },
  { slug: "template-02", name: "Template 2", desc: "Petite description du style", price: 14.99 },
  { slug: "template-03", name: "Template 3", desc: "Petite description du style", price: 14.99 },
  { slug: "template-04", name: "Template 4", desc: "Petite description du style", price: 14.99 },
  { slug: "template-05", name: "Template 5", desc: "Petite description du style", price: 14.99 },
  { slug: "template-06", name: "Template 6", desc: "Petite description du style", price: 14.99 },
  { slug: "template-07", name: "Template 7", desc: "Petite description du style", price: 14.99 },
];

export default async function TemplatePage() {
  const user = await getCurrentUser();
  const stripeReady = stripeEnabled();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-[var(--muted)] [&_strong]:text-[#615326]">
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
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Boutique
        </h1>
        <div className="hidden sm:flex items-center gap-2 ml-auto">
          {[
            { rot: -6, src: "/vibe/vibe8.jpeg" },
            { rot: 4, src: "/vibe/vibe1.jpeg" },
            { rot: -3, src: "/vibe/vibe6.jpeg" },
            { rot: 6, src: "/vibe/vibe3.jpeg" },
          ].map((p, i) => (
            <div
              key={i}
              className="w-14 h-14 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 border-white shadow-md flex-shrink-0"
              style={{ transform: `rotate(${p.rot}deg)`, backgroundColor: CREAM }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      <p className="text-lg md:text-xl mt-3 text-[var(--muted)]">
        Débloque ton Tracker Pro et choisis parmi 7 templates de portfolio
        UGC prêts à l&apos;emploi.
      </p>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {TEMPLATES.map((t) => (
          <TemplateCard
            key={t.slug}
            template={t}
            stripeReady={stripeReady}
          />
        ))}
      </div>

      {!user && (
        <p className="text-center text-sm text-[var(--muted)] mt-8">
          Pas encore inscrite ?{" "}
          <Link href="/login" className="link">
            Fais le parcours gratuit
          </Link>
          .
        </p>
      )}

      <div className="mt-10 text-sm text-[var(--muted)] text-center max-w-3xl mx-auto">
        <strong>Facturation & TVA :</strong> vente en micro-entreprise France, TVA
        non applicable art. 293 B du CGI en dessous du seuil. Facture envoyée par
        email après paiement.
      </div>
    </div>
  );
}
