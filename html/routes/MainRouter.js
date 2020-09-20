const express   = require('express')
const router    = express.Router()

const MainController   = require('../controllers/MainController')

router.post('/', MainController.home_post)
router.get('/', MainController.home_get)

router.post('/home', MainController.home_post) // full path: /personal/home
router.get('/home', MainController.home_get)

router.post('/learning', MainController.home_post) // full path: /personal/learning
router.get('/learning', MainController.home_get)

router.post('/working', MainController.home_post) // full path: /personal/working
router.get('/working', MainController.home_get)

router.post('/volunteer', MainController.home_post) // full path: /personal/volunteer
router.get('/volunteer', MainController.home_get)

router.post('/contact', MainController.home_post) // full path: /personal/contact
router.get('/contact', MainController.home_get)

router.post('/logout', MainController.logout_post) // full path: /personal/logout
router.get('/logout', MainController.logout_get)

module.exports = router