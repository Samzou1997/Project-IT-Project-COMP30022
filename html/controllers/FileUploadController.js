const User = require('../models/User');
const { response } = require('express');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const config = require('../config/web_config.json');
const { fstat } = require('fs');
const path = require('path');
const fs = require('fs');

const secret_key = config.token_setting.secret_key;
const token_expire_time = config.token_setting.expire_time;
const cookie_alive_time = config.cookie_setting.alive_time;
const rootDir = config.fileSystem.root;

// System reserved file, example: profile picture
const userSys_upload_post = (req, res, next) => {
  if (req.cookies["email"] != null) {
    let req_token = req.cookies['token'];
    let req_user_id = req.cookies['id'];
    let req_user_email = req.cookies['email'];

    //verify token
    jwt.verify(req_token, secret_key, function (error, decoded) {
      if (error) {
        console.log("token decode error");
        res.cookie('id', '', { maxAge: 0 });
        res.cookie('email', '', { maxAge: 0 });
        res.cookie('token', '', { maxAge: 0 });
        res.render('login_error.html', {
          login_error_message: "Login expired.",
        });
      }
      else {
        User.findOne({ email: decoded.user_email }, function (err, doc) {
          if (err) {
            console.log("db error");
            res.render('404.html');
          }
          else {

            if (req.file != null) {
              var fileName = 'profilePic.jpg';
              //var destDir = req.body.dir == undefined ? "default" : req.body.dir;
              var sourceFile = req.file.path;
              //console.log(sourceFile)
              //var destPath = path.join(__dirname.replace("routes", ""), "uploads", destDir, fileName);
              var userDir = path.join(rootDir, "/file/userData", doc._id.toHexString()); // full path in server
              var userSysDir = path.join(userDir, '/userSys');
              var userUploadDir = path.join(userDir, '/userUpload');
              var docInsertDir = path.join(userUploadDir, '/docInsert');
              var customizeFileDir = path.join(userUploadDir, '/customizeFile');
              var alphaSectionDir = path.join(customizeFileDir, '/alphagSection');
              var betaSectionDir = path.join(customizeFileDir, '/betagSection');
              var charlieSectionDir = path.join(customizeFileDir, '/charlieSection');

              var fileDestDir = path.join(userSysDir, fileName);
              //var fileurl = uploadFileDomin + destPath.substr(destPath.indexOf("uploads"));
              //fileurl = fileurl.replace(/\\/g, "/");
              fs.exists(userDir, function (exists) {
                if (exists) {
                  fs.rename(sourceFile, fileDestDir, function (error) {
                    if (error) {
                      console.log('[file rename ERROR]: ' + error);
                      res.render('404.html');
                    }
                    else {
                      res.redirect('/personal/home');
                    }
                  });
                }
                else {
                  fs.mkdir(userDir, 0777, function (error) {
                    if (error) {
                      console.log('[mkdir ERROR]: ' + error);
                      res.render('404.html');
                    }
                    else {
                      fs.mkdir(userUploadDir, 0777, function (error) {
                        fs.mkdir(docInsertDir, 0777, function (error) { });
                        fs.mkdir(customizeFileDir, 0777, function (error) { 
                          fs.mkdir(alphaSectionDir, 0777, function (error) {});
                          fs.mkdir(betaSectionDir, 0777, function (error) {});
                          fs.mkdir(charlieSectionDir, 0777, function (error) {});
                        });
                      });
                      fs.mkdir(userSysDir, 0777, function (error) {
                        fs.rename(sourceFile, fileDestDir, function (error) {
                          if (error) {
                            console.log('[file rename ERROR]: ' + error);
                            res.render('404.html');
                          }
                          else {
                            res.redirect('/personal/home');
                          }
                        })
                      })
                    }
                  })
                }
              })
            }
            else {
              res.render('404.html');
            }



          }
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

// Learning section file upload
const alphaSection_upload_post = (req, res, next) => {
  if (req.cookies["email"] != null) {
    let req_token = req.cookies['token'];
    let req_user_id = req.cookies['id'];
    let req_user_email = req.cookies['email'];

    //verify token
    jwt.verify(req_token, secret_key, function (error, decoded) {
      if (error) {
        console.log("token decode error");
        res.cookie('id', '', { maxAge: 0 });
        res.cookie('email', '', { maxAge: 0 });
        res.cookie('token', '', { maxAge: 0 });
        res.render('login_error.html', {
          login_error_message: "Login expired.",
        });
      }
      else {
        User.findOne({ email: decoded.user_email }, function (err, doc) {
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
              var fileName = req.file.originalname;
              //var destDir = req.body.dir == undefined ? "default" : req.body.dir;
              var sourceFile = req.file.path;
              //console.log(sourceFile)
              //var destPath = path.join(__dirname.replace("routes", ""), "uploads", destDir, fileName);
              var userDir = path.join(rootDir, "/file/userData", doc._id.toHexString()); // full path in server
              var userSysDir = path.join(userDir, '/userSys');
              var userUploadDir = path.join(userDir, '/userUpload');
              var docInsertDir = path.join(userUploadDir, '/docInsert');
              var customizeFileDir = path.join(userUploadDir, '/customizeFile');
              var alphaSectionDir = path.join(customizeFileDir, '/alphagSection');
              var betaSectionDir = path.join(customizeFileDir, '/betagSection');
              var charlieSectionDir = path.join(customizeFileDir, '/charlieSection');

              var fileDestDir = path.join(alphaSectionDir, fileName);
              //var fileurl = uploadFileDomin + destPath.substr(destPath.indexOf("uploads"));
              //fileurl = fileurl.replace(/\\/g, "/");
              fs.exists(userDir, function (exists) {
                if (exists) {
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
                      res.redirect('/personal/learning');
                    }
                  });
                }
                else {
                  fs.mkdir(userDir, 0777, function (error) {
                    if (error) {
                      console.log('[mkdir ERROR]: ' + error);
                      res.render('error.html', {
                        title: 'System Error',
                        errorCode: 'System Error',
                        errorMessage: '[mkdir ERROR]: ' + error
                      });
                    }
                    else {
                      fs.mkdir(userUploadDir, 0777, function (error) {
                        fs.mkdir(docInsertDir, 0777, function (error) { });
                        fs.mkdir(customizeFileDir, 0777, function (error) { 
                          fs.mkdir(alphaSectionDir, 0777, function (error) {
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
                                res.redirect('/personal/learning');
                              }
                            })
                          });
                          fs.mkdir(betaSectionDir, 0777, function (error) {});
                          fs.mkdir(charlieSectionDir, 0777, function (error) {});
                        });
                      });
                      fs.mkdir(userSysDir, 0777, function (error) {})
                    }
                  })
                }
              })
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
    })
  }
  else {
    res.render('login_error.html', {
      login_error_message: "Please login first.",
    })
  }
}

module.exports = {
  userSys_upload_post, alphaSection_upload_post
}