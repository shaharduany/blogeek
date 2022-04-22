import mongoose  from "mongoose";

let Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: false,
        default: "Annonymous",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: {
        type: Array,
        required: false,
        default: [],
    },
});

module.exports = mongoose.models?.Users || mongoose.model("Users", userSchema);