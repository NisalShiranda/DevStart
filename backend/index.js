require('dotenv').config(); // Load variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- MIDDLEWARE ---
// This allows us to read JSON data sent from the frontend
app.use(express.json());
// This allows the frontend to talk to this server
app.use(cors());

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