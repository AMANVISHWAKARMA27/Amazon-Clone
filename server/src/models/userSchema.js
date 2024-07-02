import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const secret = process.env.KEY;

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
    carts: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            name: String,
            price: Number,
            quantity: Number,
            cartItemId: mongoose.Schema.Types.ObjectId // unique ID for each cart item
        }
    ]
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 12);
        this.confirmPassword = await bcryptjs.hash(this.confirmPassword, 12);
    }
    next();
});

// token generation
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, secret);
        console.log("Generated token:", token);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log("Error while generating token:" + error.message);
    }
};

userSchema.methods.addCartData = async function (cart) {
    try {
        cart.cartItemId = new mongoose.Types.ObjectId(); // generate unique ID for cart item
        this.carts = this.carts.concat(cart);
        await this.save();
        return this.carts;
    } catch (error) {
        console.log(error);
    }
};

const User = mongoose.model("User", userSchema);

export default User;
