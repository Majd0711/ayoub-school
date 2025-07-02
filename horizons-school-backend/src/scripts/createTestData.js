/**
 * Script to create test data directly in MongoDB Atlas
 */

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// MongoDB Atlas connection string
const uri = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri);

async function createTestData() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    const db = client.db('horizons-school');
    console.log('Connected to MongoDB Atlas');

    // Create test admin
    console.log('Creating test admin...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = {
      name: 'Admin User',
      email: 'admin@horizons-school.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('admins').deleteMany({});
    await db.collection('admins').insertOne(admin);
    console.log('Test admin created');

    // Create test programs
    console.log('Creating test programs...');
    const programs = [
      {
        title: 'Business Management',
        slug: 'business-management',
        description: 'A comprehensive program covering all aspects of business management.',
        category: 'Management',
        duration: '2 ans',
        level: 'Master',
        image: 'program-management.jpg',
        features: ['Strategic Planning', 'Leadership Skills', 'Financial Analysis'],
        modules: [
          { title: 'Strategic Management', description: 'Learn about strategic planning and execution' },
          { title: 'Leadership', description: 'Develop effective leadership skills' }
        ],
        isActive: true,
        isFeatured: true,
        seats: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Financial Analysis',
        slug: 'financial-analysis',
        description: 'Learn financial analysis techniques and tools.',
        category: 'Finance',
        duration: '1 an',
        level: 'Licence',
        image: 'program-finance.jpg',
        features: ['Financial Modeling', 'Investment Analysis', 'Risk Management'],
        modules: [
          { title: 'Financial Statements', description: 'Understanding financial statements' },
          { title: 'Investment Analysis', description: 'Techniques for analyzing investments' }
        ],
        isActive: true,
        isFeatured: true,
        seats: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Human Resources Management',
        slug: 'human-resources-management',
        description: 'Comprehensive program on managing human resources.',
        category: 'Human Resources',
        duration: '1 an',
        level: 'Licence',
        image: 'program-hr.jpg',
        features: ['Recruitment', 'Performance Management', 'Employee Relations'],
        modules: [
          { title: 'Recruitment Process', description: 'Learn effective recruitment techniques' },
          { title: 'Performance Management', description: 'Managing employee performance' }
        ],
        isActive: true,
        isFeatured: false,
        seats: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('programs').deleteMany({});
    await db.collection('programs').insertMany(programs);
    console.log(`${programs.length} test programs created`);

    // Create test news
    console.log('Creating test news...');
    const news = [
      {
        title: 'New Campus Opening',
        slug: 'new-campus-opening',
        content: 'We are excited to announce the opening of our new campus in downtown.',
        summary: 'New campus opening announcement',
        image: 'news/campus.jpeg',
        type: 'announcement',
        isActive: true,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Scholarship Program 2025',
        slug: 'scholarship-program-2025',
        content: 'Applications for our 2025 scholarship program are now open.',
        summary: 'Scholarship applications now open',
        image: 'news/Women_Scholarships.avif',
        type: 'scholarship',
        isActive: true,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('news').deleteMany({});
    await db.collection('news').insertMany(news);
    console.log(`${news.length} test news items created`);

    // Create test team members
    console.log('Creating test team members...');
    const teamMembers = [
      {
        name: 'Dr. Sarah Johnson',
        slug: 'dr-sarah-johnson',
        position: 'Academic Director',
        bio: 'Dr. Sarah Johnson has over 15 years of experience in education management.',
        image: 'team/teacher1.jpg',
        department: 'Management',
        education: [
          { degree: 'PhD in Education', institution: 'Harvard University', year: '2010' }
        ],
        isActive: true,
        isFeatured: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Prof. Michael Chen',
        slug: 'prof-michael-chen',
        position: 'Finance Department Head',
        bio: 'Prof. Chen is an expert in financial management with industry experience.',
        image: 'team/teacher2.jpg',
        department: 'Finance',
        education: [
          { degree: 'MBA', institution: 'Stanford University', year: '2008' }
        ],
        isActive: true,
        isFeatured: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('teammembers').deleteMany({});
    await db.collection('teammembers').insertMany(teamMembers);
    console.log(`${teamMembers.length} test team members created`);

    // Create site settings
    console.log('Creating site settings...');
    const siteSettings = {
      siteName: 'Horizons School',
      siteDescription: 'Leading educational institution for business and management studies',
      contactEmail: 'contact@horizons-school.com',
      contactPhone: '+212 522 123 456',
      address: 'Marrakech, Morocco',
      socialLinks: {
        facebook: 'https://facebook.com/horizonsschool',
        instagram: 'https://instagram.com/horizonsschool',
        linkedin: 'https://linkedin.com/company/horizonsschool'
      },
      metaTags: {
        title: 'Horizons School - Business & Management Education',
        description: 'Leading educational institution in Morocco offering business and management programs',
        keywords: 'education, business, management, school, morocco'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('sitesettings').deleteMany({});
    await db.collection('sitesettings').insertOne(siteSettings);
    console.log('Site settings created');

    console.log('Test data creation completed successfully!');
  } catch (error) {
    console.error('Error creating test data:', error);
  } finally {
    await client.close();
    console.log('MongoDB Atlas connection closed');
  }
}

// Run the function
createTestData(); 