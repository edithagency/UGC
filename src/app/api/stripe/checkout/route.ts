import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

function priceEnvForSlug(slug: string): string | undefined {
  const suffix = slug.toUpperCase().replace(/-/g, "_");
  return process.env[`STRIPE_PRICE_${suffix}`];
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  // Accepte 'templates' (array) OU 'template' (single, rétro-compat)
  const slugs: string[] = Array.isArray(body.templates)
    ? body.templates.filter((s: unknown) => typeof s === "string")
    : typeof body.template === "string"
    ? [body.template]
    : [];

  if (slugs.length === 0) {
    return NextResponse.json({ error: "Panier vide" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const lineItems: { price: string; quantity: number }[] = [];
  const missing: string[] = [];
  for (const slug of slugs) {
    const priceId = priceEnvForSlug(slug);
    if (!priceId) {
      missing.push(slug);
      continue;
    }
    lineItems.push({ price: priceId, quantity: 1 });
  }

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Produit non configuré : ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: user?.email,
      success_url: `${siteUrl}/boutique/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/boutique`,
      metadata: {
        user_id: user?.id ?? "",
        templates: slugs.join(","),
      },
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur Stripe" }, { status: 500 });
  }
}
