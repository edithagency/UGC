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
      className="font-black uppercase tracking-tight leading-none whitespace-nowrap text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
      style={{ color: "#615326" }}
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
