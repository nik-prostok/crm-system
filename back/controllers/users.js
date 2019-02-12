const connectDB = require('../utils/connectDB')
const User = require('../models/users')
const enc = require('../utils/encrypt')

const db = connectDB.db;

module.exports = {
	create: (req, res) => {
		var RequestUser = req.body;
		enc.cryptPassword(req.body.password) //Вот, тут теперь пароль пользователя шифруется
		.then(hash => {
			req.body.password = hash //Меняю пароль на его хэш
			console.log(RequestUser)
			User.create(
				RequestUser, function (err) {
					if (err){
						console.log(err)
						res.sendStatus(400)
					} else {
						res.sendStatus(200)
					}
				}); 
		}).catch(err => {
			console.log(err)
			res.sendStatus(400)
		})
	},
	fetch: (req, res) => {
		User.find({}, function(err, users) {
			res.json(users);
		});
	}
}