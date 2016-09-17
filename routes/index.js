var express = require('express');
var router = express.Router();
var models = require("../models/models");

var scores = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/score/:userid', function (req, res, next) {
  var userdId = req.params.userid;
  var user = models.User.findOne({'userId': userid});
  res.send({"score": user.score});
});

router.post('/steps/:userid', function (req, res, next) {
  var userid = parseInt(req.params.userid);
  console.log("userid " + userid);
  var steps = req.body.numSteps;
  console.log("GOT: " + JSON.stringify(req.body));
  var user = models.User.findOne({'userId': userid});
  console.log("USER: " + user.name);

  var multiplier;
  if (user.activityLevel == 1){
    multiplier = 0.006;
  } else if (user.activityLevel == 2) {
    multiplier = 0.005;
  } else multiplier = 0.004;

  var score = user.score + multiplier * steps;
  models.User.update({'userId': userid}, {'score': score});
});

module.exports = router;
