var express = require('express');
var router = express.Router();

const entryController = require('../controllers/entryController');
const auth = require('../middleware/auth');

// Private
// Get all entries
router.get('/', auth, entryController.getAllEntries);

// Get entry
router.get('/:id', auth, entryController.getEntryById);

// Create entry
router.post('/', auth, entryController.createEntry);

// Update entry
router.put('/:id', auth, entryController.updateEntry);

// Delete entry
router.delete('/:id', auth, entryController.deleteEntry);

module.exports = router;