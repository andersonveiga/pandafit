var express = require('express');
var router = express.Router();
var models = require("../models/models");

var scores = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users/:userid', function (req, res, next) {
  var userid = req.params.userid;

  models.User.findOne({'userId': userid}, function (err, user) {
    if (err) return console.error(err);
    if (!user) {
      models.createRandomUser(userid, function (res) {
        console.log("(created new user) " + JSON.stringify(res));
        res.send(user);
      });
    } else {
      console.log("Sending user: " + JSON.stringify(user));
      res.send(user);
    }
  });
});

router.get('/score/:userid', function (req, res, next) {
  var userid = req.params.userid;
  models.User.findOne({'userId': userid}, function (err, user) {
    if (err) return console.error(err);
    if (!user){
      models.createRandomUser(userid, function (res) {
        console.log("(created new user)");
        res.send({"score": res.score});
      });
    }else{
      console.log("Sending score: " + user.score);
      res.send({"score": user.score});
    }


  });

});

router.post('/steps/:userid', function (req, res, next) {
  var userid = req.params.userid;
  console.log("userid " + userid);
  var steps = parseInt(req.body.numSteps);
  console.log("GOT: " + JSON.stringify(req.body));
  models.User.findOne({'userId': userid}, function (err, user) {
    if (err) return console.error(err);
    console.log("USER: " + JSON.stringify(user));

    var multiplier;
    if (user.activityLevel == 1){
      multiplier = 0.006;
    } else if (user.activityLevel == 2) {
      multiplier = 0.005;
    } else multiplier = 0.004;

    var score = user.score + multiplier * steps;
    console.log("Updated score is: " + score);
    models.User.update({'userId': userid}, {'score': score}, function (err, mres) {
      if (err){
        console.log(err);
      }
      res.send({'score': mres});
    });

  });
});

module.exports = router;
