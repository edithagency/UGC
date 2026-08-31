import Link from "next/link";
import { requireUser, getProgress } from "@/lib/dal";
import { MODULES, MODULE_COUNT } from "@/lib/modules";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const user = await requireUser();
  const progress = await getProgress();

  const completedSlugs = new Set(
    progress.filter((p) => p.completed_at).map((p) => p.module_slug)
  );
  const completedCount = completedSlugs.size;
  const pct = Math.round((completedCount / MODULE_COUNT) * 100);

  const supabase = await createSupabaseServerClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("finished_at")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black">Ton parcours</h1>
          <p className="text-[var(--muted)] mt-1">
            {completedCount} / {MODULE_COUNT} modules terminés
          </p>
        </div>
        {profile?.finished_at && (
          <Link href="/badge" className="btn btn-primary">
            🏆 Voir mon badge
          </Link>
        )}
      </div>

      <div className="progress mt-4">
        <span style={{ width: `${pct}%` }} />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-10">
        {MODULES.map((m) => {
          const previousDone =
            m.order === 1 ||
            completedSlugs.has(MODULES.find((x) => x.order === m.order - 1)!.slug);
          const isDone = completedSlugs.has(m.slug);
          const isLocked = !previousDone;

          const cardClass = `card flex items-start gap-4 transition ${
            isLocked
              ? "opacity-55 cursor-not-allowed"
              : "hover:border-[var(--brand)] hover:shadow-md"
          }`;
          const Wrapper = isLocked
            ? ({ children }: { children: React.ReactNode }) => (
                <div className={cardClass} aria-disabled>
                  {children}
                </div>
              )
            : ({ children }: { children: React.ReactNode }) => (
                <Link href={`/dashboard/${m.slug}`} className={cardClass}>
                  {children}
                </Link>
              );

          return (
            <Wrapper key={m.slug}>
              <span
                className={`flex-shrink-0 w-11 h-11 rounded-full font-bold flex items-center justify-center ${
                  isDone
                    ? "bg-[var(--brand)] text-white"
                    : isLocked
                    ? "bg-[var(--border)] text-[var(--muted)]"
                    : "bg-[var(--brand)]/10 text-[var(--brand-ink)]"
                }`}
              >
                {isDone ? "✓" : isLocked ? "🔒" : String(m.order).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold">{m.title}</span>
                  {isDone && (
                    <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      Terminé
                    </span>
                  )}
                </div>
                <div className="text-sm text-[var(--muted)] mt-0.5">{m.tagline}</div>
              </div>
            </Wrapper>
          );
        })}
      </div>

      {profile?.finished_at && (
        <div className="card mt-10 bg-gradient-to-br from-[var(--brand)]/10 to-[var(--accent)]/10 border-[var(--brand)]/20">
          <h2 className="text-2xl font-black">Le parcours est fini — et après ?</h2>
          <p className="text-[var(--muted)] mt-2">
            Maintenant tu démarches. Le tracker t'aide à suivre chaque marque contactée.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/tracker" className="btn btn-primary">
              Ouvrir le tracker démarchage →
            </Link>
            <Link href="/template" className="btn btn-ghost">
              🎁 Ma réduction sur le template
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
