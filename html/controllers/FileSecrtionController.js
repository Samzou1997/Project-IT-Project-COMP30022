const User = require('../models/User')
const { response } = require('express')
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const config = require('../config/web_config.json')
const path = require('path');
const FileSystemController = require('../controllers/FileSystemController')
var webPageData = require('../views/data_padding/web_page_data.json')

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
      var trashFileDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.trashFileDir);
      var profilePicDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.profile_pic);

      var fileList = FileSystemController.getFileUrls(userCustomizeFileDir);
      var trashFileList = FileSystemController.getFileUrls(trashFileDir);

      webPageData.files.profile_pic_path = FileSystemController.getFileUrl(profilePicDir);
      webPageData.files.filelist = fileList;
      webPageData.files.trashfilelist = trashFileList;

      res.render('files.html', webPageData.files);
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

const file_recycle_get = (req, res, next) => {
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
      FileSystemController.recycleFile(req.query.filename, doc._id, function (error) {
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

const file_delete_get = (req, res, next) => {
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
      FileSystemController.deleteFile(req.query.filename, doc._id, function (error) {
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

const file_recover_get = (req, res, next) => {
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
      FileSystemController.recoverFile(req.query.filename, doc._id, function (error) {
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
  file_upload_post, file_section_get, file_delete_get, file_recycle_get, file_recover_get
}