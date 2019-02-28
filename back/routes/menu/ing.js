const ing = require('../../controllers/menu/ing')
const verify = require('../../controllers/verify')

//Маршруты для регистрации и управления Ing
module.exports = function(app) {
	app.post('/ing', verify, ing.create);
	app.get('/ing', verify, ing.fetch)
	app.delete('/ing/:id', verify, ing.delete)
	app.put('/ing/:id', verify, ing.update)
};