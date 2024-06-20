import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

import authRouter from './routes/authRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(`${__dirname}/public`))

//to parse data (json format) from the body to the req.body
app.use(express.json())

//parsing cookies to the req.cookies
app.use(cookieParser())

// This ensures that the server properly handles requests from different origins (domains)
// app.use(cors({
//     origin: ["http://localhost:3000"], // frontend domains
//     credentials: true
// }))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/messages', messageRouter)
app.use('/api/v1/users', userRouter)


export default app