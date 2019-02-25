const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const logger		 = require('morgan');
const cors 			 = require('cors')
const mongoose = require('mongoose')

const config = require('./config/config')

app.use('/static', express.static('public'));

app.use(cors())

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/index')(app)

mongoose.Promise = global.Promise

mongoose.connect(config.mongodb, config.dbOptions)
mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))

