const modificator = require('../../controllers/menu/modificator');
const verify = require('../../controllers/verify');
const uuidv1 = require('uuid/v1');

//Маршруты для регистрации и управления Product
module.exports = function(app) {
	app.post('/api/modificator', verify, modificator.create);
	app.get('/api/modificator', verify, modificator.fetch);
	app.delete('/api/modificator/:id', verify, modificator.delete);
	app.put('/api/modificator/:id', verify, modificator.update);
};