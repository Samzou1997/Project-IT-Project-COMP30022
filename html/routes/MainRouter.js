const express   = require('express')
const router    = express.Router()

// const UserController    = require('../controllers/UserController')
const MainController   = require('../controllers/MainController')

//router.get('/', UserController.index)
// router.post('/show', UserController.show)
// router.post('/store', UserController.store)
// router.post('/update', UserController.update)
// router.post('/delete', UserController.destroy)

router.post('/', MainController.home_post)
router.get('/', MainController.home_get)

router.post('/logout', MainController.logout_post)
router.get('/logout', MainController.logout_get)

module.exports = router