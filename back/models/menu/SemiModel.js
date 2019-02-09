var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SemiSchema = new Schema({
    title: {
    	type: String,
    	reqired: true
    },
    process_cooking: [{
        type: Number
    }],
    sum_mass: {
    	type: Number
    },
    price: {
    	type: Number
    },
    ingridients: [{
    	type: Schema.Types.ObjectId,
    	ref: 'Ing'
    }]
});

module.exports = {
	SemiModel: mongoose.model('Semi', SemiSchema )
}