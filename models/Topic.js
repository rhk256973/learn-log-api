const db = require('../config/database');

const Topic = {
  // Get all topics
  getAllTopics: async function () {
    const [rows] = await db.query(
      'SELECT * FROM topics ORDER BY id DESC'
    );
    return rows;
  },

  // Get topic by id
  getTopicById: async function (id) {
    const [rows] = await db.query(
      'SELECT * FROM topics WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  // Create topic
  createTopic: async function (user_id, title, goal, status) {
    const [result] = await db.query(
      'INSERT INTO topics (user_id, title, goal, status) VALUES (?, ?, ?, ?)',
      [user_id, title, goal || null, status || 'active']
    );
    return result.insertId;
  },

  // Update topic by id
  updateTopic: async function (id, title, goal, status) {
    const [result] = await db.query(
      'UPDATE topics SET title = ?, goal = ?, status = ? WHERE id = ?',
      [title, goal || null, status || 'active', id]
    );
    return result.affectedRows; // how many rows updated
  },

  // Delete topic by id
  deleteTopic: async function (id) {
    const [result] = await db.query(
      'DELETE FROM topics WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }
};

module.exports = Topic;