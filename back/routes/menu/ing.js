const ing = require('../../controllers/menu/ing')

//Маршруты для регистрации и управления Ing
module.exports = function(app) {
	app.post('/ing', ing.create);
	app.get('/ing', ing.fetch)
	app.delete('/ing/:id', ing.delete)
	app.put('/ing/:id', ing.update)
};