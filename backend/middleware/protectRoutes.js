import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const protectRoutes = catchAsync(async (req, res, next) => {
	let token
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]
	}
	else if (req.cookies.jwt) {
		token = req.cookies.jwt
	}

	if (!token) {
		return next(new AppError('You are not logged in. Please login to get access', 401))
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

	const currentUser = await User.findById(decoded.id)
	if (!currentUser) {
		return next(new AppError('The user belonging to this token does no longer exist', 401))
	}

	// if (currentUser.changedPasswordAfter(decoded.iat)) {
	//     return next(new AppError('User recently changed the password. Please login again', 404))
	// }

	req.user = currentUser
	next()
})

export default protectRoutes