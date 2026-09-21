import { requireUser } from "@/lib/dal";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NewLeadForm } from "./NewLeadForm";
import { TrackerList } from "./TrackerList";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

const DAILY_GOAL = 10;

const STATUS_LABELS: Record<string, string> = {
  a_contacter: "À contacter",
  envoye: "Contactée",
  a_relancer: "À relancer",
  relancee: "Relancée",
  en_discussion: "En discussion",
  collab_signee: "Collaboration en cours",
  terminee: "Terminée",
  sans_suite: "Refus",
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  a_contacter: { bg: "#f0e59b", color: "#6f5f1f" },
  envoye: { bg: "#e5eefc", color: "#4c6b9c" },
  a_relancer: { bg: "#fde3c8", color: "#b86b2c" },
  relancee: { bg: "#d5e8e8", color: "#4d7a7a" },
  en_discussion: { bg: "#ece0f5", color: "#7a5aa1" },
  collab_signee: { bg: "#dff0dd", color: "#4f7d55" },
  terminee: { bg: "#e2ebe2", color: "#556d55" },
  sans_suite: { bg: "#fadada", color: "#a56b6b" },
};

export const dynamic = "force-dynamic";

export default async function TrackerPage() {
  const user = await requireUser();
  const supabase = await createSupabaseServerClient();

  const { data: leads } = await supabase
    .from("leads")
    .select(
      "id, brand_name, contact, sector, link, why, content_idea, source, status, notes, sent_at, responded_at, updated_at"
    )
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
          Tracker démarchage
        </h1>
        <div className="hidden sm:flex items-center gap-2 ml-auto">
          {[
            { rot: -5, src: "/vibe/vibe8.jpeg" },
            { rot: 4, src: "/vibe/vibe7.jpeg" },
            { rot: -6, src: "/vibe/vibe5.jpeg" },
            { rot: 5, src: "/vibe/vibe2.jpeg" },
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
        Ta liste de marques à contacter, avec leur statut, tes idées et ton
        rappel de relance.
      </p>

      {/* Objectif du jour */}
      <div
        className="mt-8 rounded-2xl p-5 md:p-6 relative"
        style={{ backgroundColor: CREAM }}
      >
        <div className="absolute top-4 right-4 md:top-5 md:right-5">
          <NewLeadForm />
        </div>
        <div
          className="uppercase tracking-wider text-[10px] md:text-xs font-black pr-40"
          style={{ color: OLIVE }}
        >
          Objectif aujourd'hui
        </div>
        <div
          className="text-xl md:text-2xl font-black mt-1 uppercase tracking-tight pr-40"
          style={{ color: OLIVE }}
        >
          {remaining === 0
            ? "🎉 Objectif atteint — bravo."
            : `Démarche encore ${remaining} marque${remaining > 1 ? "s" : ""} aujourd'hui.`}
        </div>
        <div className="mt-3 h-2 rounded-full overflow-hidden bg-white">
          <span
            className="block h-full rounded-full transition-all"
            style={{
              width: `${Math.min(100, (sentToday / DAILY_GOAL) * 100)}%`,
              backgroundColor: OLIVE,
            }}
          />
        </div>
        <div
          className="text-xs mt-2 uppercase tracking-wider"
          style={{ color: OLIVE, opacity: 0.8 }}
        >
          {sentToday} / {DAILY_GOAL} envoyées aujourd'hui
        </div>
      </div>

      {/* Statuts */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {Object.entries(STATUS_LABELS).map(([k, label]) => {
          const c = STATUS_COLORS[k];
          return (
            <div
              key={k}
              className="rounded-xl px-2 py-3 text-center"
              style={{ backgroundColor: c.bg }}
            >
              <div
                className="uppercase tracking-wider text-[9px] font-black leading-tight"
                style={{ color: c.color }}
              >
                {label}
              </div>
              <div className="text-xl font-black mt-1" style={{ color: c.color }}>
                {byStatus[k] ?? 0}
              </div>
            </div>
          );
        })}
      </div>

      <hr className="my-10 border-[var(--border)]" />

      <h2
        className="text-xl md:text-2xl font-black uppercase tracking-tight"
        style={{ color: OLIVE }}
      >
        Toutes tes marques
      </h2>
      {rows.length === 0 ? (
        <div
          className="mt-4 rounded-2xl p-6 text-center"
          style={{ backgroundColor: CREAM, color: OLIVE }}
        >
          Aucune marque pour l'instant. Ajoutes-en une au-dessus.
        </div>
      ) : (
        <TrackerList leads={rows} />
      )}
    </div>
  );
}
