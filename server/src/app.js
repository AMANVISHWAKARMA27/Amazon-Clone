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
const allowedOrigins = ['https://amazon-clone-client-gamma.vercel.app', 'https://amazon-clone-client-kcr3muyzm-whilst-somebodys-projects.vercel.app'];
app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})
