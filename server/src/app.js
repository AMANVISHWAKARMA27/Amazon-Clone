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
const corsOptions = {
    origin: 'https://amazon-clone-client-gamma.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser(""))
app.use(router)

app.use((req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})
