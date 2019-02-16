const category = require('../../controllers/menu/category')
const verify = require('../../controllers/verify')

//Маршруты для регистрации и управления Category
module.exports = function(app) {
	app.post('/api/category', verify, category.create);
	app.get('/api/category', verify, category.fetch)
	app.delete('/api/category/:id', verify, category.delete)
	app.put('/api/category/:id', verify, category.update)
};