var User = require("../models/user.model");

var userController = {
  create: function(req, res) {
    User.create({
      name: req.body.name,
      username: req.body.username.toLowerCase(),
      password: req.body.password
    }, function(err, user) {
      if (err) {
        res.status(200).send(err)
      } else {
        res.json(user)
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
        res.json(user);
      }
    })
  }
}

module.exports = userController;
