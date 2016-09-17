/**
 * Created by dowling on 17/09/16.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var numUsers = 0;

var User = mongoose.model('User', {
    name: String,
    avatarName: String,
    userId: String,
    score: Number,
    activityLevel: Number
});

function saveUser(name, avatarName, activityLevel, callback) {
    var newUser = new User({ name: name, avatarName: avatarName, activityLevel: activityLevel, userId: "" + (numUsers + 1), score: 50});
    newUser.save(function (err, res) {
        if(err){
            console.log(err);
        } else {
            console.log('Saved user.');
            if (callback){
                callback(res);
            }
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

var pokemon = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"];

function createRandomUser(name, callback){
    var randPkmn = pokemon[Math.floor(Math.random() * pokemon.length)];
    var activity = Math.floor(Math.random() * 3) + 1;
    var randscore = Math.floor(Math.random() * 130);
    saveUser(name, randPkmn, activity, function (res) {
        User.update({"userId": res.userId}, {"score": randscore}).then(function (res) {
            var createdUser = User.findOne({"userId": res.userId}, function (res) {
                console.log("Created random user! " + JSON.stringify(res));
                callback(res);
            });
        });
    });
}

var to = setTimeout(deductPoints, 10 * 1000, process.pid, process.arch);

function deductPoints(id, arch){
    console.log('The process id is %d and the processor architecture is %s', id, arch);
    User.update({"score": {"$gt": 1}}, {'$inc': {"score": -1}}).exec();
    to = setTimeout(deductPoints, 10 * 1000, id, arch);
}
console.log('done');


module.exports = {
  User: User,
  createRandomUser: createRandomUser
};



