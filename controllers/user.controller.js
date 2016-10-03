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
  },
  show: function(req, res) {
    User.findOne({
      _id: req.params.id
    })
    .populate({path: "roommates._id roommates.requests"})
    .exec(function(err, user) {
      if (err) {
        console.log(err);
      } else {
        res.json(user.roommates)
      }
    })
  }
}

module.exports = userController;
