import Link from "next/link";
import { SignUpForm } from "./SignUpForm";

type SP = Promise<{ redirect?: string }>;

export default async function SignUpPage({ searchParams }: { searchParams: SP }) {
  const { redirect } = await searchParams;

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <span className="pill">Inscription</span>
      <h1
        className="text-3xl md:text-4xl font-black mt-4 uppercase tracking-tight"
        style={{ color: "#615326" }}
      >
        Crée ton compte.
      </h1>
      <p className="text-[var(--muted)] mt-2">
        Apprends à te lancer dans l&apos;UGC gratuitement.
      </p>

      <div className="card mt-8">
        <SignUpForm redirectTo={redirect} />
      </div>

      <p className="text-sm text-[var(--muted)] mt-6 text-center">
        Déjà inscrite ?{" "}
        <Link href="/login" className="link">
          Connecte-toi
        </Link>
      </p>

      <p className="text-xs text-[var(--muted)] mt-4 text-center">
        En t'inscrivant tu acceptes notre{" "}
        <Link href="/confidentialite" className="link">
          politique de confidentialité
        </Link>
        .
      </p>
    </div>
  );
}
