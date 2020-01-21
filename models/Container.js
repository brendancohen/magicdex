const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
var ContainerSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});
module.exports = Container = mongoose.model("containers", ContainerSchema);
