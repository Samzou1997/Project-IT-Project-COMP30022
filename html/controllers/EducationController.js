const User            = require('../models/User')
const { response }    = require('express')
var cookieParser      = require('cookie-parser')
const jwt             = require('jsonwebtoken')
const config          = require('../config/web_config.json')
var webPageDate       = require('../views/data_padding/web_page_data.json')
const FileSystemController    = require('../controllers/FileSystemController')
const path                    = require('path');

const secret_key          = config.token_setting.secret_key
const token_expire_time   = config.token_setting.expire_time
const cookie_alive_time   = config.cookie_setting.alive_time
const userDataDir         = "/home/IT_Project/html/file/userData/";

var userID_str;


const education_get = (req, res, next) => {
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
      var educationList = doc.education;
      
      webPageDate.education.profile_pic_path = FileSystemController.getFileUrl(profilePicDir)
      webPageDate.education.eductaionlist = educationList

      console.log(educationList[0])

      res.render('education.html', webPageDate.education)
    }
  })
}

const education_edit_get = (req, res, next) => {
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
      webPageDate.education.profile_pic_path = FileSystemController.getFileUrl(profilePicDir)

      res.render('education_edit.html', webPageDate.education_edit)
    }
  })
}

const education_edit_submit_post = (req, res, next) => {
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
      var educationObj = {
        school : req.body.school_name,
        degree: req.body.Degree,
        major : req.body.Major,
        //extraclass : req.body.extraclass,
        startDate : req.body.Started,
        endDate : req.body.End,
      }

      var educationList = doc.education;
      educationList.push(educationObj);

      var updatedData = {
        education : educationList
      }
      
      User.findByIdAndUpdate(doc._id, {$set: updatedData})
      .then(response => {
        res.redirect('/personal/education');
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

module.exports = {
  education_get,
  education_edit_get,
  education_edit_submit_post
}