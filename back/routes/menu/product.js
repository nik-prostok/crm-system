const product = require('../../controllers/menu/product')

//Маршруты для регистрации и управления Product
module.exports = function(app) {
	app.post('/products', product.create);
	app.get('/products', product.fetch)
	app.delete('/prod/:id', product.delete)
	app.put('/payments/:id', product.update)
};