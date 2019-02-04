const productRoutes  = require('./product');
const categoryRoutes = require('./category');
const techMapsRoutes = require('./tech_maps');

module.exports = function(app){
	productRoutes(app);
	/*categoryRoutes(app);
	techMapsRoutes(app);*/
}