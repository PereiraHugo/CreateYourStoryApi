const express = require("express");
const app = express();
var cors = require('cors')
const querystring = require('querystring');
const mongoose = require('mongoose')

app.use(cors())

var routes = require("./routes/routes.js");

//var bodyParser = require("body-parser");
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to DB
//var configDB = require('./config/database.js');

mongoose.connect("mongodb://127.0.0.1:27017/Words");
const db = mongoose.connection;
require('./models/englishModel');

db.on('error', () => {
    console.log('DB connection Error');
});
db.once('open', () => {
    console.log('DB is connected');
});

routes(app);

//PORT
const port = process.env.PORT || 3000; //env variable PORT if not define use 3000.
var server = app.listen(port, function () {
    console.log("app running on port.", server.address().port);
    //console.log(mongoose.connection.readyState);
});
