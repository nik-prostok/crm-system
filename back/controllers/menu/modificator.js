const connectDB = require('../../utils/connectDB')
const Modificator = require('../../models/menu/ModificatorModel')
const db = connectDB.db;


module.exports = {
	create: (req, res) => {
		var ModificatorRequest = req.body;
		console.log(ModificatorRequest);
		Modificator.ModificatorModel.create(
			ModificatorRequest, function (err) {
				if (err){
					console.log(err);
					res.sendStatus(400);
				} else {
					res.sendStatus(200);
				}
			}); 
	},
	fetch: (req, res) => {
		Modificator.ModificatorModel
		.find()
		.populate({
			path:'ingridients',
			populate: {
				path:'category'
			}
		})
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
		Modificator.ModificatorModel.findByIdAndRemove(req.params.id, (err)=>{
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		})
	},
	update: (req, res) => {
		var ModificatorRequest = req.body;
		Modificator.ModificatorModel.findByIdAndUpdate(req.params.id, {'$set': ModificatorRequest}, 
		(err)=>{
			if (err){
				console.log(err);
				res.sendStatus(400);
			}
			res.sendStatus(200);
		})
	}
}