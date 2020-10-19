const User            = require('../models/User')
const UserData            = require('../models/UserData')
const { response }    = require('express')
var cookieParser      = require('cookie-parser')
const jwt             = require('jsonwebtoken')
const config          = require('../config/web_config.json')
var webPageData      = require('../views/data_padding/web_page_data.json')
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

      webPageData.dashboard.profile_pic_path = FileSystemController.getFileUrl(profilePicDir)
      webPageData.dashboard.content = documentDir
      webPageData.dashboard.lastname = doc.lastName
      webPageData.dashboard.email = doc.email
      webPageData.dashboard.major = doc.details.major
      UserData.findOne({ email: doc.email }, function (err, doc1) {
        console.log(webPageData.dashboard.link)
        webPageData.dashboard.link = "http://54.206.15.44/Share/" + doc1.shareLabel
      })
      res.render('dashboard.html', webPageData.dashboard)
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
      res.render('dashboard_edit.html', {
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