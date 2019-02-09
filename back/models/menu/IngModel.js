var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IngSchema = new Schema({
    title: {
    	type: String,
    	reqired: true
    },
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'CatIng',
        required: true
    },
    unit: {
    	type: String,
    	required: true
    },
    losses_clean: {
    	type: Number
    },
    losses_cooking: {
    	type: Number
    },
    losses_frying: {
    	type: Number
    },
    losses_stew: {
    	type: Number
    },
    losses_bak: {
    	type: Number
    },
    round: {
    	type: Boolean
    },
    weight: {
    	type: Number
    }
});

module.exports = {
	IngModel: mongoose.model('Ing', IngSchema )
}