const express = require('express')
const router = express.Router()
var mysql = require('mysql');
var multer  = require('multer')
var fs = require('fs');

var uuid = require('node-uuid');

var upload = multer({ dest: 'uploads/' })
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'crm',
	password : 'ghjtyubnm',
	database : 'crm',
	insecureAuth : true
}); 

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'dest')
	},
	filename: function (req, file, cb) {
		cb(null, uuid.v4() + '.png')
	}
})

var upload = multer({ storage: storage })

connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

router.get('/', (req, res) => {
	res.send('ok');
})



router.post('/categories',upload.single('avatar'), (req, res) => {
	res.send("OK");
	console.log(req.body);
	var data = JSON.parse(req.body.category)
	var filename = 'null';
	if (req.file){
		filename = req.file.filename;
	}
	else if(data.photo!=undefined)
		filename=data.photo;
	if(data.title!=undefined)
	{
		connection.query("DELETE FROM categories WHERE id = ?",[Number(data.id)], function (err, result, fields) {
			if (err) console.log(err);
			connection.query("INSERT INTO categories   (title,parent_id,color,photo) VALUES(?,?,?,?)",[data.title,data.parent_id,data.color,filename], function (err, result, fields) {
				if (err) console.log(err);
			})
		})
	}
})

router.post('/sales', (req, res) => {
	bd(req,res,"INSERT INTO sales   (product_title,count,date,restaurant,oficient) VALUES (?,?,?,?,?)",[req.body.product_title,req.body.count,req.body.date,req.body.restaurant,req.body.oficient]);
})

router.post('/products', (req, res) => {
	bd(req,res,"INSERT INTO products   (title,markup,category,shop,self_cost,color,photo,weight_goods,bar_code,types,price,SKU, profit) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.title,req.body.markup,req.body.category,req.body.shop,req.body.self_cost,req.body.color,req.body.photo,req.body.weight_goods,req.body.bar_code,req.body.types,req.body.price,req.body.SKU, req.body.profit]);
})

router.post('/deleteProduct', (req, res) => {
	console.log(req.body);
	connection.query("SELECT photo FROM products WHERE id = ?",[Number(req.body.id)], function (err, result, fields) {
		if(fs.existsSync("dest/"+String(result[0].photo))) 
		{
			fs.unlinkSync("dest/"+String(result[0].photo));
			console.log("DELETE FILE");
		}
		else
			console.log("NOT FILE");
		connection.query("DELETE FROM products WHERE id = ?",[req.body.id], function (err, result, fields) {
			res.send("OK");
		})
	})
})

router.post('/deleteOnlyProduct', (req, res) => {
	console.log("deleteOnlyProduct");
	console.log(req.body);
	connection.query("DELETE FROM products WHERE id = ?",[Number(req.body.id)], function (err, result, fields) {
		if (err) console.log(err);
		res.send("OK");
	})
})

router.post('/deleteOnlyPhoto', (req, res) => {
	console.log("deleteOnlyPhoto");
	connection.query("SELECT photo FROM products WHERE id = ?",[Number(req.body.id)], function (err, result, fields) {
		if(fs.existsSync("dest/"+String(result[0].photo))) 
		{
			fs.unlinkSync("dest/"+String(result[0].photo));
			console.log("DELETE FILE");
		}
		else
			console.log("NOT FILE");
	})
})
router.post('/deleteCategory', (req, res) => {
	var id = [];
	id[0] = req.body.id;
	count = 0;
	while(count!=id.length)
	{
		connection.query("SELECT id FROM categories WHERE parent_id = ?",[Number(id[count])], function (err, result, fields) {
			if (err) console.log(err);
			result.forEach(item =>{
				id.push(item);
			});
			count++;
		})
	}
	console.log("RESULT");
	console.log(id);
	// connection.query("DELETE FROM categories WHERE id = ? OR parent_id = ?",[req.body.id,req.body.id], function (err, result, fields) {
	// 	if (err) console.log(err);
	// 	res.send("OK");
	// })
})

router.post('/productsMod',upload.single('avatar'), (req, res) => {
	res.send("OK");
	console.log(req.body);
	var data = JSON.parse(req.body.product)
	var filename = 'null';
	if (req.file){
		filename = req.file.filename;
	}
	else if(data.photo!=undefined)
		filename=data.photo;
	if(data.title!=undefined)
	{
		connection.query("DELETE FROM products WHERE id = ?",[data.id], function (err, result, fields) {
			if (err) console.log(err);
			connection.query("INSERT INTO products   (title,markup,category,shop,self_cost,color,photo,weight_goods,bar_code,types,price,SKU,profit, no_dicsount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[data.title,data.markup,data.category,data.shop,data.self_cost,data.color,filename,Number(data.weight_goods),data.bar_code,data.types,data.price,data.SKU, data.profit, data.no_dicsount], function (err, result, fields) {
				if (err) console.log(err);
				console.log(data.modification);
				if(Array.isArray(data.modification))
				{
					data.modification.forEach(function(item, i, arr) {
						connection.query("INSERT INTO modifications   (bar_code,title_product,title,self_cost,price,markup,profit) VALUES (?,?,?,?,?,?,?)",
							[item.bar_code,data.title,item.title_mode,item.self_cost,item.price,item.markup, item.profit], function (err, result, fields) {
								if (err) console.log(err);
							})
					})
				}
			})
		})

	}

})

