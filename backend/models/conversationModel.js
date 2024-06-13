import mongoose from "mongoose"

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],    //message id will be pushed here
        },
    ],
},
    { timestamps: true }
)

conversationSchema.pre(/^find/, function (next) {
    this.populate('messages')
    next()
})

const Conversation = mongoose.model("Conversation", conversationSchema)

export default Conversation