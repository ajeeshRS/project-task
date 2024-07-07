const mongoose = require("mongoose");

const messageModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    rqeuired: true,
  },
  topic: {
    type: String,
  },
});

module.exports = mongoose.model("Query", messageModel);
