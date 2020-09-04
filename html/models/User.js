const mongoose    = require('mongoose')
const Schema      = mongoose.Schema

const userSchema    = new Schema({
  firstName: {
    type: String
  },
  lastName:  {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  birthDate: {
    type: Date
  },
  gender: {
    type: String
  },
  password: {
    type: String
  }
},{timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User