"use client";

import { useRef } from "react";

export function BadgeCanvas({
  name,
  finishedDate,
}: {
  name: string;
  finishedDate: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  const downloadPng = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#fdfaf4";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // centre le SVG carré 1080x1080 au milieu de 1080x1920
      const dy = (canvas.height - 1080) / 2;
      ctx.drawImage(img, 0, dy, 1080, 1080);
      canvas.toBlob((b) => {
        if (!b) return;
        const dl = document.createElement("a");
        dl.download = `edithappp-badge-${name}.png`;
        dl.href = URL.createObjectURL(b);
        dl.click();
      }, "image/png");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const share = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "J'ai fini le parcours UGC edithappp",
          text: `Je viens de finir les 13 modules UGC — allez y c'est gratuit.`,
          url: window.location.origin,
        });
      } catch {
        /* user cancel */
      }
    } else {
      await navigator.clipboard.writeText(window.location.origin);
      alert("Lien copié !");
    }
  };

  return (
    <div>
      <div className="inline-block rounded-2xl overflow-hidden shadow-2xl">
        <svg
          ref={svgRef}
          viewBox="0 0 1080 1080"
          xmlns="http://www.w3.org/2000/svg"
          width="360"
          height="360"
        >
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff5b78" />
              <stop offset="1" stopColor="#7f5af0" />
            </linearGradient>
          </defs>
          <rect width="1080" height="1080" fill="url(#bg)" />
          <circle cx="540" cy="380" r="220" fill="rgba(255,255,255,0.15)" />
          <text
            x="540"
            y="410"
            textAnchor="middle"
            fontSize="200"
            fontWeight="900"
            fill="white"
            fontFamily="Arial, sans-serif"
          >
            🏆
          </text>
          <text
            x="540"
            y="710"
            textAnchor="middle"
            fontSize="60"
            fontWeight="800"
            fill="white"
            fontFamily="Arial, sans-serif"
          >
            UGC STARTER
          </text>
          <text
            x="540"
            y="790"
            textAnchor="middle"
            fontSize="42"
            fontWeight="500"
            fill="rgba(255,255,255,0.9)"
            fontFamily="Arial, sans-serif"
          >
            Parcours complet — 13/13
          </text>
          <text
            x="540"
            y="890"
            textAnchor="middle"
            fontSize="72"
            fontWeight="900"
            fill="white"
            fontFamily="Arial, sans-serif"
          >
            {name}
          </text>
          <text
            x="540"
            y="950"
            textAnchor="middle"
            fontSize="30"
            fill="rgba(255,255,255,0.85)"
            fontFamily="Arial, sans-serif"
          >
            {finishedDate}
          </text>
          <text
            x="540"
            y="1020"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="white"
            fontFamily="Arial, sans-serif"
          >
            edithappp.com
          </text>
        </svg>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={downloadPng} className="btn btn-primary">
          📥 Télécharger (story)
        </button>
        <button onClick={share} className="btn btn-ghost">
          Partager
        </button>
      </div>
    </div>
  );
}
