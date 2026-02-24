var express = require('express');
var router = express.Router();

const topicController = require('../controllers/topicController');
const auth = require('../middleware/auth');

// Get all topics (no login needed - public)
router.get('/', topicController.getAllTopics);

// Get topic (no login needed - public)
router.get('/:id', topicController.getTopicById);

// Create topic (login required - private)
router.post('/', auth, topicController.createTopic);

// Update topic (login required - private)
router.put('/:id', auth, topicController.updateTopic);

// Delete topic (login required - private)
router.delete('/:id', auth, topicController.deleteTopic);

module.exports = router;