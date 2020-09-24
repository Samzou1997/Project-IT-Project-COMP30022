const express   = require('express')
const router    = express.Router()

const RegisterController   = require('../controllers/RegisterController')

router.post('/', RegisterController.register_post)
router.get('/', RegisterController.register_get)

module.exports = router