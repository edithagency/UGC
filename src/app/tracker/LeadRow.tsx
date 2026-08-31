"use client";

import { useTransition } from "react";
import { deleteLead, updateLeadStatus } from "./actions";

type Lead = {
  id: string;
  brand_name: string;
  contact: string | null;
  status: string;
  notes: string | null;
  sent_at: string | null;
  responded_at: string | null;
  updated_at: string;
};

const STATUSES = [
  { v: "a_contacter", l: "À contacter" },
  { v: "envoye", l: "Envoyé" },
  { v: "repondu", l: "Répondu" },
  { v: "collab_signee", l: "Signée" },
  { v: "sans_suite", l: "Sans suite" },
];

const STATUS_COLOR: Record<string, string> = {
  a_contacter: "bg-gray-100 text-gray-700",
  envoye: "bg-blue-50 text-blue-700",
  repondu: "bg-amber-50 text-amber-700",
  collab_signee: "bg-green-50 text-green-700",
  sans_suite: "bg-red-50 text-red-700",
};

export function LeadRow({ lead }: { lead: Lead }) {
  const [pending, startTransition] = useTransition();

  return (
    <li className="card flex flex-wrap items-center gap-3">
      <div className="flex-1 min-w-[180px]">
        <div className="font-bold">{lead.brand_name}</div>
        {lead.contact && (
          <div className="text-xs text-[var(--muted)]">{lead.contact}</div>
        )}
        {lead.notes && (
          <div className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{lead.notes}</div>
        )}
      </div>

      <span
        className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLOR[lead.status]}`}
      >
        {STATUSES.find((s) => s.v === lead.status)?.l ?? lead.status}
      </span>

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
        className="px-2 py-1 text-sm border border-[var(--border)] rounded-lg bg-white"
      >
        {STATUSES.map((s) => (
          <option key={s.v} value={s.v}>
            {s.l}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          if (!confirm(`Supprimer "${lead.brand_name}" ?`)) return;
          const fd = new FormData();
          fd.set("id", lead.id);
          startTransition(async () => {
            await deleteLead(fd);
          });
        }}
        disabled={pending}
        className="text-xs text-red-600 hover:underline"
      >
        Supprimer
      </button>
    </li>
  );
}
