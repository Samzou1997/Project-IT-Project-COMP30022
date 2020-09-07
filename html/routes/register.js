const express   = require('express')
const router    = express.Router()

// const UserController    = require('../controllers/UserController')
const RegisterController   = require('../controllers/RegisterController')

//router.get('/', UserController.index)
// router.post('/show', UserController.show)
// router.post('/store', UserController.store)
// router.post('/update', UserController.update)
// router.post('/delete', UserController.destroy)

router.post('/', RegisterController.register_post)
router.get('/', RegisterController.register_get)

module.exports = router