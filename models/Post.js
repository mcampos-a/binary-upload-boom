const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({ //schema that defines the db documents and the property value pairs (plus their data types)
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema); //export the model with the key word of "Post", it also makes mongo db create a Post collection called posts. Note you can put a third argument to name your collection.
