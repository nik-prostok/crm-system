const cat_ing = require('../../controllers/menu/cat_ing')

//Маршруты для регистрации и управления Product
module.exports = function(app) {
	app.post('/cat_ing', cat_ing.create);
	app.get('/cat_ing', cat_ing.fetch)
	app.delete('/cat_ing/:id', cat_ing.delete)
	app.put('/cat_ing/:id', cat_ing.update)
};