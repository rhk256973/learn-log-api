const db = require('../config/database');
const { getAllTopics, createTopics } = require('../controllers/topicController');

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
  }

};

module.exports = Topic;