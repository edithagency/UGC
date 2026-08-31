"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const LoginSchema = z.object({
  email: z.string().email({ message: "Email pas valide" }).trim(),
  segmentation: z.string().max(200).optional().nullable(),
  redirect: z.string().optional().nullable(),
});

export type LoginState =
  | { ok?: boolean; message?: string; email?: string; errors?: Record<string, string[]> }
  | undefined;

export async function sendMagicLink(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    segmentation: formData.get("segmentation") ?? null,
    redirect: formData.get("redirect") ?? null,
  });

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, segmentation, redirect: nextPath } = parsed.data;
  const supabase = await createSupabaseServerClient();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const callbackUrl = new URL("/auth/callback", siteUrl);
  if (nextPath) callbackUrl.searchParams.set("next", nextPath);
  if (segmentation) callbackUrl.searchParams.set("seg", segmentation);

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: callbackUrl.toString() },
  });

  if (error) {
    return { ok: false, message: error.message, email };
  }

  return {
    ok: true,
    email,
    message: "Check tes emails — clique sur le lien magique pour te connecter.",
  };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function deleteMyAccount() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { createSupabaseServiceClient } = await import("@/lib/supabase/server");
  const admin = await createSupabaseServiceClient();
  // Cascade delete supprime profil, progression, leads, orders.
  await admin.auth.admin.deleteUser(user.id);
  await supabase.auth.signOut();
  redirect("/");
}
