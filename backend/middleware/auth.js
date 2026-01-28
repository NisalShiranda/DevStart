const jwt = require('jsonwebtoken');
const User = require('../models/User');

// මේක තමයි මුරකරු (Function එක)
const adminAuth = async (req, res, next) => {
  try {
    // 1. හෙඩර් එකෙන් ටෝකන් එක ගන්නවා
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // 2. ටෝකන් එක ඇත්ත එකක්ද බලනවා (Verify)
    // (මුලින් එන 'Bearer ' කෑල්ල අයින් කරනවා)
    const verified = jwt.verify(token.replace("Bearer ", ""), "MY_SECRET_KEY");
    
    // 3. යූසර්ගේ විස්තර Database එකෙන් ගන්නවා
    const user = await User.findById(verified.id);

    // 4. එයා Admin ද බලනවා
    if (user.role !== 'admin') {
      return res.status(403).json({ message: "Access Denied. You are not an Admin!" });
    }

    // 5. ඔක්කොම හරි නම්, ඇතුලට යන්න දෙනවා
    req.user = user;
    next();

  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = adminAuth;