import { LoginForm } from "./LoginForm";

type SP = Promise<{ redirect?: string }>;

export default async function LoginPage({ searchParams }: { searchParams: SP }) {
  const { redirect } = await searchParams;

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <span className="pill">Inscription / connexion</span>
      <h1 className="text-3xl md:text-4xl font-black mt-4">
        Ton email et c'est parti.
      </h1>
      <p className="text-[var(--muted)] mt-2">
        Pas de mot de passe. On t'envoie un lien magique par email pour te
        connecter. Gratuit à vie.
      </p>

      <div className="card mt-8">
        <LoginForm redirectTo={redirect} />
      </div>

      <p className="text-xs text-[var(--muted)] mt-6">
        En te connectant tu acceptes notre{" "}
        <a href="/confidentialite" className="link">
          politique de confidentialité
        </a>
        . On te supprime toutes tes données quand tu le demandes.
      </p>
    </div>
  );
}
