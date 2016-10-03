var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
  description: {
    type: String
  },
  amount: {
    type: Number
  },
  status: {
    type: String,
    default: "pending"
  }
})

module.exports = mongoose.model("Request", RequestSchema);
