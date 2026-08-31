"use client";

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
  const [optimistic, setOptimistic] = useState(checked);
  const [pending, startTransition] = useTransition();

  return (
    <li>
      <label
        className={`card flex items-center gap-3 cursor-pointer select-none ${
          disabled ? "opacity-70 cursor-default" : "hover:border-[var(--brand)]"
        }`}
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
            });
          }}
          className="w-5 h-5 accent-[var(--brand)]"
        />
        <span className={optimistic ? "line-through text-[var(--muted)]" : ""}>
          {label}
        </span>
      </label>
    </li>
  );
}
