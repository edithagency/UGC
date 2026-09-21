"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { completeModule, toggleChecklistItem } from "./actions";

type Item = { id: string; label: string };

export function Checklist({
  slug,
  items,
  initialChecked,
  isCompleted,
  nextSlug,
  nextOrder,
}: {
  slug: string;
  items: Item[];
  initialChecked: string[];
  isCompleted: boolean;
  nextSlug?: string;
  nextOrder?: number;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState<Set<string>>(new Set(initialChecked));
  const [pending, startTransition] = useTransition();
  const [completing, startCompleting] = useTransition();
  const [justCompleted, setJustCompleted] = useState(false);

  const allChecked = items.every((it) => checked.has(it.id));
  const done = isCompleted || justCompleted;

  const toggle = (id: string, next: boolean) => {
    if (done) return;
    const updated = new Set(checked);
    if (next) updated.add(id);
    else updated.delete(id);
    setChecked(updated);

    const fd = new FormData();
    fd.set("slug", slug);
    fd.set("itemId", id);
    fd.set("checked", next ? "true" : "false");
    startTransition(async () => {
      await toggleChecklistItem(fd);
    });
  };

  const onComplete = () => {
    if (!allChecked || done) return;
    const fd = new FormData();
    fd.set("slug", slug);
    startCompleting(async () => {
      await completeModule(fd);
      setJustCompleted(true);
      router.refresh();
    });
  };

  return (
    <>
      <ul className="mt-6 space-y-2">
        {items.map((item) => {
          const isOn = checked.has(item.id);
          return (
            <li key={item.id}>
              <label
                className={`card flex items-center gap-4 select-none ${
                  done
                    ? "opacity-70 cursor-default"
                    : "cursor-pointer hover:border-[var(--brand)]"
                }`}
                style={{ padding: "1.25rem 1.5rem" }}
              >
                <input
                  type="checkbox"
                  checked={isOn}
                  disabled={done || pending}
                  onChange={(e) => toggle(item.id, e.target.checked)}
                  className="w-6 h-6 flex-shrink-0"
                  style={{ accentColor: "#615326" }}
                />
                <span
                  className={`text-lg ${isOn ? "line-through opacity-60" : ""}`}
                  style={{ color: "#615326" }}
                >
                  {item.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {done ? (
          <>
            <span
              className="uppercase tracking-wider text-xs md:text-sm rounded-full px-8 py-4 inline-flex items-center gap-2"
              style={{ backgroundColor: "#f4efc2", color: "#615326" }}
            >
              ✓ Terminé
            </span>
            {nextSlug && (
              <Link
                href={`/dashboard/${nextSlug}`}
                className="uppercase tracking-wider text-xs md:text-sm rounded-full px-8 py-4 text-white transition-transform duration-200 ease-out hover:scale-105"
                style={{ backgroundColor: "#615326" }}
              >
                Passer au module {nextOrder} →
              </Link>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={onComplete}
            disabled={!allChecked || completing}
            className={`uppercase tracking-wider text-xs md:text-sm rounded-full px-8 py-4 transition-transform duration-200 ease-out ${
              !allChecked
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 cursor-pointer"
            }`}
            style={{ backgroundColor: "#f4efc2", color: "#615326" }}
            title={allChecked ? "" : "Coche tous les items d'abord"}
          >
            {completing ? "Validation…" : "Marquer comme terminé"}
          </button>
        )}
      </div>
    </>
  );
}
