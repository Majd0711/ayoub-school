interface Program {
  id: string;
  title: string;
  level: string;
  duration: string;
  conditions: string[];
  seats: number;
  imageUrl: string;
  category?: string;
}

export const programs: Program[] = [
  // Licence Professionnelle Programs
  {
    id: 'licence-management',
    title: 'Licence Pro - Management des Organisations',
    level: 'Bac+2 (DUT, BTS, DEUG)',
    duration: '1 an',
    conditions: [
      'Bac+2 en gestion ou domaine équivalent',
      'Connaissances en management',
      'Projet tuteuré',
      'Stage de 12 à 16 semaines'
    ],
    seats: 25,
    imageUrl: '/images/management.jpg',
    category: 'licence'
  },
  {
    id: 'licence-rh',
    title: 'Licence Pro - Gestion des Ressources Humaines',
    level: 'Bac+2 (DUT, BTS, DEUG)',
    duration: '1 an',
    conditions: [
      'Bac+2 en gestion RH ou domaine similaire',
      'Intérêt pour les relations humaines',
      'Projet professionnel',
      'Stage en entreprise obligatoire'
    ],
    seats: 25,
    imageUrl: '/images/rh.jpg',
    category: 'licence'
  },
  {
    id: 'licence-commerce',
    title: 'Licence Pro - Commerce International',
    level: 'Bac+2 (DUT, BTS, DEUG)',
    duration: '1 an',
    conditions: [
      'Bac+2 en commerce ou équivalent',
      'Niveau B2 en langues étrangères',
      'Projet de fin d\'études',
      'Stage à l\'international recommandé'
    ],
    seats: 25,
    imageUrl: '/images/commerce.jpg',
    category: 'licence'
  },
  {
    id: 'licence-comptabilite',
    title: 'Licence Pro - Gestion Comptable et Financière',
    level: 'Bac+2 (DUT, BTS, DEUG)',
    duration: '1 an',
    conditions: [
      'Bac+2 en comptabilité ou finance',
      'Maîtrise des outils comptables',
      'Mémoire professionnel',
      'Stage en cabinet ou service comptable'
    ],
    seats: 25,
    imageUrl: '/images/comptabilite.jpg',
    category: 'licence'
  },
  {
    id: 'ts-gestion',
    title: 'TS : Gestion des entreprises',
    level: 'Baccalauréat',
    duration: '2 ans',
    conditions: [
      'Baccalauréat ou niveau technicien requis',
      'Formation en gestion d\'entreprise',
      'Cours pratiques et théoriques'
    ],
    seats: 25,
    imageUrl: '/images/students-class.jpg',
    category: 'technicien'
  },
  {
    id: 't-info',
    title: 'T : Gestion Informatisée',
    level: 'Niveau Bac et plus',
    duration: '2 ans',
    conditions: [
      'Niveau Bac ou plus requis',
      'Formation en informatique de gestion',
      'Projets pratiques inclus'
    ],
    seats: 20,
    imageUrl: '/images/tech-student.jpg',
    category: 'technicien'
  },
  
  // Master Professionnel Programs
  {
    id: 'master-management',
    title: 'Master en Management et Stratégie des Entreprises',
    level: 'Bac+4',
    duration: '2 ans',
    conditions: [
      'Bac+4 en gestion, économie ou domaine équivalent',
      'Connaissances en management et stratégie',
      'Projet de fin d\'études',
      'Stage en entreprise obligatoire'
    ],
    seats: 25,
    imageUrl: '/images/business-management.jpg',
    category: 'master'
  },
  {
    id: 'master-expertise-comptable',
    title: 'Master en Expertise Comptable et Gestion Financière',
    level: 'Bac+4',
    duration: '2 ans',
    conditions: [
      'Bac+4 en comptabilité ou finance',
      'Connaissances en gestion financière',
      'Mémoire de fin d\'études',
      'Stage professionnel en cabinet ou entreprise'
    ],
    seats: 20,
    imageUrl: '/images/accounting-finance.jpg',
    category: 'master'
  },
  {
    id: 'master-rh',
    title: 'Master en Management des Ressources Humaines',
    level: 'Bac+4',
    duration: '2 ans',
    conditions: [
      'Bac+4 en gestion des RH ou domaine similaire',
      'Intérêt pour la gestion du capital humain',
      'Projet professionnel',
      'Stage en service RH obligatoire'
    ],
    seats: 25,
    imageUrl: '/images/digital-marketing.jpg',
    category: 'master'
  },
  
  // Formation Continue
  {
    id: 'formation-ia',
    title: 'Formation en Intelligence Artificielle',
    level: 'Bac+3',
    duration: '6 mois',
    conditions: [
      'Bac+3 en informatique',
      'Bases en programmation Python',
      'Projet pratique',
      'Présentation finale'
    ],
    seats: 15,
    imageUrl: '/images/ai-training.jpg',
    category: 'formation'
  },
  {
    id: 'formation-web',
    title: 'Développement Web Full Stack',
    level: 'Bac+2',
    duration: '6 mois',
    conditions: [
      'Bases en programmation',
      'Projet de fin de formation',
      'Portfolio de projets',
      'Stage optionnel'
    ],
    seats: 20,
    imageUrl: '/images/fullstack.jpg',
    category: 'formation'
  },
  {
    id: 'formation-marketing',
    title: 'Marketing Digital et Réseaux Sociaux',
    level: 'Bac+2',
    duration: '4 mois',
    conditions: [
      'Intérêt pour le marketing digital',
      'Projet de campagne',
      'Certification Google Ads/SEO',
      'Stage pratique'
    ],
    seats: 20,
    imageUrl: '/images/social-media.jpg',
    category: 'formation'
  },
  {
    id: 'formation-sante',
    title: 'Gestion des Établissements de Santé',
    level: 'Bac+3',
    duration: '1 an',
    conditions: [
      'Bac+3 en gestion ou santé',
      'Stage en milieu hospitalier',
      'Mémoire de fin d\'études',
      'Présentation orale'
    ],
    seats: 18,
    imageUrl: '/images/healthcare.jpg',
    category: 'formation'
  },
  {
    id: 'formation-langues',
    title: 'Formation en Langues Étrangères',
    level: 'Tous niveaux',
    duration: '3-12 mois',
    conditions: [
      'Anglais, Français, Espagnol, Allemand',
      'Tests de niveau personnalisés',
      'Cours en petits groupes',
      'Préparation aux certifications internationales'
    ],
    seats: 15,
    imageUrl: '/images/languages.jpg',
    category: 'langues'
  }
];
