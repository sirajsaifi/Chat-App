import jwt from 'jsonwebtoken'
import path from 'path'
import { fileURLToPath } from 'url'

import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id)

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true  //to prevent XSS attacks and avoiding cookie to be accessed and edited in the client-side-js
    }

    //cookie will only be sent to encrypted connection...reduces tampering, interception
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

    //sending cookie
    res.cookie('jwt', token, cookieOptions)

    //excluding password in the output from the 
    user.password = undefined

    res.status(statusCode).json({
        status: "success",
        token,
        user
    })
}


export const signup = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body)
    createSendToken(newUser, 201, req, res)
})


export const login = catchAsync(async (req, res, next) => {
    const { userName, password } = req.body

    if (!userName || !password) {
        return next(new AppError('Please provide the username and the password', 400))
    }

    const user = await User.findOne({ userName }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect username or password', 401))
    }

    createSendToken(user, 200, req, res)
})

export const logout = catchAsync(async (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({
        status: 'success'
    })
})
