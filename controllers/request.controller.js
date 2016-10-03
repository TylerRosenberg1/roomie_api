var Request = require("../models/request.model");
var User = require("../models/user.model");

var requestController = {
  create: function(req, res) {
    Request.create({
      description: req.body.description,
      amount: req.body.amount
    }, function(err, request) {
      User.findOneAndUpdate({
        _id: req.body.requestRecieverId, "roommates._id": "57f2b51c76e62e11244162d2"
      }, {$addToSet: {"roommates.$.requests": request}}, function(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log("Woot");
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
          _id: "57f2b59c76e62e11244162d3", "roommates._id": req.params.roommateId
        }, {$inc: {"roommates.$.balance": -request.amount}, $pull: {"roommates.$.requests": req.params.id}}, function(err, resp) {
          if (err) {
            console.log(err);
          } else {
            User.findOneAndUpdate({
              _id: req.params.roommateId, "roommates._id": "57f2b59c76e62e11244162d3"
            }, {$inc: {"roommates.$.balance": request.amount}}, function(err, resp) {
              if (err) {
                console.log(err);
              } else {
                console.log(resp);
              }
            })
          }
        })
      }
    })
  },
  destroy: function(req, res) {
    User.findOneAndUpdate({
      _id: "57f2b51c76e62e11244162d2", "roommates._id": req.params.roommateId
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
            console.log("Fully Gone");
          }
        })
      }
    })
  }
}

module.exports = requestController;
