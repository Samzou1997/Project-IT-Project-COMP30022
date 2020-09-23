const { ObjectId } = require('bson')
const mongoose    = require('mongoose')
const Schema      = mongoose.Schema

const userDataSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  shareLabel: {
    type: String,
    default: 'null'
  },
})

const UserData = mongoose.model('User_Data', userDataSchema)
module.exports = UserData