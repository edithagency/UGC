import Link from "next/link";

export const metadata = { title: "Portfolio — edithappp" };

export default function PortfolioPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <span
        className="relative inline-flex w-16 h-16 items-center justify-center"
        style={{ transform: "rotate(-10deg)", color: "#615326" }}
      >
        <svg
          viewBox="0 0 100 100"
          width="64"
          height="64"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M50 8 L62 38 L94 40 L69 60 L78 92 L50 74 L22 92 L31 60 L6 40 L38 38 Z" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-white font-black text-base leading-none">
          3
        </span>
      </span>

      <h1
        className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-6"
        style={{ color: "#615326" }}
      >
        Ton portfolio UGC
      </h1>
      <p className="text-lg text-[var(--muted)] mt-4 max-w-xl mx-auto">
        Templates prêts à remplir pour montrer aux marques ce que tu sais faire — même sans
        collab encore.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-4 text-left">
        {[
          {
            t: "Spec ad",
            d: "Filme une pub UGC sur un produit que tu utilises déjà. Template de brief à remplir.",
          },
          {
            t: "Unboxing / démo",
            d: "Structure : réception, ouverture, premier avis. Prêt à copier-coller.",
          },
          {
            t: "Testimonial",
            d: "Une prise face caméra avec les 3 accroches qui convertissent.",
          },
        ].map((f) => (
          <div key={f.t} className="card">
            <h3 className="font-black text-xl uppercase tracking-tight" style={{ color: "#615326" }}>
              {f.t}
            </h3>
            <p className="text-[var(--muted)] mt-2 text-sm">{f.d}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-[var(--muted)] mt-12">
        Cette page sera enrichie prochainement — templates téléchargeables, exemples vidéo,
        checklist de tournage.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/dashboard" className="btn btn-primary">
          Reprendre mon parcours
        </Link>
        <Link href="/" className="btn btn-ghost">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
