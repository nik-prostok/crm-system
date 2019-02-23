var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TechMapsSchema = new Schema({
	title: {
		type: String,
		reqired: true
	},
	category: [{
		type: Schema.Types.ObjectId,
		ref: 'Category'
	}],
	shop: {
		type: Schema.Types.ObjectId,
		ref: 'Shop'
	},
	color: {
		type: String
	},
	min: {
		type: Number
	},
	sec: {
		type: Number
	},
	bar_code: {
		type: String
	},
	weight: {
		type: Boolean
	},
	no_dicsount: {
		type: Boolean
	},
	process_cooking: [{
		type: Number
	}],
	sum_mass: {
		type: Number
	},
	brutto: {
		type: Number
	},
	netto: {
		type: Number
	},
	price: {
		type: Number
	},
	photo: {
		type: String
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
	modificators: [{
		type: Schema.Types.ObjectId,
		ref: 'Modificator'
	}]
});

module.exports = {
	TechMapsModel: mongoose.model('TechMaps', TechMapsSchema)
}