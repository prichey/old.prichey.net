var express = require('express');
var router = express.Router();

/* GET lillies page. */
router.get('/', function (req, res, next) {
  res.render('lillies', {
    title: 'water lillies vr'
  });
});

module.exports = router;