router.post('/ingridients', (req, res) => {
	var item = req.body;

	connection.query("INSERT INTO ingridients (title, cat_id, unit, losses_clean, losses_cooking, losses_frying, losses_stew, losses_bak, weight, round) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
		[item.title, item.cat_id, item.unit, item.losses_clean, item.losses_cooking, item.losses_frying, item.losses_stew, item.losses_bak, item.weight, item.round], function (err, result, fields){
			if (err) console.log(err);
		})
})

router.post('/catIngrid', (req, res) => {
	connection.query("INSERT INTO category_ing (cat_title) VALUES (?)", [req.body.title], function(err, result, fields){
		if (err) console.log(err);
	})
})

router.post('/deleteCatIng', (req, res) => {
	connection.query("DELETE FROM category_ing WHERE cat_id = ?", [req.body.id], function(err, result, fields){
		if (err) console.log(err);
	})
})


router.get('/catIngrid', (req, res) => {
	bd(req,res,"SELECT * FROM category_ing");
})

router.get("/ingridients", (req, res) => {
	connection.query("SELECT * FROM ingridients LEFT JOIN category_ing using(cat_id)", function (err, result, fields) {
		if (err) console.log(err);
		console.log(result);
		res.send(result)

	})
})

router.post('/modifications', (req, res) => {
	bd(req,res,"INSERT INTO modifications   (bar_code,title_product,title,self_cost,price,markup,weight_goods) VALUES (?,?,?,?,?,?,?)",[req.body.bar_code,req.body.title_product,req.body.title_mode,req.body.self_cost,req.body.price,req.body.markup,req.body.weight_goods]);
})
router.post('/oficients', (req, res) => {
	bd(req,res,"INSERT INTO oficients SET fio = ?",[req.body.fio]);
})

router.post('/restaurants', (req, res) => {
	bd(req,res,"INSERT INTO restaurants SET title = ?",[req.body.title]);
})

router.post('/shops', (req, res) => {
	bd(req,res,"INSERT INTO shops SET title = ?,print_runners = ?",[req.body.title,req.body.print_runners]);
})


router.get('/products', (req, res) => {
	bd(req,res,"SELECT * FROM products");
})

router.get('/productsMod', (req, res) => {
	connection.query("SELECT * FROM products", function (err, result, fields) {
		if (err) console.log(err);
		result.forEach(function(item, i, arr) {
			connection.query("SELECT * FROM modifications WHERE title_product = ?",item.title, function (err, result2, fields) {
				item.modification=result2;
				if(i==(result.length-1))
					res.send(result);
			})


		})
	})
})

router.get('/oficients', (req, res) => {
	bd(req,res,"SELECT * FROM oficients");
})

router.get('/categories', (req, res) => {
	bd(req,res,"SELECT * FROM categories");
})

router.get('/restaurants', (req, res) => {
	bd(req,res,"SELECT * FROM restaurants");
})
router.get('/modifications', (req, res) => {
	bd(req,res,"SELECT * FROM modifications");
})
router.get('/shops', (req, res) => {
	bd(req,res,"SELECT * FROM shops");
})
router.get('/sales', (req, res) => {
	bd(req,res,"SELECT * FROM sales");
})
function bd(req,res,sql,meanings)
{
	connection.query(sql,meanings, function (err, result, fields) {
		if (err) console.log(err);
		res.send(result);
	})
}

module.exports = router;