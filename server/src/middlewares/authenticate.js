import jwt from "jsonwebtoken"
import User from "../models/userSchema.js"
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})

const secretKey = process.env.KEY

export const authenticate = async (req, res, next) => {
    try {
        const cookie = req.cookies.AmazonClone
        const verifyCookie = jwt.verify(cookie, secretKey)
        console.log(verifyCookie)

        const user = await User.findOne({ _id: verifyCookie._id, "tokens.token": cookie })
        console.log(user)

        if (!user) {
            throw new Error("User not found.")
        }

        req.token = cookie
        req.user = user
        req.userId = user._id

        next()
    } catch (error) {
        console.log("Authentiation Error: " + error.message)
        res.status(401).send("Unauthorized User")
    }
}