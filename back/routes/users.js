const users = require('../controllers/users')
const verify = require('../controllers/verify')

//Маршруты для регистрации и управления Category
module.exports = function(app) {
	app.post('/users', verify, users.create);
	app.get('/users', verify, users.fetch)
	/*app.delete('/users/:id', users.delete)
	app.put('/users/:id', users.update)*/
};