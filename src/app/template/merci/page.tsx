import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="max-w-xl mx-auto px-5 py-20 text-center">
      <div className="text-6xl">🎁</div>
      <h1 className="text-3xl font-black mt-4">Merci !</h1>
      <p className="text-[var(--muted)] mt-2">
        Ton achat est confirmé. Tu vas recevoir un email avec le lien de
        téléchargement (vérifie tes spams).
      </p>
      <Link href="/dashboard" className="btn btn-primary mt-8 inline-flex">
        Retour à mon parcours
      </Link>
    </div>
  );
}
