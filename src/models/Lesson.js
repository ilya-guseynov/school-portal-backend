import mongoose from 'mongoose'

const LessonSchema = mongoose.Schema({
  subjectId: mongoose.Types.ObjectId,
  groupId: mongoose.Types.ObjectId,
  teacherId: mongoose.Types.ObjectId,
  lessonDate: Date,
  lessonNumber: Number,
})

const Lesson = mongoose.model('Lesson', LessonSchema)

export {
  Lesson,
}
