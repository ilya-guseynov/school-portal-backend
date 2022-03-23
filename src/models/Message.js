import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema({
  senderId: mongoose.Types.ObjectId,
  recieverId: mongoose.Types.ObjectId,
  messagetitle: String,
  messageText: String,
})

const Message = mongoose.model('Message', MessageSchema)

export {
  Message,
}
