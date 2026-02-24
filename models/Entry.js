const db = require('../config/database');

const Entry = {
  // GET all entries for logged-in user
  getAllEntries: async (user_id) => {
    const [rows] = await db.query(
      'SELECT * FROM entries WHERE user_id = ? ORDER BY id DESC',
      [user_id]
    );
    return rows;
  },

  // GET one entry by id (only if it belongs to user)
  getEntryById: async (id, user_id) => {
    const [rows] = await db.query(
      'SELECT * FROM entries WHERE id = ? AND user_id = ?',
      [id, user_id]
    );
    return rows[0];
  },

  // CREATE entry
  createEntry: async (user_id, topic_id, note, minutes) => {
    const [result] = await db.query(
      'INSERT INTO entries (user_id, topic_id, note, minutes) VALUES (?, ?, ?, ?)',
      [user_id, topic_id, note || null, minutes || 0]
    );
    return result.insertId;
  },

  // UPDATE entry (only if belongs to user)
  updateEntry: async (id, user_id, topic_id, note, minutes) => {
    const [result] = await db.query(
      'UPDATE entries SET topic_id = ?, note = ?, minutes = ? WHERE id = ? AND user_id = ?',
      [topic_id, note || null, minutes || 0, id, user_id]
    );
    return result.affectedRows;
  },

  // DELETE entry (only if belongs to user)
  deleteEntry: async (id, user_id) => {
    const [result] = await db.query(
      'DELETE FROM entries WHERE id = ? AND user_id = ?',
      [id, user_id]
    );
    return result.affectedRows;
  }
};

module.exports = Entry;