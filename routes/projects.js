var express = require('express');
var router = express.Router();

/* GET projects page. */
router.get('/', function (req, res, next) {
  res.render('projects', {
    title: 'projects',
    header: 'projects',
  });
});

router.get('/bots', function (req, res, next) {
  res.send('bots');
});

router.get('/gbmf', function (req, res, next) {
  res.send('gbmf');
});

module.exports = router;
