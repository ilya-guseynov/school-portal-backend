import mongoose from 'mongoose'

const GroupSchema = mongoose.Schema({
  title: String,
})

const Group = mongoose.model('Group', GroupSchema)

export {
  Group,
}
