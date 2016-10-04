var Request = require("../models/request.model");
var User = require("../models/user.model");

var requestController = {
  create: function(req, res) {
    Request.create({
      description: req.body.description,
      amount: req.body.amount
    }, function(err, request) {
      User.findOneAndUpdate({
        _id: req.body.requestRecieverId, "roommates._id": req.user._id
      }, {$addToSet: {"roommates.$.requests": request}}, function(err, res) {
        if (err) {
          console.log(err);
        } else {

        }
      })
    })
  },
  update: function(req, res) {
    Request.findOneAndUpdate({
      _id: req.params.id
    }, {$set: {status: "accepted"}}, function(err, request) {
      if (err) {
        console.log(err);
      } else {
        User.findOneAndUpdate({
          _id: req.user._id, "roommates._id": req.params.roommateId
        }, {$inc: {"roommates.$.balance": -request.amount}, $pull: {"roommates.$.requests": req.params.id}}, function(err, resp) {
          if (err) {
            console.log(err);
          } else {
            User.findOneAndUpdate({
              _id: req.params.roommateId, "roommates._id": req.user._id
            }, {$inc: {"roommates.$.balance": request.amount}}, function(err, resp) {
              if (err) {
                console.log(err);
              } else {

              }
            })
          }
        })
      }
    })
  },
  destroy: function(req, res) {
    User.findOneAndUpdate({
      _id: req.user._id, "roommates._id": req.params.roommateId
    }, {$pull: {"roommates.$.requests": req.params.id}}, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        Request.remove({
          _id: req.params.id
        }, function(err, resp) {
          if (err) {
            console.log(err);
          } else {

          }
        })
      }
    })
  }
}

module.exports = requestController;
