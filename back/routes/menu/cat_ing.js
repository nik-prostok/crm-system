const cat_ing = require('../../controllers/menu/cat_ing')
const verify = require('../../controllers/verify')

//Маршруты для регистрации и управления Product
module.exports = function(app) {
	app.post('/cat_ing', verify, cat_ing.create);
	app.get('/cat_ing', verify,  cat_ing.fetch)
	app.delete('/cat_ing/:id', verify, cat_ing.delete)
	app.put('/cat_ing/:id', verify, cat_ing.update)
};