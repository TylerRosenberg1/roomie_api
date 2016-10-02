var express = require("express");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 7000;
var bodyParser = require("body-parser");
var cors = require("cors");
var db = mongoose.connect('mongodb://localhost/roomtrack');
var User = require("./models/user.model");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var userController = require("./controllers/user.controller");
var roommateController = require("./controllers/roommate.controller");


app.post("/user", userController.create); //DONE

app.post("/roommate", roommateController.create);
app.post("/roommate/update", roommateController.update)






app.listen(port)
