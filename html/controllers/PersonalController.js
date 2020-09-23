const User = require('../models/User')
const { response } = require('express')
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const config = require('../config/web_config.json')

const secret_key = config.token_setting.secret_key
const token_expire_time = config.token_setting.expire_time
const cookie_alive_time = config.cookie_setting.alive_time

const home_post = (req, res, next) => {
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
          //update user
          let user = new User({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
          })
          let userSetting = new UserSetting({
            email: req.body.email,
          })

          userSetting.save().then(userSetting => {
          	let objectID = userSetting._id
          	user.setting.$id = objectID
          
          	user.save()
          	.then(user => {
          	  let user_email = user.email
          	  let user_id = user._id
          	  let token = jwt.sign({ user_id, user_email }, secret_key, { expiresIn: token_expire_time })

          	  res.cookie('id', user_id, { maxAge: cookie_alive_time })
          	  res.cookie('email', user_email, { maxAge: cookie_alive_time })
          	  res.cookie('token', token, { maxAge: cookie_alive_time })
          	  res.redirect('/personal/home')
          	})
          	.catch(error => {
          	  console.log(error)
          	  res.render("register_error.html", {
          		message: "system error, try again :)"
          	  })
          	  return
          	})

          }).catch(error => {
        	console.log(error)
        	res.render("register_error.html", {
        	  message: "system error, try again :)"
            })
            return
          })
      	    )
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
        res.render('login_error.html', {
          login_error_message: "Login expired.",
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
    res.render('login_error.html', {
      login_error_message: "Please login first.",
    })
  }
}

const logout_post = (req, res, next) => {
  
}

const logout_get = (req, res, next) => {
  res.cookie('id', '', { maxAge: 0 })
  res.cookie('email', '', { maxAge: 0 })
  res.cookie('token', '', { maxAge: 0 })
  res.redirect('/')
}

module.exports = {
  home_post, home_get, logout_post, logout_get
}