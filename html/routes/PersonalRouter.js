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
const WorkingController      = require('../controllers/WorkingController')
const VolunteerController      = require('../controllers/VolunteerController')

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

router.post('/', HomeController.home_post)
router.get('/', HomeController.home_get)

// ======================================================================================================== //

router.post('/home', HomeController.home_post) // full path: /personal/home
router.get('/home', HomeController.home_get)

router.post('/home/edit', HomeController.home_edit_post) // full path: /personal/home/edit
router.get('/home/edit', HomeController.home_edit_get)

router.post('/home/edit/infosubmit', HomeController.home_edit_submit_post) // full path: /personal/home/edit/submit
router.get('/home/edit/infosubmit', HomeController.home_edit_submit_get)

router.post('/home/edit/picupload', upload.single('profilePic'), FileUploadController.userSys_upload_post) // full path: /personal/home/edit/submit
router.get('/home/edit/picupload', upload.single('profilePic'), HomeController.home_edit_submit_get)

// ======================================================================================================== //

router.post('/learning', LearningController.learning_post) // full path: /personal/learning
router.get('/learning', LearningController.learning_get)

router.post('/learning/edit/fileupload', upload.single('uploadFile'), FileUploadController.alphaSection_upload_post) // full path: /personal/home/edit/submit
router.get('/learning/edit/fileupload', upload.single('uploadFile'), HomeController.home_edit_submit_get)

// ======================================================================================================== //

router.post('/working', WorkingController.working_post) // full path: /personal/working
router.get('/working', WorkingController.working_get)

// ======================================================================================================== //

router.post('/volunteer', VolunteerController.volunteer_post) // full path: /personal/volunteer
router.get('/volunteer', VolunteerController.volunteer_get)

// ======================================================================================================== //

router.post('/contact', ContactController.contact_post) // full path: /personal/contact
router.get('/contact', ContactController.contact_get)

// ======================================================================================================== //

router.post('/logout', LogoutController.logout_post) // full path: /personal/logout
router.get('/logout', LogoutController.logout_get)

// ======================================================================================================== //

router.post('/document', LogoutController.logout_post) // full path: /personal/logout
router.get('/document', LogoutController.logout_get)

router.post('/document/upload', LogoutController.logout_post) // full path: /personal/logout
router.get('/document/upload', LogoutController.logout_get)

module.exports = router