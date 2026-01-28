const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // එකම ඊමේල් එකෙන් දෙන්නෙක්ට රෙජිස්ටර් වෙන්න බෑ
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);