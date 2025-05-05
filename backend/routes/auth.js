import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // make sure User.js uses ES export

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('📩 Received signup request:', req.body);

    const existing = await User.findOne({ username });
    if (existing) {
      console.log('❗ User already exists:', username);
      return res.status(400).json({ error: 'User already exists' });
    }

    console.log('✅ User does not exist, proceeding with signup');
    const passwordHash = await bcrypt.hash(password, 10);

    if (!passwordHash) {
      console.log('❌ Password hashing failed');
      return res.status(500).json({ error: 'Password hashing failed' });
    }

    const user = new User({ username, passwordHash });
    await user.save();
    console.log('✅ User created successfully:', username);

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('🔥 Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('🔑 Login attempt for:', username);

    const user = await User.findOne({ username });
    if (!user) {
      console.log('❌ User not found:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('🔍 User found. Verifying password...');
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      console.log('❌ Password mismatch for:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('✅ Password correct. Generating token...');
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '2h' });
    console.log('✅ Token generated:', token);

    res.json({ token });
  } catch (err) {
    console.error('🔥 Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
