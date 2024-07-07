const mongoose = require("mongoose");

const userContactSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("User", userContactSchema);
