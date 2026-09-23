"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  const linkStyle = { color: "#615326" };
  const linkClass = "uppercase tracking-wider text-xs md:text-sm hover:opacity-80";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white h-14 flex items-center">
      <div className="w-full pl-6 pr-4 md:pr-10 flex items-center justify-end">
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" style={linkStyle} className={linkClass}>Accueil</Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" style={linkStyle} className={linkClass}>Mon parcours</Link>
              <Link href="/tracker" style={linkStyle} className={linkClass}>Tracker</Link>
              <Link href="/boutique" style={linkStyle} className={linkClass}>Boutique</Link>
              <Link href="/profil" aria-label="Mon profil" style={linkStyle} className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </Link>
            </>
          ) : (
            <>
              <Link href="/boutique" style={linkStyle} className={linkClass}>Boutique</Link>
              <Link href="/signup" style={linkStyle} className={linkClass}>Inscription / Connexion</Link>
            </>
          )}
        </nav>

        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          className="md:hidden inline-flex items-center justify-center w-10 h-10"
          style={{ color: "#615326" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-white flex flex-col"
          onClick={() => setOpen(false)}
        >
          <div className="h-14 flex items-center justify-end pr-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="w-10 h-10 flex items-center justify-center text-2xl"
              style={{ color: "#615326" }}
            >
              ✕
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-8 text-lg">
            <Link href="/" style={linkStyle} className="uppercase tracking-wider font-black">Accueil</Link>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" style={linkStyle} className="uppercase tracking-wider font-black">Mon parcours</Link>
                <Link href="/tracker" style={linkStyle} className="uppercase tracking-wider font-black">Tracker</Link>
                <Link href="/boutique" style={linkStyle} className="uppercase tracking-wider font-black">Boutique</Link>
                <Link href="/profil" style={linkStyle} className="uppercase tracking-wider font-black">Mon profil</Link>
              </>
            ) : (
              <>
                <Link href="/boutique" style={linkStyle} className="uppercase tracking-wider font-black">Boutique</Link>
                <Link href="/signup" style={linkStyle} className="uppercase tracking-wider font-black">Inscription / Connexion</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
