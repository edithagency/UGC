"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const SignInSchema = z.object({
  email: z.string().email({ message: "Email pas valide" }).trim(),
  password: z.string().min(8, { message: "8 caractères minimum" }),
  redirect: z.string().optional().nullable(),
});

const SignUpSchema = SignInSchema.extend({
  segmentation: z.string().max(200).optional().nullable(),
});

export type AuthState =
  | {
      ok?: boolean;
      message?: string;
      email?: string;
      errors?: Record<string, string[]>;
    }
  | undefined;

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

// ---- INSCRIPTION ----

export async function signUp(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = SignUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    segmentation: formData.get("segmentation") || null,
    redirect: formData.get("redirect") ?? null,
  });

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { email, password, segmentation, redirect: nextPath } = parsed.data;
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl()}/auth/callback?next=${encodeURIComponent(
        nextPath ?? "/dashboard"
      )}`,
    },
  });

  if (error) {
    return {
      ok: false,
      message: error.message.toLowerCase().includes("registered")
        ? 'Ce compte existe déjà — va sur "Se connecter".'
        : error.message,
      email,
    };
  }

  if (data.user && segmentation) {
    await supabase
      .from("profiles")
      .update({ segmentation })
      .eq("id", data.user.id);
  }

  // Si Supabase = confirmation email désactivée, la session est active → dashboard
  if (data.session) {
    redirect(nextPath && nextPath.startsWith("/") ? nextPath : "/dashboard");
  }

  return {
    ok: true,
    email,
    message:
      "Compte créé. Vérifie tes emails pour confirmer ton adresse, puis reviens te connecter.",
  };
}

// ---- CONNEXION ----

export async function signIn(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    redirect: formData.get("redirect") ?? null,
  });

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { email, password, redirect: nextPath } = parsed.data;
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      ok: false,
      message:
        error.message === "Invalid login credentials"
          ? "Email ou mot de passe incorrect."
          : error.message,
      email,
    };
  }

  await supabase
    .from("profiles")
    .update({ last_activity_at: new Date().toISOString() })
    .eq("email", email);

  redirect(nextPath && nextPath.startsWith("/") ? nextPath : "/dashboard");
}

// ---- DECONNEXION / SUPPRESSION ----

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
  await admin.auth.admin.deleteUser(user.id);
  await supabase.auth.signOut();
  redirect("/");
}
