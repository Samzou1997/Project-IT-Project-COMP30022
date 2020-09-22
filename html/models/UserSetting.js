const { ObjectId } = require('bson')
const mongoose    = require('mongoose')
const Schema      = mongoose.Schema

const userSettingSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: 'default'
  },
  visibility: {
    type: String,
    default: 'private'
  },
})

const UserSetting = mongoose.model('UserSetting', userSettingSchema)
module.exports = UserSetting