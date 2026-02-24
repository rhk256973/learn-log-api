var express = require('express');
var router = express.Router();

const topicController = require('../controllers/topicController');
const auth = require('../middleware/auth');

// Public
// Get all topics (no login needed - public)
router.get('/', topicController.getAllTopics);

// Get topic (no login needed - public)
router.get('/:id', topicController.getTopicById);


// Private
// Create topic (login required)
router.post('/', auth, topicController.createTopic);

// Update topic (login required)
router.put('/:id', auth, topicController.updateTopic);

// Delete topic (login required )
router.delete('/:id', auth, topicController.deleteTopic);

module.exports = router;