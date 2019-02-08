var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    title: {
    	type: String,
    	reqired: true
    },
    parent: {
        type: Schema.Types.ObjectId, 
        ref: 'Category',
    },
    color: {
        type: String,
    }
});

module.exports = {
	CategoryModel: mongoose.model('Product', CategorySchema )
}