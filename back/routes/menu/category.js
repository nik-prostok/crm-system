const category = require('../../controllers/menu/category')
const verify = require('../../controllers/verify')
const uuidv1 = require('uuid/v1')

let multer  		 = require('multer')

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, './public')
	},
	filename: function (req, file, cb) {
	  cb(null, uuidv1() + '.jpg')
	}
  })

let upload = multer({ storage: storage })

let cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }])

//Маршруты для регистрации и управления Category
module.exports = function(app) {
	app.post('/api/category', verify, cpUpload, category.create);
	app.get('/api/category', verify, category.fetch)
	app.delete('/api/category/:id', verify, category.delete)
	app.put('/api/category/:id', verify, category.update)
};