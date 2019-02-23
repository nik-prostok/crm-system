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
	ingridients: [
		{
			ingridient: {
				type: Schema.Types.ObjectId,
				ref: 'Ing'
			},
			bind: {
				type: Boolean,
			},
			netto: {
				type: Schema.Types.Decimal128,
			},
			brutto: {
				type: Schema.Types.Decimal128,
			},
			method_cooking: [{
				_id: {
					type: Number,
				},
				title: {
					type: String,
				}
			}]
		}
	],
});

module.exports = {
	ModificatorModel: mongoose.model('Modificator', ModificatorSchema )
}