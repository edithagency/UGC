"use client";

import { useEffect, useState, type ReactNode } from "react";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

export function WorkbookSection({
  title,
  subtitle,
  editHref,
  editLabel,
  children,
}: {
  title: string;
  subtitle?: string;
  editHref?: string;
  editLabel?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 w-full rounded-2xl p-5 md:p-6 text-left flex items-center justify-between gap-4 hover:scale-[1.01] transition-transform"
        style={{ backgroundColor: "#faf7e0" }}
      >
        <div>
          <div
            className="uppercase tracking-tight font-black text-base md:text-lg"
            style={{ color: OLIVE }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              className="mt-1 uppercase tracking-wider text-[10px] md:text-xs"
              style={{ color: OLIVE, opacity: 0.7 }}
            >
              {subtitle}
            </div>
          )}
        </div>
        <span
          className="uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full"
          style={{ backgroundColor: OLIVE, color: "#fff" }}
        >
          Ouvrir →
        </span>
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
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className="uppercase tracking-tight font-black text-lg md:text-xl"
                  style={{ color: OLIVE }}
                >
                  {title}
                </div>
                {subtitle && (
                  <div
                    className="mt-1 uppercase tracking-wider text-[10px] md:text-xs"
                    style={{ color: OLIVE, opacity: 0.7 }}
                  >
                    {subtitle}
                  </div>
                )}
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

            <div className="mt-6">{children}</div>

            {editHref && (
              <div className="mt-6 flex justify-end">
                <a
                  href={editHref}
                  className="uppercase tracking-wider text-[10px] md:text-xs font-black px-4 py-2 rounded-full"
                  style={{ backgroundColor: OLIVE, color: "#fff" }}
                >
                  {editLabel ?? "Éditer →"}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
