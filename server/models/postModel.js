import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('posts', postSchema);