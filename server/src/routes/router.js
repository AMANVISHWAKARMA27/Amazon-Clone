import express from "express";
import { Products } from "../models/productSchema.js";

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
