const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation Error', errors: errors.array() });
    }

    const { username, email, password, fullName } = req.body;

    const existsByEmail = await User.findByEmail(email);
    if (existsByEmail) return res.status(400).json({ success: false, message: 'User already exists' });

    const existsByUsername = await User.findByUsername(username);
    if (existsByUsername) return res.status(400).json({ success: false, message: 'Username already taken' });

    // All registered users are admins by default per requirements
    const user = await User.create({ username, email, password, fullName, role: 'admin' });

    return res.status(201).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        token: generateToken(user.id)
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation Error', errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const ok = await User.comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        token: generateToken(user.id)
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = { register, login, getMe };


