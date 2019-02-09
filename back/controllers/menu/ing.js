const connectDB = require('../../utils/connectDB')
const Ing = require('../../models/menu/IngModel')
const db = connectDB.db;


module.exports = {
	create: (req, res) => {
		var RequestIng = req.body;
		console.log(RequestIng);
		Ing.IngModel.create(RequestIng, function (err) {
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		}); 
	},
	fetch: (req, res) => {
		Ing.IngModel
		.find()
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
		Ing.IngModel.findByIdAndRemove(req.params.id, (err)=>{
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		})
	},
	update: (req, res) => {
		var IngRequest = req.body;
		Ing.IngModel.findByIdAndUpdate(req.params.id, {'$set': IngRequest}, 
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