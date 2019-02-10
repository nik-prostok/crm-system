const connectDB = require('../../utils/connectDB')
const TechMaps = require('../../models/menu/TechMapsModel')
const db = connectDB.db;


module.exports = {
	create: (req, res) => {
		var TechMapsRequest = req.body;
		console.log(TechMapsRequest);
		TechMaps.TechMapsModel.create(
			TechMapsRequest, function (err) {
				if (err){
					console.log(err);
					res.sendStatus(400);
				} else {
					res.sendStatus(200);
				}
			}); 
	},
	fetch: (req, res) => {
		TechMaps.TechMapsModel
		.find()
		.populate({
			path: 'ingridients',
			populate: {
				path: 'category'
			}
		})
		.populate({
			path: 'modificators',
			populate: {
				path: 'ingridients',
				populate: {
					path: 'category'
				}
			}
		})
		.populate('category')
		.populate('shop')
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
		TechMaps.TechMapsModel.findByIdAndRemove(req.params.id, (err)=>{
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		})
	},
	update: (req, res) => {
		var TechMapsRequest = req.body;
		TechMaps.TechMapsModel.findByIdAndUpdate(req.params.id, {'$set': TechMapsRequest}, 
			(err)=>{
				if (err){
					console.log(err);
					res.sendStatus(400);
				}
				res.sendStatus(200);
			})
	}
}