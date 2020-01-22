const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
var CardSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  container: {
    type: String,
    required: false
  }
});
module.exports = Card = mongoose.model("cards", CardSchema);
