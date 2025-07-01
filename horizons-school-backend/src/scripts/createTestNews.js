const mongoose = require('mongoose');
const News = require('../models/News');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');
const connectDB = require('../config/database');
const slugify = require('slugify');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Get admin ID for createdBy field
const getAdminId = async () => {
  const admin = await Admin.findOne();
  return admin ? admin._id : null;
};

// Sample news data
const newsItems = [
  {
    title: 'Journée Portes Ouvertes',
    content: 'Découvrez nos locaux, rencontrez nos enseignants et nos étudiants lors de notre prochaine journée portes ouvertes. Venez nous rencontrer et découvrir nos programmes, nos installations et notre équipe pédagogique. Des présentations sur nos différentes filières seront organisées tout au long de la journée.',
    summary: 'Découvrez nos locaux, rencontrez nos enseignants et nos étudiants lors de notre prochaine journée portes ouvertes.',
    type: 'event',
    category: 'campus',
    eventDate: new Date('2025-06-15'),
    eventLocation: 'Campus principal, Marrakech',
    isActive: true,
    isFeatured: true,
    tags: ['portes ouvertes', 'campus', 'visite']
  },
  {
    title: 'Nouveau Partenariat International',
    content: 'Horizons School signe un nouveau partenariat avec une prestigieuse université européenne pour des échanges étudiants. Ce partenariat permettra à nos étudiants de bénéficier d\'une expérience internationale enrichissante et d\'obtenir un double diplôme reconnu à l\'échelle internationale.',
    summary: 'Horizons School signe un nouveau partenariat avec une prestigieuse université européenne pour des échanges étudiants.',
    type: 'news',
    category: 'partnership',
    isActive: true,
    isFeatured: true,
    tags: ['partenariat', 'international', 'échange']
  },
  {
    title: 'Cérémonie de Remise des Diplômes',
    content: 'Rejoignez-nous pour célébrer la réussite de nos diplômés de la promotion 2025. La cérémonie se tiendra dans notre amphithéâtre principal et sera suivie d\'un cocktail dans les jardins du campus. Les familles et amis des diplômés sont les bienvenus.',
    summary: 'Rejoignez-nous pour célébrer la réussite de nos diplômés de la promotion 2025.',
    type: 'event',
    category: 'academic',
    eventDate: new Date('2025-07-10'),
    eventLocation: 'Amphithéâtre principal, Campus Horizons',
    isActive: true,
    isFeatured: true,
    tags: ['diplômes', 'cérémonie', 'graduation']
  },
  {
    title: 'Nouveau Programme de Double Diplôme',
    content: 'Horizons School lance un nouveau programme de double diplôme en partenariat avec une université canadienne. Ce programme permet aux étudiants d\'obtenir deux diplômes en seulement 4 ans d\'études, avec une année passée au Canada. Les inscriptions sont ouvertes pour la rentrée prochaine.',
    summary: 'Horizons School lance un nouveau programme de double diplôme en partenariat avec une université canadienne.',
    type: 'news',
    category: 'academic',
    isActive: true,
    isFeatured: false,
    tags: ['double diplôme', 'international', 'programme']
  },
  {
    title: 'LICENCE PROFESSIONNELLE',
    content: 'Notre programme de Licence Professionnelle vous offre une formation complète avec plusieurs spécialisations au choix : Management des organisations, Gestion des ressources humaines, Commerce International, et Gestion comptable et financière. Formez-vous aux métiers d\'avenir avec des professionnels du secteur.',
    summary: 'Notre programme de Licence Professionnelle vous offre une formation complète avec plusieurs spécialisations au choix.',
    type: 'news',
    category: 'academic',
    isActive: true,
    isFeatured: false,
    tags: ['licence', 'formation', 'spécialisation']
  },
  {
    title: 'MASTER PROFESSIONNEL',
    content: 'Le programme de Master Professionnel d\'Horizons School est conçu pour former les futurs cadres et dirigeants d\'entreprise. Avec des spécialisations en Management Stratégique, Finance d\'Entreprise, Marketing Digital et Gestion des Ressources Humaines, nos étudiants sont préparés à relever les défis du monde professionnel moderne.',
    summary: 'Le programme de Master Professionnel d\'Horizons School est conçu pour former les futurs cadres et dirigeants d\'entreprise.',
    type: 'news',
    category: 'academic',
    isActive: true,
    isFeatured: false,
    tags: ['master', 'formation', 'spécialisation']
  },
  {
    title: 'Conférence sur l\'Intelligence Artificielle',
    content: 'Horizons School organise une conférence sur l\'Intelligence Artificielle et son impact sur le monde des affaires. Des experts internationaux viendront partager leurs connaissances et expériences. La conférence est ouverte aux étudiants, aux professionnels et au grand public.',
    summary: 'Horizons School organise une conférence sur l\'Intelligence Artificielle et son impact sur le monde des affaires.',
    type: 'event',
    category: 'academic',
    eventDate: new Date('2025-09-20'),
    eventLocation: 'Salle de conférence, Campus Horizons',
    isActive: true,
    isFeatured: false,
    tags: ['conférence', 'IA', 'technologie']
  },
  {
    title: 'Lancement du Club Entrepreneuriat',
    content: 'Horizons School lance son nouveau Club Entrepreneuriat, un espace dédié aux étudiants passionnés par la création d\'entreprise. Le club organisera des ateliers, des rencontres avec des entrepreneurs et des concours de pitch. Rejoignez-nous pour développer vos compétences entrepreneuriales!',
    summary: 'Horizons School lance son nouveau Club Entrepreneuriat, un espace dédié aux étudiants passionnés par la création d\'entreprise.',
    type: 'news',
    category: 'campus',
    isActive: true,
    isFeatured: false,
    tags: ['entrepreneuriat', 'club', 'innovation']
  }
];

// Create news items
const createNews = async () => {
  try {
    // Delete existing news
    await News.deleteMany();
    console.log('Deleted existing news items');
    
    // Create new news items
    await News.create(newsItems);
    console.log(`${newsItems.length} news items created successfully`);
    
    // Disconnect from DB
    mongoose.disconnect();
  } catch (err) {
    console.error('Error creating news items:', err);
    mongoose.disconnect();
  }
};

// Run the function
createNews(); 