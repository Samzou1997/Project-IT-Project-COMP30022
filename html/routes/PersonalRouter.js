const express   = require('express')
const router    = express.Router()
const multer      = require('multer')

const HomeController      = require('../controllers/HomeController')
const ContactController   = require('../controllers/ContactController')
const LogoutController    = require('../controllers/LogoutController')

var upload = multer()

router.post('/', HomeController.home_post)
router.get('/', HomeController.home_get)

// ======================================================================================================== //

router.post('/home', HomeController.home_post) // full path: /personal/home
router.get('/home', HomeController.home_get)

router.post('/home/edit', HomeController.home_edit_post) // full path: /personal/home/edit
router.get('/home/edit', HomeController.home_edit_get)

router.post('/home/edit/infosubmit', HomeController.home_edit_submit_post) // full path: /personal/home/edit/submit
router.get('/home/edit/infosubmit', HomeController.home_edit_submit_get)

router.post('/home/edit/picupload', upload.single('profilePic'), HomeController.home_edit_submit_post) // full path: /personal/home/edit/submit
router.get('/home/edit/picupload', upload.single('profilePic'), HomeController.home_edit_submit_get)

// ======================================================================================================== //

router.post('/learning', HomeController.home_post) // full path: /personal/learning
router.get('/learning', HomeController.home_get)

// ======================================================================================================== //

router.post('/profile', HomeController.home_post) // full path: /personal/learning
router.get('/profile', HomeController.home_get)

// ======================================================================================================== //

router.post('/working', HomeController.home_post) // full path: /personal/working
router.get('/working', HomeController.home_get)

// ======================================================================================================== //

router.post('/volunteer', HomeController.home_post) // full path: /personal/volunteer
router.get('/volunteer', HomeController.home_get)

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