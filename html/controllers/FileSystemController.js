const User = require('../models/User');
const { response } = require('express');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const config = require('../config/web_config.json');
const path = require('path');
const fs = require('fs');

const secret_key = config.token_setting.secret_key;
const token_expire_time = config.token_setting.expire_time;
const cookie_alive_time = config.cookie_setting.alive_time;
const rootDir = config.fileSystem.root;
const defaultResourcesDir = config.fileSystem.defaultResourcesDir;
const domain = config.domain;

const defaultProfilePic_fileName = 'default_profile_picture.png';
const defaultDoc_fileName = 'default_doc.html';
const sysResveredProfilePic_fileName = 'profile_pic_sys_reserved.png';
const sysReservedDoc_fileName = 'doc_sys_reserved.html';

var userDir; // full path in server
var userSysDir;
var userUploadDir;
var docInsertDir;
var customizeFileDir;
var alphaSectionDir;
var betaSectionDir;
var charlieSectionDir;
var alphaSectionReserverdDir;
var betaSectionReserverdDir;
var charlieSectionReserverdDir;

function getFileUrl(fileDir) {
  fileUrl = domain + fileDir.substr(fileDir.indexOf("/file"))
  return fileUrl;
}

function getFileUrls(dir) {
  var fileUrls = [];
  var files = fs.readdirSync(dir);

  files.forEach(function (item, index) {
    var stat = fs.statSync(path.join(dir, item));

    if (stat.isDirectory()) {
    }
    else {
      var fileObj = {};
      fileObj.fileName = item;
      fileObj.url = getFileUrl(path.join(dir, item));
      fileUrls.push(fileObj);
    }
  });
  return fileUrls;
}

function saveFile(fileDir, content, callback) {
  fs.writeFile(fileDir, content, function (error) {
    if (error) {
      callback(error);
    }
    else {
      callback();
    }
  });
}


function mkUserDir(userID, callback) {
  userDir = path.join(rootDir, "/file/userData", userID.toHexString()); // full path in server
  userSysDir = path.join(userDir, '/userSys');
  userUploadDir = path.join(userDir, '/userUpload');
  docInsertDir = path.join(userUploadDir, '/docInsert');
  customizeFileDir = path.join(userUploadDir, '/customizeFile');

  alphaSectionDir = path.join(customizeFileDir, '/alphagSection');
  betaSectionDir = path.join(customizeFileDir, '/betagSection');
  charlieSectionDir = path.join(customizeFileDir, '/charlieSection');

  alphaSectionReserverdDir = path.join(alphaSectionDir, '/reserved');
  betaSectionReserverdDir = path.join(betaSectionDir, '/reserved');
  charlieSectionReserverdDir = path.join(charlieSectionDir, '/reserved');

  var defaultProfilePic_dir = path.join(defaultResourcesDir, defaultProfilePic_fileName);
  var defaultDoc_dir = path.join(defaultResourcesDir, defaultDoc_fileName);

  fs.exists(userDir, function (exists) {
    if (exists) {
      callback();
    }
    else {
      fs.mkdir(userDir, 0777, function (error) {
        if (error) {
          console.log('[mkdir ERROR]: ' + error);
          // res.render('error.html', {
          //   title: 'System Error',
          //   errorCode: 'System Error',
          //   errorMessage: '[mkdir ERROR]: ' + error
          // });
        }
        else {
          fs.mkdir(userSysDir, 0777, function (error) {
            let profilePicDestDir = path.join(userSysDir, sysResveredProfilePic_fileName);
            let docFileDestDir = path.join(userSysDir, sysReservedDoc_fileName);
            fs.copyFile(defaultProfilePic_dir, profilePicDestDir, function (error) { });
            fs.copyFile(defaultDoc_dir, docFileDestDir, function (error) { });
          });
          fs.mkdir(userUploadDir, 0777, function (error) {
            fs.mkdir(docInsertDir, 0777, function (error) { });
            fs.mkdir(customizeFileDir, 0777, function (error) {
              fs.mkdir(alphaSectionDir, 0777, function (error) {
                fs.mkdir(alphaSectionReserverdDir, 0777, function (error) {
                  let fileDestDir = path.join(alphaSectionReserverdDir, sysReservedDoc_fileName);
                  fs.copyFile(defaultDoc_dir, fileDestDir, function (error) { });
                });
              });
              fs.mkdir(betaSectionDir, 0777, function (error) {
                fs.mkdir(betaSectionReserverdDir, 0777, function (error) {
                  let fileDestDir = path.join(betaSectionReserverdDir, sysReservedDoc_fileName);
                  fs.copyFile(defaultDoc_dir, fileDestDir, function (error) { });
                });
              });
              fs.mkdir(charlieSectionDir, 0777, function (error) {
                fs.mkdir(charlieSectionReserverdDir, 0777, function (error) {
                  let fileDestDir = path.join(charlieSectionReserverdDir, sysReservedDoc_fileName);
                  fs.copyFile(defaultDoc_dir, fileDestDir, function (error) {
                    callback();
                  });
                });
              });
            });
          });
        }
      });
    }
  });
}

