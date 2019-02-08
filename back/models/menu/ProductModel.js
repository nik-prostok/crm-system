var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    title: {
    	type: String,
    	reqired: true
    },
    bar_code: {
        type: String,
        required: true
    },
    /*category: {
        type: Schema.Types.ObjectId, 
        ref: 'Category',
       // required: true
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shops',
        //required: true,
    },*/
    
    color: {
        type: String
    },
    avatar: {
        type: String
    },
    
    
    weight_goods: {
        type: Boolean,
        required: true,
    },
    no_dicsount: {
        type: Boolean,
        required: true
    },
    types: {
        type: Boolean,
        required: true,
    },
    isHidden: {
        type: Boolean,
    },

    self_cost: {
        type: Number,
    },
    SKU: {
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

    modification: [
        {
            bar_code: String,
            title_mode: String,
            self_cost: Number,
            markup: Number,
            price: Number,
            profit: Number,
        }
    ]
});

module.exports = {
	ProductModel: mongoose.model('Product', ProductSchema )
}