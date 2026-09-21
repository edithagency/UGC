"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getModule, getNextModule, MODULE_COUNT, MODULES } from "@/lib/modules";

const ToggleSchema = z.object({
  slug: z.string(),
  itemId: z.string(),
  checked: z.enum(["true", "false"]),
});

export async function toggleChecklistItem(formData: FormData) {
  const parsed = ToggleSchema.safeParse({
    slug: formData.get("slug"),
    itemId: formData.get("itemId"),
    checked: formData.get("checked"),
  });
  if (!parsed.success) return;

  const { slug, itemId, checked } = parsed.data;
  const mod = getModule(slug);
  if (!mod) return;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: existing } = await supabase
    .from("module_progress")
    .select("checked_items")
    .eq("user_id", user.id)
    .eq("module_slug", slug)
    .maybeSingle();

  const current = new Set<string>(existing?.checked_items ?? []);
  if (checked === "true") current.add(itemId);
  else current.delete(itemId);

  await supabase.from("module_progress").upsert(
    {
      user_id: user.id,
      module_slug: slug,
      checked_items: Array.from(current),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_slug" }
  );

  await supabase
    .from("profiles")
    .update({ last_activity_at: new Date().toISOString() })
    .eq("id", user.id);

  revalidatePath(`/dashboard/${slug}`);
  revalidatePath("/dashboard");
}

export async function completeModule(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  const mod = getModule(slug);
  if (!mod) return;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: existing } = await supabase
    .from("module_progress")
    .select("checked_items")
    .eq("user_id", user.id)
    .eq("module_slug", slug)
    .maybeSingle();

  const checked = new Set<string>(existing?.checked_items ?? []);
  const allDone = mod.checklist.every((c) => checked.has(c.id));
  if (!allDone) return;

  await supabase.from("module_progress").upsert(
    {
      user_id: user.id,
      module_slug: slug,
      checked_items: Array.from(checked),
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_slug" }
  );

  // Si c'est le dernier, marquer finished_at
  if (mod.order === MODULE_COUNT) {
    // vérifier que tous les autres modules sont bien terminés
    const { data: allProgress } = await supabase
      .from("module_progress")
      .select("module_slug, completed_at")
      .eq("user_id", user.id);

    const completedSet = new Set(
      (allProgress ?? [])
        .filter((p) => p.completed_at)
        .map((p) => p.module_slug)
    );
    const allDoneEver = MODULES.every((m) => completedSet.has(m.slug));

    if (allDoneEver) {
      await supabase
        .from("profiles")
        .update({ finished_at: new Date().toISOString() })
        .eq("id", user.id);
    }
  }

  revalidatePath(`/dashboard/${slug}`);
  revalidatePath("/dashboard");
}
