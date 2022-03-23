import mongoose from 'mongoose'

const SubjectSchema = mongoose.Schema({
  title: String,
})

const Subject = mongoose.model('Subject', SubjectSchema)

export {
  Subject,
}
