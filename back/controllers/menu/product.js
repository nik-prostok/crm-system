const connectDB = require('../../utils/connectDB')
const Product = require('../../models/menu/ProductModel')
const db = connectDB.db;


module.exports = {
	create: (req, res) => {
		var RequestProduct = req.body;
		console.log(RequestProduct);
		Product.ProductModel.create(
			RequestProduct, function (err, awesome_instance) {
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		});
	},
	fetch: (req, res) => {
		var products = Product.ProductModel.find((err, arr) => {
			if (err){
				console.log(err)
				res.sendStatus(400)
			}
			res.send(arr)
		})
	},
	delete: (req, res) => {
		console.log(req.params.id);
		Product.ProductModel.findByIdAndRemove(req.params.id, (err)=>{
			if (err){
				console.log(err);
				res.sendStatus(400);
			}
			res.sendStatus(200);
		})
	},
	update: (req, res) => {
		console.log(req.params.id);
		Product.ProductModel.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
			category: req.body.category,
			barcode: req.body.barcode,
			SKU: req.body.SKU,
			shop: req.body.shop,
			type: req.body.type,
			weight_goods: req.body.weight_goods,
			self_cost: req.body.self_cost,
			price: req.body.price,
			profit: req.body.profit,
			markup: req.body.markup,
			isHidden: req.body.isHidden,
		}, 
		(err)=>{
			if (err){
				console.log(err);
				res.sendStatus(400);
			}
			res.sendStatus(200);
		})
	}
}