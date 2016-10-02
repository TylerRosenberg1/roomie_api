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
      });
    })
  }
}

module.exports = roommateController;
