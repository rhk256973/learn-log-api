const Entry = require('../models/Entry');

const entryController = {
  // GET /entries
  getAllEntries: async (req, res) => {
    try {
      const user_id = req.user.id;
      const entries = await Entry.getAllEntries(user_id);
      res.json({ status: 'success', data: entries });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /entries/:id
  getEntryById: async (req, res) => {
    try {
      const user_id = req.user.id;
      const entry = await Entry.getEntryById(req.params.id, user_id);

      if (!entry) return res.status(404).json({ message: 'Entry not found' });
      res.json({ status: 'success', data: entry });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /entries (create)
  createEntry: async (req, res) => {
    try {
      const user_id = req.user.id;
      const { topic_id, note, minutes } = req.body;

      if (!topic_id) {
        return res.status(400).json({ message: 'topic_id is required' });
      }

      const newId = await Entry.createEntry(user_id, topic_id, note, minutes);
      res.status(201).json({ status: 'success', id: newId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // PUT /entries/:id
  updateEntry: async (req, res) => {
    try {
      const user_id = req.user.id;
      const { topic_id, note, minutes } = req.body;

      if (!topic_id) {
        return res.status(400).json({ message: 'topic_id is required' });
      }

      const affected = await Entry.updateEntry(req.params.id, user_id, topic_id, note, minutes);
      if (affected === 0) return res.status(404).json({ message: 'Entry not found' });

      res.json({ status: 'success', message: 'Entry updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /entries/:id
  deleteEntry: async (req, res) => {
    try {
      const user_id = req.user.id;
      const affected = await Entry.deleteEntry(req.params.id, user_id);

      if (affected === 0) return res.status(404).json({ message: 'Entry not found' });

      res.json({ status: 'success', message: 'Entry deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = entryController;