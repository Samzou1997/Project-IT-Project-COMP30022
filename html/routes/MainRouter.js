const express   = require('express')
const router    = express.Router()

const MainController   = require('../controllers/MainController')

router.post('/', MainController.home_post) //full path: /home
router.get('/', MainController.home_get)

router.post('/logout', MainController.logout_post) //full path: /home/logout
router.get('/logout', MainController.logout_get)

module.exports = router