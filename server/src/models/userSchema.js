import mongoose from "mongoose";
import { type } from "os";
import validator from "validator"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validator(val) {
            if (!validator.isEmail(val)) {
                throw new Error("Not a valid email address.")
            }
        }
    },
    mobile: {
        type: String,
        require: true,
        unique: true,
        maxlength: 10
    },
    password: {
        type: String,
        require: true,
        minlength: 8
    },
    confirmPassword: {
        type: String,
        require: true,
        minlength: 8
    },
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ],

    carts: Array
})

export const User = new mongoose.model("User", userSchema)