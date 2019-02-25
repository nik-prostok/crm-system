const CatIng = require('../../models/menu/CatIngModel')

module.exports = {
	create: (req, res) => {
		var RequestCatIng = req.body;
		console.log(RequestCatIng);
		CatIng.CatIngModel.create(RequestCatIng, function (err) {
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		}); 
	},
	fetch: (req, res) => {
		CatIng.CatIngModel
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
		console.log(req.params.id);
		CatIng.CatIngModel.findByIdAndRemove(req.params.id, (err)=>{
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		})
	},
	update: (req, res) => {
		var CatIngRequest = req.body;
		CatIng.CatIngModel.findByIdAndUpdate(req.params.id, {'$set': CatIngRequest}, 
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