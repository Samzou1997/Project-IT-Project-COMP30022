const { ObjectId } = require('bson')
const mongoose    = require('mongoose')
const Schema      = mongoose.Schema

var nowDate = Date.now()

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
  details: {
    major: {type: String, default: 'null'},
    school: {type: String, default: 'null'},
    degree: {type: String, default: 'null'},
    gender: {type: String, default: 'null'},
    dateBirth: {type: Date, default: nowDate},
    phone: {type: String, default: 'null'},
    address: {type: String, default: 'null'},
  },
  setting: {
    $ref: String,
    $id: Schema.Types.ObjectId,
    $db: String,
  }
},{timestamps: true})

// users collection example:
var example = {
  "_id" : ObjectId("5f69ce5f5f8cd7751b793c81"),
  
  "firstName" : "xxx",
  "lastName" : "xxx",
  "email" : "xxx@xxx.com",
  "password" : "e10adc3949ba59abbe56e057f20f883e",
  "details" : {
    "major" : "IT",
    "school" : "xxx",
    "degree" : "xxx",
    "gender" : "",
    "dateBirth" : "",
    "phone" : "0444xxxxxx",
    "address" : "xxxx xxxx xxx",
  },
  "setting" : {
    "$ref": "userSetting",
    "$id": ObjectId("534009e4d852427820000002"),
    "$db": "Geek",
  }
}

const User = mongoose.model('User', userSchema)
module.exports = User