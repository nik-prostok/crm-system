const modificator = require('../../controllers/menu/modificator')

//Маршруты для регистрации и управления Product
module.exports = function(app) {
	app.post('/modificator', modificator.create);
	app.get('/modificator', modificator.fetch)
	app.delete('/modificator/:id', modificator.delete)
	app.put('/modificator/:id', modificator.update)
};