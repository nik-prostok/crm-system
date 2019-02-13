const menu		= require('./menu/menu');
const users		= require('./users');
const auth		= require('./authenticate');
//const verify	= require('./verify');

module.exports = function(app){
	app.get('/', (req, res) => {
		res.json({ message: 'Welcome to API for crm-system! For authenticate send in /auth your "name" and "password"' });
	})
	//verify(app);
	menu(app);
	users(app);
	auth(app);
}