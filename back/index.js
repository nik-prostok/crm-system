const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const app = express()
const MongoClient = require("mongodb").MongoClient;

const routes = require('./routes/statistic/products');

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(routes)

app.listen(process.env.PORT || config.port,
	() => console.log(`Server start on port ${config.port} ...`))

/*const mongoClient = new MongoClient("mongodb://crm_user:ghjtyubnm1@ds111455.mlab.com:11455/crm", { useNewUrlParser: true });


mongoClient.connect(function(err, client){

	if(err){
		return console.log(err);
	}
	console.log("Connected!");
    // взаимодействие с базой данных
    client.close();
});

app.get('/', (req, res) => {
	res.send('ok');
})

app.post('/addmap', (req, res)=>{
	console.log(req.body);

	mongoClient.connect((err, client) =>{

		if(err){
			return console.log(err);
		}
		
		const db = client.db("crm");
		const collection = db.collection("tech_maps");
		collection.insertOne(req.body, function(err, result){

			if(err){ 
				return console.log(err);
			}
			console.log(result.ops);
		});

		client.close();
	});

	
	res.send(200);
})*/