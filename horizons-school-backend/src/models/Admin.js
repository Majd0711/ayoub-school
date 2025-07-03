const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'super-admin'],
    default: 'admin',
  },
  lastLogin: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    console.log('Hashing password for admin:', this.email);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    console.log('Original password length:', this.password.length);
    console.log('Hashed password length:', hashedPassword.length);
    this.password = hashedPassword;
    console.log('Password hashed successfully');
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Method to check password
adminSchema.methods.matchPassword = async function(enteredPassword) {
  try {
    if (!this.password) {
      console.error('No password hash found for admin:', this.email);
      return false;
    }
    
    console.log('Matching password for admin:', this.email);
    console.log('Stored hash length:', this.password.length);
    console.log('Entered password length:', enteredPassword.length);
    
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log('Password match result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error matching password:', error);
    return false;
  }
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin; 