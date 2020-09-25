const User            = require('../models/User')
const { response }    = require('express')
var cookieParser      = require('cookie-parser')
const jwt             = require('jsonwebtoken')
const config          = require('../config/web_config.json')
var errorPaddingData  = require('../views/data_padding/error.json')

const not_found_404 = (req, res, next) => {
  errorPaddingData.title = '404 Not Found';
  errorPaddingData.errorCode = '404';
  errorPaddingData.errorMessage = 'Page not found, pls back to home page.';
  res.render('error.html');
}

const system_error = (req, res, next) => {
  
}

module.exports = {
  not_found_404
}