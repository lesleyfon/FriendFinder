// Your server.js file should require the basic npm packages we've used in class: express, body-parser and path.

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

// set initial port. 
var PORT = process.env.PORT || 8080;

// set up Express app to to handle data parsing
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


// server Routes

require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

// creating our listener to start our server
app.listen(PORT, function(){
    console.log("App listening on port: " + PORT);
})
