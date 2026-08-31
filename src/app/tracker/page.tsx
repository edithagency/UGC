import Link from "next/link";
import { requireUser } from "@/lib/dal";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NewLeadForm } from "./NewLeadForm";
import { LeadRow } from "./LeadRow";

const DAILY_GOAL = 5;

const STATUS_LABELS: Record<string, string> = {
  a_contacter: "À contacter",
  envoye: "Envoyé",
  repondu: "Répondu",
  collab_signee: "Collab signée",
  sans_suite: "Sans suite",
};

export default async function TrackerPage() {
  const user = await requireUser();
  const supabase = await createSupabaseServerClient();

  const { data: leads } = await supabase
    .from("leads")
    .select("id, brand_name, contact, status, notes, sent_at, responded_at, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const rows = leads ?? [];
  const today = new Date().toISOString().slice(0, 10);
  const sentToday = rows.filter((l) => l.sent_at === today).length;
  const remaining = Math.max(0, DAILY_GOAL - sentToday);

  const byStatus = Object.keys(STATUS_LABELS).reduce(
    (acc, s) => ({ ...acc, [s]: rows.filter((l) => l.status === s).length }),
    {} as Record<string, number>
  );

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black">Tracker démarchage</h1>
          <p className="text-[var(--muted)] mt-1">
            Ta liste de marques à contacter, avec leur statut.
          </p>
        </div>
        <Link href="/dashboard" className="text-sm hover:underline">
          ← Dashboard
        </Link>
      </div>

      <div className="card mt-6 bg-gradient-to-br from-[var(--brand)]/10 to-[var(--accent)]/10 border-[var(--brand)]/20">
        <div className="text-sm text-[var(--muted)]">Objectif aujourd'hui</div>
        <div className="text-2xl font-black mt-1">
          {remaining === 0
            ? "🎉 Objectif atteint — bravo."
            : `Démarche encore ${remaining} marque${remaining > 1 ? "s" : ""} aujourd'hui.`}
        </div>
        <div className="progress mt-3">
          <span
            style={{
              width: `${Math.min(100, (sentToday / DAILY_GOAL) * 100)}%`,
            }}
          />
        </div>
        <div className="text-xs text-[var(--muted)] mt-1">
          {sentToday} / {DAILY_GOAL} envoyées aujourd'hui
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-2 mt-6">
        {Object.entries(STATUS_LABELS).map(([k, label]) => (
          <div key={k} className="card py-3 text-center">
            <div className="text-xs text-[var(--muted)] uppercase">{label}</div>
            <div className="text-2xl font-black">{byStatus[k] ?? 0}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-10">Ajouter une marque</h2>
      <div className="card mt-3">
        <NewLeadForm />
      </div>

      <h2 className="text-xl font-bold mt-10">Toutes tes marques</h2>
      {rows.length === 0 ? (
        <div className="card mt-3 text-[var(--muted)]">
          Aucune marque pour l'instant. Ajoutes-en une au-dessus.
        </div>
      ) : (
        <ul className="mt-3 space-y-2">
          {rows.map((l) => (
            <LeadRow key={l.id} lead={l} />
          ))}
        </ul>
      )}
    </div>
  );
}
