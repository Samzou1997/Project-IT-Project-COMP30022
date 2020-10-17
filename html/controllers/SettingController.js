const User            = require('../models/User');
const { response }    = require('express');
var cookieParser      = require('cookie-parser');
const jwt             = require('jsonwebtoken');
const config          = require('../config/web_config.json');
var webPageDate       = require('../views/data_padding/web_page_data.json');
const FileSystemController    = require('../controllers/FileSystemController');
const path                    = require('path');
const fs                      = require('fs');

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
      webPageDate.setting.dateofbirth = doc.details.dateBirth;
      webPageDate.setting.gender = doc.details.gender;
      webPageDate.setting.phone = doc.details.phone;
      webPageDate.setting.address = doc.details.address;
      webPageDate.setting.major = doc.details.major;
      
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
      var profilePicDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.profile_pic);

      webPageDate.setting.profile_pic_path = FileSystemController.getFileUrl(profilePicDir);
      webPageDate.setting.firstname = doc.firstName;
      webPageDate.setting.lastname = doc.lastName;
      webPageDate.setting.dateofbirth = doc.details.dateBirth;
      webPageDate.setting.gender = doc.details.gender;
      webPageDate.setting.phone = doc.details.phone;
      webPageDate.setting.address = doc.details.address;
      webPageDate.setting.major = doc.details.major;
      
      res.render('settings.html', webPageDate.setting);
    }
  })
}



module.exports = {
  setting_get
}