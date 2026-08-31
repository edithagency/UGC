import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { getCurrentUser } from "@/lib/dal";
import { SignOutButton } from "@/components/SignOutButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "edithappp — devenir créatrice UGC, gratuit et étape par étape",
  description:
    "13 modules gratuits pour se lancer en UGC. Pas de blabla, la méthode utilisée par @edithappp.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="inline-block w-7 h-7 rounded-full bg-[var(--brand)]" />
              edithappp
            </Link>
            <nav className="flex items-center gap-3 text-sm">
              {user ? (
                <>
                  <Link href="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                  <Link href="/tracker" className="hover:underline">
                    Tracker
                  </Link>
                  <Link href="/template" className="hover:underline">
                    Template
                  </Link>
                  <SignOutButton />
                </>
              ) : (
                <>
                  <Link href="/template" className="hover:underline">
                    Template
                  </Link>
                  <Link href="/login" className="btn btn-primary text-sm py-2 px-4">
                    Commencer gratuitement
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--border)] py-8 mt-16">
          <div className="max-w-6xl mx-auto px-5 flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--muted)]">
            <span>© {new Date().getFullYear()} edithappp — fait avec ❤️ en France</span>
            <nav className="flex gap-4">
              <Link href="/confidentialite" className="hover:underline">
                Confidentialité
              </Link>
              <Link href="/mentions-legales" className="hover:underline">
                Mentions légales
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
