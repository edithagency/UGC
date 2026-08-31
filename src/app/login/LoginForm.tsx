"use client";

import { useActionState } from "react";
import { sendMagicLink, type LoginState } from "@/app/actions/auth";

const SEGMENTATION_OPTIONS = [
  "Je découvre l'UGC",
  "J'ai déjà tenté sans succès",
  "J'ai fait 1-2 collabs",
  "J'ai un peu de clients réguliers",
];

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    sendMagicLink,
    undefined
  );

  if (state?.ok) {
    return (
      <div className="text-center py-4">
        <div className="text-4xl">📬</div>
        <h2 className="text-xl font-bold mt-3">Check tes emails</h2>
        <p className="text-[var(--muted)] mt-2 text-sm">
          On a envoyé un lien à <strong>{state.email}</strong>. Clique dessus pour te
          connecter. Ça peut prendre 1-2 minutes.
        </p>
        <p className="text-xs text-[var(--muted)] mt-4">
          Pas reçu ? Vérifie tes spams, puis réessaye.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {redirectTo && <input type="hidden" name="redirect" value={redirectTo} />}

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-1">
          Ton email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="prenom@exemple.com"
          className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white focus:outline-none focus:border-[var(--brand)]"
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-600 mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          T'en es où dans ton parcours UGC ?{" "}
          <span className="text-[var(--muted)] font-normal">(optionnel)</span>
        </label>
        <select
          name="segmentation"
          defaultValue=""
          className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white"
        >
          <option value="">—</option>
          {SEGMENTATION_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {state?.message && !state.ok && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary w-full text-base"
      >
        {pending ? "On envoie…" : "M'envoyer le lien magique"}
      </button>
    </form>
  );
}
