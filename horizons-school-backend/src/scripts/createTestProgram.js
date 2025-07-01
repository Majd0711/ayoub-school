const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Program = require('../models/Program');
const Admin = require('../models/Admin');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/horizons-school')
  .then(() => console.log('MongoDB Connected: ' + mongoose.connection.host))
.catch(err => {
    console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Initial program data - we'll add the createdBy field after finding an admin
const programsData = [
  // Formations Techniques
  {
    title: "TS : Gestion des entreprises",
    description: "Formation technique supérieure en gestion des entreprises, combinant théorie et pratique pour former des professionnels compétents.",
    level: "Baccalauréat",
    duration: "2 ans",
    category: "technical",
    features: [
      "Baccalauréat ou niveau technicien requis",
      "Formation en gestion d'entreprise",
      "Cours pratiques et théoriques"
    ],
    isActive: true
  },
  {
    title: "T : Gestion Informatisée",
    description: "Formation technique en gestion informatisée, offrant des compétences en informatique appliquée à la gestion d'entreprise.",
    level: "Niveau Bac et plus",
    duration: "2 ans",
    category: "technical",
    features: [
      "Niveau Bac ou plus requis",
      "Formation en informatique de gestion",
      "Projets pratiques inclus"
    ],
    isActive: true
  },

  // Licence Professionnelle
  {
    title: "Licence Pro - Management des Organisations",
    description: "Formation professionnelle en management des organisations, préparant les étudiants à des postes de responsabilité dans divers secteurs.",
    level: "Bac+2 (DUT, BTS, DEUG)",
    duration: "1 an",
    category: "license",
    features: [
      "Bac+2 en gestion ou domaine équivalent",
      "Connaissances en management",
      "Projet tutoré",
      "Stage de 12 à 16 semaines"
    ],
    isActive: true
  },
  {
    title: "Licence Pro - Gestion des Ressources Humaines",
    description: "Formation professionnelle en gestion des ressources humaines, formant des spécialistes RH capables de gérer le capital humain de l'entreprise.",
    level: "Bac+2 (DUT, BTS, DEUG)",
    duration: "1 an",
    category: "license",
    features: [
      "Bac+2 en gestion RH ou domaine similaire",
      "Intérêt pour les relations humaines",
      "Projet professionnel",
      "Stage en entreprise obligatoire"
    ],
    isActive: true
  },
  {
    title: "Licence Pro - Commerce International",
    description: "Formation professionnelle en commerce international, préparant les étudiants aux défis du commerce mondial et des échanges internationaux.",
    level: "Bac+2 (DUT, BTS, DEUG)",
    duration: "1 an",
    category: "license",
    features: [
      "Bac+2 en commerce ou équivalent",
      "Niveau B2 en langues étrangères",
      "Projet de fin d'études",
      "Stage à l'international recommandé"
    ],
    isActive: true
  },
  {
    title: "Licence Pro - Gestion Comptable et Financière",
    description: "Formation professionnelle en gestion comptable et financière, formant des experts en comptabilité et analyse financière.",
    level: "Bac+2 (DUT, BTS, DEUG)",
    duration: "1 an",
    category: "license",
    features: [
      "Bac+2 en comptabilité ou finance",
      "Maîtrise des outils comptables",
      "Mémoire professionnel",
      "Stage en cabinet ou service comptable"
    ],
    isActive: true
  },

  // Master Professionnel
  {
    title: "Master en Management et Stratégie des Entreprises",
    description: "Formation avancée en management et stratégie des entreprises, préparant les étudiants à des postes de direction et de conseil stratégique.",
    level: "Bac+4",
    duration: "2 ans",
    category: "master",
    features: [
      "Bac+4 en gestion, économie ou domaine équivalent",
      "Connaissances en management et stratégie",
      "Projet de fin d'études",
      "Stage en entreprise obligatoire"
    ],
    isActive: true
  },
  {
    title: "Master en Expertise Comptable et Gestion Financière",
    description: "Formation avancée en expertise comptable et gestion financière, préparant aux métiers de l'expertise comptable et de la direction financière.",
    level: "Bac+4",
    duration: "2 ans",
    category: "master",
    features: [
      "Bac+4 en comptabilité ou finance",
      "Connaissances en gestion financière",
      "Mémoire de fin d'études",
      "Stage professionnel en cabinet ou entreprise"
    ],
    isActive: true
  },
  {
    title: "Master en Management des Ressources Humaines",
    description: "Formation avancée en management des ressources humaines, formant des experts RH capables de définir et mettre en œuvre la politique RH de l'entreprise.",
    level: "Bac+4",
    duration: "2 ans",
    category: "master",
    features: [
      "Bac+4 en gestion des RH ou domaine similaire",
      "Intérêt pour la gestion du capital humain",
      "Projet professionnel",
      "Stage en service RH obligatoire"
    ],
    isActive: true
  },

  // Formations Continues
  {
    title: "Formation en Intelligence Artificielle",
    description: "Formation continue en intelligence artificielle, permettant aux professionnels de se former aux technologies d'IA et à leur application en entreprise.",
    level: "Bac+3",
    duration: "6 mois",
    category: "continuous",
    features: [
      "Bac+3 en informatique",
      "Bases en programmation Python",
      "Projet pratique",
      "Présentation finale"
    ],
    isActive: true
  },
  {
    title: "Développement Web Full Stack",
    description: "Formation continue en développement web full stack, formant des développeurs compétents sur l'ensemble des technologies web modernes.",
    level: "Bac+2",
    duration: "6 mois",
    category: "continuous",
    features: [
      "Bases en programmation",
      "Projet de fin de formation",
      "Portfolio de projets",
      "Stage optionnel"
    ],
    isActive: true
  },
  {
    title: "Marketing Digital et Réseaux Sociaux",
    description: "Formation continue en marketing digital et réseaux sociaux, formant des experts en stratégies marketing numériques et communication digitale.",
    level: "Bac+2",
    duration: "6 mois",
    category: "continuous",
    features: [
      "Intérêt pour le marketing digital",
      "Projet de campagne",
      "Certification Google Ads/SEO",
      "Stage pratique"
    ],
    isActive: true
  },
  {
    title: "Gestion des Établissements de Santé",
    description: "Formation continue en gestion des établissements de santé, préparant les professionnels aux défis spécifiques du management hospitalier.",
    level: "Bac+3",
    duration: "6 mois",
    category: "continuous",
    features: [
      "Bac+3 en gestion ou santé",
      "Stage en milieu hospitalier",
      "Mémoire de fin d'études",
      "Présentation orale"
    ],
    isActive: true
  },

  // Formations en Langues
  {
    title: "Formation en Langues",
    description: "Formations linguistiques adaptées à tous les niveaux, permettant d'acquérir ou de perfectionner ses compétences en langues étrangères.",
    level: "Tous niveaux",
    duration: "Variable",
    category: "languages",
    features: [
      "Anglais, Français, Espagnol, Allemand",
      "Tests de niveau personnalisés",
      "Cours en petits groupes",
      "Préparation aux certifications internationales"
    ],
    isActive: true
  }
];

const seedPrograms = async () => {
  try {
    // Delete existing programs
    await Program.deleteMany({});
    console.log('Deleted existing programs');

    // Find an admin user or create a default one
    let admin = await Admin.findOne();
    
    if (!admin) {
      console.log('No admin found. Creating a default admin...');
      admin = await Admin.create({
        username: 'admin',
        email: 'admin@horizons-school.com',
        password: 'admin123', // This will be hashed by the model's pre-save hook
        role: 'super-admin'
      });
      console.log('Default admin created');
    }

    // Add createdBy field to all programs
    const programsWithAdmin = programsData.map(program => ({
      ...program,
      createdBy: admin._id
    }));
    
    // Insert new programs
    const createdPrograms = await Program.insertMany(programsWithAdmin);
    console.log(`${createdPrograms.length} programs created successfully`);

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding programs:', error);
    process.exit(1);
  }
}; 

// Run the seed function
seedPrograms(); 