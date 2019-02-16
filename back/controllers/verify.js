const jwt		= require('jsonwebtoken');
const config	= require('../config/config')

module.exports =function(req, res, next) {
		
		let token = req.headers['x-access-token'] || req.headers['authorization'];
		if (token)  //(typeof token !== typeof undefined)
		{
			if (token.startsWith('Bearer ') && (token = token.replace('Bearer ', '')).length > 0) {
				jwt.verify(token, config.secret, (err, decoded) => {
					if (err) {
						return res.json({ success: false, message: 'Failed to authenticate token.' })
					} else {
						req.decoded = decoded 
						next()
					}
				});
			} else {
				return res.status(400).send({ 
					success: false, 
					message: 'Bad token' 
				});
			}
		} else {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		}
};