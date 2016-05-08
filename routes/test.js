var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function (req, res, next) {
  res.send('Got a GET request at /test');
});

router.put('/', function (req, res, next) {
  res.send('Got a PUT request at /test');
});

router.post('/', function (req, res, next) {
  res.send('Got a POST request at /test');
});

module.exports = router;
