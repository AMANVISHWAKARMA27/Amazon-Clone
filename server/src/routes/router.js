import express from "express";
import { Products } from "../models/productSchema.js";
import User from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import { authenticate } from "../middlewares/authenticate.js";

export const router = new express.Router();

router.get('/getproducts', async (req, res) => {
    try {
        const productsData = await Products.find();
        res.status(201).json(productsData);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const individualData = await Products.findOne({ id: id });
        res.status(201).json(individualData);
    } catch (error) {
        console.log("Error at router: " + error.message);
        res.status(400).json({ error: "Invalid product ID" });
    }
});

router.post("/register", async (req, res) => {
    const { name, email, mobile, password, confirmPassword } = req.body;

    if (!name || !email || !mobile || !password || !confirmPassword) {
        return res.status(422).json({ error: "Fill all the data!" });
    }

    try {
        const preUser = await User.findOne({ email: email });
        const existingMobile = await User.findOne({ mobile: mobile });

        if (preUser) {
            return res.status(422).json({ error: 'User already exists.' });
        } else if (password !== confirmPassword) {
            return res.status(422).json({ error: "Passwords don't match." });
        } else if (existingMobile) {
            return res.status(422).json({ error: 'Mobile number already exists.' });
        } else {
            const finalUser = new User({ name, email, mobile, password, confirmPassword });
            const storeData = await finalUser.save();
            res.status(201).json(storeData);
        }
    } catch (error) {
        console.log("Error while registering user: " + error.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Fill all the details" });
    }

    try {
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isPasswordMatched = await bcryptjs.compare(password, userLogin.password);
            if (!isPasswordMatched) {
                return res.status(400).json({ error: "Invalid password." });
            } else {
                const token = await userLogin.generateAuthToken();
                res.cookie("AmazonClone", token, {
                    expires: new Date(Date.now() + 900000), // 15 minutes
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
                    sameSite: 'none' // Prevents CSRF attacks
                });
                res.status(201).json(userLogin);
            }
        } else {
            res.status(400).json({ error: "User not found." });
        }
    } catch (error) {
        console.log("Error while logging in: " + error.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/addCart/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        const userContact = await User.findOne({ _id: req.userId });

        if (userContact) {
            const cartData = await userContact.addCartData(cart);
            await userContact.save();
            res.status(201).json(userContact);
        } else {
            res.status(401).json({ error: "Invalid user" });
        }
    } catch (error) {
        console.log("Couldn't add to cart: " + error.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/cartdetails", authenticate, async (req, res) => {
    try {
        const buyUser = await User.findOne({ _id: req.userId });
        res.status(201).json(buyUser);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/validuser", authenticate, async (req, res) => {
    try {
        const validUser = await User.findOne({ _id: req.userId });
        res.status(201).json(validUser);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/remove/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        req.user.carts = req.user.carts.filter((curVal) => curVal.id !== id);
        await req.user.save();
        res.status(201).json(req.user);
    } catch (error) {
        console.log("Error while deleting the item: " + error.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/logout", authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((curVal) => curVal.token !== req.token);
        res.clearCookie("AmazonClone", { path: "/" });
        await req.user.save();
        res.status(201).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log('Error while logging out the user: ' + error.message);
        res.status(500).json({ error: "Server error" });
    }
});
