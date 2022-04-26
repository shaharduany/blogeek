import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: false,
  },
  date: {
    type: Date,
    required: false,
    unique: false,
    default: Date.now(),
  },
  comments: {
    type: Array,
    required: false,
    unique: false,
    default: [],
  },
  content: {
    type: String,
    required: true,
    unqiue: false,
  },
});

module.exports = mongoose.models?.Posts || mongoose.model("Posts", postSchema);
