var express = require('express');
var router = express.Router();

// http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=prichey&api_key=d2e1283a31bd5b2c450f7ed61cf9ab2e&format=json&limit=1

/* GET about page. */
router.get('/', function (req, res, next) {
  res.render('about', {
    title: 'about'
  });
});

module.exports = router;
