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
app.get("/user/:id", userController.show); //DONE

app.post("/roommate", roommateController.create);
app.post("/roommate/update", roommateController.update)
app.delete("/roommate/delete", roommateController.destroy)






app.listen(port)
