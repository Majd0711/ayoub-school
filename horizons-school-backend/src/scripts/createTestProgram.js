const mongoose = require('mongoose');
const Program = require('../models/Program');
const Admin = require('../models/Admin');
require('dotenv').config();

// Connect to MongoDB with the provided Atlas URI
const MONGODB_URI = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

console.log('Attempting to connect to MongoDB Atlas...');

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

async function createTestPrograms() {
  try {
    // Find admin user to use as creator
    const admin = await Admin.findOne();
    
    if (!admin) {
      console.error('No admin user found. Please run createAdmin.js first.');
      process.exit(1);
    }
    
    console.log('Using admin:', admin.email);

    // Delete existing programs
    await Program.deleteMany({});
    console.log('Deleted existing programs');

    // Create programs
    const programs = [
      {
        title: 'Licence en Management des Organisations',
        slug: 'licence-management-organisations',
        description: 'Ce programme de licence forme les étudiants aux fondamentaux du management et de la gestion d\'entreprise. Les diplômés seront capables de comprendre les enjeux stratégiques des organisations et d\'appliquer les outils de gestion appropriés.',
        category: 'Management',
        duration: '3 ans',
        level: 'Licence',
        image: 'management.jpg',
        isActive: true,
        features: [
          'Cours dispensés par des professionnels',
          'Stages en entreprise',
          'Projets pratiques',
          'Accompagnement personnalisé'
        ],
        modules: [
          { title: 'Introduction au management', description: 'Fondamentaux du management et théories des organisations' },
          { title: 'Comptabilité générale', description: 'Principes comptables et états financiers' },
          { title: 'Marketing de base', description: 'Concepts fondamentaux du marketing et études de marché' },
          { title: 'Droit des affaires', description: 'Cadre juridique des entreprises et contrats commerciaux' },
          { title: 'Gestion des ressources humaines', description: 'Recrutement, formation et gestion des talents' },
          { title: 'Management stratégique', description: 'Analyse stratégique et prise de décision' }
        ],
        seats: 30,
        createdBy: admin._id
      },
      {
        title: 'Licence en Commerce International',
        slug: 'licence-commerce-international',
        description: 'Cette licence prépare les étudiants aux défis du commerce mondial. Le programme couvre les aspects économiques, juridiques et logistiques du commerce international, ainsi que les stratégies d\'exportation et d\'importation.',
        category: 'Business',
        duration: '3 ans',
        level: 'Licence',
        image: 'commerce.jpg',
        isActive: true,
        features: [
          'Cours en anglais et français',
          'Séminaires avec des experts internationaux',
          'Stage à l\'étranger',
          'Préparation aux certifications internationales'
        ],
        modules: [
          { title: 'Économie internationale', description: 'Théories du commerce international et politiques économiques' },
          { title: 'Droit international', description: 'Cadre juridique des échanges internationaux' },
          { title: 'Logistique internationale', description: 'Gestion de la chaîne d\'approvisionnement mondiale' },
          { title: 'Marketing international', description: 'Stratégies marketing adaptées aux marchés internationaux' },
          { title: 'Négociation commerciale', description: 'Techniques de négociation dans un contexte multiculturel' },
          { title: 'Géopolitique et commerce', description: 'Impact des relations internationales sur les échanges commerciaux' }
        ],
        seats: 25,
        createdBy: admin._id
      },
      {
        title: 'Licence en Gestion des Ressources Humaines',
        slug: 'licence-ressources-humaines',
        description: 'Cette formation spécialisée en GRH permet aux étudiants d\'acquérir les compétences nécessaires pour gérer efficacement le capital humain d\'une organisation, de la gestion administrative à la stratégie RH.',
        category: 'Human Resources',
        duration: '3 ans',
        level: 'Licence',
        image: 'hr.jpg',
        isActive: true,
        features: [
          'Études de cas réels',
          'Intervention de DRH',
          'Logiciels de gestion RH',
          'Techniques d\'entretien et de recrutement'
        ],
        modules: [
          { title: 'Fondements de la GRH', description: 'Histoire et évolution de la fonction RH' },
          { title: 'Droit du travail', description: 'Cadre juridique des relations employeur-employé' },
          { title: 'Recrutement et sélection', description: 'Processus et techniques de recrutement' },
          { title: 'Formation et développement', description: 'Gestion des compétences et plans de formation' },
          { title: 'Gestion de la paie', description: 'Aspects techniques et réglementaires de la rémunération' },
          { title: 'SIRH', description: 'Systèmes d\'information RH et digitalisation' }
        ],
        seats: 20,
        createdBy: admin._id
      },
      {
        title: 'Licence en Finance et Comptabilité',
        slug: 'licence-finance-comptabilite',
        description: 'Ce programme forme les étudiants aux métiers de la finance et de la comptabilité. Les diplômés seront capables d\'analyser des états financiers, de gérer des budgets et de conseiller sur les décisions financières.',
        category: 'Finance',
        duration: '3 ans',
        level: 'Licence',
        image: 'finance.jpg',
        isActive: true,
        features: [
          'Préparation aux certifications professionnelles',
          'Logiciels comptables professionnels',
          'Études de cas financiers',
          'Simulation de marché financier'
        ],
        modules: [
          { title: 'Comptabilité générale et analytique', description: 'Principes comptables avancés et analyse des coûts' },
          { title: 'Finance d\'entreprise', description: 'Gestion financière et décisions d\'investissement' },
          { title: 'Fiscalité', description: 'Système fiscal marocain et optimisation fiscale' },
          { title: 'Audit et contrôle de gestion', description: 'Méthodes d\'audit et tableaux de bord' },
          { title: 'Marchés financiers', description: 'Fonctionnement des marchés et produits financiers' },
          { title: 'Analyse financière', description: 'Évaluation de la performance financière des entreprises' }
        ],
        seats: 25,
        createdBy: admin._id
      },
      {
        title: 'Master en Management Stratégique',
        slug: 'master-management-strategique',
        description: 'Ce Master forme les futurs cadres dirigeants capables de définir et mettre en œuvre des stratégies d\'entreprise. Le programme combine théorie avancée et applications pratiques dans tous les domaines du management.',
        category: 'Management',
        duration: '2 ans',
        level: 'Master',
        image: 'management.jpg',
        isActive: true,
        features: [
          'Business cases avec des entreprises partenaires',
          'Séminaires de leadership',
          'Voyage d\'étude international',
          'Mémoire professionnel'
        ],
        modules: [
          { title: 'Stratégie d\'entreprise avancée', description: 'Analyse concurrentielle et positionnement stratégique' },
          { title: 'Leadership et management d\'équipe', description: 'Développement des compétences de direction' },
          { title: 'Innovation et changement organisationnel', description: 'Gestion de l\'innovation et conduite du changement' },
          { title: 'Business Intelligence', description: 'Analyse de données pour la prise de décision' },
          { title: 'Management international', description: 'Gestion des équipes multiculturelles et stratégies globales' },
          { title: 'Entrepreneuriat et business model', description: 'Création d\'entreprise et modèles économiques innovants' }
        ],
        seats: 20,
        createdBy: admin._id
      },
      {
        title: 'Master en Finance d\'Entreprise',
        slug: 'master-finance-entreprise',
        description: 'Ce Master spécialisé en finance d\'entreprise forme des experts capables d\'optimiser la gestion financière des organisations, d\'évaluer les investissements et de conseiller sur les décisions stratégiques financières.',
        category: 'Finance',
        duration: '2 ans',
        level: 'Master',
        image: 'finance.jpg',
        isActive: true,
        features: [
          'Certifications financières internationales',
          'Logiciels d\'analyse financière professionnels',
          'Études de cas réels',
          'Interventions de directeurs financiers'
        ],
        modules: [
          { title: 'Analyse financière approfondie', description: 'Techniques avancées d\'analyse et de diagnostic financier' },
          { title: 'Évaluation d\'entreprise', description: 'Méthodes d\'évaluation et fusions-acquisitions' },
          { title: 'Gestion de trésorerie', description: 'Optimisation des flux financiers et relations bancaires' },
          { title: 'Ingénierie financière', description: 'Montages financiers complexes et produits structurés' },
          { title: 'Finance internationale', description: 'Gestion des risques de change et financement international' },
          { title: 'Private Equity et capital-risque', description: 'Investissement en capital et financement de start-ups' }
        ],
        seats: 15,
        createdBy: admin._id
      },
      {
        title: 'Master en Marketing Digital et E-commerce',
        slug: 'master-marketing-digital',
        description: 'Ce programme forme des spécialistes du marketing à l\'ère numérique, capables de concevoir et mettre en œuvre des stratégies digitales performantes et de développer des activités de e-commerce.',
        category: 'Marketing',
        duration: '2 ans',
        level: 'Master',
        image: 'commerce.jpg',
        isActive: true,
        features: [
          'Projets réels avec des entreprises',
          'Certifications Google et Meta',
          'Hackathons marketing',
          'Développement de business en ligne'
        ],
        modules: [
          { title: 'Stratégie marketing digital', description: 'Élaboration de plans marketing omnicanaux' },
          { title: 'SEO et SEA', description: 'Optimisation pour les moteurs de recherche et publicité en ligne' },
          { title: 'Social Media Management', description: 'Gestion avancée des réseaux sociaux et influence marketing' },
          { title: 'UX/UI et web design', description: 'Conception d\'expériences utilisateur optimales' },
          { title: 'E-commerce et marketplaces', description: 'Création et gestion de plateformes de vente en ligne' },
          { title: 'Data Marketing', description: 'Analyse de données marketing et personnalisation' }
        ],
        seats: 20,
        createdBy: admin._id
      },
      {
        title: 'Master en Gestion Stratégique des Ressources Humaines',
        slug: 'master-ressources-humaines-strategiques',
        description: 'Ce Master forme des experts RH capables d\'aligner la stratégie RH avec la stratégie globale de l\'entreprise, de gérer les talents et de conduire des transformations organisationnelles.',
        category: 'Human Resources',
        duration: '2 ans',
        level: 'Master',
        image: 'hr.jpg',
        isActive: true,
        features: [
          'Coaching professionnel',
          'Assessment center',
          'Consulting RH en entreprise',
          'Certification en Digital HR'
        ],
        modules: [
          { title: 'Stratégie RH', description: 'Alignement de la stratégie RH avec les objectifs d\'entreprise' },
          { title: 'Talent Management', description: 'Attraction, développement et fidélisation des talents' },
          { title: 'Change Management', description: 'Gestion des transformations organisationnelles' },
          { title: 'HR Analytics', description: 'Mesure de la performance RH et prise de décision basée sur les données' },
          { title: 'Relations sociales avancées', description: 'Négociation sociale et gestion des conflits' },
          { title: 'Leadership et développement organisationnel', description: 'Développement du leadership et culture d\'entreprise' }
        ],
        seats: 15,
        createdBy: admin._id
      }
    ];

    // Insert programs
    await Program.insertMany(programs);
    console.log(`Created ${programs.length} test programs`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error seeding programs:', error);
    process.exit(1);
  }
}

// Run the function
createTestPrograms(); 