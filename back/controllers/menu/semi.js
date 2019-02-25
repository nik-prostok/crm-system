const Semi = require('../../models/menu/SemiModel')


module.exports = {
	create: (req, res) => {
		var RequestSemi = req.body;
		console.log(RequestSemi);
		Semi.SemiModel.create(RequestSemi, function (err) {
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		}); 
	},
	fetch: (req, res) => {
		Semi.SemiModel
		.find()
		.populate({
			path: 'ingridients',
			populate: {
				path: 'category'
			}
		})
		.exec((err, semi) => {
			if (err){
				console.log(err)
				res.sendStatus(400)
			} else {
				res.send(semi)
			}
		})
	},
	delete: (req, res) => {
		console.log(req.params.id);
		Semi.SemiModel.findByIdAndRemove(req.params.id, (err)=>{
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		})
	},
	update: (req, res) => {
		var SemiRequest = req.body;
		Semi.SemiModel.findByIdAndUpdate(req.params.id, {'$set': SemiRequest}, 
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