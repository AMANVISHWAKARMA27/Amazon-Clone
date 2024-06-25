import mongoose from "mongoose";
import { type } from "os";
import validator from "validator"
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("Not a valid email address.");
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
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

const User = new mongoose.model("User", userSchema)

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 12);
    }
    next();
});

export default User