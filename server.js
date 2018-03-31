// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Router
var router = express.Router();
require("./routes/routes")(router);

// Models
var Comment = require("./models/Comment");
var Article = require("./models/Article");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Express
var app = express();

// Body parser
app.use(bodyParser.urlencoded({extended: false}));

// Static public folder
app.use(express.static(process.cwd() + "/public"));

// Use handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use router
app.use(router);

// Mongoose db configuration
mongoose.connect("mongodb://localhost/mongoosearticles");
var db = mongoose.connection;

// Mongoose show error
db.on("error", function(error) {
    console.log("Mongoose Error: " + error);
});

// Mongoose connect
db.once("open", function() {
    console.log("Mongoose connection sucessful.");
});

// PORT & Listen
var PORT = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Running on Port: " + PORT);
});