const semi = require('../../controllers/menu/semi')

//Маршруты для регистрации и управления Product
module.exports = function(app) {
	app.post('/semi', semi.create);
	app.get('/semi', semi.fetch)
	app.delete('/semi/:id', semi.delete)
	app.put('/semi/:id', semi.update)
};