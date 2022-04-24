import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    sender: {
        type: ObjectId,
        required: true,
        unique: false,
    },
    content: {
        type: String,
        required: true,
        unique: false,
    },
    date: {
        type: Date,
        required: false,
        unqiue: false,
        default: Date.now(),
    },
    post: {
        type: ObjectId,
        required: false,
        unique: false,
    }
});

module.exports = mongoose.models?.Comment || mongoose.model("Comment", commentSchema);