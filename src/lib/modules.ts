export type Module = {
  slug: string;
  order: number;
  title: string;
  tagline: string;
  intro: string;
  checklist: { id: string; label: string }[];
  part: number;
  partTitle: string;
  tiktokUrl?: string;
};

export const PART_TITLES: Record<number, string> = {
  1: "Comprendre et préparer son lancement",
  2: "Apprendre à créer du contenu UGC",
  3: "Obtenir des produits et construire son portfolio",
  4: "Professionnaliser son activité",
  5: "Décrocher ses premières collaborations",
  6: "Développer son activité",
};

const DEFAULT_CHECKLIST = [
  { id: "read", label: "J'ai lu et compris le module" },
  { id: "notes", label: "J'ai pris des notes utiles" },
];

type RawModule = { part: number; slug: string; title: string; tagline: string; intro: string };

const RAW: RawModule[] = [
  // ---- PARTIE 1 ----
  {
    part: 1,
    slug: "01-comprendre-ugc",
    title: "Comprendre l'UGC",
    tagline: "Ce qu'est vraiment l'UGC et comment ça marche.",
    intro:
      "Ce qu'est réellement l'UGC, différence avec l'influence, fonctionnement d'une collaboration et manière dont une créatrice est rémunérée.",
  },
  {
    part: 1,
    slug: "02-persona-et-positionnement",
    title: "Trouver ton persona et ton positionnement",
    tagline: "Ton univers, tes catégories, ton style.",
    intro:
      "Identifier ton univers, tes catégories, tes forces, ton style et commencer à comprendre pourquoi une marque pourrait te choisir.",
  },
  {
    part: 1,
    slug: "03-materiel-pour-commencer",
    title: "Le matériel pour commencer",
    tagline: "Ce qu'il faut vraiment acheter au début.",
    intro:
      "Téléphone, lumière, son, trépied, décors et accessoires. Ce qui est utile et ce qu'il est inutile d'acheter au début.",
  },

  // ---- PARTIE 2 ----
  {
    part: 2,
    slug: "04-s-entrainer-sans-marque",
    title: "S'entraîner sans avoir de marque",
    tagline: "Filme avec les produits que tu as déjà.",
    intro: "Créer ses premières vidéos avec les produits que l'on possède déjà.",
  },
  {
    part: 2,
    slug: "05-formats-ugc-a-maitriser",
    title: "Les formats UGC à maîtriser",
    tagline: "Face cam, unboxing, storytelling, etc.",
    intro:
      "Face cam, témoignage, voice-over, démonstration, unboxing, problème/solution, storytelling…",
  },
  {
    part: 2,
    slug: "06-construire-une-bonne-video",
    title: "Construire une bonne vidéo UGC",
    tagline: "Hook, problème, bénéfices, preuves, CTA.",
    intro:
      "Hook, problème, développement, bénéfices, preuves et CTA. Comprendre pourquoi certaines vidéos retiennent l'attention et d'autres non.",
  },
  {
    part: 2,
    slug: "07-apprendre-a-filmer",
    title: "Apprendre à filmer du contenu UGC",
    tagline: "Lumière, cadrage, plans, mouvements.",
    intro:
      "Lumière, cadrage, B-roll, plans produit, mouvements, variété des plans et erreurs classiques.",
  },
  {
    part: 2,
    slug: "08-bases-du-montage",
    title: "Apprendre les bases du montage",
    tagline: "Cuts, rythme, sous-titres, musique.",
    intro:
      "Applications recommandées, cuts, rythme, sous-titres, musique, voice-over, transitions et export.",
  },

  // ---- PARTIE 3 ----
  {
    part: 3,
    slug: "09-gifting",
    title: "Le gifting",
    tagline: "Recevoir tes premiers produits.",
    intro:
      "Comment recevoir ses premiers produits, plateformes disponibles, comment sélectionner ses campagnes et différence entre gifting et collaboration rémunérée.",
  },
  {
    part: 3,
    slug: "10-contenus-portfolio",
    title: "Préparer son portfolio UGC",
    tagline: "Rassembler tout ce dont tu vas avoir besoin.",
    intro: "Rassembler tes meilleures vidéos, ta présentation et tes infos avant de construire ton portfolio.",
  },
  {
    part: 3,
    slug: "11-portfolio-qui-attire",
    title: "Créer ton portfolio UGC",
    tagline: "Choisis ton template et personnalise-le.",
    intro:
      "Transforme tes contenus en un vrai portfolio professionnel grâce aux templates.",
  },

  // ---- PARTIE 4 ----
  {
    part: 4,
    slug: "12-creer-sa-micro-entreprise",
    title: "Créer ta micro-entreprise",
    tagline: "Statut, démarches, liens officiels.",
    intro:
      "Ton expérience + explications générales + démarches + liens officiels actualisés pour choisir ton statut.",
  },
  {
    part: 4,
    slug: "13-fixer-tes-tarifs",
    title: "Fixer tes tarifs",
    tagline: "Tarif de base, packs, options.",
    intro:
      "Comprendre ce que l'on facture, déterminer un tarif de base, construire des packs, options et évolution des prix.",
  },
  {
    part: 4,
    slug: "14-droits-utilisation",
    title: "Comprendre les droits d'utilisation",
    tagline: "Organique, pub, durée, exclusivité.",
    intro:
      "Organique, publicité, durée, plateformes, exclusivité, déclinaisons et autres usages.",
  },
  {
    part: 4,
    slug: "15-contrats-facturation",
    title: "Contrats et facturation",
    tagline: "Contrat, facture, délais, paiements.",
    intro:
      "Ce qu'il faut définir avant une collaboration, contrat, facture, délais et suivi des paiements.",
  },

  // ---- PARTIE 5 ----
  {
    part: 5,
    slug: "16-bonnes-marques-a-contacter",
    title: "Trouver les bonnes marques à contacter",
    tagline: "Où chercher les marques qui achètent.",
    intro:
      "Où chercher, comment repérer les marques qui utilisent déjà de l'UGC et comment choisir tes prospects.",
  },
  {
    part: 5,
    slug: "17-prospection-avec-le-tracker",
    title: "Organiser ta prospection avec le Tracker",
    tagline: "Tutoriel complet du Tracker.",
    intro:
      "Tutoriel complet de ton outil : ajouter une marque, renseigner ses informations, utiliser les statuts, suivre les prises de contact et organiser ses relances.",
  },
  {
    part: 5,
    slug: "18-pitch-qui-donne-envie",
    title: "Écrire un pitch qui donne envie de répondre",
    tagline: "Email/DM qui donnent envie de répondre.",
    intro:
      "Email, DM, personnalisation, objet, proposition de valeur, portfolio et CTA. Bons et mauvais exemples.",
  },
  {
    part: 5,
    slug: "19-demarcher-et-relancer",
    title: "Décroche ta première collab",
    tagline: "Passe à l'action : 10 marques contactées.",
    intro:
      "Routine de prospection, volume, fréquence, relances, gestion des non-réponses et utilisation quotidienne du Tracker.",
  },
  {
    part: 5,
    slug: "20-repondre-negocier",
    title: "Une marque te répond : répondre et négocier",
    tagline: "Analyser, poser les bonnes questions, annoncer ton prix.",
    intro:
      "Comprendre la demande, demander les bonnes infos, présenter ta grille, négocier sans casser tes prix et savoir dire non.",
  },

  {
    part: 5,
    slug: "21-reussir-premiere-collab",
    title: "Réussir sa première collaboration",
    tagline: "Du brief à la livraison, sans stress.",
    intro:
      "Brief → concept → script → validation → tournage → montage → modifications → livraison → facture.",
  },

  // ---- PARTIE 6 ----
  {
    part: 6,
    slug: "22-fideliser-developper",
    title: "Fidéliser ses clients et développer son activité",
    tagline: "Une première collab → une deuxième → une routine.",
    intro:
      "Transformer une première collaboration en deuxième, prendre de bonnes habitudes d'organisation et développer des collaborations récurrentes.",
  },
  {
    part: 6,
    slug: "23-se-differencier-niveau-superieur",
    title: "Se différencier et passer au niveau supérieur",
    tagline: "Ta signature, ton positionnement, tes revenus récurrents.",
    intro:
      "Signature, spécialisations, storytelling, tarifs plus élevés, packs, retainers et revenus plus réguliers.",
  },
];

