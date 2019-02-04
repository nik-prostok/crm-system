var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    title: {
    	type: String,
    	reqired: true
    },
    /*category: { 
    	type: String,
    	reqired: true
    },
    barcode: {
    	type: String,
    	required: true
    },
    SKU: {
    	type: Number,
    	required: true
    },
    shop: {
        type: String,
        required: true,
    },
    type: {
        type: Boolean,
        required: true,
    },
    weight_goods: {
        type: Boolean,
        required: true,
    },
    self_cost: {
        type: Number,
    },
    price: {
        type: Number,
    },
    profit: {
        type: Number
    },
    markup: {
        type: Number,
    },
    isHidden: {
        type: Boolean,
    }*/
});

module.exports = {
	ProductModel: mongoose.model('Product', ProductSchema )
}