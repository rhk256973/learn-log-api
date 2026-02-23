var express = require('express');
var router = express.Router();

const topicController = require('../controllers/topicController');

// Get all topics
router.get('/', topicController.getAllTopics);

// Get topic
router.get('/:id', topicController.getTopicById);

// Create topic
router.post('/', topicController.createTopic);

module.exports = router;