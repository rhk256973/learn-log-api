const Topic = require('../models/Topic');

const topicController = {

  // GET /topics
  getAllTopics: async (req, res) => {
    try {
      const topics = await Topic.getAllTopics();
      res.json({ status: 'success', data: topics });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /topics/:id
  getTopicById: async (req, res) => {
    try {
      const topic = await Topic.getTopicById(req.params.id);

      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
      }

      res.json({ status: 'success', data: topic });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /topics
  createTopic: async (req, res) => {
    const { user_id, title, goal, status } = req.body;

    if (!user_id || !title) {
      return res.status(400).json({
        message: 'user_id and title are required'
      });
    }

    try {
      const newId = await Topic.createTopic(
        user_id,
        title,
        goal,
        status
      );

      res.status(201).json({
        status: 'success',
        id: newId
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};

module.exports = topicController;