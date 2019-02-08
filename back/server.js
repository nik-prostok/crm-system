const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const logger		 = require('morgan');
const cors 			 = require('cors')

app.use(logger('dev'))
app.use(bodyParser.json({ extended: true }))
app.use(cors())
require('./routes/index')(app);

/*app.listen(process.env.PORT || config.port,
	() => console.log(`Server start on port ${config.port} ...`))*/

const port = 8080;
app.listen(port, () => {
	console.log('App started on localhost:' + port);
});
