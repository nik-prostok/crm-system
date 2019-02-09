const shop = require('../../controllers/menu/shop')

//Маршруты для регистрации и управления Category
module.exports = function(app) {
	app.post('/shop', shop.create);
	app.get('/shop', shop.fetch)
	app.delete('/shop/:id', shop.delete)
	app.put('/shop/:id', shop.update)
};