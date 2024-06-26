import express from "express";
import { Products } from "../models/productSchema.js";
import User from "../models/userSchema.js";
import bcryptjs from "bcryptjs"

export const router = new express.Router()

router.get('/getproducts', async (req, res) => {
    try {
        const productsData = await Products.find()
        // console.log(productsData)
        res.status(201).json(productsData)
    } catch (error) {
        console.log("Error: " + error.message)
    }
})

router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params
        // console.log(id)
        const individualData = await Products.findOne({ id: id })
        res.status(201).json(individualData)
    } catch (error) {
        res.status(400).json(individualData)
        console.log("Error at router: " + error.message)
    }
})
0
router.post("/register", async (req, res) => {
    // console.log(req.body)

    const { name, email, mobile, password, confirmPassword } = req.body

    if (!name || !email || !mobile || !password || !confirmPassword) {
        res.status(422).json({ error: "Fill all the data!" });
    }

    try {
        const preUser = await User.findOne({ email: email })

        const existingMobile = await User.findOne({ mobile: mobile });
        if (preUser) {
            res.status(422).json({
                error
                    : 'User already exists.'
            })
        } else if (password != confirmPassword) {
            res.status(422).json({
                error
                    : "Confirm password doesn't match to the password."
            })
        } else if (existingMobile) {
            res.status(422).json({
                error
                    : 'Mobile number already exists.'
            })
        } else {
            const finalUser = new User({
                name, email, mobile, password, confirmPassword
            })

            const storeData = await finalUser.save()
            console.log(storeData)
            res.status(201).json(storeData)
        }
    } catch (error) {
        throw new Error("Error while registering user." + error.message)
    }

})

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ Error: "Fill up a;; the details" })
    }

    try {
        const userLogin = await User.findOne({ email: email })
        console.log(userLogin)

        if (userLogin) {
            const isPasswordMatched = await bcryptjs.compare(password, userLogin.password)
            console.log(isPasswordMatched)

            if (!isPasswordMatched) {
                res.status(400).json({ Error: "Invalid password." })
            } else {
                res.status(201).json(userLogin)
            }
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid details." })
    }
})