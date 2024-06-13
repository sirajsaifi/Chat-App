import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

export const getUsersForSidebar = catchAsync(async (req, res) => {
    const loggedInUserId = req.user._id

    //to filter out our id as we don't want to see our account while chatting with others and -password because we don't want to include password in our outputs
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

    // res.status(200).json(filteredUsers)
    res.status(200).json({
        status: 'success',
        data: {
            data: filteredUsers
        }
    })
})