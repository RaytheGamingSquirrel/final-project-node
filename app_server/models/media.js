var mongoose = require('mongoose');
var mediaSchema = new mongoose.Schema({
    title: String,
    mediaType: [String],
    media: String,
});
module.exports = mongoose.model('Media', mediaSchema, 'Media');