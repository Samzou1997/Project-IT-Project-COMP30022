const User            = require('../models/User')
const { response }    = require('express')
var cookieParser      = require('cookie-parser')
const jwt             = require('jsonwebtoken')
const config          = require('../config/web_config.json')

const secret_key          = config.token_setting.secret_key
const token_expire_time   = config.token_setting.expire_time
const cookie_alive_time   = config.cookie_setting.alive_time

const login_post = (req, res, next) => {
  console.log('got Login request, path: ' + req.url)
  console.log('request body: { email: ' + req.body.email + ", pwd: " + req.body.password + " }")

  res.cookie('id', '', { maxAge: 0 })
  res.cookie('email', '', { maxAge: 0 })
  res.cookie('token', '', { maxAge: 0 })

  User.findOne({ email: req.body.email }, function (err, doc) {
    if (err) {
      console.log("db error")
    }
    if (doc) {
      if (doc.password === req.body.password) {
        let user_password = doc.password
        let user_email = doc.email
        let user_id = doc._id
        let token = jwt.sign({ user_id, user_email }, secret_key, { expiresIn: token_expire_time })

        res.cookie('id', user_id, { maxAge: cookie_alive_time })
        res.cookie('email', user_email, { maxAge: cookie_alive_time })
        res.cookie('token', token, { maxAge: cookie_alive_time })
        res.redirect('/personal/home')
        // res.render('home.html', {
        //     username: doc.lastName
        // })
      }
      else {
        res.render("login_error.html", {
          login_error_message: "Incorrect password.",
        })
      }
    }
    else {
      res.render("login_error.html", {
        login_error_message: "No user found.",
      })
    }
  })
}

const login_get = (req, res, next) => {
  
}

module.exports = {
  login_post, login_get
}