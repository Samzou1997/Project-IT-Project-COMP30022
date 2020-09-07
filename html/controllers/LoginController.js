const User = require('../models/User')
const { response } = require('express')
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const secret_key = "secret"
const hour = 3600000
const alive_time = hour * 24 //a day

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
        let token = jwt.sign({ user_id, user_email }, secret_key, { expiresIn: 60 })

        res.cookie('id', user_id, { maxAge: alive_time })
        res.cookie('email', user_email, { maxAge: alive_time })
        res.cookie('token', token, { maxAge: alive_time })
        res.redirect('http://3.131.49.106/home')
        // res.render('home.html', {
        //     username: doc.lastName
        // })
      }
      else {
        res.render("index.html", {
          login_error_message: "Incorrect password.",
          register_error_message: ""
        })
      }
    }
    else {
      res.render("index.html", {
        login_error_message: "No user found.",
        register_error_message: ""
      })
    }
  })
}

const login_get = (req, res, next) => {
  console.log('got Login request, path: ' + req.url)
  console.log('request body: { email: ' + req.body.email + ", pwd: " + req.body.password + " }")

  if (req.cookies["email"] != null) {
    let req_token = req.cookies['token']
    let req_user_id = req.cookies['id']
    let req_user_email = req.cookies['email']

    // verify token
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
      //console.log('decode: ' + decoded.user_email + ' ' + decoded.user_id)
      else {
        res.redirect('http://3.131.49.106/home')
        // User.findOne({email: decoded.user_email}, function(err, doc){
        //     if (err) {
        //         console.log("db error")
        //     }
        //     res.render('home.html', {
        //         username: doc.lastName
        //     })
        // })
      }
    })
  }
  else {
    res.render("index.html", {
      login_error_message: "Login expired.",
      register_error_message: ""
    })
  }
}

module.exports = {
  login_post, login_get
}