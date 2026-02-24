const Topic = require('../models/Topic');

const topicController = {

  // GET /get all topics
  getAllTopics: async (req, res) => {
    try {
      const topics = await Topic.getAllTopics();
      res.json({ status: 'success', data: topics });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /get topics/:id
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

  // POST /create topics
  createTopic: async (req, res) => {
    const user_id = req.user.id;   // from JWT token
    const { title, goal, status } = req.body;

    if (!title) {
      return res.status(400).json({
        message: 'title is required'
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
  },

  // PUT /topics/:id
  updateTopic: async (req, res) => {
    const { title, goal, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'title is required' });
    }

    try {
      const affected = await Topic.updateTopic(req.params.id, title, goal, status);

      if (affected === 0) {
        return res.status(404).json({ message: 'Topic not found' });
      }

      res.json({ status: 'success', message: 'Topic updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /topics/:id
  deleteTopic: async (req, res) => {
    try {
      const affected = await Topic.deleteTopic(req.params.id);

      if (affected === 0) {
        return res.status(404).json({ message: 'Topic not found' });
      }

      res.json({ status: 'success', message: 'Topic deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};
  
module.exports = topicController;