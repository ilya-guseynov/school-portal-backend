import mongoose from 'mongoose'

const StudentParentRelationSchema = mongoose.Schema({
  studentId: mongoose.Types.ObjectId,
  parentId: mongoose.Types.ObjectId,
})

const StudentParentRelation = mongoose.model('StudentParentRelation', StudentParentRelationSchema)

export {
  StudentParentRelation,
}
