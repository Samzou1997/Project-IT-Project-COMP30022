const User            = require('../models/User')
const { response }    = require('express')
var cookieParser      = require('cookie-parser')
const jwt             = require('jsonwebtoken')
const config          = require('../config/web_config.json')
const FileSystemController    = require('../controllers/FileSystemController')

const secret_key            = config.token_setting.secret_key
const token_expire_time     = config.token_setting.expire_time
const cookie_alive_time     = config.cookie_setting.alive_time
const rootDir               = config.fileSystem.root;

const learning_post = (req, res, next) => {
  
}

const learning_get = (req, res, next) => {
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
      var userID_str = doc._id.toHexString();
      var userCustomizeFileDir = `/home/IT_Project/html/file/userData/${userID_str}/userUpload/customizeFile/alphagSection`;

      var fileList = FileSystemController.getFileUrls(userCustomizeFileDir);

      console.log(fileList);

      res.render('working.html', {
        filelist : fileList
      });
    }
  })
}

const learning_article_edit_get = (req, res, next) => {
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
      res.render('edit_article.html')
    }
  })
}

module.exports = {
  learning_post, learning_get, learning_article_edit_get
}