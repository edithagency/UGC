import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

// Vercel Cron : passe automatiquement les leads "envoye" (Contactée) en
// "a_relancer" (À relancer) après 14 jours sans changement de statut.

const DAYS = 14;

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = await createSupabaseServiceClient();
  const cutoff = new Date(Date.now() - DAYS * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const { data, error } = await supabase
    .from("leads")
    .update({ status: "a_relancer", updated_at: new Date().toISOString() })
    .eq("status", "envoye")
    .lte("sent_at", cutoff)
    .select("id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ updated: data?.length ?? 0 });
}
