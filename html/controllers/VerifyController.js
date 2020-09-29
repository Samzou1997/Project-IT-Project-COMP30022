const User          = require('../models/User')
const { response }  = require('express')
var cookieParser    = require('cookie-parser')
const jwt           = require('jsonwebtoken')
const config        = require('../config/web_config.json')
var homePaddingData = require('../views/data_padding/home_data.json')

const secret_key          = config.token_setting.secret_key
const token_expire_time   = config.token_setting.expire_time
const cookie_alive_time   = config.cookie_setting.alive_time

const verify_login = (req, res, next) => {
  if (req.cookies["email"] != null) {
    console.log('===============================================================');
    console.log('User request: [' + req.cookies["email"] + ']');
    console.log('Request path: [' + req.path + ']');

    let req_token = req.cookies['token']
    let req_user_id = req.cookies['id']
    let req_user_email = req.cookies['email']

    //verify token
    jwt.verify(req_token, secret_key, function (error, decoded) {
      if (error) {
        console.log("token decode error")
        res.cookie('id', '', { maxAge: 0 })
        res.cookie('email', '', { maxAge: 0 })
        res.cookie('token', '', { maxAge: 0 })
        res.render('login_error.html', {
          login_error_message: "Login expired.",
        })
      }
      else {
        User.findOne({ email: decoded.user_email }, function (err, doc) {
          if (err) {
            console.log("db error")
            res.render('error.html', {
              title: 'System Error',
              errorCode: 'System Error',
              errorMessage: err
            });
          }
          else {
            if (doc) {
              next();
            }
            else {
              res.render("login_error.html", {
                login_error_message: "No user found.",
              })
            }
          }
        })
      }
    })
  }
  else {
    res.render('login_error.html', {
      login_error_message: "Please login first.",
    })
  }
}

module.exports = {
  verify_login
}