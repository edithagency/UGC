import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const getCurrentUser = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const requireUser = cache(async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
});

export type ModuleProgressRow = {
  module_slug: string;
  completed_at: string | null;
  checked_items: string[];
};

export const getProgress = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("module_progress")
    .select("module_slug, completed_at, checked_items");
  if (error) return [] as ModuleProgressRow[];
  return (data ?? []) as ModuleProgressRow[];
});

export const getSubscriberCount = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { count } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true });
  return count ?? 0;
});
