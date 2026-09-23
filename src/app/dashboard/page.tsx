import Link from "next/link";
import { requireUser, getProgress } from "@/lib/dal";
import { MODULES, MODULE_COUNT, PART_TITLES, modulesByPart } from "@/lib/modules";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const user = await requireUser();
  const progress = await getProgress();
  const supabase = await createSupabaseServerClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("finished_at")
    .eq("id", user.id)
    .maybeSingle();

  const completedSlugs = new Set(
    progress.filter((p) => p.completed_at).map((p) => p.module_slug)
  );
  const completedCount = completedSlugs.size;
  const pct = Math.round((completedCount / MODULE_COUNT) * 100);

  const grouped = modulesByPart();
  const partNumbers = Array.from(grouped.keys()).sort((a, b) => a - b);

  const OLIVE = "#615326";
  const CREAM = "#f4efc2";

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 text-[var(--muted)] [&_strong]:text-[#615326]">
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
          Mon parcours
        </h1>
        <div className="hidden sm:flex items-center gap-2 ml-auto">
          {[
            { rot: -6, src: "/vibe/vibe1.jpeg" },
            { rot: 4, src: "/vibe/vibe2.jpeg" },
            { rot: -3, src: "/vibe/vibe3.jpeg" },
            { rot: 5, src: "/vibe/vibe4.jpeg" },
            { rot: -4, src: "/vibe/vibe5.jpeg" },
            { rot: 6, src: "/vibe/vibe6.jpeg" },
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
        Toute la formation, module par module, pour te lancer en UGC.
      </p>

      {/* Progression */}
      <div
        className="mt-8 rounded-2xl p-5 md:p-6"
        style={{ backgroundColor: CREAM }}
      >
        <div
          className="uppercase tracking-wider text-[10px] md:text-xs font-black"
          style={{ color: OLIVE }}
        >
          Ma progression
        </div>
        <div
          className="text-xl md:text-2xl font-black mt-1 uppercase tracking-tight"
          style={{ color: OLIVE }}
        >
          {completedCount} / {MODULE_COUNT} modules terminés
        </div>
        <div className="mt-3 h-2 rounded-full overflow-hidden bg-white">
          <span
            className="block h-full rounded-full transition-all"
            style={{ width: `${pct}%`, backgroundColor: OLIVE }}
          />
        </div>
      </div>

{/* Modules groupés par partie */}
      <div className="mt-12 space-y-20 md:space-y-24">
        {partNumbers.map((partNum) => {
          const partModules = grouped.get(partNum)!;
          return (
            <section key={partNum}>
              <h2
                className="text-xl md:text-2xl font-black uppercase tracking-tight"
                style={{ color: "#615326" }}
              >
                {PART_TITLES[partNum]}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {partModules.map((m) => {
                  const previousDone =
                    m.order === 1 ||
                    completedSlugs.has(
                      MODULES.find((x) => x.order === m.order - 1)!.slug
                    );
                  const isDone = completedSlugs.has(m.slug);
                  const isLocked = !previousDone;

                  const cardClass = `card relative flex flex-col gap-3 transition h-full ${
                    isLocked
                      ? "cursor-not-allowed"
                      : "hover:border-[var(--brand)] hover:shadow-md"
                  }`;
                  const cardStyle = isDone
                    ? { backgroundColor: "#f4efc2", borderColor: "#f4efc2" }
                    : !isLocked
                    ? { backgroundColor: "#faf7e0", borderColor: "#faf7e0" }
                    : undefined;

                  const statusLabel = isLocked
                    ? "🔒"
                    : isDone
                    ? "Terminé"
                    : "En cours";

                  const inner = (
                    <>
                      <span
                        className={`absolute top-4 right-5 ${
                          isLocked
                            ? "text-sm md:text-base inline-block"
                            : "uppercase tracking-wider text-[8px] md:text-[10px]"
                        }`}
                        style={{
                          color: "#615326",
                          transform: isLocked ? "rotate(-15deg)" : undefined,
                        }}
                      >
                        {statusLabel}
                      </span>
                      <div className="flex items-center gap-3">
                        <span
                          className="relative flex-shrink-0 w-11 h-11 flex items-center justify-center"
                          style={{
                            transform: "rotate(-10deg)",
                            color: isDone ? "#615326" : "#f4efc2",
                          }}
                        >
                          <svg
                            viewBox="0 0 100 100"
                            width="44"
                            height="44"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="14"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          >
                            <path d="M50 8 L62 38 L94 40 L69 60 L78 92 L50 74 L22 92 L31 60 L6 40 L38 38 Z" />
                          </svg>
                          <span
                            className="absolute inset-0 flex items-center justify-center font-black text-xs leading-none"
                            style={{ color: isDone ? "#ffffff" : "#615326" }}
                          >
                            {String(m.order).padStart(2, "0")}
                          </span>
                        </span>
                        <span
                          className="font-black uppercase tracking-tight text-sm md:text-base leading-tight"
                          style={{ color: "#615326" }}
                        >
                          {m.title}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-[var(--muted)] leading-snug">
                        {m.tagline}
                      </p>
                    </>
                  );

                  return isLocked ? (
                    <div key={m.slug} className={cardClass} style={cardStyle} aria-disabled>
                      {inner}
                    </div>
                  ) : (
                    <Link
                      key={m.slug}
                      href={`/dashboard/${m.slug}`}
                      className={cardClass}
                      style={cardStyle}
                    >
                      {inner}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {profile?.finished_at && (
        <div className="card mt-14 bg-[var(--accent)] border-[var(--brand)]/20">
          <h2 className="text-2xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
            Le parcours est fini, et après ?
          </h2>
          <p className="text-[var(--muted)] mt-2">
            Maintenant tu démarches. Le tracker t'aide à suivre chaque marque contactée.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/tracker" className="btn btn-primary">
              Ouvrir le tracker démarchage →
            </Link>
            <Link href="/boutique" className="btn btn-ghost" style={{ color: "#615326" }}>
              Voir les templates portfolio
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
