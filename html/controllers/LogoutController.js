const User          = require('../models/User')
const { response }  = require('express')
var cookieParser    = require('cookie-parser')
const jwt           = require('jsonwebtoken')
const config        = require('../config/web_config.json')

const secret_key = config.token_setting.secret_key
const token_expire_time = config.token_setting.expire_time
const cookie_alive_time = config.cookie_setting.alive_time

const logout_post = (req, res, next) => {
  
}

const logout_get = (req, res, next) => {
  res.cookie('id', '', { maxAge: 0 })
  res.cookie('email', '', { maxAge: 0 })
  res.cookie('token', '', { maxAge: 0 })
  res.redirect('/')
}

module.exports = {
  logout_post, logout_get
}