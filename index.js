var express = require("express");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 7000;
var bodyParser = require("body-parser");
var cors = require("cors");
var db = mongoose.connect('mongodb://localhost/roomtrack');
var User = require("./models/user.model");
var Request = require("./models/request.model");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var userController = require("./controllers/user.controller");
var roommateController = require("./controllers/roommate.controller");
var requestController = require("./controllers/request.controller");

app.post("/user", userController.create);
app.get("/user/:id", userController.show);

app.post("/roommate", roommateController.create);
app.post("/roommate/update", roommateController.update);
app.delete("/roommate/delete", roommateController.destroy);

app.post("/request", requestController.create);
app.put("/request/update", requestController.update);
app.delete("/request/delete", requestController.destroy);






app.listen(port)
