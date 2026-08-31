import Link from "next/link";
import { getCurrentUser } from "@/lib/dal";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CheckoutButton } from "./CheckoutButton";
import { stripeEnabled } from "@/lib/stripe";

export default async function TemplatePage() {
  const user = await getCurrentUser();
  let hasDiscount = false;
  if (user) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("profiles")
      .select("finished_at, template_discount_used")
      .eq("id", user.id)
      .maybeSingle();
    hasDiscount = !!(data?.finished_at && !data.template_discount_used);
  }

  const stripeReady = stripeEnabled();

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <span className="pill">Template — mon vrai secret</span>
          <h1 className="text-3xl md:text-5xl font-black mt-4">
            Le pack UGC starter
          </h1>
          <p className="text-lg text-[var(--muted)] mt-3">
            Le pack que j'ai utilisé pour signer mes 20 premières collabs :
            templates pitch email, grille de tarifs, contrat, facture, tracker Notion.
            Tout prêt, tout personnalisable.
          </p>

          <ul className="mt-6 space-y-2">
            {[
              "5 templates emails de pitch qui convertissent",
              "Grille de tarifs (avec exemples chiffrés)",
              "Contrat UGC simplifié (2 pages, validé par un juriste)",
              "Template facture micro-entreprise",
              "Tracker Notion de démarchage",
              "Bonus : les 20 marques françaises qui achètent le plus d'UGC",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-[var(--brand)] font-bold">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card sticky top-24">
          <div className="text-sm text-[var(--muted)]">Prix</div>
          {hasDiscount ? (
            <div>
              <div className="text-2xl text-[var(--muted)] line-through">49 €</div>
              <div className="text-5xl font-black text-[var(--brand)]">29 €</div>
              <div className="pill mt-2">-40% réservé aux diplômées 🎓</div>
            </div>
          ) : (
            <div className="text-5xl font-black">49 €</div>
          )}
          <div className="text-xs text-[var(--muted)] mt-2">
            Paiement sécurisé Stripe. Téléchargement immédiat.
          </div>

          <div className="mt-6">
            {stripeReady ? (
              <CheckoutButton hasDiscount={hasDiscount} />
            ) : (
              <div className="text-sm text-[var(--muted)] p-4 bg-[var(--background)] rounded-lg border border-dashed border-[var(--border)]">
                💤 Le paiement sera activé bientôt. Envoie un email à{" "}
                <a href="mailto:hello@edithappp.com" className="link">
                  hello@edithappp.com
                </a>{" "}
                pour être prévenue.
              </div>
            )}
          </div>

          {!user && (
            <p className="text-xs text-[var(--muted)] mt-4">
              Pas encore inscrite ?{" "}
              <Link href="/login" className="link">
                Fais le parcours gratuit
              </Link>{" "}
              pour débloquer -40%.
            </p>
          )}
        </div>
      </div>

      <div className="card mt-16 text-sm text-[var(--muted)]">
        <strong>Facturation & TVA :</strong> vente en micro-entreprise France, TVA
        non applicable art. 293 B du CGI en dessous du seuil. Facture envoyée par
        email après paiement.
      </div>
    </div>
  );
}
