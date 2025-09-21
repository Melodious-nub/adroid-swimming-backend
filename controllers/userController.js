const { validationResult } = require('express-validator');
const User = require('../models/User');

const ensureUniqueUsername = async (baseUsername) => {
  let candidate = baseUsername.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  if (!candidate) candidate = 'user';
  let suffix = 0;
  // Try base, then base_1, base_2, ...
  // Cap attempts to avoid infinite loops
  for (let i = 0; i < 1000; i++) {
    const usernameToTry = suffix === 0 ? candidate : `${candidate}_${suffix}`;
    const exists = await User.findByUsername(usernameToTry);
    if (!exists) return usernameToTry;
    suffix += 1;
  }
  // Fallback with timestamp
  return `${candidate}_${Date.now()}`;
};

// Admin-only: create a new member (role: user)
const createMember = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation Error', errors: errors.array() });
    }

    const { email, password, fullName, username } = req.body;

    const existsByEmail = await User.findByEmail(email);
    if (existsByEmail) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    let finalUsername = username;
    if (finalUsername) {
      const existsByUsername = await User.findByUsername(finalUsername);
      if (existsByUsername) {
        return res.status(400).json({ success: false, message: 'Username already taken' });
      }
    } else {
      const base = (email && email.split('@')[0]) || 'user';
      finalUsername = await ensureUniqueUsername(base);
    }

    const user = await User.create({ username: finalUsername, email, password, fullName, role: 'user' });

    return res.status(201).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = { createMember };


