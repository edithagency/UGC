import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/dal";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MODULES, getModule, getNextModule } from "@/lib/modules";
import { ChecklistItem } from "./ChecklistItem";
import { completeModule } from "./actions";

type Params = Promise<{ slug: string }>;

export default async function ModulePage({ params }: { params: Params }) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const user = await requireUser();
  const supabase = await createSupabaseServerClient();

  // vérifier déblocage
  if (mod.order > 1) {
    const previous = MODULES.find((m) => m.order === mod.order - 1)!;
    const { data: prev } = await supabase
      .from("module_progress")
      .select("completed_at")
      .eq("user_id", user.id)
      .eq("module_slug", previous.slug)
      .maybeSingle();
    if (!prev?.completed_at) {
      redirect("/dashboard");
    }
  }

  const { data: progress } = await supabase
    .from("module_progress")
    .select("checked_items, completed_at")
    .eq("user_id", user.id)
    .eq("module_slug", slug)
    .maybeSingle();

  const checked = new Set<string>(progress?.checked_items ?? []);
  const isCompleted = !!progress?.completed_at;
  const allChecked = mod.checklist.every((c) => checked.has(c.id));
  const next = getNextModule(slug);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <Link href="/dashboard" className="text-sm text-[var(--muted)] hover:underline">
        ← Retour au dashboard
      </Link>

      <div className="mt-6">
        <span className="pill">
          Module {String(mod.order).padStart(2, "0")} / {MODULES.length}
        </span>
        <h1 className="text-3xl md:text-4xl font-black mt-3">{mod.title}</h1>
        <p className="text-lg text-[var(--muted)] mt-1">{mod.tagline}</p>
      </div>

      <div className="card mt-6">
        <p className="leading-relaxed">{mod.intro}</p>
      </div>

      <h2 className="text-xl font-bold mt-10">Ta checklist</h2>
      <p className="text-sm text-[var(--muted)]">
        Coche au fur et à mesure. Quand tout est coché, tu peux valider le module.
      </p>
      <ul className="mt-4 space-y-2">
        {mod.checklist.map((item) => (
          <ChecklistItem
            key={item.id}
            slug={slug}
            itemId={item.id}
            label={item.label}
            checked={checked.has(item.id)}
            disabled={isCompleted}
          />
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {isCompleted ? (
          <>
            <span className="pill" style={{ background: "rgba(16,185,129,0.1)", color: "#065f46" }}>
              ✓ Module validé
            </span>
            {next ? (
              <Link href={`/dashboard/${next.slug}`} className="btn btn-primary">
                Passer au module {next.order} →
              </Link>
            ) : (
              <Link href="/badge" className="btn btn-primary">
                🏆 Voir mon badge
              </Link>
            )}
          </>
        ) : (
          <form action={completeModule}>
            <input type="hidden" name="slug" value={slug} />
            <button
              type="submit"
              disabled={!allChecked}
              className="btn btn-primary"
              title={allChecked ? "" : "Coche tous les items d'abord"}
            >
              Marquer comme terminé
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
