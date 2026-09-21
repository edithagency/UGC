import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { getResend, reminderEmail, resendEnabled } from "@/lib/emails";
import { MODULES } from "@/lib/modules";

// Vercel Cron : configure dans vercel.json ou dashboard.
// Rappel : ne relance qu'une fois par période (reminder_sent_at) et personnalise avec le module en attente.

const INACTIVITY_DAYS = 5;

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!resendEnabled()) {
    return NextResponse.json({ skipped: true, reason: "resend not configured" });
  }

  const supabase = await createSupabaseServiceClient();

  const cutoff = new Date(Date.now() - INACTIVITY_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const relaunchAfter = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, last_activity_at, reminder_sent_at, finished_at")
    .lt("last_activity_at", cutoff)
    .is("finished_at", null)
    .or(`reminder_sent_at.is.null,reminder_sent_at.lt.${relaunchAfter}`)
    .limit(200);

  if (!profiles || profiles.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  const resend = getResend()!;
  const from = process.env.RESEND_FROM_EMAIL!;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://edithapppugc.com";
  let sent = 0;

  for (const p of profiles) {
    const { data: progress } = await supabase
      .from("module_progress")
      .select("module_slug, completed_at")
      .eq("user_id", p.id);

    const completedSlugs = new Set(
      (progress ?? []).filter((r) => r.completed_at).map((r) => r.module_slug)
    );
    const nextModule = MODULES.find((m) => !completedSlugs.has(m.slug));
    if (!nextModule) continue;

    const { subject, html } = reminderEmail({
      moduleTitle: nextModule.title,
      moduleOrder: nextModule.order,
      siteUrl,
    });

    try {
      await resend.emails.send({ from, to: p.email, subject, html });
      await supabase
        .from("profiles")
        .update({ reminder_sent_at: new Date().toISOString() })
        .eq("id", p.id);
      sent++;
    } catch (e) {
      console.error("Failed to send reminder to", p.email, e);
    }
  }

  return NextResponse.json({ sent });
}
