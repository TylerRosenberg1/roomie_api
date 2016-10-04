var jwt = require("jsonwebtoken");
var User = require("../models/user.model");
var bcrypt = require("bcrypt");

var sessionController = {
  create: function(req, res) {
    User.findOne({
      username: req.body.user.username
    }, function(err, user) {
      if (err) {
        res.status(200).send({error: "Incorrect username or password"});
      } else {
        if (!user) {
          res.status(200).send({error: "Incorrect username or password"});
        } else {
          if (bcrypt.compareSync(req.body.user.password, user.password)) {
            var profile = {
              _id: user._id,
              name: user.name,
              username: user.username
            };
            var token = jwt.sign(profile, "qwerty1234");
            res.json({token: token, _id: profile._id})
          } else {
            res.status(200).send({error: "Incorrect username or password"});
          }
        }
      }
    })
  }
}

module.exports = sessionController;
