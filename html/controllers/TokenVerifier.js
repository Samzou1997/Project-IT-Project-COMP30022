const jwt = require('jsonwebtoken')


exports.verifyToken = function(token, key, email, id){
  let decoded = jwt.verify(token, key)
  if ((decoded.user_email === email) && (decoded.user_id === id)){
    console.log('token vaild')
    return true
  }
  else {
    console.log('token invaild')
    return false
  }
  
  // jwt.verify(token, key, function(error, decoded){
  //   if (error) {
  //     console.log("token decode error or invaild")
  //     return false 
  //   }
    
  //   else {
  //     console.log('raw: ' + email + ' ' + id)
  //     console.log('decode: ' + decoded.user_email + ' ' + decoded.user_id)
  //     if ((decoded.user_email === email) && (decoded.user_id === id)){
  //       console.log('token vaild')
  //       return true
  //     }
  //     else {
  //       console.log('token invaild')
  //       return false
  //     }
  //   }  
  // })
}
