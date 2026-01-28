const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // පාස්වර්ඩ් හංගන්න
const jwt = require('jsonwebtoken'); // ටෝකන් හදන්න

// --- 1. REGISTER (ලියාපදිංචි වීම) ---
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // A. කලින් මේ ඊමේල් එකෙන් කෙනෙක් ඉන්නවද බලනවා
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // B. පාස්වර්ඩ් එක ආරක්ෂිතව වෙනස් කරනවා (Hashing)
    // 10 කියන්නේ ලුණු කැට 10ක් දැම්මා වගේ (Security Level එක)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // C. අලුත් යූසර්ව හදනවා
    const newUser = new User({
      username,
      email,
      password: hashedPassword // අපි සේව් කරන්නේ වෙනස් කරපු පාස්වර්ඩ් එක
    });

    // D. Database එකට සේව් කරනවා
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- 2. LOGIN (ඇතුල් වීම) ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // A. ඊමේල් එක තියෙන කෙනෙක් ඉන්නවද බලනවා
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // B. පාස්වර්ඩ් එක ගැලපෙනවද බලනවා
    // (User ගැහපු පාස්වර්ඩ් එකයි, Database එකේ තියෙන Hashed පාස්වර්ඩ් එකයි සසඳනවා)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" }); // පාස්වර්ඩ් වැරදියි
    }

    // C. හරි නම්, එයාට VIP පාස් එකක් (Token) දෙනවා
    const token = jwt.sign(
      { id: user._id }, // ටෝකන් එක ඇතුලේ යූසර්ගේ ID එක හංගනවා
      "MY_SECRET_KEY",  // මේක පාස්වර්ඩ් එකක් වගේ (පස්සේ අපි .env එකට දාමු)
      { expiresIn: "1h" } // මේ ටෝකන් එක වලංගු වෙන්නේ පැයක් විතරයි
    );

    // D. ටෝකන් එක යූසර්ට යවනවා
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;