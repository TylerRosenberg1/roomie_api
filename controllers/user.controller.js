var User = require("../models/user.model");
var jwt = require("jsonwebtoken");

var userController = {
  create: function(req, res) {
    User.create(req.body, function(err, user) {
      if (err) {
        console.log(err);
        res.status(200).send(err)
      } else {
        var profile = {
          _id: user._id,
          name: user.name,
          username: user.username
        };
        var token = jwt.sign(profile, "qwerty1234");
        res.json({token: token, _id: profile._id});
      }
    })
  },
  show: function(req, res) {
    User.findOne({
      _id: req.user._id
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
        } else if (user._id == req.user._id) {
          res.status(200).send({error: "Cannot add yourself as a roommate :)"})
        } else {
          res.json(user)
        }
      }
    })
  },
  update: function(req, res) {
    User.findOneAndUpdate({
      _id: req.user._id
    }, {$set: {name: req.body.user.name}}, function(err, user) {
      if (err) {
        console.log(err);
      } else {

      }
    })
  }
}

module.exports = userController;
