import Link from "next/link";

export function SiteHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  const linkStyle = { color: "#615326" };
  const linkClass = "uppercase tracking-wider text-xs md:text-sm hover:opacity-80";

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white h-14 flex items-center">
      <div className="w-full pl-6 pr-8 md:pr-10 flex items-center justify-end">
        <nav className="flex items-center gap-6">
          <Link href="/" style={linkStyle} className={linkClass}>
            Accueil
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" style={linkStyle} className={linkClass}>
                Mon parcours
              </Link>
              <Link href="/tracker" style={linkStyle} className={linkClass}>
                Tracker
              </Link>
              <Link href="/template" style={linkStyle} className={linkClass}>
                Boutique
              </Link>
              <Link href="/profil" aria-label="Mon profil" style={linkStyle} className="hover:opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </Link>
            </>
          ) : (
            <>
              <Link href="/template" style={linkStyle} className={linkClass}>
                Boutique
              </Link>
              <Link href="/signup" style={linkStyle} className={linkClass}>
                Inscription / Connexion
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
