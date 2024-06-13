import Conversation from '../models/conversationModel.js'
import Message from '../models/messageModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

export const sendMessage = catchAsync(async (req, res) => {
    //receiving message from the user
    const { message } = req.body

    //we get the id from req.params by doing destructuring and then we rename it as receiver receiverId
    const { id: receiverId } = req.params

    //sender will be the loged-in user
    const senderId = req.user._id

    //find conversation where the participants array contains all the mentioned field. eg.senderId, receiverId 
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
    })

    //if there is no conversation between the two maybe because they will be chatting for the first time then a conversation is created when they start chattinf for the first time
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        })
    }

    //if new message
    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    })

    if (newMessage) {
        //push the newMessage in the message array in this conversation
        conversation.messages.push(newMessage._id)
    }

    // await conversation.save()
    // await newMessage.save()

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()])

    // // SOCKET IO FUNCTIONALITY WILL GO HERE
    // const receiverSocketId = getReceiverSocketId(receiverId)
    // if (receiverSocketId) {
    //     // io.to(<socket_id>).emit() used to send events to specific client
    //     io.to(receiverSocketId).emit("newMessage", newMessage)
    // }

    res.status(201).json(newMessage)
    // res.status(201).json({
    //     status: 'success'
    // })
})

export const getMessages = catchAsync(async (req, res) => {

    // renaming the id which we get from req.params by detructuring to userToChatId (the user with whom we are chatting)
    const { id: userToChatId } = req.params

    // the loggedin user
    const senderId = req.user._id

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] },
    })
    // .populate("messages") // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([])

    const messages = conversation.messages

    res.status(200).json(messages)
})