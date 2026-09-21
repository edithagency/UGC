import { Resend } from "resend";

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export function resendEnabled() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
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
