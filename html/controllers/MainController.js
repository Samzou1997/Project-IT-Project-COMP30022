const User = require('../models/User')
const { response } = require('express')
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const secret_key = "secret"
const hour = 3600000
const alive_time = hour * 24 //a day

const home_post = (req, res, next) => {
  
}

const home_get = (req, res, next) => {
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
        res.render('index.html', {
          login_error_message: "Login expired.",
          register_error_message: ""
        })
      }
      else {
        User.findOne({ email: decoded.user_email }, function (err, doc) {
          if (err) {
            console.log("db error")
          }
          res.render('home.html', {
            username: "Hi, " + doc.lastName,
            message: "Welcome to E-portfolio."
          })
        })
      }
    })
  }
  else {
    res.render('index.html', {
      login_error_message: "Please login first.",
      register_error_message: ""
    })
  }
}

const logout_post = (req, res, next) => {
  
}

const logout_get = (req, res, next) => {
  res.cookie('id', '', { maxAge: 0 })
  res.cookie('email', '', { maxAge: 0 })
  res.cookie('token', '', { maxAge: 0 })
  res.redirect('http://3.131.49.106/')
}

module.exports = {
  home_post, home_get
}