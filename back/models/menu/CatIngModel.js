var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CatIngSchema = new Schema({
    title: {
    	type: String,
    	reqired: true
    }
});

module.exports = {
	CatIngModel: mongoose.model('CatIng', CatIngSchema )
}