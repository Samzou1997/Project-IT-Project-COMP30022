const express     = require('express')
const router      = express.Router()
const multer      = require('multer')
const moment      = require('moment')
const config      = require('../config/web_config.json')
const path        = require('path')

const HomeController          = require('../controllers/HomeController')
const ContactController       = require('../controllers/ContactController')
const LogoutController        = require('../controllers/LogoutController')
const FileSystemController    = require('../controllers/FileSystemController')
const LearningController      = require('../controllers/LearningController')
const WorkingController       = require('../controllers/WorkingController')
const VolunteerController     = require('../controllers/VolunteerController')
const ErrorController         = require('../controllers/ErrorController')
const VerifyController        = require('../controllers/VerifyController')
const FileSectionController   = require('../controllers/FileSecrtionController')
const DashboardController     = require('../controllers/DashboardController')

var storageConfig = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, path.join(config.fileSystem.root, "/file/temp"));
  },

  filename: function (req, file, cb) {
    var date = new Date();
    cb(null, moment().format("YYYYMMDDhhmmss") + file.originalname);
  }
})

var upload = multer({storage : storageConfig})

//router.post('/', HomeController.home_post)
router.get('/', VerifyController.verify_login, HomeController.home_get)

// ======================================================================================================== //

//router.post('/home', HomeController.home_post) // full path: /personal/home
router.get('/home', VerifyController.verify_login, HomeController.home_get)

//router.post('/home/edit', HomeController.home_edit_post) // full path: /personal/home/edit
router.get('/home/edit', VerifyController.verify_login, HomeController.home_edit_get)

router.post('/home/edit/infosubmit', VerifyController.verify_login, HomeController.home_edit_submit_post)
router.get('/home/edit/infosubmit', ErrorController.not_found_404)

router.post('/home/edit/picupload', upload.single('profilePic'), 
            VerifyController.verify_login, FileSystemController.userSys_upload_post, function(req, res, next){ res.redirect("/personal/home"); })
router.get('/home/edit/picupload', ErrorController.not_found_404)

// ======================================================================================================== //

//router.post('/home', HomeController.home_post) // full path: /personal/home
router.get('/dashboard', VerifyController.verify_login, DashboardController.dashboard_get)


// ======================================================================================================== //

//router.post('/learning', LearningController.learning_post) // full path: /personal/learning
router.get('/learning', VerifyController.verify_login, LearningController.learning_get)

router.post('/learning/edit/fileupload', upload.single('uploadFile'), 
            VerifyController.verify_login, FileSystemController.alphaSection_upload_post, function(req, res, next){ res.redirect("/personal/learning"); })
router.get('/learning/edit/fileupload', ErrorController.not_found_404)

router.get('/learning/edit/article', VerifyController.verify_login, LearningController.learning_article_edit_get)

router.post('/learning/edit/article/submit', VerifyController.verify_login, LearningController.learning_article_submit_post)
router.get('/learning/edit/article/submit', ErrorController.not_found_404)

// ======================================================================================================== //

//router.post('/working', WorkingController.working_post) // full path: /personal/working
router.get('/working', VerifyController.verify_login, WorkingController.working_get)

router.post('/working/edit/fileupload', upload.single('uploadFile'), 
            VerifyController.verify_login, FileSystemController.betaSection_upload_post, function(req, res, next){ res.redirect("/personal/working"); })
router.get('/working/edit/fileupload', ErrorController.not_found_404)

router.get('/working/edit/article', VerifyController.verify_login, WorkingController.working_article_edit_get)

router.post('/working/edit/article/submit', VerifyController.verify_login, WorkingController.working_article_submit_post)
router.get('/working/edit/article/submit', ErrorController.not_found_404)

// ======================================================================================================== //

//router.post('/volunteer', VolunteerController.volunteer_post) // full path: /personal/volunteer
router.get('/volunteer', VerifyController.verify_login, VolunteerController.volunteer_get)

router.post('/volunteer/edit/fileupload', upload.single('uploadFile'), 
            VerifyController.verify_login, FileSystemController.charlieSection_upload_post, function(req, res, next){ res.redirect("/personal/volunteer"); })
router.get('/volunteer/edit/fileupload', ErrorController.not_found_404)

router.get('/volunteer/edit/article', VerifyController.verify_login, VolunteerController.volunteer_article_edit_get)

router.post('/volunteer/edit/article/submit', VerifyController.verify_login, VolunteerController.volunteer_article_submit_post)
router.get('/volunteer/edit/article/submit', ErrorController.not_found_404)

// ======================================================================================================== //

router.get('/file', VerifyController.verify_login, FileSectionController.file_section_get)

router.post('/file/upload', VerifyController.verify_login, FileSectionController.file_upload_post)
router.get('/file/upload', ErrorController.not_found_404)

router.post('/file/delete', VerifyController.verify_login, FileSectionController.file_delete_post)
router.get('/file/delete', ErrorController.not_found_404)


// ======================================================================================================== //

//router.post('/contact', ContactController.contact_post) // full path: /personal/contact
router.get('/contact', VerifyController.verify_login, ContactController.contact_get)

// ======================================================================================================== //

//router.post('/logout', LogoutController.logout_post) // full path: /personal/logout
router.get('/logout', LogoutController.logout_get)

// ======================================================================================================== //

module.exports = router