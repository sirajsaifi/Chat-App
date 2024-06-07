import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({path: './config.env'})

import { app } from './app.js'



const port = process.env.PORT || 3500

const server = app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})