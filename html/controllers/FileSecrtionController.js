const User = require('../models/User')
const { response } = require('express')
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const config = require('../config/web_config.json')
const path = require('path');
const FileSystemController = require('../controllers/FileSystemController')
var ManageFileData = require('../views/data_padding/manage_file_data.json')

const secret_key = config.token_setting.secret_key
const token_expire_time = config.token_setting.expire_time
const cookie_alive_time = config.cookie_setting.alive_time
const userDataDir = "/home/IT_Project/html/file/userData/";

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
      var userID_str = doc._id.toHexString();
      var userCustomizeFileDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.userCustomizeFileDir);

      var fileList = FileSystemController.getFileUrls(userCustomizeFileDir);

      ManageFileData.lastname = doc.lastName
      ManageFileData.filelist = fileList

      res.render('manage_files.html', ManageFileData);
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
      if (req.file != null) {
        FileSystemController.upload_file(req.file, doc._id, function (error) {
          if (error) {
            res.render('error.html', {
              title: 'System Error',
              errorCode: 'upload Error',
              errorMessage: err
            });
          }
          else {
            res.redirect('/personal/file');
          }
        });
      }
      else {
        res.render('error.html', {
          title: 'System Error',
          errorCode: 'System Error',
          errorMessage: 'Upload file empty.'
        });
      }
    }
  })
}

const file_delete_post = (req, res, next) => {
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
      FileSystemController.deleteFile(req.body.filename, doc._id, function (error) {
        if (error) {
          res.render('error.html', {
            title: 'System Error',
            errorCode: 'upload Error',
            errorMessage: err
          });
        }
        else {
          res.redirect('/personal/file');
        }
      });
    }
  })
}

module.exports = {
  file_upload_post, file_section_get, file_delete_post
}