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