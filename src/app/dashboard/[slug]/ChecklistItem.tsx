"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toggleChecklistItem } from "./actions";

export function ChecklistItem({
  slug,
  itemId,
  label,
  checked,
  disabled,
}: {
  slug: string;
  itemId: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [optimistic, setOptimistic] = useState(checked);
  const [pending, startTransition] = useTransition();

  return (
    <li>
      <label
        className={`card flex items-center gap-4 cursor-pointer select-none py-4 ${
          disabled ? "opacity-70 cursor-default" : "hover:border-[var(--brand)]"
        }`}
        style={{ padding: "1.25rem 1.5rem" }}
      >
        <input
          type="checkbox"
          checked={optimistic}
          disabled={disabled || pending}
          onChange={(e) => {
            const next = e.target.checked;
            setOptimistic(next);
            const fd = new FormData();
            fd.set("slug", slug);
            fd.set("itemId", itemId);
            fd.set("checked", next ? "true" : "false");
            startTransition(async () => {
              await toggleChecklistItem(fd);
              router.refresh();
            });
          }}
          className="w-6 h-6 flex-shrink-0"
          style={{ accentColor: "#615326" }}
        />
        <span
          className={`text-lg ${optimistic ? "line-through opacity-60" : ""}`}
          style={{ color: "#615326" }}
        >
          {label}
        </span>
      </label>
    </li>
  );
}
