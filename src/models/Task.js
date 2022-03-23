import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
  lessonId: mongoose.Types.ObjectId,
  taskText: String,
})

const Task = mongoose.model('Task', TaskSchema)

export {
  Task,
}
