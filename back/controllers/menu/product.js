const connectDB = require('../../utils/connectDB')
const Product = require('../../models/menu/ProductModel')
ObjectId = require('mongodb').ObjectID
const db = connectDB.db;


module.exports = {
	create: (req, res) => {
		let RequestProduct = JSON.parse(req.body.product);
		RequestProduct.photo = "http://localhost:8081/static/" + req.files['avatar'][0].filename;
		console.log(RequestProduct);
		Product.ProductModel.create(
			RequestProduct, function (err) {
				if (err) {
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
				if (err) {
					console.log(err)
					res.sendStatus(400)
				} else {
					res.send(arr)
				}
			})
	},
	delete: (req, res) => {
		console.log(req.params.id);
		Product.ProductModel.findByIdAndRemove(req.params.id, (err) => {
			if (err) {
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		})
	},
	update: (req, res) => {
		var ProductRequest = req.body;
		Product.ProductModel.findByIdAndUpdate(req.params.id, { '$set': ProductRequest },
			(err) => {
				if (err) {
					console.log(err);
					res.sendStatus(400);
				}
				res.sendStatus(200);
			})
	}
}