const productRoutes  = require('./product');
const categoryRoutes = require('./category');
const shopRoutes     = require('./shop');
const catIngRoutes   = require('./cat_ing');
const ingRoutes      = require('./ing');
const semiRoutes     = require('./semi');
const techMapsRoutes = require('./tech_maps');

module.exports = function(app){
	productRoutes(app);
	categoryRoutes(app);
	shopRoutes(app);
	catIngRoutes(app);
	ingRoutes(app);
	semiRoutes(app);
	/*techMapsRoutes(app);*/
}