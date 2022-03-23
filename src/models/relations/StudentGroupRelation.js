import mongoose from 'mongoose'

const StudentGroupRelationSchema = mongoose.Schema({
  studentId: mongoose.Types.ObjectId,
  groupId: mongoose.Types.ObjectId,
})

const StudentGroupRelation = mongoose.model('StudentGroupRelation', StudentGroupRelationSchema)

export {
  StudentGroupRelation,
}
