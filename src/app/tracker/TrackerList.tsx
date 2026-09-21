"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LeadRow } from "./LeadRow";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

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

function FilterHeader({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { v: string; l: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const active = !!value;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        !btnRef.current?.contains(t) &&
        !menuRef.current?.contains(t)
      ) {
        setOpen(false);
      }
    };
    const onScroll = () => setOpen(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left });
    }
    setOpen((o) => !o);
  };

  return (
    <div className="inline-flex items-center gap-1">
      <span>{label}</span>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-label={`Filtrer ${label}`}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full"
        style={{
          color: active ? "#ffffff" : OLIVE,
          backgroundColor: active ? OLIVE : "transparent",
        }}
      >
        <svg viewBox="0 0 10 6" width="8" height="6" fill="none">
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && pos && (
        <div
          ref={menuRef}
          className="fixed z-50 min-w-[180px] rounded-xl bg-white shadow-lg overflow-hidden"
          style={{
            top: pos.top,
            left: pos.left,
            border: `1.5px solid ${CREAM}`,
          }}
        >
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wider font-black hover:bg-[#faf7e0] ${
              !value ? "bg-[#faf7e0]" : ""
            }`}
            style={{ color: OLIVE }}
          >
            Tous
          </button>
          {options.map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => {
                onChange(o.v);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wider font-black hover:bg-[#faf7e0] ${
                value === o.v ? "bg-[#faf7e0]" : ""
              }`}
              style={{ color: OLIVE }}
            >
              {o.l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TrackerList({ leads }: { leads: Lead[] }) {
  const [status, setStatus] = useState("");
  const [sector, setSector] = useState("");

  const sectorOptions = useMemo(() => {
    const set = new Set<string>();
    for (const l of leads) {
      if (l.sector) set.add(l.sector);
    }
    return Array.from(set)
      .sort()
      .map((s) => ({ v: s, l: s }));
  }, [leads]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (status && l.status !== status) return false;
      if (sector && l.sector !== sector) return false;
      return true;
    });
  }, [leads, status, sector]);

  return (
    <div className="mt-4 overflow-x-auto rounded-2xl" style={{ backgroundColor: "#faf7e0" }}>
      <table className="w-full text-sm min-w-[900px]">
        <thead>
          <tr
            className="uppercase tracking-wider text-[10px] md:text-xs font-black text-left"
            style={{ color: OLIVE, borderBottom: `1.5px solid ${CREAM}` }}
          >
            <th className="px-4 py-3">Marque</th>
            <th className="px-4 py-3">
              <FilterHeader
                label="Secteur"
                options={sectorOptions}
                value={sector}
                onChange={setSector}
              />
            </th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Lien</th>
            <th className="px-4 py-3">Pourquoi</th>
            <th className="px-4 py-3">Idée de contenu</th>
            <th className="px-4 py-3">
              <FilterHeader
                label="Statut"
                options={STATUSES}
                value={status}
                onChange={setStatus}
              />
            </th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="px-4 py-8 text-center"
                style={{ color: OLIVE, opacity: 0.7 }}
              >
                Aucune marque ne correspond à ces filtres.
              </td>
            </tr>
          ) : (
            filtered.map((l) => <LeadRow key={l.id} lead={l} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
