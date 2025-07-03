const mongoose = require('mongoose');
const News = require('../models/News');
const Admin = require('../models/Admin');
require('dotenv').config();

// Connect to MongoDB with the provided Atlas URI
const MONGODB_URI = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

console.log('Attempting to connect to MongoDB Atlas...');

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

async function createTestNews() {
  try {
    // Find admin user to use as creator
    const admin = await Admin.findOne();
    
    if (!admin) {
      console.error('No admin user found. Please run createAdmin.js first.');
      process.exit(1);
    }
    
    console.log('Using admin:', admin.email);

    // Delete existing news items
    await News.deleteMany({});
    console.log('Deleted existing news items');

    // Create news items
    const newsItems = [
      {
        title: 'Ouverture des inscriptions pour l\'année académique 2023-2024',
        content: '<p>Horizons School est heureux d\'annoncer l\'ouverture des inscriptions pour l\'année académique 2023-2024. Nous offrons une variété de programmes dans les domaines du commerce, de la finance, des ressources humaines et du management.</p><p>Pour plus d\'informations, veuillez visiter notre page des programmes ou nous contacter directement.</p>',
        summary: 'Les inscriptions sont maintenant ouvertes pour tous nos programmes.',
        image: 'inscriptipn ouverte.jpg',
        type: 'news',
        category: 'admissions',
        isActive: true,
        isFeatured: true,
        createdBy: admin._id
      },
      {
        title: 'Conférence sur l\'entrepreneuriat au Maroc',
        content: '<p>Horizons School organisera une conférence sur l\'entrepreneuriat au Maroc le 15 octobre 2023. Des experts de l\'industrie et des entrepreneurs à succès partageront leurs expériences et leurs conseils.</p><p>La conférence est ouverte à tous les étudiants et au public. L\'inscription est gratuite mais obligatoire.</p>',
        summary: 'Rejoignez-nous pour une journée d\'apprentissage et de networking.',
        image: 'commerce.jpg',
        type: 'event',
        category: 'academic',
        eventDate: '2023-10-15T14:00:00',
        eventLocation: 'Campus Horizons School, Marrakech',
        isActive: true,
        isFeatured: true,
        createdBy: admin._id
      },
      {
        title: 'Nouveau partenariat avec des entreprises locales',
        content: '<p>Nous sommes fiers d\'annoncer notre nouveau partenariat avec plusieurs entreprises locales pour offrir des stages et des opportunités d\'emploi à nos étudiants.</p><p>Ce partenariat permettra à nos étudiants d\'acquérir une expérience pratique précieuse tout en poursuivant leurs études.</p>',
        summary: 'Des opportunités de stage et d\'emploi pour nos étudiants.',
        image: 'management.jpg',
        type: 'news',
        category: 'partnership',
        isActive: true,
        isFeatured: false,
        createdBy: admin._id
      },
      {
        title: 'Atelier sur les compétences en leadership',
        content: '<p>Un atelier sur les compétences en leadership sera organisé le 5 novembre 2023. Cet atelier interactif aidera les participants à développer leurs compétences en leadership et en gestion d\'équipe.</p><p>L\'atelier est ouvert à tous les étudiants et au personnel de l\'école.</p>',
        summary: 'Développez vos compétences en leadership.',
        image: 'management.jpg',
        type: 'workshop',
        category: 'academic',
        eventDate: '2023-11-05T10:00:00',
        eventLocation: 'Salle de conférence, Campus Horizons School',
        isActive: true,
        isFeatured: false,
        createdBy: admin._id
      },
      {
        title: 'Lancement du programme de bourses d\'études',
        content: '<p>Horizons School est heureux d\'annoncer le lancement de notre programme de bourses d\'études pour l\'année académique 2023-2024.</p><p>Les bourses seront attribuées sur la base du mérite académique et des besoins financiers. Les candidatures sont ouvertes jusqu\'au 30 août 2023.</p>',
        summary: 'Opportunités de bourses pour les étudiants méritants.',
        image: 'Women_Scholarships.avif',
        type: 'news',
        category: 'admissions',
        isActive: true,
        isFeatured: true,
        createdBy: admin._id
      },
      {
        title: 'Rénovation du campus',
        content: '<p>Nous sommes heureux d\'annoncer que la rénovation de notre campus est maintenant terminée. Les nouvelles installations comprennent des salles de classe modernisées, une bibliothèque agrandie et un espace étudiant rénové.</p><p>Nous invitons tous les étudiants et le personnel à découvrir ces nouvelles installations.</p>',
        summary: 'Découvrez nos nouvelles installations modernisées.',
        image: 'campus.jpeg',
        type: 'news',
        category: 'campus',
        isActive: true,
        isFeatured: false,
        createdBy: admin._id
      },
      {
        title: 'Séminaire sur la finance internationale',
        content: '<p>Un séminaire sur la finance internationale sera organisé le 20 septembre 2023. Ce séminaire couvrira les tendances actuelles de la finance internationale et leur impact sur l\'économie marocaine.</p><p>Le séminaire est ouvert à tous les étudiants et au public. L\'inscription est gratuite mais obligatoire.</p>',
        summary: 'Explorez les tendances actuelles de la finance internationale.',
        image: 'finance.jpg',
        type: 'event',
        category: 'academic',
        eventDate: '2023-09-20T15:00:00',
        eventLocation: 'Auditorium, Campus Horizons School',
        isActive: true,
        isFeatured: false,
        createdBy: admin._id
      },
      {
        title: 'Journée portes ouvertes',
        content: '<p>Horizons School organisera une journée portes ouvertes le 25 août 2023. C\'est une excellente occasion pour les futurs étudiants et leurs parents de visiter notre campus, de rencontrer nos enseignants et d\'en savoir plus sur nos programmes.</p><p>Aucune inscription préalable n\'est nécessaire. Nous vous attendons nombreux !</p>',
        summary: 'Visitez notre campus et découvrez nos programmes.',
        image: 'school-building.jpg',
        type: 'event',
        category: 'admissions',
        eventDate: '2023-08-25T09:00:00',
        eventLocation: 'Campus Horizons School, Marrakech',
        isActive: true,
        isFeatured: true,
        createdBy: admin._id
      }
    ];

    // Insert news items
    await News.insertMany(newsItems);
    console.log(`${newsItems.length} news items created successfully`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating test news:', error);
    process.exit(1);
  }
}

createTestNews(); 