const connectDB = require('../utils/connectDB')
const User 		= require('../models/users')
const jwt   	= require('jsonwebtoken');
const config 	= require('../config/config')
const enc 		= require('../utils/encrypt')

const db = connectDB.db;

//Я добавил в создание пользователя функцию хэширования
//name: test1, password: test1

//И ещё прости, я создал случайно пустого пользователя, теперь функция находит пользователя всегда .-.
//Так что почисти потом базу данных ))) Я не могу чего-то онлайн в неё зайти

module.exports = {
	auth: (req, res) => {
		User.findOne({ name: req.body.name }, (err, user) => {
			if (err) throw err
			if (!user) res.json({ success: false, message: 'Authentication failed. User not found' })
			else {
				if(req.body.password && user.password)
					enc.comparePassword(req.body.password, user.password) //Вот тут я добавил проверку
					.then(isPasswordMatch => { //Если всё ок
						if (isPasswordMatch) { //Если пароль верный
							const payload = {
								admin: user.admin     }
								var token = jwt.sign(payload, config.secret, {
									expiresIn: "1140m"
								})
								res.json({
									success: true,
									message: 'Enjoy your token!',
									token: token
								})
						} else res.json({ success: false, message: 'Authentication failed. Wrong password' }) //Если неверный
					}).catch(err => {
						console.log(err)
						res.json({ success: false, message: 'Authentication failed. Internal error' }) //Если какая-то фигня с хэшированием (хотя быть не должно)
					})
				else res.json({ success: false, message: 'Authentication failed. Password not found' }) //Если нет пароля
				}
			});
	}
}