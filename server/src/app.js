import express from 'express'
import dotenv from 'dotenv'
import connectDb from './db/index.js'
import cors from "cors"
import { router } from './routes/router.js'

dotenv.config({
    path: './.env'
})

connectDb()

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})
