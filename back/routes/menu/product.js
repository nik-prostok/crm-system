const product = require('../../controllers/menu/product')
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

//Маршруты для регистрации и управления Product
module.exports = function(app) {
	app.post('/api/products', verify, cpUpload, product.create);
	app.get('/api/products', verify, product.fetch);
	app.get('/api/products/:id', verify, product.get);
	app.delete('/api/products/:id', verify, product.delete);
	app.put('/api/products/:id', verify, cpUpload, product.update);
};