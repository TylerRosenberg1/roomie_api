var User = require("../models/user.model");

var roommateController = {
  index: function(req, res) {
    User.findOne({
      _id: req.user._id
    })
    .populate("roommates._id")
    .exec(function(err, user) {
      res.json(user.roommates);
    })
  },
  create: function(req, res) {
    User.findById(req.user._id, function(err, user1) {
      User.findById(req.body.roommateId, function(err, user2) {
        User.update({
          _id: user1._id
        }, {$addToSet: {roommates: user2}}, function(err, res) {
          if (err) {
            console.log(err);
          } else {
            User.update({
              _id: user2._id
            }, {$addToSet: {roommates: user1}}, function(err, res) {
              if (err) {
                console.log(err);
              } else {

              }
            })
          }
        })
      })
    })
  },
  update: function(req, res) {
    User.findOneAndUpdate({
      _id: req.user._id, "roommates._id": req.params.requesterId
    }, {$set: {"roommates.$.status": "active"}}, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        User.findOneAndUpdate({
          _id: req.params.requesterId, "roommates._id": req.user._id
        }, {$set: {"roommates.$.status": "active"}}, function(err, res) {
          if (err) {
            console.log(err);
          } else {

          }
        })
      }
    })
  },
  destroy: function(req, res) {
    User.findOneAndUpdate({
      _id: req.user._id
    }, {$pull: {roommates: {_id: req.params.requesterId}}}, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        User.findOneAndUpdate({
          _id: req.params.requesterId
        }, {$pull: {roommates: {_id: req.user._id}}}, function(err, res) {
          if (err) {
            console.log(err);
          } else {
            
          }
        })
      }
    })
  }
}

module.exports = roommateController;
