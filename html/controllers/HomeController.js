const User            = require('../models/User')
const { response }    = require('express')
var cookieParser      = require('cookie-parser')
const jwt             = require('jsonwebtoken')
const config          = require('../config/web_config.json')
var homePaddingData   = require('../views/data_padding/home_data.json')
var profileEditPaddingData   = require('../views/data_padding/profile_edit.json')
const FileSystemController    = require('../controllers/FileSystemController')

const secret_key          = config.token_setting.secret_key
const token_expire_time   = config.token_setting.expire_time
const cookie_alive_time   = config.cookie_setting.alive_time
const userDataDir         = "/home/IT_Project/html/file/userData/";

var userID_str;

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
      userID_str = doc._id.toHexString();
      var profilePicDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.profile_pic);
      var documentDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.dashboard_document);

      homePaddingData.firstname = doc.firstName
      homePaddingData.lastname = doc.lastName
      homePaddingData.school = doc.details.school
      homePaddingData.major = doc.details.major
      homePaddingData.degree = doc.details.degree
      homePaddingData.gender = doc.details.gender
      homePaddingData.dateofbirth = doc.details.dateBirth.toLocaleString()
      homePaddingData.intro = doc.details.introduction
      homePaddingData.profile_pic_path = FileSystemController.getFileUrl(profilePicDir);
      homePaddingData.company = doc.details.company
      homePaddingData.startedfrom = doc.details.startedfrom
      homePaddingData.title = doc.details.title

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
      userID_str = doc._id.toHexString();
      var profilePicDir = config.fileSystem.userDataDir + userID_str + config.fileSystem.profile_pic;;

      profileEditPaddingData.firstname = doc.firstName
      profileEditPaddingData.lastname = doc.lastName
      profileEditPaddingData.dateofbirth = doc.details.dateBirth.toLocaleString()
      profileEditPaddingData.gender = doc.details.gender
      profileEditPaddingData.graduatedschool = doc.details.school
      profileEditPaddingData.major = doc.details.major
      profileEditPaddingData.company = doc.details.company
      profileEditPaddingData.title = doc.details.title
      profileEditPaddingData.startedfrom = doc.details.startedfrom
      profileEditPaddingData.place = doc.details.place
      profileEditPaddingData.intro = doc.details.introduction
      profileEditPaddingData.degree = doc.details.degree
      profileEditPaddingData.profile_pic_path = FileSystemController.getFileUrl(profilePicDir);

      res.render('profile_edit.html',profileEditPaddingData)
    }
  })
}

const home_edit_submit_post = (req, res, next) => {
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
      let userid = doc._id
      if (Date.parse(req.body.dataofbirth) == NaN){
        console.log("data type error")
        res.render('error.html', {
          title: 'System Error',
          errorCode: 'System Error',
          errorMessage: 'Wrong input type'
        });
      }
      else{
        let updatedData = {
          firstName : req.body.firstname,
          lastName : req.body.lastname,
          details : {
            dateofbirth : new Date(Date.parse(req.body.dataofbirth)),
            gender : req.body.gender,
            school : req.body.graduatedschool,
            major : req.body.major,
            degree : req.body.degree,
            company : req.body.company,
            title : req.body.title,
            startedfrom : req.body.startedfrom,
            place : req.body.place,
            introduction : req.body.intro,
          }
        }
        
        User.findByIdAndUpdate(userid, {$set: updatedData})
        .then(response => {
          console.log(response)
          res.redirect("/personal/home");
        })
        .catch(error => {
          console.log(error)
          res.render('error.html', {
            title: 'System Error',
            errorCode: 'System Error',
            errorMessage: error
          });
        })
      }                  
    }  
  })
}

const home_edit_submit_get = (req, res, next) => {
  res.render('404.html')
}

module.exports = {
  home_post, home_get, home_edit_post, home_edit_get, home_edit_submit_post, home_edit_submit_get
}