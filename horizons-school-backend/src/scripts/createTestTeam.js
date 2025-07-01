const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const TeamMember = require('../models/TeamMember');
require('dotenv').config();

// Connect to MongoDB with hardcoded URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/horizons-school';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to create test team members
async function createTestTeam() {
  try {
    // Find admin user to use as creator
    const admin = await Admin.findOne();
    
    if (!admin) {
      console.error('No admin user found. Please run createAdmin.js first.');
      process.exit(1);
    }

    // Delete existing team members
    await TeamMember.deleteMany({});
    console.log('Deleted existing team members');

    // Create team members
    const teamMembers = [
      {
        name: 'M. Ayoub El Hajouji',
        position: 'Directeur Général',
        bio: 'Expert en gestion d\'établissements éducatifs avec une vision stratégique pour l\'enseignement supérieur.',
        department: 'Management',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/ayoub-el-hajouji',
          email: 'ayoub@horizons-school.ma'
        },
        order: 1,
        isActive: true,
        createdBy: admin._id
      },
      {
        name: 'Dr. Fatima Zahra Bennani',
        position: 'Directrice Pédagogique',
        bio: 'Docteur en sciences de l\'éducation avec plus de 15 ans d\'expérience dans le développement de programmes académiques innovants.',
        department: 'Academic',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/fatima-bennani',
          email: 'fatima@horizons-school.ma'
        },
        order: 2,
        isActive: true,
        createdBy: admin._id
      },
      {
        name: 'M. Hassan Alaoui',
        position: 'Professeur de Management',
        bio: 'Spécialiste en management stratégique et en leadership, avec une expérience professionnelle dans des multinationales.',
        department: 'Academic',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/hassan-alaoui',
          twitter: 'https://twitter.com/hassan_alaoui',
          email: 'hassan@horizons-school.ma'
        },
        order: 3,
        isActive: true,
        createdBy: admin._id
      },
      {
        name: 'Mme. Nadia Berrada',
        position: 'Professeure de Finance',
        bio: 'Experte en finance d\'entreprise et marchés financiers, ancienne analyste financière chez Attijariwafa Bank.',
        department: 'Academic',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/nadia-berrada',
          email: 'nadia@horizons-school.ma'
        },
        order: 4,
        isActive: true,
        createdBy: admin._id
      },
      {
        name: 'M. Karim Tazi',
        position: 'Responsable des Relations Entreprises',
        bio: 'Chargé des partenariats avec les entreprises et de l\'insertion professionnelle des étudiants.',
        department: 'Administrative',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/karim-tazi',
          email: 'karim@horizons-school.ma'
        },
        order: 5,
        isActive: true,
        createdBy: admin._id
      },
      {
        name: 'Mme. Laila Chraibi',
        position: 'Responsable Admission',
        bio: 'En charge du processus d\'admission et d\'orientation des nouveaux étudiants.',
        department: 'Administrative',
        socialLinks: {
          email: 'laila@horizons-school.ma'
        },
        order: 6,
        isActive: true,
        createdBy: admin._id
      }
    ];

    // Insert team members
    await TeamMember.insertMany(teamMembers);
    console.log(`Created ${teamMembers.length} test team members`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error creating test team members:', error);
    process.exit(1);
  }
}

// Run the function
createTestTeam(); 