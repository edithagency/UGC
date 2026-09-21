import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const FREE_LIMIT = 10;

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const url = new URL(request.url);
  const includeList = url.searchParams.get("list") === "1";
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 100);

  const { count } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (!includeList) {
    return NextResponse.json({ count: count ?? 0 });
  }

  const { data: leads, error } = await supabase
    .from("leads")
    .select(
      "id, brand_name, sector, link, contact, why, content_idea, source, status, next_reminder_at, sent_at, updated_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ count: count ?? 0, leads: leads ?? [] });
}

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  if (!body || typeof body.brand_name !== "string" || !body.brand_name.trim()) {
    return NextResponse.json({ error: "brand_name obligatoire" }, { status: 400 });
  }

  // Vérifie la limite gratuite
  const { data: profile } = await supabase
    .from("profiles")
    .select("tracker_pro")
    .eq("id", user.id)
    .maybeSingle();
  const isPro = !!profile?.tracker_pro;
  if (!isPro) {
    const { count: currentCount } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id);
    if ((currentCount ?? 0) >= FREE_LIMIT) {
      return NextResponse.json(
        { error: "LIMIT_REACHED", limit: FREE_LIMIT },
        { status: 403 }
      );
    }
  }

  const { error } = await supabase.from("leads").insert({
    user_id: user.id,
    brand_name: String(body.brand_name).slice(0, 120).trim(),
    contact: body.contact ? String(body.contact).slice(0, 200) : null,
    sector: body.sector ? String(body.sector).slice(0, 120) : null,
    link: body.link ? String(body.link).slice(0, 500) : null,
    why: body.why ? String(body.why).slice(0, 500) : null,
    content_idea: body.content_idea ? String(body.content_idea).slice(0, 500) : null,
    source: body.source ? String(body.source).slice(0, 60) : null,
    notes: body.notes ? String(body.notes).slice(0, 2000) : null,
    status: "a_contacter",
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const { count } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);
  return NextResponse.json({ ok: true, count: count ?? 0 });
}
