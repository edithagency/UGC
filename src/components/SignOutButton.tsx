import { signOut } from "@/app/actions/auth";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button type="submit" className="text-sm text-[var(--muted)] hover:underline">
        Se déconnecter
      </button>
    </form>
  );
}
