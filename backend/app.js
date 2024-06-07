import express from 'express';

import authRouter from './routes/authRoutes'
import messageRouter from './routes/messageRoutes'
import userRouter from './routes/userRoutes'

export const app = express()

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/messages', messageRouter)
app.use('/api/v1/users', userRouter)