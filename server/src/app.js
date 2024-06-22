import express from 'express'
import dotenv from 'dotenv'
import connectDb from './db/index.js'

dotenv.config({
    path: './.env'
})

connectDb()

const app = express()

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})
