import { requireUser } from "@/lib/dal";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteMyAccount, signOut } from "@/app/actions/auth";
import { DeleteAccountButton } from "./DeleteAccountButton";
import { SignOutButton } from "@/components/SignOutButton";
import { MODULES } from "@/lib/modules";
import { WorkbookSection } from "./WorkbookSection";

const OLIVE = "#615326";
const CREAM = "#f4efc2";
const H2_CLASS = "text-xl md:text-2xl font-black uppercase tracking-tight";

type Workbook = Record<string, unknown>;

type Script06 = {
  hook?: string;
  problem?: string;
  solution?: string;
  benefit1?: string;
  benefit2?: string;
  proof?: string;
  cta?: string;
};

type Shots07 = {
  face?: string;
  plan?: string;
  gros?: string;
  utilisation?: string;
  resultat?: string;
  autre?: string;
};

type Grid13 = {
  video1?: string;
  pack3?: string;
  pack5?: string;
  hook?: string;
  cta?: string;
  rushs?: string;
  express?: string;
  autre?: string;
  baseIncludes?: string;
};

function hasContent(obj: Record<string, unknown> | undefined | null) {
  if (!obj) return false;
  return Object.values(obj).some(
    (v) => typeof v === "string" && v.trim().length > 0
  );
}

export default async function ComptePage() {
  const user = await requireUser();
  const supabase = await createSupabaseServerClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("created_at, finished_at, segmentation, workbook")
    .eq("id", user.id)
    .maybeSingle();

  const workbook: Workbook = (profile?.workbook as Workbook) ?? {};
  const script = workbook["module06:script"] as Script06 | undefined;
  const shots = workbook["module07:shotlist"] as Shots07 | undefined;
  const folder = workbook["module10:folder"] as Record<string, boolean> | undefined;
  const grid = workbook["module13:grid"] as Grid13 | undefined;
  const kit = workbook["module15:kit"] as Record<string, boolean> | undefined;

  const folderDone = folder
    ? Object.values(folder).filter(Boolean).length
    : 0;
  const kitDone = kit ? Object.values(kit).filter(Boolean).length : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 text-[var(--muted)] [&_strong]:text-[#615326]">
      <div className="flex items-center gap-5 mt-6">
        <span
          className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
          style={{ transform: "rotate(-10deg)", color: CREAM }}
        >
          <svg
            viewBox="0 0 100 100"
            width="80"
            height="80"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d="M50 8 L62 38 L94 40 L69 60 L78 92 L50 74 L22 92 L31 60 L6 40 L38 38 Z" />
          </svg>
        </span>
        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight"
          style={{ color: OLIVE }}
        >
          Mon compte
        </h1>
      </div>

      {/* Infos compte */}
      <hr className="my-10 border-[var(--border)]" />
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Mes informations
      </h2>
      <div
        className="mt-6 rounded-2xl p-6 space-y-3"
        style={{ backgroundColor: "#faf7e0" }}
      >
        <div>
          <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE }}>Email</div>
          <div className="font-semibold" style={{ color: OLIVE }}>{user.email}</div>
        </div>
        <div>
          <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE }}>Compte créé le</div>
          <div style={{ color: OLIVE }}>
            {profile?.created_at &&
              new Date(profile.created_at).toLocaleDateString("fr-FR")}
          </div>
        </div>
        {profile?.finished_at && (
          <div>
            <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE }}>Parcours terminé le</div>
            <div style={{ color: OLIVE }}>
              {new Date(profile.finished_at).toLocaleDateString("fr-FR")}
            </div>
          </div>
        )}
        {profile?.segmentation && (
          <div>
            <div className="uppercase tracking-wider text-[10px] md:text-xs font-black" style={{ color: OLIVE }}>Niveau UGC</div>
            <div style={{ color: OLIVE }}>{profile.segmentation}</div>
          </div>
        )}
      </div>

      {(hasContent(script) ||
        hasContent(shots) ||
        (folder && folderDone > 0) ||
        hasContent(grid) ||
        kitDone > 0) && (
        <>
          <hr className="my-10 border-[var(--border)]" />
          <h2 className={H2_CLASS} style={{ color: OLIVE }}>
            Mon carnet de travail
          </h2>

          {hasContent(script) && (
            <WorkbookSection
              title="Mon script UGC"
              subtitle="Module 06"
              editHref={`/dashboard/${MODULES.find((m) => m.slug.startsWith("06-"))?.slug ?? ""}`}
              editLabel="Éditer dans le module 06 →"
            >
              <div className="space-y-3">
                {[
                  { label: "Hook", value: script?.hook },
                  { label: "Problème", value: script?.problem },
                  { label: "Solution", value: script?.solution },
                  { label: "Bénéfice 1", value: script?.benefit1 },
                  { label: "Bénéfice 2", value: script?.benefit2 },
                  { label: "Preuve", value: script?.proof },
                  { label: "CTA", value: script?.cta },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="uppercase tracking-wider text-[10px] md:text-xs font-bold" style={{ color: OLIVE }}>
                      {r.label}
                    </div>
                    <div className="mt-1 rounded-xl px-4 py-2 text-sm md:text-base" style={{ color: OLIVE, backgroundColor: CREAM }}>
                      {r.value?.trim() || <span className="opacity-40">—</span>}
                    </div>
                  </div>
                ))}
              </div>
            </WorkbookSection>
          )}

          {hasContent(shots) && (
            <WorkbookSection
              title="Ma shot list"
              subtitle="Module 07"
              editHref={`/dashboard/${MODULES.find((m) => m.slug.startsWith("07-"))?.slug ?? ""}`}
              editLabel="Éditer dans le module 07 →"
            >
              <div className="space-y-3">
                {[
                  { label: "Face cam", value: shots?.face },
                  { label: "Plan produit", value: shots?.plan },
                  { label: "Gros plan", value: shots?.gros },
                  { label: "Utilisation", value: shots?.utilisation },
                  { label: "Résultat", value: shots?.resultat },
                  { label: "Autre plan", value: shots?.autre },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="uppercase tracking-wider text-[10px] md:text-xs font-bold" style={{ color: OLIVE }}>
                      {r.label}
                    </div>
                    <div className="mt-1 rounded-xl px-4 py-2 text-sm md:text-base" style={{ color: OLIVE, backgroundColor: CREAM }}>
                      {r.value?.trim() || <span className="opacity-40">—</span>}
                    </div>
                  </div>
                ))}
              </div>
            </WorkbookSection>
          )}

          {folder && folderDone > 0 && (
            <WorkbookSection
              title="Mon dossier portfolio"
              subtitle={`Module 10 · ${folderDone} élément${folderDone > 1 ? "s" : ""} coché${folderDone > 1 ? "s" : ""}`}
              editHref={`/dashboard/${MODULES.find((m) => m.slug.startsWith("10-"))?.slug ?? ""}`}
              editLabel="Éditer dans le module 10 →"
            >
              <p className="text-base md:text-lg leading-relaxed" style={{ color: OLIVE }}>
                Tu as coché <strong>{folderDone}</strong> élément
                {folderDone > 1 ? "s" : ""} de ton dossier portfolio.
              </p>
            </WorkbookSection>
          )}

          {kitDone > 0 && (
            <WorkbookSection
              title="Mon kit administratif"
              subtitle={`Module 15 · ${kitDone} élément${kitDone > 1 ? "s" : ""} coché${kitDone > 1 ? "s" : ""}`}
              editHref={`/dashboard/${MODULES.find((m) => m.slug.startsWith("15-"))?.slug ?? ""}`}
              editLabel="Éditer dans le module 15 →"
            >
              <p className="text-base md:text-lg leading-relaxed" style={{ color: OLIVE }}>
                Tu as coché <strong>{kitDone}</strong> élément
                {kitDone > 1 ? "s" : ""} de ton kit administratif UGC.
              </p>
            </WorkbookSection>
          )}

