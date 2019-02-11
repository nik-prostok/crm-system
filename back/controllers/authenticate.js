const connectDB = require('../utils/connectDB')
const User 		= require('../models/users')
const jwt   	= require('jsonwebtoken');
const config 	= require('../config/config')

const db = connectDB.db;

module.exports = {
	auth: (req, res) => {
		User.findOne({
			name: req.body.name
		}, function(err, user) {
			if (err) throw err;
			if (!user) {
				res.json({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {
				if (user.password != req.body.password) {
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				} else {
					const payload = {
						admin: user.admin     };
						var token = jwt.sign(payload, config.secret, {
							expiresIn: "1140m"
						});
						res.json({
							success: true,
							message: 'Enjoy your token!',
							token: token
						});
					} 
				}
			});
	}
}