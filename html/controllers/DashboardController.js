const User            = require('../models/User')
const { response }    = require('express')
var cookieParser      = require('cookie-parser')
const jwt             = require('jsonwebtoken')
const config          = require('../config/web_config.json')
var dashboardPaddingData      = require('../views/data_padding/dashboard_data.json')
const FileSystemController    = require('../controllers/FileSystemController')
const path                    = require('path');

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
      dashboardPaddingData.lastname = doc.lastName
      dashboardPaddingData.profile_pic_path = FileSystemController.getFileUrl(profilePicDir)
      

      res.render('dashboard.html', dashboardPaddingData)
    }
  })
}

const dashboard_doc_edit_get = (req, res, next) => {
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
      var docDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.dashboard_document);
      res.render('doc_edit.html', {
        article : docDir,
        section : 'dashboard'
      })
    }
  })
}

const dashboard_doc_submit_post = (req, res, next) => {
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
      var docDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.dashboard_document);

      FileSystemController.saveFile(docDir, req.body.content, function(error){
        if (error) {
          res.render('error.html', {
            title: 'System Error',
            errorCode: 'Save Error',
            errorMessage: error
          });
        }
        else {
          res.redirect('/personal/dashboard');
        }
      })
    }
  })
}

module.exports = {
  dashboard_get, dashboard_doc_edit_get, dashboard_doc_submit_post
}