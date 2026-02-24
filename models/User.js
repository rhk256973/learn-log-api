const db = require('../config/database');

const User = {
  getAllUsers: async () => {
    const [rows] = await db.query('SELECT id, email, created_at FROM users');
    return rows;
  },

  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  createUser: async (email, password_hash) => {
    const [result] = await db.query(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)',
      [email, password_hash]
    );
    return result.insertId;
  }
};

module.exports = User;