function getToUserDir(userID, callback) {
  userDir = path.join(rootDir, "/file/userData", userID.toHexString()); // full path in server
  userSysDir = path.join(userDir, '/userSys');
  userUploadDir = path.join(userDir, '/userUpload');
  docInsertDir = path.join(userUploadDir, '/docInsert');
  customizeFileDir = path.join(userUploadDir, '/customizeFile');
  alphaSectionDir = path.join(customizeFileDir, '/alphagSection');
  betaSectionDir = path.join(customizeFileDir, '/betagSection');
  charlieSectionDir = path.join(customizeFileDir, '/charlieSection');

  fs.exists(userDir, function (exists) {
    if (exists) {
      callback();
    }
    else {
      console.log('[directoy ERROR]: user dir lost');
      mkUserDir(userID, function(){
        callback();
      });
    }
  })
}

// System reserved file, example: profile picture
const userSys_upload_post = (req, res, next) => {
  User.findOne({ email: req.cookies["email"] }, function (err, doc) {
    if (err) {
      console.log("db error");
      res.render('error.html', {
        title: 'System Error',
        errorCode: 'System Error',
        errorMessage: err
      });
    }
    else {

      if (req.file != null) {
        getToUserDir(doc._id, function () {
          var fileName = 'profile_pic_sys_reserved.png';
          var sourceFile = req.file.path;

          var fileDestDir = path.join(userSysDir, fileName);
          //var fileurl = uploadFileDomin + destPath.substr(destPath.indexOf("uploads"));
          //fileurl = fileurl.replace(/\\/g, "/");
          fs.rename(sourceFile, fileDestDir, function (error) {
            if (error) {
              console.log('[file rename ERROR]: ' + error);
              res.render('error.html', {
                title: 'System Error',
                errorCode: 'System Error',
                errorMessage: '[file rename ERROR]: ' + error
              });
            }
            else {
              next();
            }
          });
        });
      }
      else {
        res.render('error.html', {
          title: 'System Error',
          errorCode: 'System Error',
          errorMessage: 'Upload file not found.'
        });
      }
    }
  })
}

