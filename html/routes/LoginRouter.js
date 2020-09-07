const express   = require('express')
const router    = express.Router()

// const UserController    = require('../controllers/UserController')
const LoginController   = require('../controllers/LoginController')

//router.get('/', UserController.index)
// router.post('/show', UserController.show)
// router.post('/store', UserController.store)
// router.post('/update', UserController.update)
// router.post('/delete', UserController.destroy)

router.post('/', LoginController.login_post)
router.get('/', LoginController.login_get)

module.exports = router