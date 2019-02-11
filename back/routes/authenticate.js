const auth = require('../controllers/authenticate')

//Маршруты для регистрации и управления Category
module.exports = function(app) {
	app.post('/auth', auth.auth);
};