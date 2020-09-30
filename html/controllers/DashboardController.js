const User            = require('../models/User')
const { response }    = require('express')
var cookieParser      = require('cookie-parser')
const jwt             = require('jsonwebtoken')
const config          = require('../config/web_config.json')
var dashboardPaddingData      = require('../views/data_padding/dashboard_data.json')
var profileEditPaddingData    = require('../views/data_padding/profile_edit.json')
const FileSystemController    = require('../controllers/FileSystemController')
const path                    = require('path');
const fs                      = require('fs');

const secret_key          = config.token_setting.secret_key
const token_expire_time   = config.token_setting.expire_time
const cookie_alive_time   = config.cookie_setting.alive_time
const userDataDir         = "/home/IT_Project/html/file/userData/";

var userID_str;


const dashboard_get = (req, res, next) => {
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
      userID_str = doc._id.toHexString();
      var profilePicDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.profile_pic);
      var documentDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.dashboard_document);

      dashboardPaddingData.content = documentDir
      

      res.render('dashboard.html', dashboardPaddingData)
    }
  })
}



module.exports = {
  dashboard_get
}