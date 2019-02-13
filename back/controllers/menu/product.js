const connectDB = require('../../utils/connectDB')
const Product = require('../../models/menu/ProductModel')
const db = connectDB.db;


module.exports = {
	create: (req, res) => {
		var RequestProduct = req.body;
		console.log(RequestProduct);
		Product.ProductModel.create(
			RequestProduct, function (err) {
				if (err){
					console.log(err);
					res.sendStatus(400);
				} else {
					res.sendStatus(200);
				}
			}); 
	},
	fetch: (req, res) => {
		var products = Product.ProductModel
		.find()
		.populate('shop')
		.populate('category')
		.exec((err, arr) => {
			if (err){
				console.log(err)
				res.sendStatus(400)
			} else {
				res.send(arr)
			}
		})
	},
	delete: (req, res) => {
		console.log(req.params.id);
		Product.ProductModel.findByIdAndRemove(req.params.id, (err)=>{
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		})
	},
	update: (req, res) => {
		var ProductRequest = req.body;
		Product.ProductModel.findByIdAndUpdate(req.params.id, {'$set': ProductRequest}, 
		(err)=>{
			if (err){
				console.log(err);
				res.sendStatus(400);
			}
			res.sendStatus(200);
		})
	}
}