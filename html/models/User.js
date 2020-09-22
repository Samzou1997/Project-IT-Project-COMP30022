const mongoose    = require('mongoose')
const Schema      = mongoose.Schema

const userSchema    = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName:  {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  detail: {
    type: Schema.Types.Mixed,
    default: {
      gender: {
        type: String,
        default: 'null'
      },
      dateBirth: {
        type: String,
        default: 'null'
      }
    }
  }
  //avatar:{
  //  type: String,
  //  default: '/public/..'
},{timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User