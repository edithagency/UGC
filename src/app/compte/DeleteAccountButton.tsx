"use client";

export function DeleteAccountButton() {
  return (
    <button
      type="submit"
      className="text-red-600 border border-red-200 rounded-full px-4 py-2 text-sm hover:bg-red-50"
      onClick={(e) => {
        if (!confirm("Vraiment supprimer ton compte ? Action définitive.")) {
          e.preventDefault();
        }
      }}
    >
      Supprimer mon compte
    </button>
  );
}
