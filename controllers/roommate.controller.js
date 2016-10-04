var User = require("../models/user.model");

var roommateController = {
  index: function(req, res) {
    User.findOne({
      _id: "57f2e637017c091a8de80445"
    })
    .populate("roommates._id")
    .exec(function(err, user) {
      res.json(user.roommates);
    })
  },
  create: function(req, res) {
    User.findById("57f2e637017c091a8de80445", function(err, user1) {
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
                res.status(200).send();
              }
            })
          }
        })
      })
    })
  },
  update: function(req, res) {
    User.findOneAndUpdate({
      _id: "57f2e637017c091a8de80445", "roommates._id": req.params.requesterId
    }, {$set: {"roommates.$.status": "active"}}, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        User.findOneAndUpdate({
          _id: req.params.requesterId, "roommates._id": "57f2e637017c091a8de80445"
        }, {$set: {"roommates.$.status": "active"}}, function(err, res) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send();
          }
        })
      }
    })
  },
  destroy: function(req, res) {
    User.findOneAndUpdate({
      _id: "57f2e637017c091a8de80445"
    }, {$pull: {roommates: {_id: req.params.requesterId}}}, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        User.findOneAndUpdate({
          _id: req.params.requesterId
        }, {$pull: {roommates: {_id: "57f2e637017c091a8de80445"}}}, function(err, res) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send();
          }
        })
      }
    })
  }
}

module.exports = roommateController;
