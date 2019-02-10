const techMaps = require('../../controllers/menu/techMaps')

//Маршруты для регистрации и управления tech_maps
module.exports = function(app) {
	app.post('/tech_maps', techMaps.create);
	app.get('/tech_maps', techMaps.fetch)
	app.delete('/tech_maps/:id', techMaps.delete)
	app.put('/tech_maps/:id', techMaps.update)
};