const express = require('express')
const router = express.Router()
var mysql = require('mysql');
var multer  = require('multer')
var fs = require('fs');


var delcat = [];
var countdelcat = 0;

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
		console.log("ASDASDASDASD");
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
	delcat = [];
	countdelcat = 0;
	delcat.push(req.body.id);
	fdelcat();
	res.send("OK");
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
router.post('/addmap',upload.single('avatar'), (req, res) => {
	console.log(req.body);
	var filename = 'null';
	if (req.file){
		filename = req.file.filename;
	}
	bd(req,res,"INSERT INTO technical_cards  (title,bar_code,cat_id,shop_id,colour,no_dicsount,weight,cooking_process,time_cooking_m,time_cooking_s,photo)VALUES (?,?,?,?,?,?,?,?,?,?,?) ",[req.body.title,req.body.bar_code,req.body.category.id,req.body.shop.id,req.body.color,req.body.weight,req.body.no_dicsount,req.body.process_cooking,req.body.min_cook,req.body.sec_cook,filename]);
	connection.query("SELECT id FROM technical_cards ORDER BY id DESC LIMIT 1", function (err, result, fields) {
		if (err) console.log(err);

		var a = result[0].id;
		req.body.ingridients.forEach(item =>{
			connection.query("INSERT INTO cards_and_ingridients  (id_cards,id_ingridients,brutto,netto,price) VALUES (?,?,?,?,?) ",[a,item.id,item.brutto,item.netto,item.price], function (err, result, fields) {
				if(item.method_cooking!=undefined)
				{
					connection.query("SELECT id FROM cards_and_ingridients ORDER BY id DESC LIMIT 1", function (err, result2, fields) {
						if (err) console.log(err);

						var b = result2[0].id;
						item.method_cooking.forEach(item2 =>{
							connection.query("INSERT INTO cards_and_ingridients_cooking  (id_cards_and_ingridients,id_method_cooking) VALUES (?,?) ",[b,item2.id], function (err, result, fields) {
								if (err) console.log(err);

							})
						})
					})
				}
			})
		})
		req.body.modificators.forEach(item3 =>{
			connection.query("INSERT INTO modifiers SET title = ?,type = ?,max = ?,min = ?",[item3.title,item3.type,item3.max,item3.min],function (err, result2, fields) {
				if (err) console.log(err);

				connection.query("SELECT id FROM modifiers ORDER BY id DESC LIMIT 1", function (err, result7, fields) {
					if (err) console.log(err);

					var c = result7[0].id;
					connection.query("INSERT INTO cards_and_mods SET id_cards = ?,id_mods = ?",[a,c],function (err, result2, fields) {
						if (err) console.log(err);
					})


					item3.ingridients.forEach(item4 =>{
						connection.query("INSERT INTO modifications_and_ingridients  (id_mods,id_ingridients,brutto,netto,price) VALUES (?,?,?,?,?) ",[c,item4.id,item4.brutto,item4.netto,item4.price], function (err, result, fields) {
							if (err) console.log(err);
							if(item4.method_cooking!=undefined)
							{
								connection.query("SELECT id FROM modifications_and_ingridients ORDER BY id DESC LIMIT 1", function (err, result8, fields) {
									if (err) console.log(err);

									var d = result8[0].id;
									item4.method_cooking.forEach(item5 =>{
										connection.query("INSERT INTO modifications_and_ingridients_cooking  (id_mods_and_ingridients,id_method_cooking) VALUES (?,?) ",[d,item5.id], function (err, result, fields) {
											if (err) console.log(err);

										})
									})
								})
							}
						})
					})

				})
			})


		})
	})
})

