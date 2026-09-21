import Link from "next/link";
import { getSubscriberCount } from "@/lib/dal";
import { PART_TITLES } from "@/lib/modules";
import { UgcVideo } from "@/components/UgcVideo";

const COUNTER_THRESHOLD = 50;

export default async function Landing() {
  let count = 0;
  try {
    count = await getSubscriberCount();
  } catch {
    /* Supabase pas encore branchée — masque le compteur */
  }

  return (
    <div>
      {/* HERO — image avec texte intégré + bouton en overlay */}
      <section
        className="relative w-full"
        style={{
          aspectRatio: "1980 / 1040",
          backgroundImage: "url('/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Link
          href="/signup"
          className="absolute uppercase tracking-wider text-sm md:text-base text-white rounded-full px-8 py-4 transition-transform duration-200 ease-out hover:scale-105"
          style={{
            backgroundColor: "#615326",
            bottom: "34%",
            left: "6.5%",
          }}
        >
          Commencer les modules
        </Link>
      </section>

      {/* Sous-hero */}
      <section className="text-center pt-8 md:pt-12 px-6">
        <p className="text-lg md:text-xl mt-8 max-w-5xl mx-auto leading-relaxed text-[var(--muted)] whitespace-nowrap">
          Tout ce que j'aurais aimé savoir en commençant l'UGC.{" "}
          <strong style={{ color: "#615326" }}>23 modules gratuits</strong> pour
          apprendre à te lancer.
        </p>
        {count >= COUNTER_THRESHOLD && (
          <p className="mt-6 text-base text-[var(--muted)]">
            <strong className="text-[var(--foreground)]">
              {count.toLocaleString("fr-FR")} filles
            </strong>{" "}
            suivent déjà le parcours.
          </p>
        )}
      </section>

      {/* COMMENT ÇA MARCHE — 4 étapes avec étoile */}
      <section className="mt-10 md:mt-14 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {[
            {
              n: 1,
              title: "Inscris-toi gratuitement",
              desc: "Inscris-toi gratuitement en 20 secondes et c'est parti.",
              cta: null,
              href: null,
            },
            {
              n: 2,
              title: "Accède à tous les modules",
              desc: "23 modules qui t'apprennent étape par étape à te lancer dans l'UGC.",
              cta: null,
              href: null,
            },
            {
              n: 3,
              title: "Construis ton portfolio",
              desc: "Templates prêts à personnaliser pour montrer ce que tu sais faire.",
              cta: null,
              href: null,
            },
            {
              n: 4,
              title: "Décroche tes premières collabs",
              desc: "Grâce aux modules et au tracker gratuit, tu es prête à te lancer.",
              cta: null,
              href: null,
            },
          ].map((s) => (
            <div key={s.n} className="flex flex-col items-center text-center">
              <span
                className="relative w-16 h-16 flex items-center justify-center"
                style={{ transform: "rotate(-10deg)", color: "#f4efc2" }}
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
                  {s.n}
                </span>
              </span>
              <h3
                className="mt-5 font-black uppercase text-sm md:text-base tracking-tight whitespace-nowrap"
                style={{ color: "#615326" }}
              >
                {s.title}
              </h3>
              <p className="mt-2 text-sm md:text-base text-[var(--muted)] leading-relaxed">
                {s.desc}
              </p>
              {s.cta && s.href && (
                <Link
                  href={s.href}
                  className="mt-4 inline-flex uppercase tracking-widest text-xs font-bold px-5 py-2 rounded-full text-white"
                  style={{ backgroundColor: "#615326" }}
                >
                  {s.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* LOGOS MARQUES — marquee infini */}
      <section className="mt-16 md:mt-20 py-8 md:py-12 border-y border-[var(--border)] overflow-hidden">
        <p className="text-center text-xs md:text-sm uppercase tracking-widest text-[var(--muted)] mb-8">
          Marques avec lesquelles tu pourrais collaborer
        </p>
        <div className="marquee">
          <div className="marquee-track">
            {(() => {
              const logos = [
                { src: "/logos/logo1.png", alt: "Logo 1" },
                { src: "/logos/logo2.png", alt: "Logo 2" },
                { src: "/logos/logo3.png", alt: "Logo 3" },
                { src: "/logos/logo4.png", alt: "Logo 4" },
                { src: "/logos/logo5.png", alt: "Logo 5" },
                { src: "/logos/logo6.png", alt: "Logo 6" },
                { src: "/logos/logo7.png", alt: "Logo 7" },
                { src: "/logos/logo8.png", alt: "Logo 8" },
                { src: "/logos/logo9.png", alt: "Logo 9" },
                { src: "/logos/logo10.png", alt: "Logo 10" },
                { src: "/logos/logo11.webp", alt: "Logo 11" },
                { src: "/logos/logo12.png", alt: "Logo 12" },
                { src: "/logos/logo13.jpg", alt: "Logo 13" },
              ];
              // Concaténation pour boucle infinie sans coupure
              return [...logos, ...logos].map((l, i) => {
                const smaller =
                  l.src.includes("logo1.") ||
                  l.src.includes("logo2.") ||
                  l.src.includes("logo5.") ||
                  l.src.includes("logo6.");
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={l.src}
                    alt={l.alt}
                    className={`w-auto object-contain flex-shrink-0 ${
                      smaller ? "h-7 md:h-10" : "h-12 md:h-16"
                    }`}
                  />
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* VIDÉOS — carrousel horizontal */}
      <section className="mt-16 md:mt-20 max-w-7xl mx-auto px-6">
        <h2
          className="text-3xl md:text-5xl font-black uppercase tracking-tight"
          style={{ color: "#615326" }}
        >
          Vidéos UGC
        </h2>
        <p className="text-[var(--muted)] mt-2 text-lg">
          Le style de contenu qui fait signer les marques.
        </p>
        <div className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6">
          {[
            { src: "/videos/loreal.mp4", label: "L'Oréal" },
            { src: "/videos/jean-paul-gaultier.mp4", label: "Jean Paul Gaultier" },
            { src: "/videos/edikted.mp4", label: "Edikted" },
            { src: "/videos/excel-coiffure.mp4", label: "Excel Coiffure" },
            { src: "/videos/burga.mp4", label: "Burga" },
            { src: "/videos/luxeol.mp4", label: "Luxeol" },
            { src: "/videos/carolina-herrera.mp4", label: "Carolina Herrera" },
          ].map((v, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-56 md:w-64 aspect-[9/16] snap-start rounded-2xl overflow-hidden relative bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center"
            >
              <UgcVideo src={v.src} />
              <div className="absolute bottom-3 left-3 right-3 text-xs uppercase font-bold tracking-wider text-white drop-shadow z-[1] pointer-events-none">
                {v.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODULES PREVIEW — étoile + titre, grille compacte */}
      <section className="mt-10 md:mt-14 py-6 md:py-10 border-y border-[var(--border)]">
        <p className="text-center text-xs md:text-sm uppercase tracking-widest text-[var(--muted)] mb-8">
          Découvre 23 modules pour apprendre à te lancer
        </p>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
          {Object.entries(PART_TITLES).map(([n, title]) => (
            <Link
              key={n}
              href="/signup"
              className="flex items-center gap-3 hover:opacity-70"
              title={title}
            >
              <span
                className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center"
                style={{ transform: "rotate(-10deg)", color: "#f4efc2" }}
              >
                <svg
                  viewBox="0 0 100 100"
                  width="40"
                  height="40"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="14"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  <path d="M50 8 L62 38 L94 40 L69 60 L78 92 L50 74 L22 92 L31 60 L6 40 L38 38 Z" />
                </svg>
              </span>
              <span
                className="text-sm md:text-base font-black uppercase tracking-tight leading-tight"
                style={{ color: "#615326" }}
              >
                {title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">

      {/* CTA FINAL */}
      <section className="text-center px-6 py-10 md:py-14">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          Prête à te lancer ?
        </h2>
        <p className="text-[var(--muted)] mt-4 max-w-2xl mx-auto text-lg">
          Inscription en 20 secondes et apprends à te lancer dans l&apos;UGC gratuitement.
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-flex uppercase tracking-wider text-sm md:text-base text-white rounded-full px-8 py-4 hover:scale-105 transition-transform"
          style={{ backgroundColor: "#615326" }}
        >
          Je me lance
        </Link>
      </section>

      {/* GALERIE VIBE — 8 photos sous le CTA */}
      <section className="mt-6 md:mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="aspect-square rounded-2xl overflow-hidden bg-neutral-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/vibe/vibe${n}.jpeg`}
                alt={`Inspiration UGC ${n}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
