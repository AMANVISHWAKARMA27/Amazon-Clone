import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

const secretKey = process.env.KEY;

export const authenticate = async (req, res, next) => {
    try {
        const cookie = req.cookies.AmazonClone;
        console.log("Cookie: ", cookie);

        if (!cookie) {
            throw new Error("No token provided.");
        }

        const verifyCookie = jwt.verify(cookie, secretKey);
        console.log("Verified Cookie: ", verifyCookie);

        const user = await User.findOne({ _id: verifyCookie._id, "tokens.token": cookie });
        console.log("User: ", user);

        if (!user) {
            throw new Error("User not found.");
        }

        req.token = cookie;
        req.user = user;
        req.userId = user._id;

        next();
    } catch (error) {
        console.log("Authentication Error: " + error.message);
        res.status(401).json({ error: "Unauthorized User" });
    }
};
