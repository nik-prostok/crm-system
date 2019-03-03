const ing = require('../../controllers/menu/ing')
const verify = require('../../controllers/verify')

//Маршруты для регистрации и управления Ing
module.exports = function(app) {
	app.post('/api/ing', verify, ing.create);
	app.get('/api/ing', verify, ing.fetch)
	app.delete('/api/ing/:id', verify, ing.delete)
	app.put('/api/ing/:id', verify, ing.update)
};