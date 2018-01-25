const mongoose = require('mongoose');

// setup mongoDB connection
const mongoURL = "mongodb://lesian:admin@ds215388.mlab.com:15388/smartclass";
const options = {
    useMongoClient: true
};
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function() { console.log('database connected'); });
module.exports = db;
