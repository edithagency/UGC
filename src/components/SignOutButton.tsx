"use client";

export function SignOutButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Es-tu sûre de vouloir te déconnecter ?")) {
          e.preventDefault();
        }
      }}
      className="uppercase tracking-widest text-xs md:text-sm text-[var(--brand)] border border-[var(--brand)] rounded-full px-6 py-3 hover:bg-[var(--accent)] transition"
    >
      Se déconnecter
    </button>
  );
}
