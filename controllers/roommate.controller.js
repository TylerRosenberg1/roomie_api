var User = require("../models/user.model");

var roommateController = {
  create: function(req, res) {
    User.findById("57f16436190a09099a1ddbde", function(err, user1) {
      User.findById("57f1645c05ec06099ead3db6", function(err, user2) {
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
      _id: "57f16436190a09099a1ddbde", "roommates._id": "57f1645c05ec06099ead3db6"
    }, {$set: {"roommates.$.status": "active"}}, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        User.findOneAndUpdate({
          _id: "57f1645c05ec06099ead3db6", "roommates._id": "57f16436190a09099a1ddbde"
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
      _id: "57f16436190a09099a1ddbde"
    }, {$pull: {roommates: {_id: "57f1645c05ec06099ead3db6"}}}, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        User.findOneAndUpdate({
          _id: "57f1645c05ec06099ead3db6"
        }, {$pull: {roommates: {_id: "57f16436190a09099a1ddbde"}}}, function(err, res) {
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
