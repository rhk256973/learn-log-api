const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userController = {

  // GET /users  (protect with auth later)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.json({ status: 'success', data: users });
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
    
  },
  // POST /users/register
  register: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    try {
      const existing = await User.findByEmail(email);
      if (existing) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      const hash = await bcrypt.hash(password, 10);
      const newId = await User.createUser(email, hash);

      res.status(201).json({ status: 'success', id: newId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /users/login
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and Password are required' });
    }

    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ status: 'success', token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = userController;