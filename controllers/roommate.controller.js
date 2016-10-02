var User = require("../models/user.model");

var roommateController = {
  create: function(req, res) {
    User.findById("57f19536ac8ebd0db6905243", function(err, user1) {
      User.findById("57f19540ac8ebd0db6905244", function(err, user2) {
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
                console.log(res);
              }
            })
          }
        })
      })
    })
  },
  update: function(req, res) {
    User.findOneAndUpdate({
      _id: "57f19536ac8ebd0db6905243", "roommates._id": "57f19540ac8ebd0db6905244"
    }, {$set: {"roommates.$.status": "active"}}, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        User.findOneAndUpdate({
          _id: "57f19540ac8ebd0db6905244", "roommates._id": "57f19536ac8ebd0db6905243"
        }, {$set: {"roommates.$.status": "active"}}, function(err, res) {
          if (err) {
            console.log(err);
          } else {
            console.log("COMPLETE");
          }
        })
      }
    })
  },
  destroy: function(req, res) {
    User.findOneAndUpdate({
      _id: "57f19536ac8ebd0db6905243"
    }, {$pull: {roommates: {_id: "57f19536ac8ebd0db6905243"}}}, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        User.findOneAndUpdate({
          _id: "57f19536ac8ebd0db6905243"
        }, {$pull: {roommates: {_id: "57f19536ac8ebd0db6905243"}}}, function(err, res) {
          if (err) {
            console.log(err);
          } else {
            console.log("COMPLETE");
          }
        })
      }
    })
  }
}

module.exports = roommateController;
