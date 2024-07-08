import jwt from 'jsonwebtoken'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import Email from '../utils/email.js'


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
    const url = `${req.protocol}://${req.get('host')}`
    await new Email(newUser, url).sendWelcome()
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


export const forgotPassword = catchAsync(async (req, res, next) => {
    //1) Get user based on POSTED Email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new AppError('No user found with such email', 404))
    }

    //2) Generate the random resest token
    const resetToken = user.createPasswordResetToken()
    //validateBeforeSave: false --> deactivate all validators that we specifies in our schema
    //Please provide email and password error is shown if not deactivated
    await user.save({ validateBeforeSave: false })

    try {
        const resetURL = `${req.protocol}://${req.get('host')}/resetPassword?token=${resetToken}`
        await new Email(user, resetURL).sendPasswordReset()

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        })
    } catch (err) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })

        return next(new AppError('There was an error sending the email. Try again later'), 500)
    }
})

export const resetPassword = catchAsync(async (req, res, next) => {
    //1) Get the user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.query.token).digest('hex')

    //finds user with the token
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gte: Date.now() } })   //if passwordResetExpires > right now then it means that it hasn't expired right now...comparision done with mongoDB

    //2) If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400))
    }

    user.password = req.body.password   //if next() is not called then it sets the password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()     //the above only modifies the document and not save it...so this saves or updates the document
    //we won't turn off the validator as we want the validators to confirm if password == passwordConfirm

    //3) Update changedPasswordAt property for the user
    //done in userModel.js

    //4) Log the user in, send JWT
    createSendToken(user, 200, req, res)
})