import { requireUser } from "@/lib/dal";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteMyAccount } from "@/app/actions/auth";
import { DeleteAccountButton } from "./DeleteAccountButton";

export default async function ComptePage() {
  const user = await requireUser();
  const supabase = await createSupabaseServerClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("created_at, finished_at, segmentation")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="max-w-xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-black">Mon compte</h1>

      <div className="card mt-6 space-y-2">
        <div>
          <span className="text-[var(--muted)] text-sm">Email</span>
          <div className="font-semibold">{user.email}</div>
        </div>
        <div>
          <span className="text-[var(--muted)] text-sm">Compte créé le</span>
          <div>
            {profile?.created_at &&
              new Date(profile.created_at).toLocaleDateString("fr-FR")}
          </div>
        </div>
        {profile?.finished_at && (
          <div>
            <span className="text-[var(--muted)] text-sm">Parcours terminé le</span>
            <div>{new Date(profile.finished_at).toLocaleDateString("fr-FR")}</div>
          </div>
        )}
        {profile?.segmentation && (
          <div>
            <span className="text-[var(--muted)] text-sm">Niveau UGC</span>
            <div>{profile.segmentation}</div>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mt-10 text-red-600">Danger zone</h2>
      <div className="card mt-3 border-red-100">
        <p className="text-sm text-[var(--muted)]">
          Supprime ton compte et toutes tes données (progression, tracker,
          commandes). Action définitive.
        </p>
        <form action={deleteMyAccount} className="mt-4">
          <DeleteAccountButton />
        </form>
      </div>
    </div>
  );
}
