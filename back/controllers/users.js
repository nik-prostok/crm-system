const connectDB = require('../utils/connectDB')
const User = require('../models/users')

const db = connectDB.db;

module.exports = {
	create: (req, res) => {
		var RequestUser = req.body;
		console.log(RequestUser);
		User.create(
			RequestUser, function (err) {
				if (err){
					console.log(err);
					res.sendStatus(400);
				} else {
					res.sendStatus(200);
				}
			}); 
	},
	fetch: (req, res) => {
		User.find({}, function(err, users) {
			res.json(users);
		});
	}
}