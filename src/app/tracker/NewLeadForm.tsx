"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

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

type FormState = {
  brand_name: string;
  sector: string;
  link: string;
  contact: string;
  why: string;
  content_idea: string;
  source: string;
  status: string;
};

const INIT: FormState = {
  brand_name: "",
  sector: "",
  link: "",
  contact: "",
  why: "",
  content_idea: "",
  source: "",
  status: "a_contacter",
};

export function NewLeadForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INIT);
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

  const router = useRouter();
  const [limitReached, setLimitReached] = useState(false);

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
    startTransition(async () => {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.error === "LIMIT_REACHED") {
          setLimitReached(true);
          return;
        }
        setError(json.error ?? "Erreur");
        return;
      }
      setForm(INIT);
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="uppercase tracking-wider text-xs md:text-sm font-black px-4 py-2 rounded-full hover:scale-105 transition-transform"
        style={{ backgroundColor: OLIVE, color: "#ffffff" }}
      >
        + Ajouter une marque
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
            className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="uppercase tracking-tight font-black text-lg md:text-xl" style={{ color: OLIVE }}>
                  {limitReached ? "Limite atteinte" : "Ajouter une marque"}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setLimitReached(false);
                }}
                aria-label="Fermer"
                className="rounded-full w-9 h-9 flex items-center justify-center text-lg"
                style={{ backgroundColor: CREAM, color: OLIVE }}
              >
                ✕
              </button>
            </div>

            {limitReached ? (
              <div className="mt-6 space-y-4">
                <div className="text-4xl text-center">🔒</div>
                <p className="text-base md:text-lg leading-relaxed text-center" style={{ color: OLIVE }}>
                  Tu as atteint la <strong>limite gratuite de 10 marques</strong>.
                  Passe à <strong>Tracker Pro</strong> pour suivre un nombre
                  illimité de marques.
                </p>
                <Link
                  href="/template"
                  className="block w-full text-center uppercase tracking-wider text-xs md:text-sm font-black px-4 py-3 rounded-full hover:scale-[1.02] transition-transform"
                  style={{ backgroundColor: OLIVE, color: "#ffffff" }}
                >
                  Débloquer Tracker Pro →
                </Link>
              </div>
            ) : (
            <div className="mt-6 space-y-3">
              <div>
                <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>
                  Nom de la marque *
                </label>
                <input
                  type="text"
                  value={form.brand_name}
                  onChange={(e) => setForm({ ...form, brand_name: e.target.value })}
                  placeholder="Ex : Cerave"
                  className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
                  style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
                />
              </div>
              <div>
                <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>
                  Secteur *
                </label>
                <select
                  value={form.sector}
                  onChange={(e) => setForm({ ...form, sector: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
                  style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
                >
                  <option value="" disabled>— Choisir —</option>
                  {SECTORS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>
                  Source
                </label>
                <select
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
                  style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
                >
                  <option value="">— Choisir —</option>
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              {[
                { k: "link" as const, label: "Site / réseau", placeholder: "https://…" },
                { k: "contact" as const, label: "Contact", placeholder: "contact@marque.com ou @marque" },
                { k: "why" as const, label: "Pourquoi elle m'intéresse", placeholder: "Ex : marque que j'utilise déjà" },
                { k: "content_idea" as const, label: "Idée de contenu", placeholder: "Ex : problème peau grasse → solution" },
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
                <label className="block uppercase tracking-wider text-[10px] md:text-xs font-bold mb-2" style={{ color: OLIVE }}>
                  Statut
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-4 py-3 rounded-full text-base bg-white outline-none"
                  style={{ border: `1.5px solid ${CREAM}`, color: OLIVE }}
                >
                  {STATUSES.map((s) => (
                    <option key={s.v} value={s.v}>{s.l}</option>
                  ))}
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
                {pending ? "Enregistrement…" : "Ajouter au Tracker"}
              </button>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
