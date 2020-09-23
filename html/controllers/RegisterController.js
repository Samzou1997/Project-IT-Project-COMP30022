const User = require('../models/User')
const UserSetting = require('../models/UserSetting')
const UserData = require('../models/UserData')
const { response } = require('express')
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
//const Fiber = require('fibers')
const async = require("async")
const config = require('../config/web_config.json')

const secret_key = config.token_setting.secret_key
const token_expire_time = config.token_setting.expire_time
const cookie_alive_time = config.cookie_setting.alive_time

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

        let userSetting = new UserSetting({
          email: req.body.email,
        })

        let userData = new UserData({
          email: req.body.email,
        })


        userSettingSaveFunc = function (callback) {
          userSetting.save().then(userSetting => {
            user.setting.$id = userSetting._id
            callback(null, 'userSettingSaveFunc')
          }).catch(error => {
            console.log(error)
            res.render("register_error.html", {
              message: "system error, try again :)"
            })
            callback(null, 'userSettingSaveFunc')
          })
        }

        userDataSaveFunc = function (callback) {
          userData.save().then(userData => {
            user.data.$id = userData._id
            callback(null, 'userDataSaveFunc')
          }).catch(error => {
            console.log(error)
            res.render("register_error.html", {
              message: "system error, try again :)"
            })
            callback(null, 'userDataSaveFunc')
          })
        }

        userSaveFunc = function (callback) {
          user.save().then(user => {
            let user_email = user.email
            let user_id = user._id
            let token = jwt.sign({ user_id, user_email }, secret_key, { expiresIn: token_expire_time })

            res.cookie('id', user_id, { maxAge: cookie_alive_time })
            res.cookie('email', user_email, { maxAge: cookie_alive_time })
            res.cookie('token', token, { maxAge: cookie_alive_time })
            res.redirect('/personal/home')
            callback(null, 'userSaveFunc')
          }).catch(error => {
            console.log(error)
            res.render("register_error.html", {
              message: "system error, try again :)"
            })
            callback(null, 'userSaveFunc')
          })
        }
        async.series([userSettingSaveFunc, userDataSaveFunc, userSaveFunc], function(error, result){
          console.log(result)
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