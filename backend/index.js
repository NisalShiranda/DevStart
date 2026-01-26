require('dotenv').config(); // Load variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const projectRoutes = require('./routes/project.js');

const app = express();

// --- MIDDLEWARE ---
// This allows us to read JSON data sent from the frontend
app.use(express.json());
// This allows the frontend to talk to this server
app.use(cors());

app.use('/api/projects', projectRoutes);

// --- DATABASE CONNECTION ---
// Get the connection string from .env
const uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log("MongoDB connection established successfully!"))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

// --- ROUTES ---
// A test route to make sure it works
app.get('/', (req, res) => {
    res.send('API is running...');
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});