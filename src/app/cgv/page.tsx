export const metadata = { title: "Conditions générales de vente — edithappp" };

export default function CGV() {
  return (
    <article className="max-w-2xl mx-auto px-5 py-12 space-y-6">
      <div>
        <h1 className="text-3xl font-black" style={{ color: "#615326" }}>
          Conditions générales de vente
        </h1>
        <p className="text-[var(--muted)] text-sm mt-1">
          Dernière mise à jour : 21 septembre 2026.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          1. Vendeur
        </h2>
        <p className="mt-2">
          Édith Apouey, entrepreneure individuelle (micro-entreprise).<br />
          SIRET : 904 070 372 00027<br />
          Adresse : 9 impasse Varinot, 33700 Mérignac<br />
          Email : <a href="mailto:edithappro@gmail.com" className="link">edithappro@gmail.com</a><br />
          TVA non applicable, article 293 B du CGI.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          2. Objet
        </h2>
        <p className="mt-2">
          Les présentes CGV encadrent la vente sur edithapppugc.com de produits
          numériques téléchargeables (templates de portfolio, Tracker Pro) et
          l&apos;accès au parcours de formation. Toute commande implique
          l&apos;acceptation sans réserve des présentes CGV.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          3. Produits et prix
        </h2>
        <p className="mt-2">
          Les produits sont décrits sur la page{" "}
          <a href="/boutique" className="link">Boutique</a>. Les prix sont indiqués en
          euros, toutes taxes comprises (TVA non applicable, art. 293 B du CGI).
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li><strong>Tracker Pro</strong> : 19,99 € — accès illimité aux marques dans le Tracker.</li>
          <li><strong>Templates portfolio</strong> : 14,99 € l&apos;unité — fichier numérique à personnaliser.</li>
        </ul>
        <p className="mt-2">
          Le parcours de formation (23 modules) est entièrement gratuit.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          4. Commande et paiement
        </h2>
        <p className="mt-2">
          Le paiement s&apos;effectue en ligne, en une seule fois, via Stripe (carte
          bancaire). Le paiement est sécurisé — aucune donnée bancaire n&apos;est
          stockée par edithappp. La commande est confirmée par email dès validation
          du paiement.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          5. Livraison
        </h2>
        <p className="mt-2">
          Les produits sont numériques : ils sont livrés immédiatement après
          paiement, par email et/ou par activation dans ton compte. Aucun envoi
          physique.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          6. Droit de rétractation
        </h2>
        <p className="mt-2">
          Conformément à l&apos;article L221-28 du Code de la consommation, le droit
          de rétractation ne s&apos;applique pas aux contenus numériques fournis sur
          un support immatériel dont l&apos;exécution a commencé après accord exprès
          du consommateur et renoncement à son droit de rétractation.
        </p>
        <p className="mt-2">
          En achetant un template ou le Tracker Pro, tu acceptes expressément que
          la livraison intervienne immédiatement et renonces à ton droit de
          rétractation. <strong>Toutes les ventes sont donc définitives</strong>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          7. Licence d&apos;utilisation
        </h2>
        <p className="mt-2">
          L&apos;achat donne droit à un usage personnel et non commercial (revente,
          partage, distribution, mise à disposition à des tiers strictement
          interdits). Toute violation entraînera la suspension du compte sans
          remboursement.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          8. Facturation
        </h2>
        <p className="mt-2">
          Une facture est envoyée par email après chaque commande.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          9. Responsabilité
        </h2>
        <p className="mt-2">
          edithappp fournit des outils et contenus pédagogiques pour aider à se
          lancer dans l&apos;UGC. Aucune garantie de résultat (collaboration,
          revenus) n&apos;est apportée — la réussite dépend du travail personnel
          fourni par l&apos;utilisatrice.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: "#615326" }}>
          10. Litiges
        </h2>
        <p className="mt-2">
          Les présentes CGV sont soumises au droit français. En cas de litige, une
          solution amiable sera recherchée en priorité. À défaut, tu peux saisir
          gratuitement le médiateur de la consommation ou la plateforme de
          règlement en ligne des litiges de la Commission européenne :{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            ec.europa.eu/consumers/odr
          </a>.
        </p>
      </section>
    </article>
  );
}
