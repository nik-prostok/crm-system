var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ModificatorSchema = new Schema({
	title: {
		type: String,
		reqired: true
	},
	type: {
		type: String
	},
	min: {
		type: Number
	},
	max: {
		type: Number
	},
	setMin: {
		type: Boolean
	},
	setMax: {
		type: Boolean
	},
	ingridients: [{
		type: Schema.Types.ObjectId,
		ref: 'Ing'
	}]
});

module.exports = {
	ModificatorModel: mongoose.model('Modificator', ModificatorSchema )
}