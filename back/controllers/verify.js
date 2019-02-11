const jwt		= require('jsonwebtoken');
const config	= require('../config/config')

module.exports = {
	verify: (req, res, next) => {
		var token = req.headers['x-access-token'] || req.headers['authorization'];
		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length).trimLeft();
		}
		if (token) {
			jwt.verify(token, config.secret, function(err, decoded) {
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token.' });
				} else {
					req.decoded = decoded;         next();
				}
			});
		} else {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		}
	}
}