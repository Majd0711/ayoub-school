/**
 * Script to migrate data from local MongoDB to MongoDB Atlas
 */

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// Local MongoDB connection string
const localUri = 'mongodb://localhost:27017/horizons-school';

// MongoDB Atlas connection string
const atlasUri = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

// Models
const Program = require('../models/Program');
const Admin = require('../models/Admin');
const Contact = require('../models/Contact');
const News = require('../models/News');
const Partner = require('../models/Partner');
const TeamMember = require('../models/TeamMember');
// Check if SiteSetting model exists
let SiteSetting;
try {
  SiteSetting = require('../models/SiteSetting');
} catch (error) {
  console.log('SiteSetting model not found, will skip migrating site settings');
}

async function migrateData() {
  try {
    console.log('Starting migration from local MongoDB to MongoDB Atlas...');
    
    // Connect to local MongoDB
    console.log('Connecting to local MongoDB...');
    await mongoose.connect(localUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to local MongoDB');
    
    // Fetch all data from local MongoDB
    console.log('Fetching data from local MongoDB...');
    
    const programs = await Program.find({});
    console.log(`Found ${programs.length} programs`);
    
    const admins = await Admin.find({});
    console.log(`Found ${admins.length} admins`);
    
    const contacts = await Contact.find({});
    console.log(`Found ${contacts.length} contacts`);
    
    const news = await News.find({});
    console.log(`Found ${news.length} news items`);
    
    const partners = await Partner.find({});
    console.log(`Found ${partners.length} partners`);
    
    const teamMembers = await TeamMember.find({});
    console.log(`Found ${teamMembers.length} team members`);
    
    let siteSettings = [];
    if (SiteSetting) {
      try {
        siteSettings = await SiteSetting.find({});
        console.log(`Found ${siteSettings.length} site settings`);
      } catch (error) {
        console.log('Error fetching site settings:', error.message);
      }
    }
    
    // Close local MongoDB connection
    await mongoose.connection.close();
    console.log('Closed local MongoDB connection');
    
    // Connect to MongoDB Atlas
    console.log('Connecting to MongoDB Atlas...');
    const atlasClient = new MongoClient(atlasUri);
    await atlasClient.connect();
    const atlasDb = atlasClient.db('horizons-school');
    console.log('Connected to MongoDB Atlas');
    
    // Migrate data to MongoDB Atlas
    console.log('Migrating data to MongoDB Atlas...');
    
    if (programs.length > 0) {
      await atlasDb.collection('programs').deleteMany({});
      await atlasDb.collection('programs').insertMany(programs.map(doc => doc.toObject()));
      console.log(`Migrated ${programs.length} programs`);
    }
    
    if (admins.length > 0) {
      await atlasDb.collection('admins').deleteMany({});
      await atlasDb.collection('admins').insertMany(admins.map(doc => doc.toObject()));
      console.log(`Migrated ${admins.length} admins`);
    }
    
    if (contacts.length > 0) {
      await atlasDb.collection('contacts').deleteMany({});
      await atlasDb.collection('contacts').insertMany(contacts.map(doc => doc.toObject()));
      console.log(`Migrated ${contacts.length} contacts`);
    }
    
    if (news.length > 0) {
      await atlasDb.collection('news').deleteMany({});
      await atlasDb.collection('news').insertMany(news.map(doc => doc.toObject()));
      console.log(`Migrated ${news.length} news items`);
    }
    
    if (partners.length > 0) {
      await atlasDb.collection('partners').deleteMany({});
      await atlasDb.collection('partners').insertMany(partners.map(doc => doc.toObject()));
      console.log(`Migrated ${partners.length} partners`);
    }
    
    if (teamMembers.length > 0) {
      await atlasDb.collection('teammembers').deleteMany({});
      await atlasDb.collection('teammembers').insertMany(teamMembers.map(doc => doc.toObject()));
      console.log(`Migrated ${teamMembers.length} team members`);
    }
    
    if (siteSettings.length > 0) {
      await atlasDb.collection('sitesettings').deleteMany({});
      await atlasDb.collection('sitesettings').insertMany(siteSettings.map(doc => doc.toObject()));
      console.log(`Migrated ${siteSettings.length} site settings`);
    }
    
    // Close MongoDB Atlas connection
    await atlasClient.close();
    console.log('Closed MongoDB Atlas connection');
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migration
migrateData(); 