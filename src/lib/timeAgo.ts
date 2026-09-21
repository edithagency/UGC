export function timeAgoFr(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.max(0, Math.round((now - then) / 1000));
  if (diffSec < 60) return "à l'instant";
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `il y a ${diffMin} min`;
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return `il y a ${diffH} h`;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfThen = new Date(then);
  startOfThen.setHours(0, 0, 0, 0);
  const diffDays = Math.round(
    (startOfToday.getTime() - startOfThen.getTime()) / (24 * 3600 * 1000)
  );
  if (diffDays === 0) return "aujourd'hui";
  if (diffDays === 1) return "hier";
  if (diffDays < 7) return `il y a ${diffDays} jours`;
  const diffWeeks = Math.round(diffDays / 7);
  if (diffWeeks < 5) return `il y a ${diffWeeks} sem`;
  const diffMonths = Math.round(diffDays / 30);
  if (diffMonths < 12) return `il y a ${diffMonths} mois`;
  const diffYears = Math.round(diffDays / 365);
  return `il y a ${diffYears} an${diffYears > 1 ? "s" : ""}`;
}
