import mongoose from "mongoose"
import validator from "validator"
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import AppError from "../utils/appError.js"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for the user'],
        maxlength: [15, 'A name should not be exceeding 15 characters.']
    },
    userName: {
        type: String,
        required: [true, 'A user must have a username.'],
        unique: true,
        maxlength: [15, 'A user name should not be exceeding 15 characters.']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email.'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email.']
    },
    profilePhoto: {
        type: String,
        default: 'default.jpg'
    },
    password: {
        type: String,
        minlength: [8, 'A password must have atleast 8 characters.'],
        required: [true, 'Please enter a password.'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not same.'
        }
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    passwordChangedAt: Date, //whenever someone change the password then this will be changed
    passwordResetToken: String,
    passwordResetExpires: Date,
},
    // createdAt, updatedAt...mongoose will create these fields because of timesamps
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    //password hashing
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const fieldName = Object.keys(error.keyValue)[0]
        return next(new AppError(`User with this ${fieldName} already exists.`, 409))
    } else {
        next(error)
    }
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {   //JWTTimestamp means when the JWT token was issued
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)    //10 is a base

        return JWTTimestamp < changedTimestamp  //returns true if password was changed
    }

    return false    //means not changed
}

userSchema.methods.createPasswordResetToken = function () {
    //32 is number of characters
    const resetToken = crypto.randomBytes(32).toString('hex')   //converts into hexadecimal string

    //encrypted password
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    //for testinng purposes
    //console.log({resetToken}, this.passwordResetToken)

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000     //10 min, 60 is sec, 1000 millisecond

    return resetToken   //unencrypted password
}

const User = mongoose.model('User', userSchema)

export default User