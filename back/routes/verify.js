const verify = require('../controllers/verify')

module.exports = function(app) {
	app.use('/api', verify.verify);
};