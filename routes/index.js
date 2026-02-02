var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    status: 'success',
    message: 'Hello World! Learn Log API is live.',
    timestamp: new Date()
  });
});

module.exports = router;
