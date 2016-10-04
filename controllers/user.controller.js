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
  },
  search: function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        if (!user) {
          res.status(200).send({error: "No such user found. Please try again :)"})
        } else {
          res.json(user)
        }
      }
    })
  }
}

module.exports = userController;
