/**
 * Created by dowling on 17/09/16.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var numUsers = 0;

var User = mongoose.model('User', {
    name: String,
    avatarName: String,
    userId: Number,
    score: Number,
    activityLevel: Number
});

function saveUser(name, avatarName, activityLevel) {
    var newUser = new User({ name: name, avatarName: avatarName, activityLevel: activityLevel, userId: numUsers+1});
    newUser.save(function (err) {
        if(err){
            console.log(err);
        } else {
            console.log('Could not save User.')
        }
    });
    numUsers++;
}

function createSomeUsers() {
    console.log("Creating some test users!");
    saveUser('Philipp', 'Gini 2.0', 1);
    saveUser('Felix', 'Schwarzenpanda', 3);
}

User.find({}).count().then(function (err, nUsers) {
    if (err) return console.error(err);
    numUsers = nUsers;

    console.log("numUsers: " + nUsers);
    if (nUsers == 0){
        createSomeUsers();
    }else {
        User.find({}, function (res) {
            console.log(res);
        });
    }
});


module.exports = {
  User: User
};



