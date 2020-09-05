const jwt = require('jsonwebtoken')
const { resolve } = require('path')
const { rejects } = require('assert')


exports.verifyToken = function(token, key, email, id){
  return new Promise((resolve, rejects) => {
    jwt.verify(token, key, function(error, decoded){
      if (error) {
        console.log("token decode error or invaild")
        resolve(false) 
      }
      
      else {
        console.log('raw: ' + email + ' ' + id)
        console.log('decode: ' + decoded.user_email + ' ' + decoded.user_id)
        if ((decoded.user_email === email) && (decoded.user_id === id)){
          console.log('token vaild')
          resolve(true) 
        }
        else {
          console.log('token invaild')
          resolve(false) 
        }
      }  
    })
  })
  
}
