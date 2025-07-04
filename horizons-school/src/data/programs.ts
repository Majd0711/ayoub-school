export interface Program {
  _id: string;
  title: string;
  level: string;
  duration: string;
  features: string[];
  category: string;
}

export const programs = [
  // Formations Techniques
  {
    _id: "t1",
    title: "TS : Gestion des entreprises",
    level: "Baccalauréat",
    duration: "2 ans",
    features: [
      "Baccalauréat ou niveau technicien requis",
      "Formation en gestion d'entreprise",
      "Cours pratiques et théoriques"
    ],
    category: "technical"
  },
  {
    _id: "t2",
    title: "T : Gestion Informatisée",
    level: "Niveau Bac et plus",
    duration: "2 ans",
    features: [
      "Niveau Bac ou plus requis",
      "Formation en informatique de gestion",
      "Projets pratiques inclus"
    ],
    category: "technical"
  },

  // Licence Professionnelle
  {
    _id: "l1",
    title: "Licence Pro - Management des Organisations",
    level: "Bac+2 (DUT, BTS, DEUG)",
    duration: "1 an",
    features: [
      "Bac+2 en gestion ou domaine équivalent",
      "Connaissances en management",
      "Projet tutoré",
      "Stage de 12 à 16 semaines"
    ],
    category: "license"
  },
  {
    _id: "l2",
    title: "Licence Pro - Gestion des Ressources Humaines",
    level: "Bac+2 (DUT, BTS, DEUG)",
    duration: "1 an",
    features: [
      "Bac+2 en gestion RH ou domaine similaire",
      "Intérêt pour les relations humaines",
      "Projet professionnel",
      "Stage en entreprise obligatoire"
    ],
    category: "license"
  },
  {
    _id: "l3",
    title: "Licence Pro - Commerce International",
    level: "Bac+2 (DUT, BTS, DEUG)",
    duration: "1 an",
    features: [
      "Bac+2 en commerce ou équivalent",
      "Niveau B2 en langues étrangères",
      "Projet de fin d'études",
      "Stage à l'international recommandé"
    ],
    category: "license"
  },
  {
    _id: "l4",
    title: "Licence Pro - Gestion Comptable et Financière",
    level: "Bac+2 (DUT, BTS, DEUG)",
    duration: "1 an",
    features: [
      "Bac+2 en comptabilité ou domaine équivalent",
      "Maîtrise des outils comptables",
      "Mémoire professionnel",
      "Stage en cabinet ou service comptable"
    ],
    category: "license"
  },

  // Master Professionnel
  {
    _id: "m1",
    title: "Master en Management et Stratégie des Entreprises",
    level: "Bac+3",
    duration: "2 ans",
    features: [
      "Bac+3 en gestion, économie ou domaine équivalent",
      "Connaissances en management et stratégie",
      "Projet de fin d'études",
      "Stage en entreprise obligatoire"
    ],
    category: "master"
  },
  {
    _id: "m2",
    title: "Master en Expertise Comptable et Gestion Financière",
    level: "Bac+3",
    duration: "2 ans",
    features: [
      "Bac+3 en comptabilité ou domaine équivalent",
      "Connaissances en gestion financière",
      "Mémoire de fin d'études",
      "Stage professionnel en cabinet ou entreprise"
    ],
    category: "master"
  },
  {
    _id: "m3",
    title: "Master en Management des Ressources Humaines",
    level: "Bac+3",
    duration: "2 ans",
    features: [
      "Bac+3 en gestion des RH ou domaine similaire",
      "Intérêt pour la gestion du capital humain",
      "Projet professionnel",
      "Stage en service RH obligatoire"
    ],
    category: "master"
  },

  // Formations Continues
  {
    _id: "fc1",
    title: "Formation en Intelligence Artificielle",
    level: "Tous niveaux",
    duration: "6 mois",
    features: [
      "Connaissances de base en informatique",
      "Bases en programmation Python",
      "Projet pratique",
      "Présentation finale"
    ],
    category: "continuous"
  },
  {
    _id: "fc2",
    title: "Développement Web Full Stack",
    level: "Tous niveaux",
    duration: "6 mois",
    features: [
      "Bases en programmation",
      "Projet de fin de formation",
      "Portfolio de projets",
      "Stage optionnel"
    ],
    category: "continuous"
  },
  {
    _id: "fc3",
    title: "Marketing Digital et Réseaux Sociaux",
    level: "Tous niveaux",
    duration: "6 mois",
    features: [
      "Intérêt pour le marketing digital",
      "Projet de campagne",
      "Certification Google Ads/SEO",
      "Stage pratique"
    ],
    category: "continuous"
  },
  {
    _id: "fc4",
    title: "Gestion des Établissements de Santé",
    level: "Tous niveaux",
    duration: "6 mois",
    features: [
      "Connaissances de base dans le domaine",
      "Stage en milieu hospitalier",
      "Mémoire de fin d'études",
      "Présentation orale"
    ],
    category: "continuous"
  },
  {
    _id: "fc5",
    title: "Formation en Comptabilité",
    level: "Tous niveaux",
    duration: "6 mois",
    features: [
      "Bases de la comptabilité",
      "Logiciels comptables",
      "Cas pratiques",
      "Stage optionnel"
    ],
    category: "continuous"
  },
  {
    _id: "fc6",
    title: "Formation Délégué Médical",
    level: "Tous niveaux",
    duration: "6 mois",
    features: [
      "Connaissances médicales de base",
      "Techniques de vente",
      "Stage pratique",
      "Certification finale"
    ],
    category: "continuous"
  },
  {
    _id: "fc7",
    title: "Formation Médias et Communication",
    level: "Tous niveaux",
    duration: "6 mois",
    features: [
      "Communication digitale",
      "Relations publiques",
      "Projet média",
      "Stage pratique"
    ],
    category: "continuous"
  },
  {
    _id: "fc8",
    title: "Formation en Finance",
    level: "Tous niveaux",
    duration: "6 mois",
    features: [
      "Bases de la finance",
      "Analyse financière",
      "Études de cas",
      "Projet final"
    ],
    category: "continuous"
  },
  {
    _id: "fc9",
    title: "Gestion de Stock et Logistique",
    level: "Tous niveaux",
    duration: "6 mois",
    features: [
      "Supply chain",
      "Logiciels de gestion",
      "Cas pratiques",
      "Stage optionnel"
    ],
    category: "continuous"
  },
  {
    _id: "fc10",
    title: "Réseaux Informatiques",
    level: "Tous niveaux",
    duration: "6 mois",
    features: [
      "Bases des réseaux",
      "Configuration",
      "Sécurité",
      "Projet pratique"
    ],
    category: "continuous"
  },
  {
    _id: "fc11",
    title: "Marketing Fondamental",
    level: "Tous niveaux",
    duration: "6 mois",
    features: [
      "Principes du marketing",
      "Études de marché",
      "Plan marketing",
      "Projet final"
    ],
    category: "continuous"
  },

  // Formations en Langues
  {
    _id: "fl1",
    title: "Formation en Langues",
    level: "Tous niveaux",
    duration: "Variable",
    features: [
      "Anglais, Français, Espagnol, Allemand",
      "Tests de niveau personnalisés",
      "Cours en petits groupes",
      "Préparation aux certifications internationales"
    ],
    category: "languages"
  }
];
