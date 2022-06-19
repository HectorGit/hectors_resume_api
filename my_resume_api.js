var express = require('express');
var app = express();
var path = require("path");
const bodyParser = require('body-parser')
var port =  process.env.PORT || 5001;

router = express.Router();
app.use(router);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
})) 

app.use(express.json());

app.use("/", require("./routes/get"));

app.listen(port);

console.log('My Resume API server started on port : ' + port)