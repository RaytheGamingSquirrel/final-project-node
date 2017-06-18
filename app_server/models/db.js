//db.js
var mongoose = require('mongoose');
require('./main');
require('./bios');
require('./media');
var dbURI = 'mongodb://localhost/RPG';
mongoose.connect(dbURI);

//logging
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function () {
    console.log('Mongoose connection error.');
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected.');
});

//Shutdown
var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
//NODEMON
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

//W/o Nodemon
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

