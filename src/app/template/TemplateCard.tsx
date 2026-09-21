"use client";

import { useState } from "react";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

type Template = {
  slug: string;
  name: string;
  desc: string;
  price: number;
  image?: string;
};

export function TemplateCard({
  template,
  stripeReady,
}: {
  template: Template;
  stripeReady: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const buy = async () => {
    if (!stripeReady) {
      alert("Le paiement sera activé bientôt.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ template: template.slug }),
      });
      const { url, error } = await res.json();
      if (error) {
        alert(error);
        setLoading(false);
        return;
      }
      window.location.href = url;
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ backgroundColor: "#faf7e0" }}
    >
      <div
        className="aspect-[4/3] flex items-center justify-center"
        style={{ backgroundColor: CREAM }}
      >
        {template.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={template.image} alt={template.name} className="w-full h-full object-cover" />
        ) : (
          <span
            className="uppercase tracking-wider text-[10px] md:text-xs font-bold"
            style={{ color: OLIVE, opacity: 0.6 }}
          >
            Aperçu à venir
          </span>
        )}
      </div>
      <div className="p-3 md:p-4 flex flex-col flex-1">
        <div
          className="font-black uppercase tracking-tight text-sm md:text-base leading-tight"
          style={{ color: OLIVE }}
        >
          {template.name}
        </div>
        <p className="mt-1 text-xs md:text-sm leading-snug flex-1" style={{ color: OLIVE }}>
          {template.desc}
        </p>
        <div className="mt-2">
          <span className="font-black text-lg md:text-xl" style={{ color: OLIVE }}>
            {template.price.toFixed(2).replace(".", ",")} €
          </span>
        </div>
        <button
          type="button"
          onClick={buy}
          disabled={loading}
          className="mt-3 uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full hover:scale-105 transition-transform disabled:opacity-60"
          style={{ backgroundColor: OLIVE, color: "#ffffff" }}
        >
          {loading ? "Redirection…" : "Acheter"}
        </button>
      </div>
    </div>
  );
}
