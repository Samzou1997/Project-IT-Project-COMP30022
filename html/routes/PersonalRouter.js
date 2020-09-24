const express   = require('express')
const router    = express.Router()

const PersonalController   = require('../controllers/PersonalController')

router.post('/', PersonalController.home_post)
router.get('/', PersonalController.home_get)

// ======================================================================================================== //

router.post('/home', PersonalController.home_post) // full path: /personal/home
router.get('/home', PersonalController.home_get)

router.post('/home/edit', PersonalController.home_post) // full path: /personal/home/edit
router.get('/home/edit', PersonalController.home_get)

router.post('/home/edit/submit', PersonalController.home_post) // full path: /personal/home/edit/submit
router.get('/home/edit/submit', PersonalController.home_get)

// ======================================================================================================== //

router.post('/learning', PersonalController.home_post) // full path: /personal/learning
router.get('/learning', PersonalController.home_get)

// ======================================================================================================== //

router.post('/profile', PersonalController.home_post) // full path: /personal/learning
router.get('/profile', PersonalController.home_get)

router.post('/working/edit/fileupload', upload.single('uploadFile'), FileUploadController.betaSection_upload_post) // full path: /personal/home/edit/submit
router.get('/working/edit/fileupload', upload.single('uploadFile'), HomeController.home_edit_submit_get)

// ======================================================================================================== //

router.post('/working', PersonalController.home_post) // full path: /personal/working
router.get('/working', PersonalController.home_get)

router.post('/volunteer/edit/fileupload', upload.single('uploadFile'), FileUploadController.charlieSection_upload_post) // full path: /personal/home/edit/submit
router.get('/volunteer/edit/fileupload', upload.single('uploadFile'), HomeController.home_edit_submit_get)

// ======================================================================================================== //

router.post('/volunteer', PersonalController.home_post) // full path: /personal/volunteer
router.get('/volunteer', PersonalController.home_get)

// ======================================================================================================== //

router.post('/contact', PersonalController.home_post) // full path: /personal/contact
router.get('/contact', PersonalController.home_get)

// ======================================================================================================== //

router.post('/logout', PersonalController.logout_post) // full path: /personal/logout
router.get('/logout', PersonalController.logout_get)

module.exports = router