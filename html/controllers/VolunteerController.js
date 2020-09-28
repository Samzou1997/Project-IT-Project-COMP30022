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

const volunteer_post = (req, res, next) => {
  
}

const volunteer_get = (req, res, next) => {
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
      var userCustomizeFileDir = `/home/IT_Project/html/file/userData/${userID_str}/userUpload/customizeFile/charlieSection`;
      var articleDir = `/home/IT_Project/html/file/userData/${userID_str}/userUpload/customizeFile/charlieSection/reserved/doc_sys_reserved.html`;

      var fileList = FileSystemController.getFileUrls(userCustomizeFileDir);

      res.render('volunteer.html', {
        filelist : fileList,
        article : articleDir
      })
    }
  })
}

const volunteer_article_edit_get = (req, res, next) => {
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
      var articleDir = `/home/IT_Project/html/file/userData/${userID_str}/userUpload/customizeFile/charlieSection/reserved/doc_sys_reserved.html`;

      res.render('edit_article.html', {
        article : articleDir,
        section : 'working'
      })
    }
  })
}

const volunteer_article_submit_post = (req, res, next) => {
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
      var articleDir = `/home/IT_Project/html/file/userData/${userID_str}/userUpload/customizeFile/charlieSection/reserved/doc_sys_reserved.html`;

      FileSystemController.saveFile(articleDir, req.body.content, function(error){
        if (error) {
          res.render('error.html', {
            title: 'System Error',
            errorCode: 'Save Error',
            errorMessage: error
          });
        }
        else {
          res.redirect('/personal/volunteer');
        }
      })
    }
  })
}

module.exports = {
  volunteer_post, volunteer_get, volunteer_article_edit_get, volunteer_article_submit_post
}