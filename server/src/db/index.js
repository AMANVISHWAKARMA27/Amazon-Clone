import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { Products } from "../models/productSchema.js";

import { productsData } from "../constants/productData.js";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`\nMongoDB connected !! DB HOST : ${connectionInstance.connection.host}`)

        await Products.deleteMany({})
        const storeData = await Products.insertMany(productsData)
        console.log(storeData)
    } catch (error) {
        console.log("MONGODB connection error, " + error)
        process.exit(1)
    }
}

export default connectDb
