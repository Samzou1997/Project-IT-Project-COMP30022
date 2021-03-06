const User            = require('../models/User');
const { response }    = require('express');
var cookieParser      = require('cookie-parser');
const jwt             = require('jsonwebtoken');
const config          = require('../config/web_config.json');
var webPageDate       = require('../views/data_padding/web_page_data.json');
const FileSystemController    = require('../controllers/FileSystemController');
const path                    = require('path');
const fs                      = require('fs');
const moment                  = require('moment');

const secret_key          = config.token_setting.secret_key;
const token_expire_time   = config.token_setting.expire_time;
const cookie_alive_time   = config.cookie_setting.alive_time;
const userDataDir         = "/home/IT_Project/html/file/userData/";

var userID_str;


const setting_get = (req, res, next) => {
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
      userID_str = doc._id.toHexString();
      var profilePicDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.profile_pic);

      webPageDate.setting.profile_pic_path = FileSystemController.getFileUrl(profilePicDir);
      webPageDate.setting.firstname = doc.firstName;
      webPageDate.setting.lastname = doc.lastName;

      var date = doc.details.dateBirth;
      var dataCleanStr = JSON.stringify(date);
      dataCleanStr = dataCleanStr.replace(/^(\s|")+|(\s|")+$/g, '');

      date = new Date(dataCleanStr);
      date = date.getTime();
      
      date = moment(date).format('MM/DD/YYYY');
      webPageDate.setting.dateofbirth = date;
      webPageDate.setting.gender = doc.details.gender;
      webPageDate.setting.phone = doc.details.phone;
      webPageDate.setting.address = doc.details.address;
      webPageDate.setting.major = doc.details.major;

      //console.log(webPageDate.setting);
      
      res.render('settings.html', webPageDate.setting);
    }
  })
}

const setting_info_update_post = (req, res, next) => {
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
      userID_str = doc._id.toHexString();
      //console.log(req.body.Birth);
      var updatedData = {
        firstName : req.body.Firstname,
        lastName : req.body.Lastname,
        details : {
          dateBirth : req.body.Birth,
          gender : req.body.Gender,
          phone : req.body.Phone,
          address : req.body.Address,
          major : doc.details.major
        }
      };

      User.findByIdAndUpdate(doc._id, {$set: updatedData})
      .then(response => {
        res.redirect('/personal/setting');
      })
      .catch(error => {
        res.render('error.html', {
          title: 'System Error',
          errorCode: 'System Error',
          errorMessage: error
        });
      });
    }
  })
}

const setting_major_update_post = (req, res, next) => {
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
      userID_str = doc._id.toHexString();
      //console.log(req.body.Birth);
      var updatedData = {
        details : {
          dateBirth : doc.details.dateBirth,
          gender : doc.details.gender,
          phone : doc.details.phone,
          address : doc.details.address,
          major: req.body.Major
        }
      };

      User.findByIdAndUpdate(doc._id, {$set: updatedData})
      .then(response => {
        res.redirect('/personal/setting');
      })
      .catch(error => {
        res.render('error.html', {
          title: 'System Error',
          errorCode: 'System Error',
          errorMessage: error
        });
      });
    }
  })
}

const resetpwd = (req, res, next) => {
  User.findOne({ email: req.cookies["email"] }, function (err, doc) {
    if (err) {
      console.log("db error")
      res.render('error.html', {
        title: 'System Error',
        errorCode: 'System Error',
        errorMessage: err
      });
    }
    if (doc) {
      let userid = doc._id;
      if (req.body.cPWD == doc.password) {
        if (req.body.NewPwd == req.body.comfirmPwd) {
          let updatedData = {
            password: req.body.NewPwd
          }
          User.findByIdAndUpdate(userid, { $set: updatedData })
            .then(response => {
              res.redirect("/personal/setting")
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    } 
  })
} 

const setting_profile_pic_post = (req, res, next) => {
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
        FileSystemController.profile_pic_upload(req.file, doc._id, function (error) {
          if (error) {
            res.render('error.html', {
              title: 'System Error',
              errorCode: 'upload Error',
              errorMessage: err
            });
          }
          else {
            res.redirect('/personal/setting');
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

module.exports = {
  setting_get,
  resetpwd,
  setting_info_update_post,
  setting_major_update_post,
  setting_profile_pic_post
}