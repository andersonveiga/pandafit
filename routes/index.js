var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/score', function (req, res, next) {
  res.send({"score": 50});  // TODO get from data
});

module.exports = router;
