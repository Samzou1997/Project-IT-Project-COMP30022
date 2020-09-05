const jwt = require('jsonwebtoken')


exports.verifyToken = function(token, email, id){
  jwt.verify(token, secret_key, function(error, decoded){
    if (error) {
        return false
    }
    //console.log('decode: ' + decoded.user_email + ' ' + decoded.user_id)
    else {
        if ((decoded.user_email === email) && (decoded.user_id === id)){
            return true
        }
        else {
            return false
        }
    }  
  })
}
