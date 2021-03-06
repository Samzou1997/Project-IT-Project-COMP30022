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

const employment_get = (req, res, next) => {
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
      var employmentList = doc.employment;
      
      webPageDate.employment.profile_pic_path = FileSystemController.getFileUrl(profilePicDir)
      webPageDate.employment.employmentlist = employmentList

      var dataCleanStr = JSON.stringify(webPageDate.employment);
      var dataCleanObj = JSON.parse(dataCleanStr);

      res.render('employment.html', dataCleanObj)
    }
  })
}

const employment_edit_get = (req, res, next) => {
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

      webPageDate.employment_edit.profile_pic_path = FileSystemController.getFileUrl(profilePicDir)
      
      res.render('employment_edit.html', webPageDate.employment_edit)
    }
  })
}

const employment_edit_submit_post = (req, res, next) => {
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
      var employmentObj = {
        company : req.body.Company,
        title: req.body.Title,
        startDate : req.body.Started,
        endDate : req.body.End,
        description: req.body.description
      }

      var employmentList = doc.employment;
      employmentList.push(employmentObj);

      var updatedData = {
        employment : employmentList
      }
      
      User.findByIdAndUpdate(doc._id, {$set: updatedData})
      .then(response => {
        res.redirect('/personal/employment');
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

const employment_delete_get = (req, res, next) => {
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
      var employmentList = doc.employment;

      employmentList.forEach(element => {
        if (element._id == req.query.id) {
          employmentList.remove(element);
        }
      });

      var updatedData = {
        employment: employmentList
      }

      User.findByIdAndUpdate(doc._id, { $set: updatedData })
        .then(response => {
          res.redirect('/personal/employment');
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
  employment_get,
  employment_edit_get,
  employment_edit_submit_post,
  employment_delete_get
}