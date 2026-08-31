"use client";

import { useRef, useTransition } from "react";
import { createLead } from "./actions";

export function NewLeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(formRef.current!);
        startTransition(async () => {
          await createLead(fd);
          formRef.current?.reset();
        });
      }}
      className="grid md:grid-cols-4 gap-3"
    >
      <input
        name="brand_name"
        required
        placeholder="Nom de la marque"
        className="px-3 py-2 border border-[var(--border)] rounded-lg bg-white md:col-span-2"
      />
      <input
        name="contact"
        placeholder="Email / @insta (optionnel)"
        className="px-3 py-2 border border-[var(--border)] rounded-lg bg-white"
      />
      <select
        name="status"
        defaultValue="a_contacter"
        className="px-3 py-2 border border-[var(--border)] rounded-lg bg-white"
      >
        <option value="a_contacter">À contacter</option>
        <option value="envoye">Envoyé</option>
        <option value="repondu">Répondu</option>
        <option value="collab_signee">Collab signée</option>
      </select>
      <textarea
        name="notes"
        rows={2}
        placeholder="Notes (angle, produits, etc.)"
        className="px-3 py-2 border border-[var(--border)] rounded-lg bg-white md:col-span-4"
      />
      <div className="md:col-span-4">
        <button disabled={pending} className="btn btn-primary" type="submit">
          {pending ? "Ajout…" : "+ Ajouter"}
        </button>
      </div>
    </form>
  );
}
