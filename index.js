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
app.use(cors());

var userController = require("./controllers/user.controller");
var roommateController = require("./controllers/roommate.controller");
var requestController = require("./controllers/request.controller");

app.post("/user", userController.create); //DONE
app.post("/api/user/search", userController.search); //DONE
app.get("/api/user/:id", userController.show); //DONE

app.post("/api/roommate", roommateController.create);
app.post("/api/roommate/update", roommateController.update);
app.delete("/api/roommate/delete", roommateController.destroy);

app.post("/api/request", requestController.create); //DONE
app.put("/api/user/:roommateId/request/:id/update", requestController.update); //DONE
app.delete("/api/user/:roommateId/request/:id/delete", requestController.destroy); //DONE






app.listen(port)