// Learning section file upload
const alphaSection_upload_post = (req, res, next) => {
  User.findOne({ email: req.cookies["email"] }, function (err, doc) {
    if (err) {
      console.log("db error");
      res.render('error.html', {
        title: 'System Error',
        errorCode: 'System Error',
        errorMessage: err
      });
    }
    else {

      if (req.file != null) {
        getToUserDir(doc._id, function () {
          var fileName = req.file.originalname;
          var sourceFile = req.file.path;

          var fileDestDir = path.join(alphaSectionDir, fileName);
          //var fileurl = uploadFileDomin + destPath.substr(destPath.indexOf("uploads"));
          //fileurl = fileurl.replace(/\\/g, "/");
          fs.rename(sourceFile, fileDestDir, function (error) {
            if (error) {
              console.log('[file rename ERROR]: ' + error);
              res.render('error.html', {
                title: 'System Error',
                errorCode: 'System Error',
                errorMessage: '[file rename ERROR]: ' + error
              });
            }
            else {
              next();
            }
          });
        });
      }
      else {
        res.render('error.html', {
          title: 'System Error',
          errorCode: 'System Error',
          errorMessage: 'Upload file not found.'
        });
      }
    }
  })
}

// Working section file upload
const betaSection_upload_post = (req, res, next) => {
  User.findOne({ email: req.cookies["email"] }, function (err, doc) {
    if (err) {
      console.log("db error");
      res.render('error.html', {
        title: 'System Error',
        errorCode: 'System Error',
        errorMessage: err
      });
    }
    else {

      if (req.file != null) {
        getToUserDir(doc._id, function () {
          var fileName = req.file.originalname;
          var sourceFile = req.file.path;

          var fileDestDir = path.join(betaSectionDir, fileName);
          //var fileurl = uploadFileDomin + destPath.substr(destPath.indexOf("uploads"));
          //fileurl = fileurl.replace(/\\/g, "/");
          fs.rename(sourceFile, fileDestDir, function (error) {
            if (error) {
              console.log('[file rename ERROR]: ' + error);
              res.render('error.html', {
                title: 'System Error',
                errorCode: 'System Error',
                errorMessage: '[file rename ERROR]: ' + error
              });
            }
            else {
              next();
            }
          });
        });
      }
      else {
        res.render('error.html', {
          title: 'System Error',
          errorCode: 'System Error',
          errorMessage: 'Upload file not found.'
        });
      }
    }
  })
}

// Volunteer section file upload
const charlieSection_upload_post = (req, res, next) => {
  User.findOne({ email: req.cookies["email"] }, function (err, doc) {
    if (err) {
      console.log("db error");
      res.render('error.html', {
        title: 'System Error',
        errorCode: 'System Error',
        errorMessage: err
      });
    }
    else {

      if (req.file != null) {
        getToUserDir(doc._id, function () {
          var fileName = req.file.originalname;
          var sourceFile = req.file.path;

          var fileDestDir = path.join(charlieSectionDir, fileName);
          //var fileurl = uploadFileDomin + destPath.substr(destPath.indexOf("uploads"));
          //fileurl = fileurl.replace(/\\/g, "/");
          fs.rename(sourceFile, fileDestDir, function (error) {
            if (error) {
              console.log('[file rename ERROR]: ' + error);
              res.render('error.html', {
                title: 'System Error',
                errorCode: 'System Error',
                errorMessage: '[file rename ERROR]: ' + error
              });
            }
            else {
              next();
            }
          });
        });
      }
      else {
        res.render('error.html', {
          title: 'System Error',
          errorCode: 'System Error',
          errorMessage: 'Upload file not found.'
        });
      }
    }
  })
}

function upload_file(file, userID, callback) {
  getToUserDir(userID, function () {
    var fileName = file.originalname;
    var sourceFile = file.path;

    var fileDestDir = path.join(customizeFileDir, fileName);
    //var fileurl = uploadFileDomin + destPath.substr(destPath.indexOf("uploads"));
    //fileurl = fileurl.replace(/\\/g, "/");
    fs.rename(sourceFile, fileDestDir, function (error) {
      if (error) {
        console.log('[file upload ERROR]: ' + error);
        callback(error);
      }
      else {
        callback();
      }
    });
  });
}

module.exports = {
  userSys_upload_post,
  alphaSection_upload_post,
  betaSection_upload_post,
  charlieSection_upload_post,
  mkUserDir,
  getFileUrl,
  getFileUrls,
  saveFile,
  upload_file
}