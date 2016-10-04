var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: [true, "Please enter a username"],
    minlength: [6, "Username must be at least 6 characters"],
    maxlength: [15, "Username cannot exceed 15 characters"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: [17, "Password cannot exceed 17 characters"],
  },
  roommates: [{roommate: {type: Schema.Types.ObjectId, ref: "User", unique: true}, status: {type: String, default: "pending"}, requests: [{type: Schema.Types.ObjectId, ref: "Request"}], balance: {type: Number, default: 0}}]
})

UserSchema.plugin(uniqueValidator, { message: 'That username already exists. Please choose a new one' });

UserSchema.pre('save', function(next) {
    if(this.password) {
        var hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        this.password = hash;
    }
    next()
})

module.exports = mongoose.model("User", UserSchema);
