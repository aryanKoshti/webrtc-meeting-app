import mongoose from "mongoose";
import { Schema } from "mongoose";

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String
    }
})

const userModel = mongoose.model("userModel", user)

export { userModel };