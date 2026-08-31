import Link from "next/link";
import { requireUser } from "@/lib/dal";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { BadgeCanvas } from "./BadgeCanvas";
import { redirect } from "next/navigation";

type SP = Promise<{ just_finished?: string }>;

export default async function BadgePage({ searchParams }: { searchParams: SP }) {
  const { just_finished } = await searchParams;
  const user = await requireUser();

  const supabase = await createSupabaseServerClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("finished_at, email")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.finished_at) {
    redirect("/dashboard");
  }

  const firstName = profile.email.split("@")[0].split(/[._-]/)[0];
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const finishedDate = new Date(profile.finished_at).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-5 py-12 text-center">
      {just_finished === "1" && (
        <p className="pill" style={{ background: "rgba(16,185,129,0.1)", color: "#065f46" }}>
          🎉 Bravo, tu viens de terminer les 13 modules !
        </p>
      )}

      <h1 className="text-3xl md:text-5xl font-black mt-4">
        Ton badge UGC Starter
      </h1>
      <p className="text-[var(--muted)] mt-2 max-w-xl mx-auto">
        Télécharge-le et poste-le en story. Le monde peut savoir.
      </p>

      <div className="mt-10">
        <BadgeCanvas name={displayName} finishedDate={finishedDate} />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/tracker" className="btn btn-primary">
          Démarrer le tracker →
        </Link>
        <Link href="/template" className="btn btn-ghost">
          🎁 Ma réduction template
        </Link>
      </div>
    </div>
  );
}
