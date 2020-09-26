const User            = require('../models/User')
const { response }    = require('express')
var cookieParser      = require('cookie-parser')
const jwt             = require('jsonwebtoken')
const config          = require('../config/web_config.json')
var homePaddingData   = require('../views/data_padding/home_data.json')
const FileSystemController    = require('../controllers/FileSystemController')

const secret_key          = config.token_setting.secret_key
const token_expire_time   = config.token_setting.expire_time
const cookie_alive_time   = config.cookie_setting.alive_time
const userDataDir         = "/home/IT_Project/html/file/userData/";

const home_post = (req, res, next) => {
  res.render('404.html')
}

const home_get = (req, res, next) => {
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
      var fileDir = `/home/IT_Project/html/file/userData/ ${userID_str} /userSys/profile_pic_sys_reserved.png`;

      homePaddingData.name = doc.firstName + " " + doc.lastName
      homePaddingData.school = doc.details.school
      homePaddingData.major = doc.details.major
      homePaddingData.degree = doc.details.degree
      homePaddingData.gender = doc.details.gender
      homePaddingData.birthday = doc.details.dateBirth.toLocaleString()
      homePaddingData.intro = doc.details.introduction
      homePaddingData.path = FileSystemController.getFileUrl(fileDir);

      res.render('home.html', homePaddingData)
    }
  })
}

const home_edit_post = (req, res, next) => {

}

const home_edit_get = (req, res, next) => {
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
      res.render('404.html')
    }
  })
}

const home_edit_submit_post = (req, res, next) => {
  res.render('404.html')
}

const home_edit_submit_get = (req, res, next) => {
  res.render('404.html')
}

module.exports = {
  home_post, home_get, home_edit_post, home_edit_get, home_edit_submit_post, home_edit_submit_get
}