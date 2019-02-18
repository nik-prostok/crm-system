const connectDB = require('../../utils/connectDB')
const Shop = require('../../models/menu/ShopModel')
const db = connectDB.db;


module.exports = {
	create: (req, res) => {
		var RequestShop = req.body;
		console.log(RequestShop);
		Shop.ShopModel.create(RequestShop, function (err) {
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		}); 
	},
	fetch: (req, res) => {
		var shops = Shop.ShopModel
		.find()
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
		console.log(req.params.id)
		Shop.ShopModel.findByIdAndDelete(req.params.id, (err, data)=>{
			console.log(err)
			console.log(data)
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		})
	},
	update: (req, res) => {
		var ShopRequest = req.body;
		Shop.ShopModel.findByIdAndUpdate(req.params.id, {'$set': ShopRequest}, 
			(err)=>{
				if (err){
					console.log(err);
					res.sendStatus(400);
				} else {
					res.sendStatus(200);
				}
			})
	}
}