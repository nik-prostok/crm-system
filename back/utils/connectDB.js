const mongoose       = require('mongoose');
const dbAuth		 = require('../config/db.js');

mongoose.connect(dbAuth.mongodb, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = db;