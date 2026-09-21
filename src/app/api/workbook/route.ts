import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("profiles")
    .select("workbook")
    .eq("id", user.id)
    .maybeSingle();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ workbook: data?.workbook ?? {} });
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
  if (!body || typeof body.key !== "string") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  const key = body.key;
  const value = body.data;

  const { data: current } = await supabase
    .from("profiles")
    .select("workbook")
    .eq("id", user.id)
    .maybeSingle();
  const workbook = { ...(current?.workbook ?? {}), [key]: value };

  const { error } = await supabase
    .from("profiles")
    .update({ workbook })
    .eq("id", user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
