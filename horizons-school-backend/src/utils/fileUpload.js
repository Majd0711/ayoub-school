const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Ensure uploads directories exist with proper permissions
const createDirIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true, mode: 0o777 });
  } else {
    // Ensure proper permissions on existing directory
    fs.chmodSync(dir, 0o777);
  }
};

// Create upload directories with proper permissions
const uploadsDir = path.join(__dirname, '../../public/uploads');
createDirIfNotExists(uploadsDir);
createDirIfNotExists(path.join(uploadsDir, 'programs'));
createDirIfNotExists(path.join(uploadsDir, 'news'));
createDirIfNotExists(path.join(uploadsDir, 'team'));

// Storage configuration for program images
const programStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../public/uploads/programs');
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Storage configuration for news images
const newsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../public/uploads/news');
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Storage configuration for team member images
const teamStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../public/uploads/team');
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Export upload middleware with error handling
const handleUpload = (upload) => (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: 'File upload error',
        error: err.message
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type',
        error: err.message
      });
    }
    next();
  });
};

// Export upload middleware with error handling
exports.uploadProgramImage = handleUpload(multer({
  storage: programStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
}).single('image'));

exports.uploadNewsImage = handleUpload(multer({
  storage: newsStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
}).single('image'));

exports.uploadTeamMemberImage = handleUpload(multer({
  storage: teamStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
}).single('image')); 