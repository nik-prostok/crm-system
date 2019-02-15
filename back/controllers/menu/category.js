const connectDB = require('../../utils/connectDB')
const Category = require('../../models/menu/CategoryModel')
const db = connectDB.db;


module.exports = {
	create: (req, res) => {
		let RequestCategory = JSON.parse(req.body.category);
		RequestCategory.photo = "http://localhost:8081/static/"+req.files['avatar'][0].filename;
		console.log(RequestCategory)
		Category.CategoryModel.create(RequestCategory, function (err) {
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		}); 
	},
	fetch: (req, res) => {
		var categories = Category.CategoryModel
		.find()
		.populate('parent')
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
		Category.CategoryModel.findByIdAndRemove(req.params.id, (err)=>{
			if (err){
				console.log(err);
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		})
	},
	update: (req, res) => {
		var CategoryRequest = req.body;
		Category.CategoryModel.findByIdAndUpdate(req.params.id, {'$set': CategoryRequest}, 
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