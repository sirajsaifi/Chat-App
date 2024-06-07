import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({})

const Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation