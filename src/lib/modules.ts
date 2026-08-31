export type Module = {
  slug: string;
  order: number;
  title: string;
  tagline: string;
  intro: string;
  checklist: { id: string; label: string }[];
  tiktokUrl?: string;
};

// V1 — placeholders à remplacer par le contenu réel de chaque épisode.
// L'ordre `order` définit le déblocage séquentiel.
export const MODULES: Module[] = [
  {
    slug: "01-comprendre-ugc",
    order: 1,
    title: "Comprendre l'UGC",
    tagline: "Ce que c'est vraiment (et ce que ce n'est pas).",
    intro:
      "L'UGC (User Generated Content) c'est du contenu que tu crées POUR une marque, publié sur SES canaux ou les tiens. Différent du sponso classique : t'es payée pour le contenu, pas pour la portée.",
    checklist: [
      { id: "def", label: "Je sais expliquer ce qu'est l'UGC en une phrase" },
      { id: "diff", label: "Je vois la différence entre UGC, sponso et affiliation" },
      { id: "why", label: "Je sais pourquoi les marques en achètent" },
      { id: "examples", label: "J'ai repéré 5 comptes UGC qui m'inspirent" },
    ],
  },
  {
    slug: "02-poser-ton-persona",
    order: 2,
    title: "Poser ton persona",
    tagline: "Le style qui te démarque.",
    intro:
      "Avant de démarcher, il te faut une identité claire : style visuel, ton, niches. Les marques achètent une vibe, pas une inconnue polyvalente.",
    checklist: [
      { id: "niches", label: "J'ai identifié 2-3 niches où je suis crédible" },
      { id: "vibe", label: "J'ai décrit mon style en 3 mots" },
      { id: "refs", label: "J'ai 5 vidéos de référence qui matchent mon persona" },
    ],
  },
  {
    slug: "03-fixer-tes-tarifs",
    order: 3,
    title: "Fixer tes tarifs",
    tagline: "Ne bosse pas gratuitement.",
    intro:
      "Grille de tarifs claire par livrable : 1 vidéo brute, 1 vidéo montée, droits d'usage, exclusivité. On te dira toujours 'c'est trop cher' — tiens ta grille.",
    checklist: [
      { id: "base", label: "J'ai fixé mon tarif de base (1 vidéo simple)" },
      { id: "options", label: "J'ai des options : montage, droits, exclu, réutilisation" },
      { id: "package", label: "J'ai un pack 'starter' pour les petites marques" },
      { id: "no", label: "Je sais dire non aux échanges 'produit contre contenu'" },
    ],
  },
  {
    slug: "04-monter-ton-portfolio",
    order: 4,
    title: "Monter ton portfolio",
    tagline: "Même sans clients, tu peux montrer.",
    intro:
      "Pas besoin d'attendre une vraie collab : filme 3-4 spec ads sur des produits que tu utilises déjà. Objectif : prouver que tu sais faire, pas remplir une bibliothèque.",
    checklist: [
      { id: "spec1", label: "J'ai filmé 1 spec ad UGC (produit du quotidien)" },
      { id: "spec2", label: "J'ai filmé 1 unboxing / démo" },
      { id: "spec3", label: "J'ai filmé 1 avis-témoignage" },
      { id: "host", label: "Tout est hébergé quelque part (Notion / Google Drive / mini-site)" },
    ],
  },
  {
    slug: "05-trouver-les-marques",
    order: 5,
    title: "Trouver les marques",
    tagline: "Où chercher, comment shortlister.",
    intro:
      "Marques qui achètent de l'UGC : DNVB (petites marques digital-first), applis mobiles, cosmétique, food, wellness. Pas les gros CAC 40 (ils passent par des agences).",
    checklist: [
      { id: "list", label: "J'ai une liste de 20 marques que je veux démarcher" },
      { id: "filter", label: "J'ai filtré : présence sur Insta/TikTok, produit accessible" },
      { id: "contacts", label: "J'ai le contact (email ou @) de chaque marque" },
    ],
  },
  {
    slug: "06-le-pitch-email",
    order: 6,
    title: "Le pitch email",
    tagline: "Court, précis, pas quémandeur.",
    intro:
      "Une bonne intro email UGC : 3 lignes. Qui tu es, ce que tu proposes concrètement, un lien vers ton portfolio. Pas de 'j'adore votre marque depuis toujours'.",
    checklist: [
      { id: "template", label: "J'ai un template email personnalisable" },
      { id: "hook", label: "Ma première ligne accroche en <10 mots" },
      { id: "cta", label: "Mon email a UN seul CTA clair" },
      { id: "port", label: "Le lien portfolio est en signature" },
    ],
  },
  {
    slug: "07-demarcher-en-masse",
    order: 7,
    title: "Démarcher (le vrai job)",
    tagline: "10 marques par jour, sinon rien.",
    intro:
      "Le nerf de la guerre. Taux de réponse UGC : entre 5 et 15%. Donc si tu veux 3 collabs par mois, il te faut envoyer 40-60 pitchs par mois. Tracker obligatoire.",
    checklist: [
      { id: "goal", label: "Je me suis fixé un objectif quotidien réaliste" },
      { id: "tracker", label: "J'ai activé le tracker de démarchage" },
      { id: "followup", label: "Je relance chaque marque une fois après 5-7 jours" },
    ],
  },
  {
    slug: "08-negocier",
    order: 8,
    title: "Négocier",
    tagline: "Sans casser tes prix.",
    intro:
      "Les marques négocient toujours. Défends la valeur, pas le prix : rappelle ce qu'elles obtiennent (droits, temps, expertise). Prépare des alternatives (moins de droits ≠ moins cher).",
    checklist: [
      { id: "min", label: "J'ai un tarif plancher que je ne franchis jamais" },
      { id: "trade", label: "Je sais proposer 'moins de livrables' plutôt que 'moins cher'" },
      { id: "walk", label: "Je sais partir d'une négo si c'est pas rentable" },
    ],
  },
  {
    slug: "09-livrer-la-collab",
    order: 9,
    title: "Livrer ta première collab",
    tagline: "Brief, tournage, envoi propre.",
    intro:
      "Une collab qui se passe bien = rebook. Brief clair, respect des délais, 1 ronde de retouches max prévue au contrat, livraison via WeTransfer/Frame.io.",
    checklist: [
      { id: "brief", label: "J'ai lu et validé le brief avant de tourner" },
      { id: "shoot", label: "Je tourne en 2 variantes pour donner du choix" },
      { id: "delivery", label: "Je livre avec un mini-recap (fichier, format, droits)" },
    ],
  },
  {
    slug: "10-contrat-facturation",
    order: 10,
    title: "Contrat & facturation",
    tagline: "Le côté sérieux qui rassure.",
    intro:
      "Micro-entreprise France : facture obligatoire, mentions légales, TVA non applicable en dessous du seuil. Contrat court (2 pages) qui couvre : livrables, droits, délais, paiement.",
    checklist: [
      { id: "siret", label: "J'ai mon numéro SIRET" },
      { id: "template-facture", label: "J'ai un template de facture prêt" },
      { id: "template-contrat", label: "J'ai un template de contrat prêt" },
      { id: "ca", label: "Je note mon CA au fur et à mesure" },
    ],
  },
  {
    slug: "11-gerer-plusieurs-marques",
    order: 11,
    title: "Gérer plusieurs marques",
    tagline: "Organisation = revenus.",
    intro:
      "3+ marques en parallèle : tu deviens une mini-boîte. Système de planning, dossiers rangés, deadlines visibles. Un retard = une marque perdue.",
    checklist: [
      { id: "planning", label: "J'ai un planning semaine avec deadlines visibles" },
      { id: "folders", label: "J'ai un dossier par marque (brief, brut, monté, facture)" },
      { id: "buffer", label: "Je bloque un jour off par semaine" },
    ],
  },
  {
    slug: "12-te-differencier",
    order: 12,
    title: "Te différencier",
    tagline: "Sortir du lot maintenant qu'il y a du monde.",
    intro:
      "Le marché se sature. Ta différence : une niche pointue (parents solo, cuisine sans gluten, sport +40, etc.), un style de montage reconnaissable, ou un angle éditorial fort.",
    checklist: [
      { id: "angle", label: "Je peux nommer mon angle en une phrase" },
      { id: "recurrent", label: "J'ai 1-2 marques qui rebookent (preuve sociale)" },
      { id: "reseau", label: "Je suis en contact avec 2-3 autres créatrices UGC" },
    ],
  },
  {
    slug: "13-passer-au-niveau-superieur",
    order: 13,
    title: "Passer au niveau supérieur",
    tagline: "Salaire fixe et vrais revenus.",
    intro:
      "Objectif V2 de ta carrière UGC : sortir du one-shot. Contrats trimestriels, retainers, formation à revendre, licences vidéos. Le template que je vends c'est ça — un accélérateur.",
    checklist: [
      { id: "retainer", label: "J'ai proposé un forfait mensuel à au moins 1 marque" },
      { id: "pipeline", label: "J'ai 3 mois de pipeline visible" },
      { id: "goal", label: "J'ai fixé mon objectif CA sur les 6 prochains mois" },
    ],
  },
];

export const MODULE_COUNT = MODULES.length;

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}

export function getNextModule(slug: string): Module | undefined {
  const current = getModule(slug);
  if (!current) return undefined;
  return MODULES.find((m) => m.order === current.order + 1);
}

export function isModuleUnlocked(
  slug: string,
  completedSlugs: Set<string>
): boolean {
  const mod = getModule(slug);
  if (!mod) return false;
  if (mod.order === 1) return true;
  const previous = MODULES.find((m) => m.order === mod.order - 1);
  if (!previous) return true;
  return completedSlugs.has(previous.slug);
}
