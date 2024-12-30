import mongoose, { Schema } from "mongoose";

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://res.cloudinary.com/djybz7jly/image/upload/v1735559061/zlgv83acjqf6o4pufzs8.png"
    },
    blogs: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "blogs",
        default: []
    },
}, { timestamps: true });

export default mongoose.model('users', User);