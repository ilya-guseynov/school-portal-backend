import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  login: String,
  password: String,
  firstName: String,
  lastName: String,
  middleName: String,
  userType: String,
})

const User = mongoose.model('User', UserSchema)

export {
  User,
}
