import Link from "next/link";
import { LoginForm } from "./LoginForm";

type SP = Promise<{ redirect?: string }>;

export default async function LoginPage({ searchParams }: { searchParams: SP }) {
  const { redirect } = await searchParams;

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <span className="pill">Connexion</span>
      <h1
        className="text-3xl md:text-4xl font-black mt-4 uppercase tracking-tight"
        style={{ color: "#615326" }}
      >
        Bon retour parmi nous.
      </h1>
      <p className="text-[var(--muted)] mt-2">
        Rentre ton email et ton mot de passe pour reprendre ton parcours.
      </p>

      <div className="card mt-8">
        <LoginForm redirectTo={redirect} />
      </div>

      <p className="text-sm text-[var(--muted)] mt-6 text-center">
        Pas encore de compte ?{" "}
        <Link href="/signup" className="link">
          Inscris-toi gratuitement
        </Link>
      </p>
    </div>
  );
}
