var express = require('express');
var router = express.Router();
const db = require('../config/database');

// GET /topics  -> list all topics
router.get('/', async function(req, res, next) {
  try {
    const [rows] = await db.query('SELECT * FROM topics ORDER BY id DESC');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /topics/:id -> one topic
router.get('/:id', async function(req, res, next) {
  try {
    const [rows] = await db.query('SELECT * FROM topics WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Topic not found' });
    res.json({ status: 'success', data: rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /topics -> create a topic
router.post('/', async function(req, res, next) {
  const { user_id, title, goal, status } = req.body;

  if (!user_id || !title) {
    return res.status(400).json({ message: 'user_id and title are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO topics (user_id, title, goal, status) VALUES (?, ?, ?, ?)',
      [user_id, title, goal || null, status || 'active']
    );

    res.status(201).json({
      status: 'success',
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
