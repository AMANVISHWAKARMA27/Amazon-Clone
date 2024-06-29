import express from 'express'
import dotenv from 'dotenv'
import connectDb from './db/index.js'
import cors from "cors"
import { router } from './routes/router.js'
import cookieParser from "cookie-parser"

dotenv.config({
    path: './.env'
})

connectDb()

const app = express()
app.use(express.json())
app.use(cookieParser(""))
app.use(cors({
    origin:"https://amazon-clone-client-gamma.vercel.app"
}))
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})
