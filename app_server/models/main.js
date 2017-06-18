var mongoose = require('mongoose');
//https://stackoverflow.com/questions/30166907/uploading-images-with-mongoose-express-and-angularjs
//http://blog.nbostech.com/2016/10/store-and-read-image-file-in-mongodb-using-nodejsexpressmongoose/
//https://groups.google.com/forum/#!topic/mongoose-orm/H-8JLNyivcc



var mainSchema = new mongoose.Schema({
    title: String,
    postedOn: { type: Date, default: Date.now },
    content: String
});
module.exports = mongoose.model('Main', mainSchema, 'Main');
