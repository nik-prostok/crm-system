const menu = require('./menu/menu');
const auth = require('../users/user.controller');
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');


module.exports = function(app){
	menu(app);
	app.post('/authenticate', auth.authenticate);
	app.get('/', authorize(Role.Admin), auth.getAll);
	app.get('/:id', authorize(), auth.getById);
}