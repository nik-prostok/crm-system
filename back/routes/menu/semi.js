const semi = require('../../controllers/menu/semi')
const verify = require('../../controllers/verify')

//Маршруты для регистрации и управления Product
module.exports = function(app) {
	app.post('/semi', verify, semi.create);
	app.get('/semi', verify, semi.fetch)
	app.delete('/semi/:id', verify, semi.delete)
	app.put('/semi/:id', verify, semi.update)
};