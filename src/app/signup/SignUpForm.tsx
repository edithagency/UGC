"use client";

import { useActionState } from "react";
import { signUp, type AuthState } from "@/app/actions/auth";

export function SignUpForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    signUp,
    undefined
  );

  if (state?.ok) {
    return (
      <div className="text-center py-4">
        <div className="text-4xl">📬</div>
        <h2 className="text-xl font-bold mt-3">Compte créé</h2>
        <p className="text-[var(--muted)] mt-2 text-sm">{state.message}</p>
      </div>
    );
  }

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
          Mot de passe{" "}
          <span className="text-[var(--muted)] font-normal">(8 caractères min)</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
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
        {pending ? "Création…" : "Créer mon compte"}
      </button>
    </form>
  );
}
