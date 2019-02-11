const users = require('../controllers/users')

//Маршруты для регистрации и управления Category
module.exports = function(app) {
	app.post('/users', users.create);
	app.get('/users', users.fetch)
	/*app.delete('/users/:id', users.delete)
	app.put('/users/:id', users.update)*/
};