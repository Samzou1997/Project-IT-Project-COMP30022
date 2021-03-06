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

Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

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
      var profilePicDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.profile_pic);
      var volunteerList = doc.volunteer;

      webPageDate.volunteer.profile_pic_path = FileSystemController.getFileUrl(profilePicDir)
      webPageDate.volunteer.volunteerlist = volunteerList

      var dataCleanStr = JSON.stringify(webPageDate.volunteer);
      var dataCleanObj = JSON.parse(dataCleanStr);
      
      res.render('volunteer.html', dataCleanObj)
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
      var profilePicDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.profile_pic);

      webPageDate.volunteer_edit.profile_pic_path = FileSystemController.getFileUrl(profilePicDir)
      
      res.render('volunteer_edit.html', webPageDate.volunteer_edit)
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
        description : req.body.description,
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

const volunteer_delete_get = (req, res, next) => {
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
      var volunteerList = doc.volunteer;
      volunteerList.forEach(element => {
        if (element._id == req.query.id) {
          volunteerList.remove(element);
        }
      });

      var updatedData = {
        volunteer: volunteerList
      }

      User.findByIdAndUpdate(doc._id, { $set: updatedData })
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
  volunteer_edit_submit_post,
  volunteer_delete_get
}