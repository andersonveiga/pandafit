/**
 * Created by dowling on 17/09/16.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var User = mongoose.model('User', {
    name: String,
    avatarName: String,
    userId: Number,
    score: Number,
    activityLevel: Number
});

function saveUser(name, avatarName, activityLevel) {
    var numUsers = User.find({}).count();
    var newUser = new User({ name: name, avatarName: avatarName, activityLevel: activityLevel, userId: numUsers+1});
    newUser.save(function (err) {
        if(err){
            console.log(err);
        } else {
            console.log('Could not save User.')
        }
    });
}

function createSomeUsers() {
    console.log("Creating some test users!");
    saveUser('Philipp', 'Gini 2.0', 1);
    saveUser('Felix', 'Schwarzenpanda', 3);
}

var numUsers = User.find({}).count();
if (numUsers == 0){
    createSomeUsers();
}else{
    console.log(Users.find({}));
}

module.exports = {
  User: User
};



