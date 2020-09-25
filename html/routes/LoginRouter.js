const express   = require('express')
const router    = express.Router()

const LoginController   = require('../controllers/LoginController')
const ErrorRouter       = require('../controllers/ErrorController')

router.post('/', LoginController.login_post)
router.get('/', ErrorRouter.not_found_404)

module.exports = router