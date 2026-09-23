import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { getResend, deliveryEmail } from "@/lib/emails";

const PRODUCT_NAMES: Record<string, string> = {
  "tracker-pro": "Tracker Pro",
  "black-and-white": "Portfolio Black & White",
  "template-02": "Portfolio Template 2",
  "template-03": "Portfolio Template 3",
  "template-04": "Portfolio Template 4",
  "template-05": "Portfolio Template 5",
  "template-06": "Portfolio Template 6",
  "template-07": "Portfolio Template 7",
};

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
    const templatesMeta = (s.metadata?.templates as string) || (s.metadata?.template as string) || "";
    const slugs = templatesMeta.split(",").map((x) => x.trim()).filter(Boolean);
    const email = s.customer_details?.email ?? s.customer_email ?? "";

    await admin.from("orders").insert({
      user_id: userId,
      email,
      stripe_session_id: s.id,
      stripe_payment_intent:
        typeof s.payment_intent === "string" ? s.payment_intent : null,
      amount_cents: s.amount_total ?? 0,
      currency: s.currency ?? "eur",
      status: "paid",
    });

    // Tracker Pro : débloquer le compte si présent dans le panier
    if (userId && slugs.includes("tracker-pro")) {
      await admin
        .from("profiles")
        .update({ tracker_pro: true })
        .eq("id", userId);
    }

    // Envoyer un email de livraison pour CHAQUE produit
    const resend = getResend();
    const from = process.env.RESEND_FROM_EMAIL;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://edithapppugc.com";
    if (resend && from && email) {
      for (const slug of slugs) {
        const productName = PRODUCT_NAMES[slug] ?? "Ton produit";
        const isTrackerPro = slug === "tracker-pro";
        const envKey = `DELIVERY_URL_${slug.toUpperCase().replace(/-/g, "_")}`;
        const downloadUrl = process.env[envKey] ?? null;
        const { subject, html } = deliveryEmail({
          productName,
          downloadUrl,
          siteUrl,
          isTrackerPro,
        });
        try {
          await resend.emails.send({ from, to: email, subject, html });
        } catch (e) {
          console.error("Resend delivery email failed", e);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
