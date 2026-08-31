import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

// Webhook Stripe : évite la revalidation Next et lit le raw body
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ received: true, note: "no webhook secret" });
  }

  const sig = request.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "no signature" }, { status: 400 });

  const raw = await request.text();
  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (e) {
    console.error("Bad webhook signature", e);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    const admin = await createSupabaseServiceClient();
    const userId = s.metadata?.user_id || null;
    const discountApplied = s.metadata?.discount_applied === "1";

    await admin.from("orders").insert({
      user_id: userId,
      email: s.customer_details?.email ?? s.customer_email ?? "",
      stripe_session_id: s.id,
      stripe_payment_intent:
        typeof s.payment_intent === "string" ? s.payment_intent : null,
      amount_cents: s.amount_total ?? 0,
      currency: s.currency ?? "eur",
      discount_applied: discountApplied,
      status: "paid",
    });

    if (userId && discountApplied) {
      await admin
        .from("profiles")
        .update({ template_discount_used: true })
        .eq("id", userId);
    }
  }

  return NextResponse.json({ received: true });
}
