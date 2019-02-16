const connectDB = require('../../utils/connectDB')
const Category = require('../../models/menu/CategoryModel')
ObjectId = require('mongodb').ObjectID
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
		//console.log(req.body)
		let CategoryRequest = JSON.parse(req.body.category);
		if(req.files)
			if(req.files['avatar'])
				CategoryRequest.photo = "http://localhost:8081/static/"+req.files['avatar'][0].filename;
		console.log(CategoryRequest)
		Category.CategoryModel.findByIdAndUpdate(ObjectId(CategoryRequest._id), {'$set': CategoryRequest}, 
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