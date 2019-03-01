const semi = require('../../controllers/menu/semi')
const verify = require('../../controllers/verify')

//Маршруты для регистрации и управления Product
module.exports = function(app) {
	app.post('/api/semi', verify, semi.create);
	app.get('/api/semi', verify, semi.fetch)
	app.delete('/api/semi/:id', verify, semi.delete)
	app.put('/api/semi/:id', verify, semi.update)
};