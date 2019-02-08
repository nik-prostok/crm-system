var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShopSchema = new Schema({
    title: {
    	type: String,
    	reqired: true
    },
    print_runners: {
        type: Boolean
    }
});

module.exports = {
	ShopModel: mongoose.model('Product', ShopSchema )
}