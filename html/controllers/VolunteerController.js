const User            = require('../models/User')
const { response }    = require('express')
var cookieParser      = require('cookie-parser')
const jwt             = require('jsonwebtoken')
const config          = require('../config/web_config.json')
var dashboardPaddingData      = require('../views/data_padding/dashboard_data.json')
var profileEditPaddingData    = require('../views/data_padding/profile_edit.json')
const FileSystemController    = require('../controllers/FileSystemController')
const path                    = require('path');

const secret_key          = config.token_setting.secret_key
const token_expire_time   = config.token_setting.expire_time
const cookie_alive_time   = config.cookie_setting.alive_time
const userDataDir         = "/home/IT_Project/html/file/userData/";

var userID_str;


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
      userID_str = doc._id.toHexString();
      var volunteerList = doc.volunteer;
      
      res.render('volunteer.html', {
        lastname : doc.lastName
      })
    }
  })
}

const volunteer_edit_get = (req, res, next) => {
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
      
      res.render('volunteer_edit.html')
    }
  })
}

const volunteer_edit_submit_post = (req, res, next) => {
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
      var volunteerObj = {
        place : req.body.place,
        workingHours: req.body.hours,
        workIntro : req.body.intro,
      }

      var volunteerList = doc.volunteer;
      volunteerList.push(volunteerObj);

      var updatedData = {
        volunteer : volunteerList
      }
      
      User.findByIdAndUpdate(doc._id, {$set: updatedData})
      .then(response => {
        res.redirect('/personal/volunteer');
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
  volunteer_get,
  volunteer_edit_get,
  volunteer_edit_submit_post
}