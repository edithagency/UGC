import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { getCurrentUser } from "@/lib/dal";
import { SiteHeader } from "@/components/SiteHeader";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "edithappp — devenir créatrice UGC, gratuit et étape par étape",
  description:
    "23 modules gratuits pour se lancer en UGC. Pas de blabla, la méthode utilisée par @edithappp.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html lang="fr" className={`${leagueSpartan.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader isLoggedIn={!!user} />
        <main className="flex-1 pt-14">{children}</main>
        <footer className="border-t border-[var(--border)] py-10 mt-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4 text-sm text-[var(--muted)]">
            <a
              href="https://www.instagram.com/edithap.ugc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @edithap.ugc"
              className="inline-flex items-center gap-2 hover:opacity-80"
              style={{ color: "#615326" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              <span className="uppercase tracking-wider text-xs font-black">@edithap.ugc</span>
            </a>
            <nav className="flex flex-wrap justify-center gap-4">
              <Link href="/confidentialite" className="hover:underline">
                Confidentialité
              </Link>
              <Link href="/mentions-legales" className="hover:underline">
                Mentions légales
              </Link>
              <Link href="/cgv" className="hover:underline">
                CGV
              </Link>
              {user && (
                <Link href="/compte" className="hover:underline">
                  Mon compte
                </Link>
              )}
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
