import mongoose from 'mongoose'

const MarkSchema = mongoose.Schema({
  studentId: mongoose.Types.ObjectId,
  taskId: mongoose.Types.ObjectId,
  grade: String,
})

const Mark = mongoose.model('Mark', MarkSchema)

export {
  Mark,
}
