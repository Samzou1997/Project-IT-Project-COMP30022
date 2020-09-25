const express     = require('express')
const router      = express.Router()
const multer      = require('multer')
const moment      = require('moment')
const config      = require('../config/web_config.json')
const path        = require('path')

const HomeController          = require('../controllers/HomeController')
const ContactController       = require('../controllers/ContactController')
const LogoutController        = require('../controllers/LogoutController')
const FileUploadController    = require('../controllers/FileUploadController')
const LearningController      = require('../controllers/LearningController')
const WorkingController       = require('../controllers/WorkingController')
const VolunteerController     = require('../controllers/VolunteerController')
const ErrorRouter             = require('../controllers/ErrorController')
const VerifyController        = require('../controllers/VerifyController')

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

router.post('/home/edit/infosubmit', VerifyController.verify_login, HomeController.home_edit_submit_post) // full path: /personal/home/edit/submit
router.get('/home/edit/infosubmit', ErrorRouter.not_found_404)

router.post('/home/edit/picupload', upload.single('profilePic'), VerifyController.verify_login, FileUploadController.userSys_upload_post) // full path: /personal/home/edit/submit
router.get('/home/edit/picupload', ErrorRouter.not_found_404)

// ======================================================================================================== //

//router.post('/learning', LearningController.learning_post) // full path: /personal/learning
router.get('/learning', VerifyController.verify_login, LearningController.learning_get)

router.post('/learning/edit/fileupload', upload.single('uploadFile'), VerifyController.verify_login, FileUploadController.alphaSection_upload_post) // full path: /personal/home/edit/submit
router.get('/learning/edit/fileupload', ErrorRouter.not_found_404)

// ======================================================================================================== //

//router.post('/working', WorkingController.working_post) // full path: /personal/working
router.get('/working', VerifyController.verify_login, WorkingController.working_get)

router.post('/working/edit/fileupload', upload.single('uploadFile'), VerifyController.verify_login, FileUploadController.betaSection_upload_post) // full path: /personal/home/edit/submit
router.get('/working/edit/fileupload', ErrorRouter.not_found_404)

// ======================================================================================================== //

//router.post('/volunteer', VolunteerController.volunteer_post) // full path: /personal/volunteer
router.get('/volunteer', VerifyController.verify_login, VolunteerController.volunteer_get)

router.post('/volunteer/edit/fileupload', upload.single('uploadFile'), VerifyController.verify_login, FileUploadController.charlieSection_upload_post) // full path: /personal/home/edit/submit
router.get('/volunteer/edit/fileupload', ErrorRouter.not_found_404)

// ======================================================================================================== //

//router.post('/contact', ContactController.contact_post) // full path: /personal/contact
router.get('/contact', VerifyController.verify_login, ContactController.contact_get)

// ======================================================================================================== //

//router.post('/logout', LogoutController.logout_post) // full path: /personal/logout
router.get('/logout', LogoutController.logout_get)

// ======================================================================================================== //

module.exports = router