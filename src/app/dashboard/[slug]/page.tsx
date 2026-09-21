import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/dal";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MODULES, getModule, getNextModule } from "@/lib/modules";
import { Checklist } from "./Checklist";
import { Module01Content, Module01Footer } from "./Module01Content";
import { Module02Content, Module02Footer } from "./Module02Content";
import { Module03Content, Module03Footer } from "./Module03Content";
import { Module04Content, Module04Footer } from "./Module04Content";
import { Module05Content, Module05Footer } from "./Module05Content";
import { Module06Content, Module06Footer } from "./Module06Content";
import { Module07Content, Module07Footer } from "./Module07Content";
import { Module08Content, Module08Footer } from "./Module08Content";
import { Module09Content, Module09Footer } from "./Module09Content";
import { Module10Content, Module10Footer } from "./Module10Content";
import { Module11Content, Module11Footer } from "./Module11Content";
import { Module12Content, Module12Footer } from "./Module12Content";
import { Module13Content, Module13Footer } from "./Module13Content";
import { Module14Content, Module14Footer } from "./Module14Content";
import { Module15Content, Module15Footer } from "./Module15Content";
import { Module16Content, Module16Footer } from "./Module16Content";
import { Module17Content, Module17Footer } from "./Module17Content";
import { Module18Content, Module18Footer } from "./Module18Content";
import { Module19Content, Module19Footer } from "./Module19Content";
import { Module20Content, Module20Footer } from "./Module20Content";
import { Module21Content, Module21Footer } from "./Module21Content";
import { Module22Content, Module22Footer } from "./Module22Content";
import { Module23Content, Module23Footer } from "./Module23Content";
export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

const MODULES_WITH_RICH_CONTENT: Record<string, boolean> = {
  "01-comprendre-ugc": true,
  "02-persona-et-positionnement": true,
  "03-materiel-pour-commencer": true,
  "04-s-entrainer-sans-marque": true,
  "05-formats-ugc-a-maitriser": true,
  "06-construire-une-bonne-video": true,
  "07-apprendre-a-filmer": true,
  "08-bases-du-montage": true,
  "09-gifting": true,
  "10-contenus-portfolio": true,
  "11-portfolio-qui-attire": true,
  "12-creer-sa-micro-entreprise": true,
  "13-fixer-tes-tarifs": true,
  "14-droits-utilisation": true,
  "15-contrats-facturation": true,
  "16-bonnes-marques-a-contacter": true,
  "17-prospection-avec-le-tracker": true,
  "18-pitch-qui-donne-envie": true,
  "19-demarcher-et-relancer": true,
  "20-repondre-negocier": true,
  "21-reussir-premiere-collab": true,
  "22-fideliser-developper": true,
  "23-se-differencier-niveau-superieur": true,
};

