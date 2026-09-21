"use client";

import { useEffect, useState, useTransition } from "react";
import { updateLead } from "./actions";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

const SECTORS = [
  "Skincare",
  "Make-up",
  "Cheveux",
  "Mode",
  "Food",
  "Boisson",
  "Sport",
  "Maison",
  "Applis / Tech",
  "Voyage",
  "Animaux",
  "Bien-être",
  "Autre",
];

const SOURCES = [
  "Marques connues",
  "TikTok / Instagram",
  "Publicités repérées",
  "Meta Ad Library",
  "Recherche par univers",
  "Gifting",
  "Autre",
];

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
};

export function EditLeadButton({ lead }: { lead: Lead }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    brand_name: lead.brand_name ?? "",
    sector: lead.sector ?? "",
    source: lead.source ?? "",
    link: lead.link ?? "",
    contact: lead.contact ?? "",
    why: lead.why ?? "",
    content_idea: lead.content_idea ?? "",
    status: lead.status,
  });
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const submit = () => {
    if (!form.brand_name.trim()) {
      setError("Le nom est obligatoire.");
      return;
    }
    if (!form.sector) {
      setError("Le secteur est obligatoire.");
      return;
    }
    setError(null);
    const fd = new FormData();
    fd.set("id", lead.id);
    Object.entries(form).forEach(([k, v]) => fd.set(k, v));
    startTransition(async () => {
      await updateLead(fd);
      setOpen(false);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Modifier ${lead.brand_name}`}
        className="w-4 h-4 inline-flex items-center justify-center hover:opacity-70 transition-opacity"
        style={{ color: OLIVE }}
        title="Modifier"
      >
        <svg viewBox="0 0 20 20" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2l4 4-10 10H4v-4L14 2z" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8 bg-white shadow-2xl text-left"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="uppercase tracking-tight font-black text-lg md:text-xl" style={{ color: OLIVE }}>
                Modifier la marque
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="rounded-full w-9 h-9 flex items-center justify-center text-lg"
                style={{ backgroundColor: CREAM, color: OLIVE }}
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <div>
                <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>Nom de la marque *</label>
                <input
                  type="text"
                  value={form.brand_name}
                  onChange={(e) => setForm({ ...form, brand_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
                  style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
                />
              </div>
              <div>
                <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>Secteur *</label>
                <select
                  value={form.sector}
                  onChange={(e) => setForm({ ...form, sector: e.target.value })}
                  className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
                  style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
                >
                  <option value="" disabled>— Choisir —</option>
                  {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>Source</label>
                <select
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
                  style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
                >
                  <option value="">— Choisir —</option>
                  {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {[
                { k: "link" as const, label: "Site / réseau", placeholder: "https://…" },
                { k: "contact" as const, label: "Contact", placeholder: "contact@marque.com ou @marque" },
              ].map((f) => (
                <div key={f.k}>
                  <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>
                    {f.label}
                  </label>
                  <input
                    type="text"
                    value={form[f.k]}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
                    style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
                  />
                </div>
              ))}
              <div>
                <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>Statut</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
                  style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
                >
                  {STATUSES.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
                </select>
              </div>

              {error && <p className="text-sm text-red-700">{error}</p>}

              <button
                type="button"
                onClick={submit}
                disabled={pending}
                className="mt-4 w-full uppercase tracking-wider text-xs md:text-sm font-black px-4 py-3 rounded-full disabled:opacity-60"
                style={{ backgroundColor: OLIVE, color: "#ffffff" }}
              >
                {pending ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
