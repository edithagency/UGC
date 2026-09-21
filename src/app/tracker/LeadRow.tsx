"use client";

import { useTransition } from "react";
import { deleteLead, updateLeadStatus } from "./actions";
import { timeAgoFr } from "@/lib/timeAgo";
import { EditLeadButton } from "./EditLeadButton";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

type Lead = {
  id: string;
  brand_name: string;
  contact: string | null;
  sector: string | null;
  link: string | null;
  why: string | null;
  content_idea: string | null;
  source: string | null;
  status: string;
  notes: string | null;
  sent_at: string | null;
  responded_at: string | null;
  updated_at: string;
};

const STATUSES = [
  { v: "a_contacter", l: "À contacter" },
  { v: "envoye", l: "Contactée" },
  { v: "a_relancer", l: "À relancer" },
  { v: "relancee", l: "Relancée" },
  { v: "en_discussion", l: "En discussion" },
  { v: "collab_signee", l: "Collaboration en cours" },
  { v: "terminee", l: "Terminée" },
  { v: "sans_suite", l: "Refus" },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  a_contacter: { bg: "#f0e59b", color: "#6f5f1f", border: "#6f5f1f" },
  envoye: { bg: "#e5eefc", color: "#4c6b9c", border: "#4c6b9c" },
  a_relancer: { bg: "#fde3c8", color: "#b86b2c", border: "#b86b2c" },
  relancee: { bg: "#d5e8e8", color: "#4d7a7a", border: "#4d7a7a" },
  en_discussion: { bg: "#ece0f5", color: "#7a5aa1", border: "#7a5aa1" },
  collab_signee: { bg: "#dff0dd", color: "#4f7d55", border: "#4f7d55" },
  terminee: { bg: "#e2ebe2", color: "#556d55", border: "#556d55" },
  sans_suite: { bg: "#fadada", color: "#a56b6b", border: "#a56b6b" },
};

const ROW_BG: Record<string, string> = {
  a_contacter: "#fbf7dd",
  envoye: "#f3f6fd",
  a_relancer: "#fcefe0",
  relancee: "#eaf4f4",
  en_discussion: "#f5efff",
  collab_signee: "#eff8ee",
  terminee: "#f1f5f1",
  sans_suite: "#fceeee",
};

export function LeadRow({ lead }: { lead: Lead }) {
  const [pending, startTransition] = useTransition();
  const s = STATUS_STYLE[lead.status] ?? STATUS_STYLE.a_contacter;
  const rowBg = ROW_BG[lead.status] ?? "transparent";

  return (
    <tr
      className="align-top"
      style={{ borderBottom: `1px solid ${CREAM}`, backgroundColor: rowBg }}
    >
      <td className="px-4 py-3">
        <span className="font-black" style={{ color: OLIVE }}>{lead.brand_name}</span>
      </td>
      <td className="px-4 py-3" style={{ color: OLIVE }}>
        {lead.sector || <span className="opacity-40">—</span>}
      </td>
      <td className="px-4 py-3">
        {lead.source ? (
          <span
            className="uppercase tracking-wider text-[9px] font-black px-2 py-1 rounded-full"
            style={{ backgroundColor: CREAM, color: OLIVE }}
          >
            {lead.source}
          </span>
        ) : (
          <span className="opacity-40" style={{ color: OLIVE }}>—</span>
        )}
      </td>
      <td className="px-4 py-3" style={{ color: OLIVE }}>
        {lead.contact || <span className="opacity-40">—</span>}
      </td>
      <td className="px-4 py-3">
        {lead.link ? (
          <a
            href={lead.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline break-all"
            style={{ color: OLIVE }}
          >
            {lead.link.length > 28 ? lead.link.slice(0, 28) + "…" : lead.link}
          </a>
        ) : (
          <span className="opacity-40" style={{ color: OLIVE }}>—</span>
        )}
      </td>
      <td className="px-4 py-3 italic" style={{ color: OLIVE }}>
        {lead.why || <span className="opacity-40 not-italic">—</span>}
      </td>
      <td className="px-4 py-3" style={{ color: OLIVE }}>
        {lead.content_idea || <span className="opacity-40">—</span>}
      </td>
      <td className="px-4 py-3">
        <select
          defaultValue={lead.status}
          disabled={pending}
          onChange={(e) => {
            const fd = new FormData();
            fd.set("id", lead.id);
            fd.set("status", e.target.value);
            startTransition(async () => {
              await updateLeadStatus(fd);
            });
          }}
          className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider outline-none appearance-none cursor-pointer text-center"
          style={{
            backgroundColor: s.bg,
            color: s.color,
            border: "none",
          }}
        >
          {STATUSES.map((st) => (
            <option key={st.v} value={st.v}>
              {st.l}
            </option>
          ))}
        </select>
        <div
          className="mt-1 text-[10px] md:text-xs text-center"
          style={{ color: OLIVE, opacity: 0.7 }}
          title={new Date(lead.updated_at).toLocaleString("fr-FR")}
        >
          Modifié {timeAgoFr(lead.updated_at)}
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="inline-flex items-center gap-2 pl-4" style={{ borderLeft: `1px solid ${CREAM}` }}>
          <EditLeadButton lead={lead} />
          <button
            type="button"
            onClick={() => {
              if (!confirm(`Supprimer "${lead.brand_name}" ?`)) return;
              const fd = new FormData();
              fd.set("id", lead.id);
              startTransition(async () => {
                await deleteLead(fd);
              });
            }}
            disabled={pending}
            aria-label={`Supprimer ${lead.brand_name}`}
            className="w-6 h-6 inline-flex items-center justify-center hover:opacity-70 transition-opacity"
            style={{ color: OLIVE }}
            title="Supprimer"
          >
            ✕
          </button>
        </div>
      </td>
    </tr>
  );
}
