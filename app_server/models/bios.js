var mongoose = require('mongoose');
var bioSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFood: String,
    bio: String,
    profilePic: String
});
module.exports = mongoose.model('Bio', bioSchema, 'Bio');