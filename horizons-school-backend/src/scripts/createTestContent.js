const mongoose = require('mongoose');
const News = require('../models/News');
const Program = require('../models/Program');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');
const connectDB = require('../config/database');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const createTestContent = async () => {
  try {
    // Find an admin user to set as creator
    const admin = await Admin.findOne();
    
    if (!admin) {
      console.error('No admin user found. Please create an admin user first.');
      process.exit(1);
    }
    
    console.log('Using admin:', admin.email);
    
    // Create test news items
    const newsItems = [
      {
        title: 'Journée Portes Ouvertes',
        content: 'Découvrez nos locaux, rencontrez nos enseignants et nos étudiants lors de notre prochaine journée portes ouvertes.',
        type: 'event',
        eventDate: new Date('2025-06-15'),
        isActive: true,
        createdBy: admin._id
      },
      {
        title: 'Nouveau Partenariat International',
        content: 'Horizons School signe un nouveau partenariat avec une prestigieuse université européenne pour des échanges étudiants.',
        type: 'news',
        isActive: true,
        createdBy: admin._id
      },
      {
        title: 'Atelier sur Intelligence Artificielle',
        content: 'Participez à notre atelier pratique sur les dernières avancées en intelligence artificielle et leurs applications métiers.',
        type: 'event',
        eventDate: new Date('2025-06-22'),
        isActive: true,
        createdBy: admin._id
      }
    ];
    
    // Create test programs
    const programs = [
      {
        title: 'Management',
        description: 'Développez vos compétences en gestion d\'entreprise et leadership.',
        category: 'Management',
        duration: '2 ans',
        level: 'Master',
        features: ['Leadership', 'Stratégie', 'Gestion de projet'],
        seats: 30,
        isActive: true,
        isFeatured: true,
        createdBy: admin._id
      },
      {
        title: 'Ressources Humaines',
        description: 'Maîtrisez les techniques modernes de gestion du capital humain.',
        category: 'RH',
        duration: '2 ans',
        level: 'Master',
        features: ['Recrutement', 'Formation', 'Droit du travail'],
        seats: 25,
        isActive: true,
        isFeatured: true,
        createdBy: admin._id
      },
      {
        title: 'Finance',
        description: 'Apprenez à analyser, prévoir et optimiser les ressources financières.',
        category: 'Finance',
        duration: '2 ans',
        level: 'Master',
        features: ['Comptabilité', 'Audit', 'Analyse financière'],
        seats: 25,
        isActive: true,
        isFeatured: true,
        createdBy: admin._id
      },
      {
        title: 'Commerce',
        description: 'Développez vos compétences en marketing, vente et stratégies commerciales.',
        category: 'Commerce',
        duration: '2 ans',
        level: 'Master',
        features: ['Marketing', 'Vente', 'E-commerce'],
        seats: 30,
        isActive: true,
        isFeatured: true,
        createdBy: admin._id
      }
    ];
    
    // Delete existing content
    await News.deleteMany({});
    console.log('Deleted existing news items');
    
    await Program.deleteMany({});
    console.log('Deleted existing programs');
    
    // Insert new content
    const newsResult = await News.create(newsItems);
    console.log(`Created ${newsResult.length} news items:`, newsResult.map(item => item.title));
    
    const programResult = await Program.create(programs);
    console.log(`Created ${programResult.length} programs:`, programResult.map(item => item.title));
    
    console.log('Test content created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test content:', error);
    process.exit(1);
  }
};

createTestContent(); 