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
  },// --- අලුත් කොටස 1: ROLE (Admin ද User ද?) ---
  role: {
    type: String,
    default: 'user', // කවුරු රෙජිස්ටර් වුනත් මුලින්ම එයා සාමාන්‍ය 'user' කෙනෙක්
    enum: ['user', 'admin'] 
  },
  // --- අලුත් කොටස 2: SAVED PROJECTS (Bookmark කරපුවා) ---
  savedProjects: [{
    type: mongoose.Schema.Types.ObjectId, // අපි මෙතන සේව් කරන්නේ Project එකේ ID එක විතරයි
    ref: 'Project' // ඒ ID එක අයිති 'Project' කියන මොඩල් එකට
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);