export default async function ModulePage({ params }: { params: Params }) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const user = await requireUser();
  const supabase = await createSupabaseServerClient();

  if (mod.order > 1) {
    const previous = MODULES.find((m) => m.order === mod.order - 1)!;
    const { data: prev } = await supabase
      .from("module_progress")
      .select("completed_at")
      .eq("user_id", user.id)
      .eq("module_slug", previous.slug)
      .maybeSingle();
    if (!prev?.completed_at) {
      redirect("/dashboard");
    }
  }

  const { data: progress } = await supabase
    .from("module_progress")
    .select("checked_items, completed_at")
    .eq("user_id", user.id)
    .eq("module_slug", slug)
    .maybeSingle();

  const checkedItems = progress?.checked_items ?? [];
  const isCompleted = !!progress?.completed_at;
  const next = getNextModule(slug);
  const isRich = MODULES_WITH_RICH_CONTENT[slug] === true;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {slug === "01-comprendre-ugc" ? (
        <Module01Content />
      ) : slug === "02-persona-et-positionnement" ? (
        <Module02Content />
      ) : slug === "03-materiel-pour-commencer" ? (
        <Module03Content />
      ) : slug === "04-s-entrainer-sans-marque" ? (
        <Module04Content />
      ) : slug === "05-formats-ugc-a-maitriser" ? (
        <Module05Content />
      ) : slug === "06-construire-une-bonne-video" ? (
        <Module06Content />
      ) : slug === "07-apprendre-a-filmer" ? (
        <Module07Content />
      ) : slug === "08-bases-du-montage" ? (
        <Module08Content />
      ) : slug === "09-gifting" ? (
        <Module09Content />
      ) : slug === "10-contenus-portfolio" ? (
        <Module10Content />
      ) : slug === "11-portfolio-qui-attire" ? (
        <Module11Content />
      ) : slug === "12-creer-sa-micro-entreprise" ? (
        <Module12Content />
      ) : slug === "13-fixer-tes-tarifs" ? (
        <Module13Content />
      ) : slug === "14-droits-utilisation" ? (
        <Module14Content />
      ) : slug === "15-contrats-facturation" ? (
        <Module15Content />
      ) : slug === "16-bonnes-marques-a-contacter" ? (
        <Module16Content />
      ) : slug === "17-prospection-avec-le-tracker" ? (
        <Module17Content />
      ) : slug === "18-pitch-qui-donne-envie" ? (
        <Module18Content />
      ) : slug === "19-demarcher-et-relancer" ? (
        <Module19Content />
      ) : slug === "20-repondre-negocier" ? (
        <Module20Content />
      ) : slug === "21-reussir-premiere-collab" ? (
        <Module21Content />
      ) : slug === "22-fideliser-developper" ? (
        <Module22Content />
      ) : slug === "23-se-differencier-niveau-superieur" ? (
        <Module23Content />
      ) : (
        <>
          <Link href="/dashboard" className="text-sm text-[var(--muted)] hover:underline">
            ← Mon parcours
          </Link>

          <div className="mt-8">
            <span className="pill">
              Module {String(mod.order).padStart(2, "0")} / {MODULES.length}
            </span>
            <h1
              className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-4 leading-tight"
              style={{ color: "#615326" }}
            >
              {mod.title}
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] mt-3">{mod.tagline}</p>
          </div>

          <div className="card mt-8">
            <p className="leading-relaxed text-lg">{mod.intro}</p>
          </div>

          <h2
            className="text-xl md:text-2xl font-black mt-12 uppercase tracking-tight"
            style={{ color: "#615326" }}
          >
            Peux-tu valider ce module ?
          </h2>
        </>
      )}

      <Checklist
        slug={slug}
        items={mod.checklist}
        initialChecked={checkedItems}
        isCompleted={isCompleted}
        nextSlug={next?.slug}
        nextOrder={next?.order}
      />

      {slug === "01-comprendre-ugc" && <Module01Footer />}
      {slug === "02-persona-et-positionnement" && <Module02Footer />}
      {slug === "03-materiel-pour-commencer" && <Module03Footer />}
      {slug === "04-s-entrainer-sans-marque" && <Module04Footer />}
      {slug === "05-formats-ugc-a-maitriser" && <Module05Footer />}
      {slug === "06-construire-une-bonne-video" && <Module06Footer />}
      {slug === "07-apprendre-a-filmer" && <Module07Footer />}
      {slug === "08-bases-du-montage" && <Module08Footer />}
      {slug === "09-gifting" && <Module09Footer />}
      {slug === "10-contenus-portfolio" && <Module10Footer />}
      {slug === "11-portfolio-qui-attire" && <Module11Footer />}
      {slug === "12-creer-sa-micro-entreprise" && <Module12Footer />}
      {slug === "13-fixer-tes-tarifs" && <Module13Footer />}
      {slug === "14-droits-utilisation" && <Module14Footer />}
      {slug === "15-contrats-facturation" && <Module15Footer />}
      {slug === "16-bonnes-marques-a-contacter" && <Module16Footer />}
      {slug === "17-prospection-avec-le-tracker" && <Module17Footer />}
      {slug === "18-pitch-qui-donne-envie" && <Module18Footer />}
      {slug === "19-demarcher-et-relancer" && <Module19Footer />}
      {slug === "20-repondre-negocier" && <Module20Footer />}
      {slug === "21-reussir-premiere-collab" && <Module21Footer />}
      {slug === "22-fideliser-developper" && <Module22Footer />}
      {slug === "23-se-differencier-niveau-superieur" && <Module23Footer isCompleted={isCompleted} />}
    </div>
  );
}
