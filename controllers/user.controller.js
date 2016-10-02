var User = require("../models/user.model");

var userController = {
  create: function(req, res) {
    User.create({
      name: req.body.name,
      username: req.body.username.toLowerCase(),
      password: req.body.password
    }, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        //Give JWT
      }
    })
  }
}

module.exports = userController;
