var Request = require("../models/request.model");
var User = require("../models/user.model");

var requestController = {
  create: function(req, res) {
    Request.create({
      description: req.body.description,
      amount: req.body.amount
    }, function(err, request) {
      User.findOneAndUpdate({
        _id: "57f19540ac8ebd0db6905244", "roommates._id": "57f19536ac8ebd0db6905243"
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
      _id: "57f2a17a781ffd0f469b7ad4"
    }, {$set: {status: "accepted"}}, function(err, request) {
      if (err) {
        console.log(err);
      } else {
        User.findOneAndUpdate({
          _id: "57f19540ac8ebd0db6905244", "roommates._id": "57f19536ac8ebd0db6905243"
        }, {$inc: {"roommates.$.balance": -request.amount}}, function(err, resp) {
          if (err) {
            console.log(err);
          } else {
            User.findOneAndUpdate({
              _id: "57f19536ac8ebd0db6905243", "roommates._id": "57f19540ac8ebd0db6905244"
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
      _id: "57f19540ac8ebd0db6905244", "roommates._id": "57f19536ac8ebd0db6905243"
    }, {$pull: {"roommates.$.requests": "57f29b657725f10ed51b90ff" }}, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        Request.remove({
          _id: "57f29b657725f10ed51b90ff"
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
