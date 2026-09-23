"use client";

import { useEffect, useState } from "react";

const FULL_TEXT = "Deviens créatrice UGC";

export function HeroTitle() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= FULL_TEXT.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), 60);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <h1
      className="font-black uppercase tracking-tight leading-none whitespace-nowrap"
      style={{ color: "#615326", fontSize: "clamp(1.5rem, 5vw, 6rem)" }}
    >
      {FULL_TEXT.slice(0, shown).split("").map((ch, i) =>
        ch === " " ? (
          <span key={i}>{" "}</span>
        ) : (
          <span
            key={i}
            className="transition-colors duration-150 hover:text-[#f4efc2]"
          >
            {ch}
          </span>
        )
      )}
    </h1>
  );
}
