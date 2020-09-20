const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  filter: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", PostSchema);
