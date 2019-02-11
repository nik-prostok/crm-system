const menu		= require('./menu/menu');
const users		= require('./users');
const auth		= require('./authenticate');
const verify	= require('./verify');

module.exports = function(app){
	app.get('/', (req, res) => {
		res.json({ message: 'Welcome to API for crm-system! For authenticate send in /auth your "name" and "password"' });
	})
	/*app.use('/api', function(req, res, next) {
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
	});*/
	verify(app);
	menu(app);
	users(app);
	auth(app);
}