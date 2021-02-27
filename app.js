const express = require('express');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const port = 8585;

const connection = require('./db'); 

const app = express();
var swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cors(corsOptions));

require("./routes/analysis.route.js")(app);
const server = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = server;