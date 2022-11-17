const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  likes: {
    type: mongoose.Schema.ObjectId,
    ref: "Car",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Like", likeSchema);
