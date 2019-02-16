const shop = require('../../controllers/menu/shop')

const verify = require('../../controllers/verify')

//Маршруты для регистрации и управления Category
module.exports = function(app) {
	app.post('/api/shop', verify, shop.create);
	app.get('/api/shop', verify, shop.fetch)
	app.delete('/api/shop/:id', verify, shop.delete)
	app.put('/api/shop/:id', verify, shop.update)
};