"use client";

import { useActionState } from "react";
import { signIn, type AuthState } from "@/app/actions/auth";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    signIn,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      {redirectTo && <input type="hidden" name="redirect" value={redirectTo} />}

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state?.email ?? ""}
          placeholder="prenom@exemple.com"
          className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white focus:outline-none focus:border-[var(--brand)]"
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-600 mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold mb-1">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white focus:outline-none focus:border-[var(--brand)]"
        />
        {state?.errors?.password && (
          <p className="text-xs text-red-600 mt-1">{state.errors.password[0]}</p>
        )}
      </div>

      {state?.message && !state.ok && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary w-full">
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
