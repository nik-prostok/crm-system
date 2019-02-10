const product = require('../../controllers/menu/product')

const authorize			= require('../../_helpers/authorize');
const Role				= require('../../_helpers/role');

//Маршруты для регистрации и управления Product
module.exports = function(app) {
	app.post('/products', authorize(), product.create);
	app.get('/products', authorize(), product.fetch)
	app.delete('/products/:id', authorize(), product.delete)
	app.put('/products/:id', authorize(), product.update)
};