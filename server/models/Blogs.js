import mongoose, { Schema } from "mongoose";

const Blog = new Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: "users"
    },
    content: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export default mongoose.model('blogs', Blog);