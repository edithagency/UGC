"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const STATUSES = ["a_contacter", "envoye", "repondu", "collab_signee", "sans_suite"] as const;

const CreateSchema = z.object({
  brand_name: z.string().min(1, "Nom obligatoire").max(120).trim(),
  contact: z.string().max(200).optional().nullable(),
  status: z.enum(STATUSES).default("a_contacter"),
  notes: z.string().max(2000).optional().nullable(),
});

export async function createLead(formData: FormData) {
  const parsed = CreateSchema.safeParse({
    brand_name: formData.get("brand_name"),
    contact: formData.get("contact") || null,
    status: (formData.get("status") as string) || "a_contacter",
    notes: formData.get("notes") || null,
  });
  if (!parsed.success) return;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("leads").insert({
    user_id: user.id,
    brand_name: parsed.data.brand_name,
    contact: parsed.data.contact ?? null,
    status: parsed.data.status,
    notes: parsed.data.notes ?? null,
    sent_at: parsed.data.status === "envoye" ? new Date().toISOString().slice(0, 10) : null,
  });

  revalidatePath("/tracker");
}

export async function updateLeadStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) return;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const patch: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };
  const today = new Date().toISOString().slice(0, 10);
  if (status === "envoye") patch.sent_at = today;
  if (status === "repondu" || status === "collab_signee") patch.responded_at = today;

  await supabase.from("leads").update(patch).eq("id", id).eq("user_id", user.id);
  revalidatePath("/tracker");
}

export async function deleteLead(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  await supabase.from("leads").delete().eq("id", id).eq("user_id", user.id);
  revalidatePath("/tracker");
}
