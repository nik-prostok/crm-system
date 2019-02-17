var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    title: {
    	type: String,
    	reqired: true
    },
    parent_id: {
       type: String,
    },
    color: {
        type: String,
    },
    photo: {
        type: String
    }
});

module.exports = {
	CategoryModel: mongoose.model('Category', CategorySchema )
}