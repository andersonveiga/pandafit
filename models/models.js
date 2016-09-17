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
    var newUser = new User({ name: name, avatarName: avatarName, activityLevel: activityLevel, userId: numUsers+1, score: 50});
    newUser.save(function (err) {
        if(err){
            console.log(err);
        } else {
            console.log('Could actually save User.')
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
    numUsers = nUsers || 0;

    console.log("numUsers: " + nUsers);
    if (!nUsers){
        createSomeUsers();
    }else {
        User.find({}, function (res) {
            console.log(res);
        });
    }
});

var to = setTimeout(deductPoints, 10 * 1000, process.pid, process.arch);

function deductPoints(id, arch){
    console.log('The process id is %d and the processor architecture is %s', id, arch);
    User.update({}, {'$inc': {"score": -1}});
    to = setTimeout(deductPoints, 10 * 1000, id, arch);
}
console.log('done');


module.exports = {
  User: User
};



