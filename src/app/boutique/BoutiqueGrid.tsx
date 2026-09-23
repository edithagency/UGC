"use client";

import { useMemo, useState } from "react";

const OLIVE = "#615326";
const CREAM = "#f4efc2";

type Template = {
  slug: string;
  name: string;
  desc: string;
  price: number;
  image?: string;
};

export function BoutiqueGrid({
  templates,
  stripeReady,
}: {
  templates: Template[];
  stripeReady: boolean;
}) {
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const items = useMemo(
    () => templates.filter((t) => cart.has(t.slug)),
    [cart, templates]
  );
  const total = items.reduce((sum, t) => sum + t.price, 0);

  const toggle = (slug: string) => {
    setCart((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const checkout = async () => {
    if (!stripeReady) {
      alert("Le paiement sera activé bientôt.");
      return;
    }
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ templates: Array.from(cart) }),
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
    <>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-24">
        {templates.map((t) => {
          const inCart = cart.has(t.slug);
          return (
            <div
              key={t.slug}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: "#faf7e0" }}
            >
              <div
                className="aspect-[4/3] flex items-center justify-center"
                style={{ backgroundColor: CREAM }}
              >
                {t.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-contain"
                  />
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
                  {t.name}
                </div>
                <p
                  className="mt-1 text-xs md:text-sm leading-snug flex-1"
                  style={{ color: OLIVE }}
                >
                  {t.desc}
                </p>
                <div className="mt-2">
                  <span
                    className="font-black text-lg md:text-xl"
                    style={{ color: OLIVE }}
                  >
                    {t.price.toFixed(2).replace(".", ",")} €
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(t.slug)}
                  className="mt-3 uppercase tracking-wider text-[10px] md:text-xs font-black px-3 py-2 rounded-full hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: inCart ? "#fff" : OLIVE,
                    color: inCart ? OLIVE : "#ffffff",
                    border: inCart ? `1.5px solid ${OLIVE}` : "none",
                  }}
                >
                  {inCart ? "✓ Dans le panier" : "Ajouter au panier"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {items.length > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-30 border-t shadow-lg"
          style={{ backgroundColor: "#fff", borderColor: CREAM }}
        >
          <div className="max-w-7xl mx-auto px-3 md:px-6 py-2.5 md:py-4 flex items-center justify-between gap-2 md:gap-4">
            <div className="min-w-0 flex-shrink">
              <div
                className="uppercase tracking-wider text-[9px] md:text-xs font-black leading-tight"
                style={{ color: OLIVE, opacity: 0.7 }}
              >
                {items.length} article{items.length > 1 ? "s" : ""}
              </div>
              <div
                className="font-black text-lg md:text-2xl leading-tight"
                style={{ color: OLIVE }}
              >
                {total.toFixed(2).replace(".", ",")} €
              </div>
            </div>
            <button
              type="button"
              onClick={checkout}
              disabled={loading}
              className="uppercase tracking-wider text-xs md:text-sm font-black px-4 md:px-8 py-2.5 md:py-3 rounded-full hover:scale-105 transition-transform disabled:opacity-60 flex-shrink-0"
              style={{ backgroundColor: OLIVE, color: "#ffffff" }}
            >
              {loading ? "…" : "Payer →"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
