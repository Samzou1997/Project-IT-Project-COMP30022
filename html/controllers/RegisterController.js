const User = require('../models/User')
const { response } = require('express')
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const secret_key = "secret"
const hour = 3600000
const alive_time = hour * 24 //a day

const register_post = (req, res, next) => {
  console.log('got register request, path: ' + req.url)
  console.log('request body: { email: ' + req.body.email + ", pwd: " + req.body.password + " }")

  if (req.body.first_name && req.body.last_name && req.body.email && req.body.password) {

    User.findOne({ email: req.body.email }, function (err, doc) {
      if (doc) {
        res.render("register_error.html", {
          register_error_message: "Email already used."
        })
      }
      else {
        let user = new User({
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
        })
        user.details.major = 'null'
        user.save()
          .then(user => {
            let user_email = user.email
            let user_id = user._id
            let token = jwt.sign({ user_id, user_email }, secret_key, { expiresIn: 60 })

            res.cookie('id', user_id, { maxAge: alive_time })
            res.cookie('email', user_email, { maxAge: alive_time })
            res.cookie('token', token, { maxAge: alive_time })
            res.redirect('/personal/home')
          })
          .catch(error => {
            console.log(error)
            res.render("home.html", {
              message: "Login error, try again :)"
            })
          })
      }
    })
  }
  else {
    res.render("register_error.html", {
      register_error_message: "Please enter all information."
    })
  }
}

const register_get = (req, res, next) => {
  res.render("register_error.html", {
    register_error_message: "Please enter all information."
  })
}

module.exports = {
  register_post, register_get
}