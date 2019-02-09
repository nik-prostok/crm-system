const category = require('../../controllers/menu/category')

//Маршруты для регистрации и управления Category
module.exports = function(app) {
	app.post('/category', category.create);
	app.get('/category', category.fetch)
	app.delete('/category/:id', category.delete)
	app.put('/category/:id', category.update)
};