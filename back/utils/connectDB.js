const mongoose       = require('mongoose');
const config		 = require('../config/config.js');

function connect(){
    mongoose.connect(config.mongodb, { useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = connect;