const CUSTOM_CHECKLISTS: Record<string, { id: string; label: string }[]> = {
  "01-comprendre-ugc": [
    { id: "explain", label: "Je sais expliquer ce qu'est l'UGC." },
    { id: "diff", label: "Je comprends la différence entre UGC et influence." },
    {
      id: "why",
      label:
        "Je comprends globalement pourquoi une marque achète du contenu UGC.",
    },
    {
      id: "collab",
      label: "Je sais à quoi ressemble le déroulement d'une collaboration.",
    },
  ],
  "02-persona-et-positionnement": [
    { id: "univers", label: "J'ai choisi mes 3 univers." },
    { id: "personnalite", label: "J'ai identifié ma personnalité." },
    { id: "forces", label: "J'ai trouvé mes principales forces." },
    { id: "visuel", label: "J'ai choisi une première direction visuelle." },
    { id: "fiche", label: "Ma fiche persona est terminée." },
  ],
  "03-materiel-pour-commencer": [
    { id: "endroit", label: "J'ai identifié mon meilleur endroit pour filmer." },
    { id: "lumiere", label: "J'ai testé ma lumière." },
    { id: "son", label: "J'ai vérifié mon son." },
    { id: "stabilite", label: "Je sais comment stabiliser mon téléphone." },
    {
      id: "besoins",
      label:
        "Je sais ce dont j'ai réellement besoin — et ce que je n'ai pas besoin d'acheter.",
    },
  ],
  "04-s-entrainer-sans-marque": [
    { id: "produit", label: "J'ai choisi un produit que je possède déjà." },
    { id: "problem", label: "J'ai réfléchi au problème et au bénéfice." },
    { id: "plans", label: "J'ai tourné plusieurs plans." },
    { id: "video", label: "J'ai terminé ma première vidéo." },
    { id: "ameliore", label: "J'ai identifié une chose à améliorer." },
  ],
  "05-formats-ugc-a-maitriser": [
    { id: "connais", label: "Je connais les principaux formats UGC." },
    { id: "melange", label: "Je comprends qu'ils peuvent être mélangés." },
    { id: "concepts", label: "J'ai imaginé 3 concepts différents." },
    { id: "teste", label: "J'ai testé au moins 2 formats." },
  ],
  "06-construire-une-bonne-video": [
    { id: "hook", label: "Mon hook donne une raison de continuer." },
    { id: "besoin", label: "Mon produit répond à un problème ou un besoin clair." },
    { id: "benef", label: "Je parle de bénéfices, pas uniquement de caractéristiques." },
    { id: "montre", label: "J'ai prévu ce que je vais montrer à l'image." },
    { id: "cta", label: "Mon CTA correspond à l'objectif de la vidéo." },
    { id: "oral", label: "Mon script semble naturel à l'oral." },
  ],
  "07-apprendre-a-filmer": [
    { id: "shotlist", label: "J'ai préparé ma shot list." },
    { id: "cadrage", label: "Ma lumière et mon cadrage sont propres." },
    { id: "types", label: "J'ai filmé plusieurs types de plans." },
    { id: "broll", label: "J'ai suffisamment de B-roll." },
    { id: "prises", label: "J'ai fait plusieurs prises." },
    { id: "rushs", label: "J'ai tous les rushs nécessaires pour mon montage." },
  ],
  "08-bases-du-montage": [
    { id: "longueurs", label: "J'ai supprimé les longueurs inutiles." },
    { id: "fluide", label: "Mon montage est fluide." },
    { id: "broll", label: "J'ai ajouté mes B-roll." },
    { id: "sous-titres", label: "Mes sous-titres sont lisibles et corrigés." },
    { id: "voix", label: "Ma voix est parfaitement audible." },
    { id: "verif", label: "J'ai vérifié ma vidéo avant l'export." },
  ],
  "23-se-differencier-niveau-superieur": [
    { id: "forces", label: "Je connais mieux mes forces et les univers dans lesquels je veux évoluer." },
    { id: "portfolio", label: "Je mets mon portfolio à jour avec mes meilleurs contenus." },
    { id: "tarifs", label: "Je sais que mes tarifs peuvent évoluer avec mon activité." },
    { id: "offres", label: "Je peux développer des offres plus complètes (packs, contenus récurrents)." },
    { id: "prospection", label: "Je continue à prospecter même quand j'ai des collaborations." },
    { id: "objectif", label: "J'ai défini mon prochain objectif UGC." },
  ],
  "22-fideliser-developper": [
    { id: "fideliser", label: "Je comprends pourquoi fidéliser est aussi important que prospecter." },
    { id: "pro", label: "Je termine mes collaborations professionnellement." },
    { id: "retours", label: "Je pense à demander des retours lorsque c'est pertinent." },
    { id: "trace", label: "Je garde une trace de mes anciens clients." },
    { id: "idee", label: "Je sais revenir vers une marque avec une nouvelle idée." },
    { id: "packs", label: "Je peux proposer plusieurs contenus ou une collaboration récurrente." },
    { id: "prospection", label: "Je continue à prospecter même lorsque les collaborations arrivent." },
  ],
  "21-reussir-premiere-collab": [
    { id: "etapes", label: "Je comprends toutes les étapes d'une collaboration." },
    { id: "tourner", label: "Je sais quoi vérifier avant de tourner." },
    { id: "brief", label: "Je ne commence pas avec un brief que je ne comprends pas." },
    { id: "livrer", label: "Je sais livrer mon travail professionnellement." },
    { id: "modifs", label: "Je distingue une modification d'une nouvelle prestation." },
    { id: "facture", label: "Je pense à la facture et au paiement après la validation." },
    { id: "relation", label: "Je garde une bonne relation avec la marque après la livraison." },
  ],
  "20-repondre-negocier": [
    { id: "tarif", label: "Je ne donne pas un tarif définitif sans comprendre la demande." },
    { id: "infos", label: "Je sais quelles informations demander." },
    { id: "budget", label: "Je peux demander le budget de la marque." },
    { id: "adapter", label: "Je sais adapter une prestation plutôt que casser immédiatement mon prix." },
    { id: "droits", label: "Je pense aux droits d'utilisation." },
    { id: "sup", label: "Je sais facturer les demandes supplémentaires." },
    { id: "refuser", label: "Je sais que je peux refuser une collaboration." },
    { id: "accord", label: "Je vérifie l'accord avant de commencer à créer." },
  ],
  "19-demarcher-et-relancer": [
    { id: "dix", label: "J'ai identifié 10 marques pertinentes." },
    { id: "contact", label: "J'ai trouvé un contact lorsque c'était possible." },
    { id: "perso", label: "J'ai personnalisé mes pitchs." },
    { id: "contactees", label: "J'ai contacté mes 10 marques." },
    { id: "portfolio", label: "J'ai ajouté mon portfolio." },
    { id: "tracker", label: "J'ai mis mon Tracker à jour." },
    { id: "relances", label: "J'ai effectué les relances nécessaires." },
    { id: "rythme", label: "J'ai choisi un rythme de prospection que je peux tenir." },
  ],
  "18-pitch-qui-donne-envie": [
    { id: "structure", label: "J'ai une structure de pitch que je peux réutiliser." },
    { id: "perso", label: "Je sais personnaliser mon message." },
    { id: "idee", label: "Je propose une idée concrète à la marque." },
    { id: "portfolio", label: "Mon portfolio est intégré à mon pitch." },
    { id: "canaux", label: "Je sais utiliser l'email et le DM intelligemment." },
    { id: "tracker", label: "Ma progression est enregistrée dans mon Tracker." },
    { id: "trois", label: "J'ai réellement contacté mes 3 premières marques." },
  ],
  "17-prospection-avec-le-tracker": [
    { id: "enregistrees", label: "Mes 10 marques sont enregistrées." },
    { id: "statuts", label: "Je comprends les différents statuts." },
    { id: "fiche", label: "Je sais modifier une fiche marque." },
    { id: "contacts", label: "Je sais où renseigner mes contacts." },
    { id: "relances", label: "Je comprends comment fonctionneront les relances." },
    { id: "prioritaires", label: "J'ai choisi mes 3 marques prioritaires." },
  ],
  "16-bonnes-marques-a-contacter": [
    { id: "univers", label: "J'ai identifié mes univers prioritaires." },
    { id: "au-dela", label: "J'ai cherché au-delà des marques que je connaissais déjà." },
    { id: "pubs", label: "J'ai observé des publicités." },
    { id: "reperer", label: "Je sais repérer une marque pertinente pour mon profil." },
    { id: "dix", label: "J'ai trouvé au moins 10 prospects." },
    { id: "idees", label: "J'ai une première idée de contenu pour plusieurs d'entre eux." },
    { id: "tracker", label: "Mes 10 premières marques sont dans mon Tracker." },
  ],
  "15-contrats-facturation": [
    { id: "avant", label: "Je sais ce qui doit être défini avant de commencer une collaboration." },
    { id: "lit", label: "Je lis un contrat avant de le signer." },
    { id: "verifie", label: "Je vérifie particulièrement les livrables, droits, délais et rémunération." },
    { id: "mentions", label: "Je sais qu'une facture comporte des mentions obligatoires." },
    { id: "systeme", label: "J'ai préparé mon système de facturation." },
    { id: "echeances", label: "Je suis les échéances de paiement." },
    { id: "electronique", label: "Je sais que les règles de facturation électronique évoluent." },
  ],
  "14-droits-utilisation": [
    { id: "compris", label: "Je comprends ce que sont les droits d'utilisation." },
    { id: "org-ads", label: "Je sais différencier organique et Ads." },
    { id: "duree", label: "Je pense à demander la durée." },
    { id: "supports", label: "Je pense aux plateformes/supports." },
    { id: "territoire", label: "Je pense au territoire." },
    { id: "illimites", label: "Je ne valide pas des droits illimités sans comprendre ce que j'accepte." },
    { id: "ecrits", label: "Je sais que les droits doivent être définis clairement." },
  ],
  "13-fixer-tes-tarifs": [
    { id: "base", label: "J'ai défini mon tarif de base." },
    { id: "inclus", label: "Je sais précisément ce qu'il comprend." },
    { id: "packs", label: "J'ai créé mes premiers packs." },
    { id: "options", label: "J'ai identifié mes options supplémentaires." },
    { id: "temps", label: "J'ai estimé mon temps de travail réel." },
    { id: "evolution", label: "Je sais que mes tarifs évolueront." },
  ],
  "12-creer-sa-micro-entreprise": [
    { id: "pro", label: "Je comprends pourquoi je dois professionnaliser mon activité." },
    { id: "demarches", label: "Je sais où effectuer mes démarches officielles." },
    { id: "ca", label: "Je comprends que j'aurai du chiffre d'affaires à déclarer." },
    { id: "obligations", label: "Je sais que mon statut implique des obligations à suivre dans le temps." },
  ],
  "11-portfolio-qui-attire": [
    { id: "termine", label: "Mon portfolio est terminé." },
    { id: "univers", label: "Il correspond à mon univers." },
    { id: "creations", label: "Mes meilleures créations sont intégrées." },
    { id: "liens", label: "Tous mes liens fonctionnent." },
    { id: "mobile", label: "Mon portfolio fonctionne sur mobile." },
    { id: "pret", label: "Mon lien est prêt à être envoyé." },
  ],
  "10-contenus-portfolio": [
    { id: "sert", label: "Je comprends à quoi sert mon portfolio." },
    { id: "creations", label: "J'ai sélectionné mes meilleures créations." },
    { id: "presentation", label: "J'ai préparé ma présentation." },
    { id: "services", label: "J'ai défini mes services." },
    { id: "infos", label: "Toutes mes informations sont réunies." },
  ],
  "09-gifting": [
    { id: "methodes", label: "Je connais plusieurs façons d'obtenir du gifting." },
    { id: "inscrite", label: "Je suis inscrite sur au moins une plateforme." },
    { id: "candidature", label: "J'ai candidaté à mes premières campagnes." },
    { id: "verifier", label: "Je sais vérifier ce qu'une marque demande en échange." },
    { id: "portfolio", label: "Je choisis mes produits en fonction de mon futur portfolio." },
  ],
};

export const MODULES: Module[] = RAW.map((m, i) => ({
  slug: m.slug,
  order: i + 1,
  title: m.title,
  tagline: m.tagline,
  intro: m.intro,
  checklist: CUSTOM_CHECKLISTS[m.slug] ?? DEFAULT_CHECKLIST,
  part: m.part,
  partTitle: PART_TITLES[m.part],
}));

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

/** Grouped by part : { partNumber -> Module[] } */
export function modulesByPart(): Map<number, Module[]> {
  const map = new Map<number, Module[]>();
  for (const m of MODULES) {
    if (!map.has(m.part)) map.set(m.part, []);
    map.get(m.part)!.push(m);
  }
  return map;
}
