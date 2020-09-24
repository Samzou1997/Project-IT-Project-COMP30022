const User            = require('../models/User')
const { response }    = require('express')
var cookieParser      = require('cookie-parser')
const jwt             = require('jsonwebtoken')
const config          = require('../config/web_config.json')

const secret_key            = config.token_setting.secret_key
const token_expire_time     = config.token_setting.expire_time
const cookie_alive_time     = config.cookie_setting.alive_time

const volunteer_post = (req, res, next) => {
  
}

const volunteer_get = (req, res, next) => {
  if (req.cookies["email"] != null) {
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
          }
          else {
            res.render('volunteer.html')
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
  volunteer_post, volunteer_get
}