const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const logger		 = require('morgan');
const cors 			 = require('cors')

app.use('/static', express.static('public'));

app.use(cors())

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



require('./routes/index')(app)

const port = 8081;
app.listen(port, () => {
	console.log('App started on localhost:' + port);
});
