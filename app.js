var express = require("express");
var app = express();

var methodOverride = require("method-override");
app.use(methodOverride("_method"));
//Configuration of ejs
app.set("view engine", "ejs");

//configuration of mongoose(mongoDB)
//.......


//Configuration of Body Parser 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));



//To inherit the page main.css
app.use(express.static(__dirname + "/public"));





app.listen(process.env.PORT || 3000, process.env.ID, function (req, res) {
    console.log("Server has started on port 3000");
});