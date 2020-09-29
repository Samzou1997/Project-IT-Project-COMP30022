const User            = require('../models/User')
const { response }    = require('express')
var cookieParser      = require('cookie-parser')
const jwt             = require('jsonwebtoken')
const config          = require('../config/web_config.json')
var homePaddingData   = require('../views/data_padding/home_data.json')
var profileEditPaddingData   = require('../views/data_padding/profile_edit.json')
const FileSystemController    = require('../controllers/FileSystemController')

const secret_key          = config.token_setting.secret_key
const token_expire_time   = config.token_setting.expire_time
const cookie_alive_time   = config.cookie_setting.alive_time
const userDataDir         = "/home/IT_Project/html/file/userData/";

const file_section_get = (req, res, next) => {
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
      res.render();
    }
  })
}

const file_upload_post = (req, res, next) => {
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
      FileSystemController.upload_file(req.file, doc._id, function(error){
        if(error){
          res.render('error.html', {
            title: 'System Error',
            errorCode: 'upload Error',
            errorMessage: err
          });
        }
        else{
          res.redirect('/personal/file');
        }
      });
    }
  })
}

module.exports = {
  file_upload_post, file_section_get
}