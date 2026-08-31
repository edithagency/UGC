import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const { discount } = await request.json().catch(() => ({ discount: false }));

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let priceId = process.env.STRIPE_TEMPLATE_PRICE_ID;
  let useDiscount = false;
  if (discount && user) {
    const { data } = await supabase
      .from("profiles")
      .select("finished_at, template_discount_used")
      .eq("id", user.id)
      .maybeSingle();
    if (data?.finished_at && !data.template_discount_used) {
      priceId = process.env.STRIPE_TEMPLATE_DISCOUNT_PRICE_ID ?? priceId;
      useDiscount = true;
    }
  }

  if (!priceId) {
    return NextResponse.json({ error: "Stripe non configuré" }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user?.email,
      success_url: `${siteUrl}/template/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/template`,
      metadata: {
        user_id: user?.id ?? "",
        discount_applied: useDiscount ? "1" : "0",
      },
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur Stripe" }, { status: 500 });
  }
}
