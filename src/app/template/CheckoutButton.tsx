"use client";

import { useState } from "react";

export function CheckoutButton({ hasDiscount }: { hasDiscount: boolean }) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      className="btn btn-primary w-full"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/stripe/checkout", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ discount: hasDiscount }),
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
      }}
    >
      {loading ? "Redirection…" : hasDiscount ? "Payer 29 €" : "Payer 49 €"}
    </button>
  );
}
