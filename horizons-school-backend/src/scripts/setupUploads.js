const fs = require('fs');
const path = require('path');

// Define the base uploads directory
const baseDir = path.join(__dirname, '../../public/uploads');
console.log(`Base uploads directory: ${baseDir}`);

// Define subdirectories
const directories = [
  'news',
  'programs',
  'team'
];

// Create the directories
console.log('Setting up uploads directory structure...');

// Create base directory if it doesn't exist
if (!fs.existsSync(baseDir)) {
  console.log(`Base directory doesn't exist, creating: ${baseDir}`);
  fs.mkdirSync(baseDir, { recursive: true });
  console.log(`Created base directory: ${baseDir}`);
} else {
  console.log(`Base directory already exists: ${baseDir}`);
}

// Create subdirectories
directories.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  console.log(`Checking directory: ${fullPath}`);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Directory doesn't exist, creating: ${fullPath}`);
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${fullPath}`);
    
    // Create a placeholder file to ensure the directory is not empty
    const placeholderPath = path.join(fullPath, '.gitkeep');
    fs.writeFileSync(placeholderPath, '# This file ensures the directory is not empty');
    console.log(`Created placeholder file: ${placeholderPath}`);
  } else {
    console.log(`Directory already exists: ${fullPath}`);
  }
});

console.log('Upload directories setup complete!'); 