router.post('/deleteCard', (req, res) => {
	connection.query("DELETE FROM technical_cards WHERE id = ?", [req.body.id], function(err, result, fields){
		if (err){
			console.log(err);
			res.send(500);
		}
		else {
			res.send(200);
		}

	})
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
router.post('/updateHiding', (req, res) => {
	var str = "UPDATE "+String(req.body.NameTable) + " SET hiding = ? WHERE id = ?";
	connection.query(str,[req.body.hiding,req.body.id],function (err, result, fields) {
		if (err) console.log(err);
	})
	res.send("Ok");
})

router.get('/map', (req, res) => {
	connection.query("SELECT t1.id, t1.title, t1.bar_code, t1.colour, t1.no_dicsount, t1.time_cooking_m, t1.time_cooking_s, t1.weight, cat_table.title AS cat_title, shops_table.title AS shop_title FROM technical_cards AS t1 LEFT JOIN categories AS cat_table ON cat_table.id = t1.cat_id LEFT JOIN shops AS shops_table ON shops_table.id = t1.shop_id", function (err, result, fields) {
		result.forEach(function(item, i, arr) {
			connection.query("SELECT * FROM cards_and_ingridients WHERE id_cards = ?  ",[item.id], function (err, result2, fields) {
				item.ingridients=result2;
				item.NameTable = "technical_cards";
				item.ingridients.forEach(function(item2, i, arr) {
					connection.query("SELECT * FROM cards_and_ingridients_cooking WHERE id_cards_and_ingridients = ?  ",[item2.id], function (err, result3, fields) {
						item2.listMethodsCooking=result3;
					})
				})
			})
			connection.query("SELECT * FROM cards_and_mods WHERE id_cards = ?  ",[item.id], function (err, result3, fields) {
				result3.forEach(function(item2, i, arr) {
					connection.query("SELECT * FROM modifiers WHERE id = ?  ",[item2.id_mods], function (err, result4, fields) {
						item.modificators=result4;
						item.modificators.forEach(function(item5, i, arr) {
							connection.query("SELECT * FROM modifications_and_ingridients WHERE id_mods = ?  ",[item5.id], function (err, result5, fields) {
								item5.ingridients = result5;
								item5.ingridients.forEach(function(item6, i, arr) {
									connection.query("SELECT * FROM modifications_and_ingridients_cooking WHERE id_mods_and_ingridients = ?  ",[item6.id], function (err, result6, fields) {
										item6.listMethodsCooking=result6;

									})
								})
							})
						})
					})
				})
			})

		})
		setTimeout( function(){
			console.log(result);
			res.send(result);

		}, 500 );
	})
	
})

router.get('/modificators', (req, res) => {
	connection.query("SELECT * FROM modifiers   ", function (err, result4, fields) {
						result4.forEach(function(item5, i, arr) {
							connection.query("SELECT c.brutto,c.netto,c.price, i.title, i.id, i.unit,i.cat_id,i.losses_clean,i.losses_cooking,i.losses_frying,i.losses_stew,i.losses_bak,i.weight,i.round FROM modifications_and_ingridients AS c LEFT JOIN ingridients AS i ON c.id_ingridients=i.id WHERE id_mods = ?  ",[item5.id], function (err, result5, fields) {
		if (err) console.log(err);
								item5.ingridients = result5;
								item5.ingridients.forEach(function(item6, i, arr) {
									connection.query("SELECT * FROM modifications_and_ingridients_cooking WHERE id_mods_and_ingridients = ?  ",[item6.id], function (err, result6, fields) {
										item6.listMethodsCooking=result6;

									})
									
								})
							})
						})
					setTimeout( function(){
			res.send(result4);

		}, 500 );
					})
	
})

router.get('/mods', (req, res) => {
	bd(req,res,"SELECT * FROM modifications");
})
function bd(req,res,sql,meanings)
{
	connection.query(sql,meanings, function (err, result, fields) {
		if (err) console.log(err);
		res.send(result);
	})
}
function fdelcat()
{
	connection.query("SELECT id FROM categories WHERE parent_id = ?",[Number(delcat[countdelcat])], function (err, result, fields) {
		if (err) console.log(err);
		result.forEach(item =>{
			delcat.push(item.id);
		});
		countdelcat++;
		console.log(delcat);
		if(countdelcat!=delcat.length)
		{
			fdelcat();
		}
		else
		{
			delcat.forEach(item =>{
				connection.query("DELETE FROM categories WHERE id = ?",[item], function (err, result, fields) {
					if (err) console.log(err);
				})
			});
		}
	})
}
module.exports = router;