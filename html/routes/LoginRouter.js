const express   = require('express')
const router    = express.Router()

const LoginController   = require('../controllers/LoginController')

router.post('/', LoginController.login_post)
router.get('/', LoginController.login_get)

module.exports = router