{hasContent(grid) && (
            <WorkbookSection
              title="Ma grille tarifaire"
              subtitle="Module 13"
              editHref={`/dashboard/${MODULES.find((m) => m.slug.startsWith("13-"))?.slug ?? ""}`}
              editLabel="Éditer dans le module 13 →"
            >
              <div className="space-y-4">
                <div className="rounded-2xl p-5" style={{ backgroundColor: CREAM }}>
                  <div className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-3" style={{ color: OLIVE }}>Création</div>
                  <ul className="space-y-2" style={{ color: OLIVE }}>
                    {[
                      { l: "1 vidéo UGC", v: grid?.video1 },
                      { l: "Pack 3 vidéos", v: grid?.pack3 },
                      { l: "Pack 5 vidéos", v: grid?.pack5 },
                    ].map((r) => (
                      <li key={r.l} className="flex justify-between">
                        <span>{r.l}</span>
                        <strong>{r.v ? `${r.v} €` : "—"}</strong>
                      </li>
                    ))}
                  </ul>
                  {grid?.baseIncludes && (
                    <p className="mt-4 text-xs italic" style={{ color: OLIVE, opacity: 0.8 }}>
                      Inclus : {grid.baseIncludes}
                    </p>
                  )}
                </div>
                <div className="rounded-2xl p-5" style={{ backgroundColor: "#faf7e0" }}>
                  <div className="uppercase tracking-wider text-[10px] md:text-xs font-black mb-3" style={{ color: OLIVE }}>Options</div>
                  <ul className="space-y-2" style={{ color: OLIVE }}>
                    {[
                      { l: "Hook supplémentaire", v: grid?.hook },
                      { l: "CTA supplémentaire", v: grid?.cta },
                      { l: "Rushs bruts", v: grid?.rushs },
                      { l: "Livraison express", v: grid?.express },
                    ].map((r) => (
                      <li key={r.l} className="flex justify-between">
                        <span>{r.l}</span>
                        <strong>{r.v ? `${r.v} €` : "—"}</strong>
                      </li>
                    ))}
                  </ul>
                  {grid?.autre && (
                    <p className="mt-4 text-xs italic" style={{ color: OLIVE, opacity: 0.8 }}>
                      {grid.autre}
                    </p>
                  )}
                </div>
              </div>
            </WorkbookSection>
          )}
        </>
      )}

      {/* Actions compte */}
      <hr className="my-10 border-[var(--border)]" />
      <h2 className={H2_CLASS} style={{ color: OLIVE }}>
        Session
      </h2>
      <div className="mt-6">
        <form action={signOut}>
          <SignOutButton />
        </form>
      </div>

      <hr className="my-10 border-[var(--border)]" />
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-red-700">
        Danger zone
      </h2>
      <div className="mt-4 rounded-2xl p-6 border border-red-200 bg-red-50/40">
        <p className="text-sm text-[var(--muted)]">
          Supprime ton compte et toutes tes données (progression, tracker,
          commandes, carnet de travail). Action définitive.
        </p>
        <form action={deleteMyAccount} className="mt-4">
          <DeleteAccountButton />
        </form>
      </div>
    </div>
  );
}
