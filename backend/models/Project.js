// server/models/Project.js
const mongoose = require('mongoose');


const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Every project MUST have a title
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'], // It can ONLY be one of these three
    required: true
  },
  techStack: {
    type: [String], // An array of strings, e.g., ["HTML", "CSS", "React"]
    required: true
  },
  description: {
    type: String,
    required: true
  },
  previewImage: {
    type: String, // This will be a URL link to the image
    required: true
  },
  assetsLink: {
    type: String, // This will be the Google Drive/Dropbox link for users to download
    required: false // Optional, in case you don't have assets for a project yet
  }
}, {
  timestamps: true // Automatically adds "createdAt" and "updatedAt" times
});

// Create the model based on the schema
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;