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
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--muted)]">
            <span>© {new Date().getFullYear()} edithappp — fait avec ❤️ en France</span>
            <nav className="flex gap-4">
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
