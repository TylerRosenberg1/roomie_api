var express = require("express");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 7000;
var bodyParser = require("body-parser");
var cors = require("cors");
var expressJWT = require("express-jwt");
var db = mongoose.connect('mongodb://localhost/roomtrack');
var User = require("./models/user.model");
var Request = require("./models/request.model");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use("/api", expressJWT({secret: "qwerty1234"}));

var userController = require("./controllers/user.controller");
var roommateController = require("./controllers/roommate.controller");
var requestController = require("./controllers/request.controller");
var sessionController = require("./controllers/session.controller");

app.post("/user", userController.create); //DONE
app.post("/api/user/search", userController.search); //DONE
app.get("/api/user/:id", userController.show); //DONE

app.post("/api/roommate", roommateController.create); //DONE
app.put("/api/roommate/:requesterId/update", roommateController.update); //DONE
app.delete("/api/roommate/:requesterId/delete", roommateController.destroy); //DONE
app.get("/api/user/roommate/requests", roommateController.index); //DONE

app.post("/api/request", requestController.create); //DONE
app.put("/api/user/:roommateId/request/:id/update", requestController.update); //DONE
app.delete("/api/user/:roommateId/request/:id/delete", requestController.destroy); //DONE

app.post("/session/new", sessionController.create);


app.listen(port)
