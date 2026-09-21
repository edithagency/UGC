import { Resend } from "resend";

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export function resendEnabled() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

export function deliveryEmail({
  productName,
  downloadUrl,
  siteUrl,
  isTrackerPro,
}: {
  productName: string;
  downloadUrl: string | null;
  siteUrl: string;
  isTrackerPro: boolean;
}) {
  const subject = isTrackerPro
    ? "Ton Tracker Pro est activé — bienvenue !"
    : `Ton achat : ${productName}`;

  const body = isTrackerPro
    ? `
      <h1 style="font-size:22px;margin-top:24px;color:#615326">Tracker Pro activé 🎉</h1>
      <p>Merci pour ton achat !</p>
      <p>Tu peux maintenant enregistrer <strong>autant de marques que tu veux</strong> dans ton Tracker démarchage.</p>
      <p style="margin-top:24px">
        <a href="${siteUrl}/tracker" style="display:inline-block;background:#615326;color:white;padding:14px 24px;border-radius:999px;text-decoration:none;font-weight:600">
          Ouvrir mon Tracker →
        </a>
      </p>
    `
    : `
      <h1 style="font-size:22px;margin-top:24px;color:#615326">Ton template est prêt 🎉</h1>
      <p>Merci pour ton achat !</p>
      <p>Voici ton lien pour accéder à <strong>${productName}</strong> :</p>
      <p style="margin-top:24px">
        <a href="${downloadUrl ?? "#"}" style="display:inline-block;background:#615326;color:white;padding:14px 24px;border-radius:999px;text-decoration:none;font-weight:600">
          Accéder à mon template →
        </a>
      </p>
      <p style="margin-top:24px;color:#615326">
        Garde bien cet email — tu peux revenir sur ce lien à tout moment.
      </p>
    `;

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1a1613">
      <div style="font-size:28px;font-weight:900;color:#615326">edithappp</div>
      ${body}
      <p style="color:#a19a90;font-size:12px;margin-top:32px">
        Une question ? Réponds à cet email ou écris à edithappro@gmail.com.
      </p>
    </div>
  `;
  return { subject, html };
}

export function reminderEmail({
  moduleTitle,
  moduleOrder,
  siteUrl,
}: {
  moduleTitle: string;
  moduleOrder: number;
  siteUrl: string;
}) {
  const subject = `Le module ${moduleOrder} t'attend : ${moduleTitle}`;
  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1a1613">
      <div style="font-size:28px;font-weight:900;color:#ff5b78">edithappp</div>
      <h1 style="font-size:22px;margin-top:24px">Bloquée sur le module ${moduleOrder} ?</h1>
      <p>Salut ! Ça fait quelques jours que t'as pas ouvert ton parcours UGC.</p>
      <p>Le module <strong>${moduleTitle}</strong> t'attend — c'est celui-là qui débloque la suite.</p>
      <p style="margin-top:24px">
        <a href="${siteUrl}/dashboard" style="display:inline-block;background:#ff5b78;color:white;padding:14px 24px;border-radius:999px;text-decoration:none;font-weight:600">
          Reprendre où je m'étais arrêtée →
        </a>
      </p>
      <p style="color:#a19a90;font-size:12px;margin-top:32px">
        Tu peux te désinscrire de ces rappels dans ton compte edithapppugc.com/compte
      </p>
    </div>
  `;
  return { subject, html };
}
