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
      "Bac+2 en comptabilité ou finance",
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
    level: "Bac+4",
    duration: "2 ans",
    features: [
      "Bac+4 en gestion, économie ou domaine équivalent",
      "Connaissances en management et stratégie",
      "Projet de fin d'études",
      "Stage en entreprise obligatoire"
    ],
    category: "master"
  },
  {
    _id: "m2",
    title: "Master en Expertise Comptable et Gestion Financière",
    level: "Bac+4",
    duration: "2 ans",
    features: [
      "Bac+4 en comptabilité ou finance",
      "Connaissances en gestion financière",
      "Mémoire de fin d'études",
      "Stage professionnel en cabinet ou entreprise"
    ],
    category: "master"
  },
  {
    _id: "m3",
    title: "Master en Management des Ressources Humaines",
    level: "Bac+4",
    duration: "2 ans",
    features: [
      "Bac+4 en gestion des RH ou domaine similaire",
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
    level: "Bac+3",
    duration: "6 mois",
    features: [
      "Bac+3 en informatique",
      "Bases en programmation Python",
      "Projet pratique",
      "Présentation finale"
    ],
    category: "continuous"
  },
  {
    _id: "fc2",
    title: "Développement Web Full Stack",
    level: "Bac+2",
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
    level: "Bac+2",
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
    level: "Bac+3",
    duration: "6 mois",
    features: [
      "Bac+3 en gestion ou santé",
      "Stage en milieu hospitalier",
      "Mémoire de fin d'études",
      "Présentation orale"
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
