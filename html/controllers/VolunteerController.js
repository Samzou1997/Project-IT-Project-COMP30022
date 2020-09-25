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
  User.findOne({ email: req.cookies["email"] }, function (err, doc) {
    if (err) {
      console.log("db error")
      res.render('error.html', {
        title: 'System Error',
        errorCode: 'System Error',
        errorMessage: err
      });
    }
    else {
      res.render('volunteer.html')
    }
  })
}

module.exports = {
  volunteer_post, volunteer_get
}