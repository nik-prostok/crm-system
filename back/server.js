const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const logger		 = require('morgan');
const cors 			 = require('cors')

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

require('./routes/index')(app)

const port = 8080;
app.listen(port, () => {
	console.log('App started on localhost:' + port);
});
