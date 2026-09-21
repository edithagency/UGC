import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const ALLOWED_STATUSES = new Set([
  "a_contacter",
  "envoye",
  "a_relancer",
  "relancee",
  "en_discussion",
  "collab_signee",
  "terminee",
  "sans_suite",
]);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  if (typeof body.status === "string" && ALLOWED_STATUSES.has(body.status)) {
    patch.status = body.status;
    if (body.status === "envoye") {
      patch.sent_at = new Date().toISOString().slice(0, 10);
    }
  }
  if (body.next_reminder_at === null) {
    patch.next_reminder_at = null;
  } else if (typeof body.next_reminder_at === "string" && /^\d{4}-\d{2}-\d{2}$/.test(body.next_reminder_at)) {
    patch.next_reminder_at = body.next_reminder_at;
  }

  const { error } = await supabase
    .from("leads")
    .update(patch)
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
