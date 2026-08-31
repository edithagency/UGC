import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const seg = searchParams.get("seg");

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/login?error=exchange_failed`);
  }

  // Enregistre segmentation + last_activity
  if (seg) {
    await supabase
      .from("profiles")
      .update({ segmentation: seg, last_activity_at: new Date().toISOString() })
      .eq("id", data.user.id);
  } else {
    await supabase
      .from("profiles")
      .update({ last_activity_at: new Date().toISOString() })
      .eq("id", data.user.id);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
