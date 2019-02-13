const product = require('../../controllers/menu/product')

const verify = require('../../controllers/verify') //Лучше подключить тут проверку

//Маршруты для регистрации и управления Product
module.exports = function(app) {
	app.post('/api/products', verify.verify, product.create);
	app.get('/api/products', verify.verify, product.fetch) // app.get('/api/products', verify.verify, product.fetch) И сделать тогда так. А из /api можно убрать проверку
	app.delete('/products/:id', verify.verify, product.delete)
	app.put('/api/products/:id', verify.verify, product.update)
};